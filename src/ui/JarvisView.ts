import { ItemView, WorkspaceLeaf, setIcon, MarkdownRenderer } from 'obsidian';
import type JarvisPlugin from '../main';
import type { ChatMessage } from '../services/OllamaService';

export const JARVIS_VIEW_TYPE = 'jarvis-view';

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
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
    this.modeSelect.createEl('option', { value: 'plan', text: 'Plan' });
    this.modeSelect.createEl('option', { value: 'summarize', text: 'Summarize' });
    this.modeSelect.createEl('option', { value: 'task', text: 'Task' });
    this.modeSelect.createEl('option', { value: 'vision', text: 'Vision' });

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
    this.addSystemMessage('Hello! I\'m Jarvis, your AI assistant. How can I help you today?\n\n**Modes:**\n- **Chat**: General conversation\n- **Plan**: Break down goals into tasks\n- **Summarize**: Summarize notes or text\n- **Task**: Create TaskWarrior tasks\n- **Vision**: Analyze images');

    // Input area
    this.inputContainer = container.createDiv({ cls: 'jarvis-input-container' });

    this.inputField = this.inputContainer.createEl('textarea', {
      cls: 'jarvis-input-field',
      attr: { placeholder: 'Ask Jarvis anything...', rows: '3' }
    });

    this.inputField.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
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

    if (role === 'assistant') {
      MarkdownRenderer.renderMarkdown(content, msgEl, '', this.plugin);
    } else {
      msgEl.createDiv({ text: content });
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

    this.addMessage('user', content);
    const loadingEl = this.createLoadingMessage();

    try {
      const mode = this.modeSelect.value;
      let response: string;

      switch (mode) {
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

  async onClose(): Promise<void> {
    // Cleanup if needed
  }
}
