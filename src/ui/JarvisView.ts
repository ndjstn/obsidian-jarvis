import { ItemView, WorkspaceLeaf, setIcon, MarkdownRenderer, Notice } from 'obsidian';
import type JarvisPlugin from '../main';
import type { ChatMessage } from '../services/OllamaService';

export const JARVIS_VIEW_TYPE = 'jarvis-view';

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Helper to copy text to clipboard with visual feedback
async function copyToClipboard(text: string, button: HTMLElement): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
    const originalIcon = button.innerHTML;
    button.innerHTML = '';
    setIcon(button, 'check');
    button.addClass('jarvis-copy-success');
    new Notice('Copied to clipboard!');
    setTimeout(() => {
      button.innerHTML = '';
      setIcon(button, 'copy');
      button.removeClass('jarvis-copy-success');
    }, 1500);
  } catch {
    new Notice('Failed to copy');
  }
}

export class JarvisView extends ItemView {
  private plugin: JarvisPlugin;
  private chatContainer: HTMLElement;
  private inputContainer: HTMLElement;
  private inputField: HTMLTextAreaElement;
  private sendButton: HTMLButtonElement;
  private conversation: ConversationMessage[] = [];
  private isProcessing = false;
  private modeSelect: HTMLSelectElement;
  private autocompleteContainer: HTMLElement | null = null;

  constructor(leaf: WorkspaceLeaf, plugin: JarvisPlugin) {
    super(leaf);
    this.plugin = plugin;
  }

  getViewType(): string {
    return JARVIS_VIEW_TYPE;
  }

  getDisplayText(): string {
    return 'Jarvis AI';
  }

  getIcon(): string {
    return 'bot';
  }

  async onOpen(): Promise<void> {
    const container = this.containerEl.children[1];
    container.empty();
    container.addClass('jarvis-container');

    // Header
    const header = container.createDiv({ cls: 'jarvis-header' });
    header.createEl('h4', { text: 'Jarvis AI Assistant' });

    // Mode selector
    const modeContainer = header.createDiv({ cls: 'jarvis-mode-container' });
    this.modeSelect = modeContainer.createEl('select', { cls: 'jarvis-mode-select' });
    this.modeSelect.createEl('option', { value: 'chat', text: 'Chat' });
    this.modeSelect.createEl('option', { value: 'research', text: 'Research' });
    this.modeSelect.createEl('option', { value: 'plan', text: 'Plan' });
    this.modeSelect.createEl('option', { value: 'summarize', text: 'Summarize' });
    this.modeSelect.createEl('option', { value: 'task', text: 'Task' });
    this.modeSelect.createEl('option', { value: 'vision', text: 'Vision' });
    this.modeSelect.createEl('option', { value: 'pageassist', text: 'Page Assist' });
    this.modeSelect.createEl('option', { value: 'rag', text: 'RAG Search' });

    // Action buttons
    const actionBar = container.createDiv({ cls: 'jarvis-action-bar' });

    const clearBtn = actionBar.createEl('button', { cls: 'jarvis-action-btn', text: 'Clear' });
    clearBtn.addEventListener('click', () => this.clearConversation());

    const contextBtn = actionBar.createEl('button', { cls: 'jarvis-action-btn', text: 'Add Context' });
    contextBtn.addEventListener('click', () => this.addCurrentNoteContext());

    const exportBtn = actionBar.createEl('button', { cls: 'jarvis-action-btn', text: 'Export' });
    exportBtn.addEventListener('click', () => this.exportConversation());

    // Chat container
    this.chatContainer = container.createDiv({ cls: 'jarvis-chat-container' });

    // Welcome message
    this.addSystemMessage('Hello! I\'m Jarvis, your PKM AI assistant. How can I help you today?\n\n**Quick Commands (type `/` for autocomplete):**\n- `/summarize` - Summarize current note\n- `/plan` - Break down a goal\n- `/similar` - Find related notes\n- `/link` - Suggest links\n- `/tag` - Suggest tags\n- `/research` - Web search\n- `/help` - Show all commands\n\n**Modes:** Chat • Research • Plan • RAG Search • Page Assist');

    // Input area
    this.inputContainer = container.createDiv({ cls: 'jarvis-input-container' });

    this.inputField = this.inputContainer.createEl('textarea', {
      cls: 'jarvis-input-field',
      attr: { placeholder: 'Ask Jarvis anything...', rows: '3' }
    });

    this.inputField.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.hideAutocomplete();
        this.sendMessage();
      } else if (e.key === 'Escape') {
        this.hideAutocomplete();
      } else if (e.key === 'Tab' && this.autocompleteContainer?.style.display !== 'none') {
        e.preventDefault();
        this.selectFirstSuggestion();
      }
    });

    // Slash command autocomplete
    this.inputField.addEventListener('input', () => {
      this.handleAutocomplete();
    });

    const buttonContainer = this.inputContainer.createDiv({ cls: 'jarvis-button-container' });

    // Image upload button
    const imageBtn = buttonContainer.createEl('button', { cls: 'jarvis-image-btn' });
    setIcon(imageBtn, 'image');
    imageBtn.addEventListener('click', () => this.uploadImage());

    // Send button
    this.sendButton = buttonContainer.createEl('button', { cls: 'jarvis-send-btn', text: 'Send' });
    this.sendButton.addEventListener('click', () => this.sendMessage());

    // Add styles
    this.addStyles();
  }

  private addStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      .jarvis-container {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 10px;
      }

      .jarvis-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid var(--background-modifier-border);
      }

      .jarvis-header h4 {
        margin: 0;
      }

      .jarvis-mode-select {
        padding: 4px 8px;
        border-radius: 4px;
        background: var(--background-secondary);
        border: 1px solid var(--background-modifier-border);
      }

      .jarvis-action-bar {
        display: flex;
        gap: 8px;
        margin-bottom: 10px;
      }

      .jarvis-action-btn {
        padding: 4px 8px;
        font-size: 12px;
        border-radius: 4px;
        background: var(--background-secondary);
        border: 1px solid var(--background-modifier-border);
        cursor: pointer;
      }

      .jarvis-action-btn:hover {
        background: var(--background-modifier-hover);
      }

      .jarvis-chat-container {
        flex: 1;
        overflow-y: auto;
        padding: 10px;
        background: var(--background-primary);
        border-radius: 8px;
        margin-bottom: 10px;
      }

      .jarvis-message {
        margin-bottom: 12px;
        padding: 10px;
        border-radius: 8px;
        max-width: 90%;
      }

      .jarvis-message-user {
        background: var(--interactive-accent);
        color: var(--text-on-accent);
        margin-left: auto;
      }

      .jarvis-message-assistant {
        background: var(--background-secondary);
      }

      .jarvis-message-system {
        background: var(--background-modifier-border);
        font-style: italic;
        text-align: center;
        max-width: 100%;
      }

      .jarvis-message-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 6px;
      }

      .jarvis-message-role {
        font-weight: 600;
        font-size: 12px;
        text-transform: uppercase;
        opacity: 0.8;
      }

      .jarvis-copy-btn {
        padding: 4px;
        background: transparent;
        border: none;
        cursor: pointer;
        opacity: 0.5;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
      }

      .jarvis-copy-btn:hover {
        opacity: 1;
        background: var(--background-modifier-hover);
      }

      .jarvis-copy-btn.jarvis-copy-success {
        color: var(--color-green);
        opacity: 1;
      }

      .jarvis-message-content {
        line-height: 1.5;
      }

      .jarvis-message-time {
        font-size: 10px;
        opacity: 0.7;
        margin-top: 4px;
      }

      .jarvis-input-container {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .jarvis-input-field {
        width: 100%;
        padding: 10px;
        border-radius: 8px;
        border: 1px solid var(--background-modifier-border);
        background: var(--background-primary);
        resize: vertical;
        font-family: inherit;
      }

      .jarvis-input-field:focus {
        outline: none;
        border-color: var(--interactive-accent);
      }

      .jarvis-button-container {
        display: flex;
        gap: 8px;
        justify-content: flex-end;
      }

      .jarvis-send-btn {
        padding: 8px 16px;
        border-radius: 4px;
        background: var(--interactive-accent);
        color: var(--text-on-accent);
        border: none;
        cursor: pointer;
        font-weight: 500;
      }

      .jarvis-send-btn:hover {
        opacity: 0.9;
      }

      .jarvis-send-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .jarvis-image-btn {
        padding: 8px;
        border-radius: 4px;
        background: var(--background-secondary);
        border: 1px solid var(--background-modifier-border);
        cursor: pointer;
      }

      .jarvis-loading {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .jarvis-loading::after {
        content: '';
        width: 12px;
        height: 12px;
        border: 2px solid var(--text-muted);
        border-top-color: transparent;
        border-radius: 50%;
        animation: jarvis-spin 1s linear infinite;
      }

      @keyframes jarvis-spin {
        to { transform: rotate(360deg); }
      }

      .jarvis-autocomplete {
        position: absolute;
        bottom: 100%;
        left: 0;
        right: 0;
        background: var(--background-secondary);
        border: 1px solid var(--background-modifier-border);
        border-radius: 6px;
        margin-bottom: 4px;
        max-height: 200px;
        overflow-y: auto;
        z-index: 100;
        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
      }

      .jarvis-autocomplete-item {
        padding: 8px 12px;
        cursor: pointer;
        font-family: var(--font-monospace);
        font-size: 13px;
        border-bottom: 1px solid var(--background-modifier-border);
      }

      .jarvis-autocomplete-item:last-child {
        border-bottom: none;
      }

      .jarvis-autocomplete-item:hover {
        background: var(--background-modifier-hover);
      }

      .jarvis-input-container {
        position: relative;
      }
    `;
    document.head.appendChild(style);
  }

  private addSystemMessage(content: string): void {
    const msgEl = this.chatContainer.createDiv({ cls: 'jarvis-message jarvis-message-system' });
    MarkdownRenderer.renderMarkdown(content, msgEl, '', this.plugin);
  }

  private addMessage(role: 'user' | 'assistant', content: string): void {
    const msg: ConversationMessage = {
      role,
      content,
      timestamp: new Date()
    };
    this.conversation.push(msg);

    const msgEl = this.chatContainer.createDiv({
      cls: `jarvis-message jarvis-message-${role}`
    });

    // Message header with copy button
    const headerEl = msgEl.createDiv({ cls: 'jarvis-message-header' });

    const roleLabel = headerEl.createSpan({ cls: 'jarvis-message-role' });
    roleLabel.setText(role === 'user' ? 'You' : 'Jarvis');

    const copyBtn = headerEl.createEl('button', { cls: 'jarvis-copy-btn' });
    setIcon(copyBtn, 'copy');
    copyBtn.setAttribute('aria-label', 'Copy message');
    copyBtn.addEventListener('click', () => copyToClipboard(content, copyBtn));

    // Message content
    const contentEl = msgEl.createDiv({ cls: 'jarvis-message-content' });
    if (role === 'assistant') {
      MarkdownRenderer.renderMarkdown(content, contentEl, '', this.plugin);
    } else {
      contentEl.createDiv({ text: content });
    }

    const timeEl = msgEl.createDiv({ cls: 'jarvis-message-time' });
    timeEl.setText(msg.timestamp.toLocaleTimeString());

    this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
  }

  private createLoadingMessage(): HTMLElement {
    const loadingEl = this.chatContainer.createDiv({
      cls: 'jarvis-message jarvis-message-assistant jarvis-loading'
    });
    loadingEl.setText('Thinking...');
    this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
    return loadingEl;
  }

  private async sendMessage(): Promise<void> {
    const content = this.inputField.value.trim();
    if (!content || this.isProcessing) return;

    this.isProcessing = true;
    this.sendButton.disabled = true;
    this.inputField.value = '';

    // Check for slash commands first
    if (this.plugin.slashCommands?.isSlashCommand(content)) {
      this.addMessage('user', content);
      const loadingEl = this.createLoadingMessage();

      try {
        const result = await this.plugin.slashCommands.execute(content);
        loadingEl.remove();
        this.addMessage('assistant', result.content);
      } catch (error) {
        loadingEl.remove();
        this.addMessage('assistant', `❌ Command error: ${error.message}`);
        console.error('Slash command error:', error);
      } finally {
        this.isProcessing = false;
        this.sendButton.disabled = false;
        this.inputField.focus();
      }
      return;
    }

    this.addMessage('user', content);
    const loadingEl = this.createLoadingMessage();

    try {
      const mode = this.modeSelect.value;
      let response: string;

      switch (mode) {
        case 'research':
          response = await this.handleResearch(content);
          break;
        case 'plan':
          response = await this.plugin.ollama.decomposePlan(content);
          break;
        case 'summarize':
          response = await this.plugin.ollama.summarize(content, 'bullets');
          break;
        case 'task':
          const taskCmd = await this.plugin.ollama.generateTaskWarriorCommand(content);
          response = `**TaskWarrior Command:**\n\`\`\`\n${taskCmd}\n\`\`\`\n\nCopy and run this command to create the task.`;
          break;
        case 'pageassist':
          response = await this.handlePageAssist(content);
          break;
        case 'rag':
          response = await this.handleRAGSearch(content);
          break;
        default:
          const messages: ChatMessage[] = this.buildConversationHistory();
          messages.push({ role: 'user', content });
          response = await this.plugin.ollama.chat(messages);
      }

      loadingEl.remove();
      this.addMessage('assistant', response);
    } catch (error) {
      loadingEl.remove();
      this.addMessage('assistant', `Error: ${error.message}`);
      console.error('Jarvis error:', error);
    } finally {
      this.isProcessing = false;
      this.sendButton.disabled = false;
      this.inputField.focus();
    }
  }

  private buildConversationHistory(): ChatMessage[] {
    const systemPrompt = `You are Jarvis, an AI assistant integrated into Obsidian. You help with:
- Answering questions about notes and knowledge
- Planning and task management
- Summarizing content
- Suggesting connections between ideas
- General knowledge assistance

Be concise, helpful, and format responses with Markdown when appropriate.`;

    const messages: ChatMessage[] = [
      { role: 'system', content: systemPrompt }
    ];

    // Include last 10 messages for context
    const recentMessages = this.conversation.slice(-10);
    for (const msg of recentMessages) {
      messages.push({
        role: msg.role,
        content: msg.content
      });
    }

    return messages;
  }

  private async addCurrentNoteContext(): Promise<void> {
    const content = await this.plugin.vault.getActiveNoteContent();
    if (content) {
      const truncated = content.length > 2000 ? content.substring(0, 2000) + '...' : content;
      this.inputField.value = `Context from current note:\n\n${truncated}\n\nQuestion: `;
      this.inputField.focus();
    } else {
      this.addSystemMessage('No active note to add as context.');
    }
  }

  private async uploadImage(): Promise<void> {
    if (!this.plugin.settings.enableVision) {
      this.addSystemMessage('Vision mode is disabled in settings.');
      return;
    }

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = (reader.result as string).split(',')[1];

        this.isProcessing = true;
        this.sendButton.disabled = true;

        this.addMessage('user', `[Uploaded image: ${file.name}]`);
        const loadingEl = this.createLoadingMessage();

        try {
          const prompt = this.inputField.value.trim() || 'Describe this image in detail.';
          this.inputField.value = '';

          const response = await this.plugin.ollama.analyzeImage(base64, prompt);
          loadingEl.remove();
          this.addMessage('assistant', response);
        } catch (error) {
          loadingEl.remove();
          this.addMessage('assistant', `Vision error: ${error.message}`);
        } finally {
          this.isProcessing = false;
          this.sendButton.disabled = false;
        }
      };
      reader.readAsDataURL(file);
    };

    input.click();
  }

  private async handleResearch(content: string): Promise<string> {
    if (!this.plugin.webResearch) {
      return '❌ Web Research service not initialized. Please restart the plugin.';
    }

    const lowerContent = content.toLowerCase();

    // Check for fact-check mode
    if (lowerContent.startsWith('fact check') || lowerContent.startsWith('verify')) {
      const claim = content.replace(/^(fact check|verify)\s*/i, '').trim();
      try {
        return await this.plugin.webResearch.factCheck(claim);
      } catch (error) {
        return `❌ Fact check failed: ${error.message}`;
      }
    }

    // Regular research
    try {
      const result = await this.plugin.webResearch.research(content, 'thorough');

      let response = `## Research: ${content}\n\n`;
      response += result.summary;

      if (result.sources.length > 0) {
        response += '\n\n---\n\n### Sources\n';
        for (const source of result.sources) {
          response += `- [${source.title}](${source.url})\n`;
        }
      }

      if (result.relatedQueries.length > 0) {
        response += '\n### Related Topics\n';
        for (const query of result.relatedQueries) {
          response += `- ${query}\n`;
        }
      }

      return response;
    } catch (error) {
      return `❌ Research failed: ${error.message}\n\nTry:\n- Check if SearXNG is running at localhost:8888\n- Or use a simpler query`;
    }
  }

  private async handlePageAssist(content: string): Promise<string> {
    // Parse URL and question from content
    const urlMatch = content.match(/(https?:\/\/[^\s]+)/);

    if (!urlMatch) {
      return '**Page Assist Usage:**\n\nPlease include a URL in your message. Examples:\n- `https://example.com What is this about?`\n- `summarize https://article.com`\n- `https://docs.com What does it say about X?`';
    }

    const url = urlMatch[1];
    const question = content.replace(url, '').trim();

    if (!this.plugin.pageAssist) {
      return '❌ Page Assist service not initialized. Please restart the plugin.';
    }

    try {
      if (!question || question.toLowerCase().includes('summarize')) {
        const summary = await this.plugin.pageAssist.summarizePage(url, 'bullets');
        return `## Page Summary\n\n**URL:** ${url}\n\n${summary}`;
      } else {
        const answer = await this.plugin.pageAssist.askAboutPage(url, question);
        return `## Answer\n\n**URL:** ${url}\n**Question:** ${question}\n\n${answer}`;
      }
    } catch (error) {
      return `❌ Failed to analyze page: ${error.message}`;
    }
  }

  private async handleRAGSearch(content: string): Promise<string> {
    if (!this.plugin.embedding) {
      return '❌ RAG service not initialized. Please restart the plugin.';
    }

    // Check for special commands
    const lowerContent = content.toLowerCase();

    if (lowerContent.includes('index') || lowerContent.includes('reindex')) {
      this.addSystemMessage('🔄 Indexing vault... This may take a while.');
      try {
        const count = await this.plugin.embedding.indexVault((current, total) => {
          // Progress updates could be shown here
        });
        return `✅ Indexed ${count} notes successfully!\n\nYou can now search your vault semantically.`;
      } catch (error) {
        return `❌ Indexing failed: ${error.message}`;
      }
    }

    if (lowerContent === 'stats' || lowerContent === 'status') {
      const stats = this.plugin.embedding.getIndexStats();
      if (stats.totalDocuments === 0) {
        return '📊 **RAG Index Status**\n\nNo notes indexed yet.\n\nType `index` to build the index.';
      }
      return `📊 **RAG Index Statistics**\n\n- **Indexed notes:** ${stats.totalDocuments}\n- **Embedding dimensions:** ${stats.averageEmbeddingSize.toFixed(0)}\n\nType \`index\` to refresh the index.`;
    }

    // Perform semantic search
    try {
      const results = await this.plugin.embedding.search(content, 5, 0.3);

      if (results.length === 0) {
        return '❌ No relevant notes found.\n\nTry different keywords or type `index` to rebuild the index.';
      }

      let response = `## Search Results for "${content}"\n\n`;

      for (const result of results) {
        const scorePercent = Math.round(result.score * 100);
        response += `### [[${result.document.metadata.title}]] (${scorePercent}%)\n`;
        response += `> ${result.snippet}\n\n`;
      }

      // Get AI-enhanced answer
      const context = await this.plugin.embedding.getContextForQuery(content, 2000);
      if (context) {
        response += '---\n\n## AI Answer\n\n';
        const aiResponse = await this.plugin.ollama.chat([
          { role: 'system', content: 'Answer the question based on the provided notes. Be concise and reference notes using [[Note Name]] format.' },
          { role: 'user', content: `${context}\n\nQuestion: ${content}` }
        ]);
        response += aiResponse;
      }

      return response;
    } catch (error) {
      return `❌ Search failed: ${error.message}`;
    }
  }

  private clearConversation(): void {
    this.conversation = [];
    this.chatContainer.empty();
    this.addSystemMessage('Conversation cleared. How can I help you?');
  }

  private async exportConversation(): Promise<void> {
    if (this.conversation.length === 0) {
      this.addSystemMessage('No conversation to export.');
      return;
    }

    const timestamp = new Date().toISOString().split('T')[0];
    let content = `# Jarvis Conversation - ${timestamp}\n\n`;

    for (const msg of this.conversation) {
      const time = msg.timestamp.toLocaleTimeString();
      content += `## ${msg.role === 'user' ? 'You' : 'Jarvis'} (${time})\n\n${msg.content}\n\n---\n\n`;
    }

    const path = `0-Inbox/jarvis-conversation-${timestamp}.md`;
    await this.plugin.vault.createNote(path, content);
    this.addSystemMessage(`Conversation exported to: ${path}`);
  }

  private handleAutocomplete(): void {
    const content = this.inputField.value;

    // Only show autocomplete when typing a slash command at the start
    if (!content.startsWith('/') || content.includes(' ')) {
      this.hideAutocomplete();
      return;
    }

    const partial = content.substring(1); // Remove leading /
    if (!this.plugin.slashCommands) {
      this.hideAutocomplete();
      return;
    }

    const suggestions = this.plugin.slashCommands.getSuggestions(partial);

    if (suggestions.length === 0) {
      this.hideAutocomplete();
      return;
    }

    this.showAutocomplete(suggestions);
  }

  private showAutocomplete(suggestions: string[]): void {
    if (!this.autocompleteContainer) {
      this.autocompleteContainer = this.inputContainer.createDiv({ cls: 'jarvis-autocomplete' });
    }

    this.autocompleteContainer.empty();
    this.autocompleteContainer.style.display = 'block';

    for (const suggestion of suggestions) {
      const item = this.autocompleteContainer.createDiv({ cls: 'jarvis-autocomplete-item' });
      item.setText(`/${suggestion}`);
      item.addEventListener('click', () => {
        this.inputField.value = `/${suggestion} `;
        this.inputField.focus();
        this.hideAutocomplete();
      });
    }
  }

  private hideAutocomplete(): void {
    if (this.autocompleteContainer) {
      this.autocompleteContainer.style.display = 'none';
    }
  }

  private selectFirstSuggestion(): void {
    if (!this.autocompleteContainer) return;
    const firstItem = this.autocompleteContainer.querySelector('.jarvis-autocomplete-item') as HTMLElement;
    if (firstItem) {
      firstItem.click();
    }
  }

  async onClose(): Promise<void> {
    // Cleanup if needed
  }
}
