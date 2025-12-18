import { AgentBase, AgentInput, AgentOutput, AgentAction, StreamCallback } from '../core/AgentBase';
import type { EmbeddingService, SearchResult } from '../services/EmbeddingService';

interface RAGAgentContext {
  ollama: import('../services/OllamaService').OllamaService;
  vault: import('../services/VaultService').VaultService;
  settings: { enabled: boolean };
  embedding: EmbeddingService;
}

export class RAGAgent extends AgentBase {
  readonly name = 'RAG Search';
  readonly description = 'Semantic search over your vault using embeddings';
  readonly icon = 'search';
  readonly supportsStreaming = true;

  private embedding: EmbeddingService;

  constructor(context: RAGAgentContext) {
    super(context);
    this.embedding = context.embedding;
  }

  canHandle(input: AgentInput): boolean {
    const query = input.query.toLowerCase();
    return (
      query.includes('search') ||
      query.includes('find') ||
      query.includes('related') ||
      query.includes('similar') ||
      query.startsWith('/rag ') ||
      query.startsWith('/search ')
    );
  }

  async execute(input: AgentInput, stream?: StreamCallback): Promise<AgentOutput> {
    this.validateInput(input);

    const query = this.cleanQuery(input.query);
    const mode = this.detectMode(input.query);

    switch (mode) {
      case 'similar':
        return this.findSimilarNotes(query, stream);
      case 'index':
        return this.indexVault(stream);
      case 'stats':
        return this.getStats();
      default:
        return this.semanticSearch(query, stream);
    }
  }

  private cleanQuery(query: string): string {
    return query
      .replace(/^\/rag\s+/i, '')
      .replace(/^\/search\s+/i, '')
      .replace(/^search\s+(for\s+)?/i, '')
      .replace(/^find\s+(notes?\s+)?(about\s+)?/i, '')
      .replace(/^related\s+(to\s+)?/i, '')
      .replace(/^similar\s+(to\s+)?/i, '')
      .trim();
  }

  private detectMode(query: string): 'search' | 'similar' | 'index' | 'stats' {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('index vault') || lowerQuery.includes('reindex')) {
      return 'index';
    }
    if (lowerQuery.includes('stats') || lowerQuery.includes('statistics')) {
      return 'stats';
    }
    if (lowerQuery.includes('similar to') || lowerQuery.includes('related to')) {
      return 'similar';
    }

    return 'search';
  }

  private async semanticSearch(query: string, stream?: StreamCallback): Promise<AgentOutput> {
    if (stream) stream('🔍 Searching vault...\n\n');

    const results = await this.embedding.search(query, 5, 0.3);

    if (results.length === 0) {
      return this.createTextOutput(
        '❌ No relevant notes found. Try:\n' +
        '- Different keywords\n' +
        '- Running `/rag index vault` to update the index\n' +
        '- Checking if notes exist on this topic'
      );
    }

    let content = `## Search Results for "${query}"\n\n`;
    const actions: AgentAction[] = [];

    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      const scorePercent = Math.round(result.score * 100);

      content += `### ${i + 1}. [[${result.document.metadata.title}]]\n`;
      content += `📊 Relevance: ${scorePercent}%\n`;

      if (result.document.metadata.tags.length > 0) {
        content += `🏷️ Tags: ${result.document.metadata.tags.slice(0, 5).join(', ')}\n`;
      }

      content += `\n> ${result.snippet}\n\n`;

      if (stream) {
        stream(`Found: **${result.document.metadata.title}** (${scorePercent}%)\n`);
      }

      actions.push({
        type: 'open_link',
        payload: { path: result.document.path },
        label: `Open ${result.document.metadata.title}`
      });
    }

    // Get AI-enhanced response if we have context
    const context = await this.embedding.getContextForQuery(query, 2000);
    if (context && results.length > 0) {
      content += '---\n\n## AI Summary\n\n';

      if (stream) stream('\n📝 Generating summary...\n');

      const aiResponse = await this.generateContextualResponse(query, context);
      content += aiResponse;
    }

    return this.createActionOutput(content, actions, {
      resultCount: results.length,
      topScore: results[0]?.score
    });
  }

  private async findSimilarNotes(query: string, stream?: StreamCallback): Promise<AgentOutput> {
    // Extract the note name from the query
    const noteName = query.replace(/similar\s+to\s+/i, '').replace(/related\s+to\s+/i, '').trim();

    // Try to find the note path
    const allFiles = await this.context.vault.getAllMarkdownFiles();
    const matchingPath = allFiles.find(
      path => path.toLowerCase().includes(noteName.toLowerCase())
    );

    if (!matchingPath) {
      return this.createTextOutput(
        `❌ Could not find a note matching "${noteName}". Please provide a more specific name.`
      );
    }

    if (stream) stream(`🔍 Finding notes similar to "${noteName}"...\n\n`);

    const results = await this.embedding.findSimilar(matchingPath, 5, 0.4);

    if (results.length === 0) {
      return this.createTextOutput(
        `No similar notes found for "${noteName}". This could mean:\n` +
        '- The note is unique in your vault\n' +
        '- The index needs to be updated\n' +
        '- Try a lower similarity threshold'
      );
    }

    let content = `## Notes Similar to [[${noteName}]]\n\n`;
    const actions: AgentAction[] = [];

    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      const scorePercent = Math.round(result.score * 100);

      content += `### ${i + 1}. [[${result.document.metadata.title}]]\n`;
      content += `📊 Similarity: ${scorePercent}%\n`;

      if (result.document.metadata.tags.length > 0) {
        content += `🏷️ Tags: ${result.document.metadata.tags.slice(0, 5).join(', ')}\n`;
      }

      content += `\n> ${result.snippet}\n\n`;

      actions.push({
        type: 'open_link',
        payload: { path: result.document.path },
        label: `Open ${result.document.metadata.title}`
      });
    }

    return this.createActionOutput(content, actions, {
      sourceNote: noteName,
      resultCount: results.length
    });
  }

  private async indexVault(stream?: StreamCallback): Promise<AgentOutput> {
    if (stream) stream('📚 Starting vault indexing...\n\n');

    const progressCallback = (current: number, total: number) => {
      if (stream && current % 10 === 0) {
        stream(`Progress: ${current}/${total} notes\n`);
      }
    };

    try {
      const indexed = await this.embedding.indexVault(progressCallback);

      const stats = this.embedding.getIndexStats();

      return this.createTextOutput(
        `## Indexing Complete ✅\n\n` +
        `- **Notes indexed**: ${indexed}\n` +
        `- **Total in index**: ${stats.totalDocuments}\n` +
        `- **Average embedding size**: ${stats.averageEmbeddingSize.toFixed(0)} dimensions\n\n` +
        `Your vault is now ready for semantic search!`
      );
    } catch (error) {
      return this.createTextOutput(
        `## Indexing Failed ❌\n\n` +
        `Error: ${error.message}\n\n` +
        `Make sure Ollama is running and the embedding model is available.`
      );
    }
  }

  private getStats(): AgentOutput {
    const stats = this.embedding.getIndexStats();

    if (stats.totalDocuments === 0) {
      return this.createTextOutput(
        '## RAG Index Status\n\n' +
        '❌ No notes indexed yet.\n\n' +
        'Run `/rag index vault` to build the index.'
      );
    }

    const oldestDate = new Date(stats.oldestTimestamp).toLocaleDateString();

    return this.createTextOutput(
      `## RAG Index Statistics\n\n` +
      `- **Indexed notes**: ${stats.totalDocuments}\n` +
      `- **Embedding dimensions**: ${stats.averageEmbeddingSize.toFixed(0)}\n` +
      `- **Oldest entry**: ${oldestDate}\n\n` +
      `Use \`/rag index vault\` to refresh the index.`
    );
  }

  private async generateContextualResponse(query: string, context: string): Promise<string> {
    const systemPrompt = `You are a helpful assistant that answers questions based on the user's personal notes.
Use the provided context from their vault to answer accurately.
If the context doesn't contain enough information, say so.
Always reference which notes the information came from using [[Note Name]] format.
Be concise and helpful.`;

    const response = await this.context.ollama.chat([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Context:\n${context}\n\nQuestion: ${query}` }
    ]);

    return response;
  }
}
