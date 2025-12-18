import { App, TFile, TFolder, TAbstractFile, Notice } from 'obsidian';

export interface NoteMetadata {
  path: string;
  name: string;
  basename: string;
  extension: string;
  created: number;
  modified: number;
  size: number;
  tags: string[];
  frontmatter: Record<string, unknown>;
}

export interface SearchResult {
  file: TFile;
  matches: string[];
  score: number;
}

export class VaultService {
  private app: App;

  constructor(app: App) {
    this.app = app;
  }

  // Get all markdown files
  getAllNotes(): TFile[] {
    return this.app.vault.getMarkdownFiles();
  }

  // Get note names for linking suggestions
  getNoteNames(): string[] {
    return this.getAllNotes().map(f => f.basename);
  }

  // Get notes in a specific folder
  getNotesInFolder(folderPath: string): TFile[] {
    const folder = this.app.vault.getAbstractFileByPath(folderPath);
    if (!folder || !(folder instanceof TFolder)) {
      return [];
    }

    const notes: TFile[] = [];
    this.collectNotesRecursive(folder, notes);
    return notes;
  }

  private collectNotesRecursive(folder: TFolder, notes: TFile[]) {
    for (const child of folder.children) {
      if (child instanceof TFile && child.extension === 'md') {
        notes.push(child);
      } else if (child instanceof TFolder) {
        this.collectNotesRecursive(child, notes);
      }
    }
  }

  // Read note content
  async readNote(file: TFile): Promise<string> {
    return this.app.vault.read(file);
  }

  // Read note by path
  async readNoteByPath(path: string): Promise<string | null> {
    const file = this.app.vault.getAbstractFileByPath(path);
    if (file instanceof TFile) {
      return this.app.vault.read(file);
    }
    return null;
  }

  // Get current active note
  getActiveNote(): TFile | null {
    return this.app.workspace.getActiveFile();
  }

  // Get active note content
  async getActiveNoteContent(): Promise<string | null> {
    const file = this.getActiveNote();
    if (file) {
      return this.readNote(file);
    }
    return null;
  }

  // Create a new note
  async createNote(path: string, content: string): Promise<TFile> {
    // Ensure parent folder exists
    const folderPath = path.substring(0, path.lastIndexOf('/'));
    if (folderPath) {
      await this.ensureFolderExists(folderPath);
    }

    const file = await this.app.vault.create(path, content);
    new Notice(`Created note: ${file.basename}`);
    return file;
  }

  // Update note content
  async updateNote(file: TFile, content: string): Promise<void> {
    await this.app.vault.modify(file, content);
  }

  // Append to note
  async appendToNote(file: TFile, content: string): Promise<void> {
    const existing = await this.readNote(file);
    await this.updateNote(file, existing + '\n' + content);
  }

  // Ensure folder exists
  async ensureFolderExists(path: string): Promise<void> {
    const folder = this.app.vault.getAbstractFileByPath(path);
    if (!folder) {
      await this.app.vault.createFolder(path);
    }
  }

  // Get note metadata
  async getNoteMetadata(file: TFile): Promise<NoteMetadata> {
    const cache = this.app.metadataCache.getFileCache(file);
    const frontmatter = cache?.frontmatter || {};
    const tags = cache?.tags?.map(t => t.tag) || [];

    // Also include tags from frontmatter
    if (frontmatter.tags) {
      if (Array.isArray(frontmatter.tags)) {
        tags.push(...frontmatter.tags.map((t: string) => `#${t}`));
      } else if (typeof frontmatter.tags === 'string') {
        tags.push(`#${frontmatter.tags}`);
      }
    }

    return {
      path: file.path,
      name: file.name,
      basename: file.basename,
      extension: file.extension,
      created: file.stat.ctime,
      modified: file.stat.mtime,
      size: file.stat.size,
      tags: [...new Set(tags)],
      frontmatter
    };
  }

  // Search notes by content
  async searchNotes(query: string): Promise<SearchResult[]> {
    const results: SearchResult[] = [];
    const files = this.getAllNotes();
    const queryLower = query.toLowerCase();

    for (const file of files) {
      const content = await this.readNote(file);
      const contentLower = content.toLowerCase();

      if (contentLower.includes(queryLower)) {
        // Find matching lines
        const lines = content.split('\n');
        const matches = lines.filter(line =>
          line.toLowerCase().includes(queryLower)
        ).slice(0, 3);

        // Simple scoring based on frequency
        const occurrences = (contentLower.match(new RegExp(queryLower, 'g')) || []).length;
        const score = occurrences / content.length * 1000;

        results.push({ file, matches, score });
      }
    }

    return results.sort((a, b) => b.score - a.score);
  }

  // Get recent notes
  getRecentNotes(count: number = 10): TFile[] {
    return this.getAllNotes()
      .sort((a, b) => b.stat.mtime - a.stat.mtime)
      .slice(0, count);
  }

  // Get notes by tag
  getNotesByTag(tag: string): TFile[] {
    const normalizedTag = tag.startsWith('#') ? tag : `#${tag}`;
    const results: TFile[] = [];

    for (const file of this.getAllNotes()) {
      const cache = this.app.metadataCache.getFileCache(file);
      const tags = cache?.tags?.map(t => t.tag) || [];

      // Also check frontmatter tags
      const frontmatter = cache?.frontmatter;
      if (frontmatter?.tags) {
        if (Array.isArray(frontmatter.tags)) {
          tags.push(...frontmatter.tags.map((t: string) => `#${t}`));
        } else if (typeof frontmatter.tags === 'string') {
          tags.push(`#${frontmatter.tags}`);
        }
      }

      if (tags.includes(normalizedTag)) {
        results.push(file);
      }
    }

    return results;
  }

  // Get backlinks for a note
  getBacklinks(file: TFile): TFile[] {
    const backlinks: TFile[] = [];
    const resolvedLinks = this.app.metadataCache.resolvedLinks;

    for (const [sourcePath, links] of Object.entries(resolvedLinks)) {
      if (links[file.path]) {
        const sourceFile = this.app.vault.getAbstractFileByPath(sourcePath);
        if (sourceFile instanceof TFile) {
          backlinks.push(sourceFile);
        }
      }
    }

    return backlinks;
  }

  // Get outgoing links from a note
  getOutgoingLinks(file: TFile): TFile[] {
    const links: TFile[] = [];
    const resolvedLinks = this.app.metadataCache.resolvedLinks[file.path];

    if (resolvedLinks) {
      for (const targetPath of Object.keys(resolvedLinks)) {
        const targetFile = this.app.vault.getAbstractFileByPath(targetPath);
        if (targetFile instanceof TFile) {
          links.push(targetFile);
        }
      }
    }

    return links;
  }

  // Create a daily note
  async createDailyNote(): Promise<TFile> {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    const path = `0-Inbox/${dateStr}.md`;

    const existing = this.app.vault.getAbstractFileByPath(path);
    if (existing instanceof TFile) {
      return existing;
    }

    const content = `# ${dateStr}

## Tasks
- [ ]

## Notes


## Journal


---
Created by Jarvis at ${today.toLocaleTimeString()}
`;

    return this.createNote(path, content);
  }

  // Quick capture to inbox
  async quickCapture(content: string, tags: string[] = []): Promise<TFile> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const path = `0-Inbox/capture-${timestamp}.md`;

    const tagString = tags.length > 0 ? `\ntags: [${tags.join(', ')}]` : '';

    const noteContent = `---
created: ${new Date().toISOString()}${tagString}
---

${content}
`;

    return this.createNote(path, noteContent);
  }

  // Get all tags in vault
  getAllTags(): string[] {
    const tags = new Set<string>();

    for (const file of this.getAllNotes()) {
      const cache = this.app.metadataCache.getFileCache(file);

      cache?.tags?.forEach(t => tags.add(t.tag));

      const frontmatter = cache?.frontmatter;
      if (frontmatter?.tags) {
        if (Array.isArray(frontmatter.tags)) {
          frontmatter.tags.forEach((t: string) => tags.add(`#${t}`));
        } else if (typeof frontmatter.tags === 'string') {
          tags.add(`#${frontmatter.tags}`);
        }
      }
    }

    return [...tags].sort();
  }

  // Get vault statistics
  getVaultStats(): { totalNotes: number; totalTags: number; totalLinks: number } {
    const notes = this.getAllNotes();
    const tags = this.getAllTags();

    let totalLinks = 0;
    const resolvedLinks = this.app.metadataCache.resolvedLinks;
    for (const links of Object.values(resolvedLinks)) {
      totalLinks += Object.keys(links).length;
    }

    return {
      totalNotes: notes.length,
      totalTags: tags.length,
      totalLinks
    };
  }
}
