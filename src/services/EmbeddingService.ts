import type { OllamaService } from './OllamaService';
import type { VaultService } from './VaultService';
import type { App } from 'obsidian';

export interface EmbeddingDocument {
  id: string;
  path: string;
  content: string;
  embedding: number[];
  metadata: DocumentMetadata;
  timestamp: number;
}

export interface DocumentMetadata {
  title: string;
  tags: string[];
  links: string[];
  wordCount: number;
  frontmatter?: Record<string, unknown>;
}

export interface SearchResult {
  document: EmbeddingDocument;
  score: number;
  snippet: string;
}

export interface ChunkOptions {
  chunkSize: number;
  chunkOverlap: number;
  minChunkSize: number;
}

const DEFAULT_CHUNK_OPTIONS: ChunkOptions = {
  chunkSize: 500,
  chunkOverlap: 50,
  minChunkSize: 100
};

export class EmbeddingService {
  private ollama: OllamaService;
  private vault: VaultService;
  private app: App;
  private index: Map<string, EmbeddingDocument> = new Map();
  private indexPath: string;
  private isIndexing = false;

  constructor(ollama: OllamaService, vault: VaultService, app: App) {
    this.ollama = ollama;
    this.vault = vault;
    this.app = app;
    this.indexPath = '.jarvis/embeddings.json';
  }

  async initialize(): Promise<void> {
    await this.loadIndex();
  }

  private async loadIndex(): Promise<void> {
    try {
      const data = await this.vault.readFile(this.indexPath);
      if (data) {
        const parsed = JSON.parse(data);
        this.index = new Map(Object.entries(parsed));
        console.log(`Loaded ${this.index.size} embeddings from index`);
      }
    } catch (error) {
      console.log('No existing embedding index found, starting fresh');
      this.index = new Map();
    }
  }

  private async saveIndex(): Promise<void> {
    const data = Object.fromEntries(this.index);
    await this.vault.writeFile(this.indexPath, JSON.stringify(data, null, 2));
  }

  async indexNote(path: string, forceReindex = false): Promise<boolean> {
    try {
      const content = await this.vault.readFile(path);
      if (!content || content.trim().length === 0) {
        return false;
      }

      const file = this.app.vault.getAbstractFileByPath(path);
      if (!file || !('stat' in file)) {
        return false;
      }

      const existingDoc = this.index.get(path);
      const fileModTime = (file as { stat: { mtime: number } }).stat.mtime;

      // Skip if already indexed and not modified
      if (!forceReindex && existingDoc && existingDoc.timestamp >= fileModTime) {
        return false;
      }

      // Extract metadata
      const metadata = this.extractMetadata(path, content);

      // Chunk the content for better embedding
      const chunks = this.chunkContent(content);

      // Get the main content for embedding (combine chunks with weighting)
      const embeddingText = this.prepareEmbeddingText(metadata.title, content, metadata.tags);

      // Generate embedding
      const embedding = await this.ollama.embed(embeddingText);

      const doc: EmbeddingDocument = {
        id: this.generateId(path),
        path,
        content: content.substring(0, 5000), // Store truncated content for retrieval
        embedding,
        metadata,
        timestamp: fileModTime
      };

      this.index.set(path, doc);
      return true;
    } catch (error) {
      console.error(`Failed to index ${path}:`, error);
      return false;
    }
  }

  async indexVault(progressCallback?: (current: number, total: number) => void): Promise<number> {
    if (this.isIndexing) {
      throw new Error('Indexing already in progress');
    }

    this.isIndexing = true;
    let indexed = 0;

    try {
      const notes = await this.vault.getAllMarkdownFiles();
      const total = notes.length;

      for (let i = 0; i < notes.length; i++) {
        const note = notes[i];
        if (progressCallback) {
          progressCallback(i + 1, total);
        }

        // Skip templates and special folders
        if (note.includes('/templates/') || note.startsWith('templates/')) {
          continue;
        }

        const success = await this.indexNote(note);
        if (success) {
          indexed++;
        }

        // Small delay to avoid overwhelming Ollama
        if (indexed % 10 === 0) {
          await this.saveIndex();
          await this.sleep(100);
        }
      }

      await this.saveIndex();
      return indexed;
    } finally {
      this.isIndexing = false;
    }
  }

  async search(query: string, topK = 5, threshold = 0.3): Promise<SearchResult[]> {
    if (this.index.size === 0) {
      return [];
    }

    // Get query embedding
    const queryEmbedding = await this.ollama.embed(query);

    // Calculate similarities
    const results: SearchResult[] = [];

    for (const doc of this.index.values()) {
      const score = this.cosineSimilarity(queryEmbedding, doc.embedding);

      if (score >= threshold) {
        results.push({
          document: doc,
          score,
          snippet: this.extractSnippet(doc.content, query)
        });
      }
    }

    // Sort by score descending and return top K
    results.sort((a, b) => b.score - a.score);
    return results.slice(0, topK);
  }

  async findSimilar(path: string, topK = 5, threshold = 0.5): Promise<SearchResult[]> {
    const sourceDoc = this.index.get(path);
    if (!sourceDoc) {
      return [];
    }

    const results: SearchResult[] = [];

    for (const doc of this.index.values()) {
      if (doc.path === path) continue;

      const score = this.cosineSimilarity(sourceDoc.embedding, doc.embedding);

      if (score >= threshold) {
        results.push({
          document: doc,
          score,
          snippet: this.extractSnippet(doc.content, sourceDoc.metadata.title)
        });
      }
    }

    results.sort((a, b) => b.score - a.score);
    return results.slice(0, topK);
  }

  async getContextForQuery(query: string, maxTokens = 2000): Promise<string> {
    const results = await this.search(query, 3, 0.3);

    if (results.length === 0) {
      return '';
    }

    let context = '**Relevant notes from your vault:**\n\n';
    let currentTokens = 0;
    const avgCharsPerToken = 4;

    for (const result of results) {
      const docContext = `### [[${result.document.metadata.title}]]\n${result.snippet}\n\n`;
      const estimatedTokens = docContext.length / avgCharsPerToken;

      if (currentTokens + estimatedTokens > maxTokens) {
        break;
      }

      context += docContext;
      currentTokens += estimatedTokens;
    }

    return context;
  }

  removeFromIndex(path: string): boolean {
    return this.index.delete(path);
  }

  clearIndex(): void {
    this.index.clear();
  }

  getIndexStats(): { totalDocuments: number; averageEmbeddingSize: number; oldestTimestamp: number } {
    if (this.index.size === 0) {
      return { totalDocuments: 0, averageEmbeddingSize: 0, oldestTimestamp: 0 };
    }

    let totalSize = 0;
    let oldestTimestamp = Date.now();

    for (const doc of this.index.values()) {
      totalSize += doc.embedding.length;
      if (doc.timestamp < oldestTimestamp) {
        oldestTimestamp = doc.timestamp;
      }
    }

    return {
      totalDocuments: this.index.size,
      averageEmbeddingSize: totalSize / this.index.size,
      oldestTimestamp
    };
  }

  private extractMetadata(path: string, content: string): DocumentMetadata {
    const title = path.split('/').pop()?.replace('.md', '') || path;

    // Extract tags
    const tagRegex = /#([a-zA-Z0-9_-]+)/g;
    const tags: string[] = [];
    let match;
    while ((match = tagRegex.exec(content)) !== null) {
      tags.push(match[1]);
    }

    // Extract links
    const linkRegex = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g;
    const links: string[] = [];
    while ((match = linkRegex.exec(content)) !== null) {
      links.push(match[1]);
    }

    // Word count
    const wordCount = content.split(/\s+/).length;

    // Extract frontmatter
    let frontmatter: Record<string, unknown> | undefined;
    const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (fmMatch) {
      try {
        frontmatter = this.parseYamlFrontmatter(fmMatch[1]);
      } catch {
        // Ignore frontmatter parsing errors
      }
    }

    return { title, tags, links, wordCount, frontmatter };
  }

  private parseYamlFrontmatter(yaml: string): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    const lines = yaml.split('\n');

    for (const line of lines) {
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim();
        const value = line.substring(colonIndex + 1).trim();
        result[key] = value;
      }
    }

    return result;
  }

  private prepareEmbeddingText(title: string, content: string, tags: string[]): string {
    // Clean content - remove frontmatter and code blocks
    let cleanContent = content
      .replace(/^---\n[\s\S]*?\n---\n?/, '') // Remove frontmatter
      .replace(/```[\s\S]*?```/g, '') // Remove code blocks
      .replace(/!\[\[.*?\]\]/g, '') // Remove embedded images
      .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, '$2 $1') // Convert links to text
      .trim();

    // Truncate if too long
    if (cleanContent.length > 3000) {
      cleanContent = cleanContent.substring(0, 3000);
    }

    // Combine title, tags, and content for richer embedding
    const tagText = tags.length > 0 ? `Tags: ${tags.join(', ')}` : '';
    return `Title: ${title}\n${tagText}\n\n${cleanContent}`;
  }

  private chunkContent(content: string, options: ChunkOptions = DEFAULT_CHUNK_OPTIONS): string[] {
    const { chunkSize, chunkOverlap, minChunkSize } = options;
    const chunks: string[] = [];

    // Split by paragraphs first
    const paragraphs = content.split(/\n\n+/);
    let currentChunk = '';

    for (const paragraph of paragraphs) {
      if (currentChunk.length + paragraph.length <= chunkSize) {
        currentChunk += (currentChunk ? '\n\n' : '') + paragraph;
      } else {
        if (currentChunk.length >= minChunkSize) {
          chunks.push(currentChunk);
        }
        // Start new chunk with overlap
        const overlapText = currentChunk.slice(-chunkOverlap);
        currentChunk = overlapText + (overlapText ? '\n\n' : '') + paragraph;
      }
    }

    if (currentChunk.length >= minChunkSize) {
      chunks.push(currentChunk);
    }

    return chunks;
  }

  private extractSnippet(content: string, query: string, maxLength = 300): string {
    const lowerContent = content.toLowerCase();
    const queryWords = query.toLowerCase().split(/\s+/);

    // Find the position of the first query word
    let bestPos = 0;
    for (const word of queryWords) {
      const pos = lowerContent.indexOf(word);
      if (pos !== -1) {
        bestPos = pos;
        break;
      }
    }

    // Extract snippet around that position
    const start = Math.max(0, bestPos - maxLength / 2);
    const end = Math.min(content.length, start + maxLength);

    let snippet = content.substring(start, end);

    // Clean up snippet
    if (start > 0) snippet = '...' + snippet;
    if (end < content.length) snippet = snippet + '...';

    return snippet.trim();
  }

  private cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length) {
      return 0;
    }

    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }

    if (normA === 0 || normB === 0) {
      return 0;
    }

    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  private generateId(path: string): string {
    // Simple hash function for ID
    let hash = 0;
    for (let i = 0; i < path.length; i++) {
      const char = path.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
