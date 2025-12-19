import { App, Plugin, PluginSettingTab, Setting, WorkspaceLeaf, Notice, MarkdownView, Modal, TFile } from 'obsidian';
import { JarvisView, JARVIS_VIEW_TYPE } from './ui/JarvisView';
import { OllamaService } from './services/OllamaService';
import { VaultService } from './services/VaultService';
import { EmbeddingService } from './services/EmbeddingService';
import { PageAssistService } from './services/PageAssistService';
import { WebResearchService } from './services/WebResearchService';
import { SlashCommandService } from './services/SlashCommandService';
import { ContextMenuService } from './services/ContextMenuService';
import { KnowledgeGraphService } from './services/KnowledgeGraphService';
import { getErrorService, ErrorHandlingService } from './services/ErrorHandlingService';
import { AgentOrchestrator } from './services/AgentOrchestrator';
import { WritingCopilotService } from './services/WritingCopilotService';
import { MemoryService } from './services/MemoryService';
import { ReviewAssistantService } from './services/ReviewAssistantService';

interface JarvisSettings {
  ollamaEndpoint: string;
  textModel: string;
  visionModel: string;
  embeddingModel: string;
  enablePlanning: boolean;
  enableVision: boolean;
  enableTaskWarrior: boolean;
  showStatusBar: boolean;
  temperature: number;
}

const DEFAULT_SETTINGS: JarvisSettings = {
  ollamaEndpoint: 'http://localhost:11434',
  textModel: 'granite3.1-dense:2b',
  visionModel: 'granite3.2-vision:2b',
  embeddingModel: 'granite-embedding:278m',
  enablePlanning: true,
  enableVision: true,
  enableTaskWarrior: true,
  showStatusBar: true,
  temperature: 0.7
};

export default class JarvisPlugin extends Plugin {
  settings: JarvisSettings;
  ollama: OllamaService;
  vault: VaultService;
  embedding: EmbeddingService;
  pageAssist: PageAssistService;
  webResearch: WebResearchService;
  slashCommands: SlashCommandService;
  contextMenu: ContextMenuService;
  knowledgeGraph: KnowledgeGraphService;
  errorService: ErrorHandlingService;
  agentOrchestrator: AgentOrchestrator;
  writingCopilot: WritingCopilotService;
  memory: MemoryService;
  reviewAssistant: ReviewAssistantService;
  statusBarItem: HTMLElement;

  async onload() {
    await this.loadSettings();

    // Initialize core services
    this.errorService = getErrorService();
    this.ollama = new OllamaService(this.settings);
    this.vault = new VaultService(this.app);
    this.embedding = new EmbeddingService(this.ollama, this.vault, this.app);
    this.pageAssist = new PageAssistService(this.ollama);
    this.webResearch = new WebResearchService(this.ollama);
    this.slashCommands = new SlashCommandService(this);
    this.contextMenu = new ContextMenuService(this);
    this.knowledgeGraph = new KnowledgeGraphService(this);

    // Initialize advanced AI services
    this.agentOrchestrator = new AgentOrchestrator(this);
    this.writingCopilot = new WritingCopilotService(this);
    this.memory = new MemoryService(this);
    this.reviewAssistant = new ReviewAssistantService(this);

    // Initialize memory service
    this.memory.initialize().catch(err => {
      console.error('Failed to initialize memory:', err);
    });

    // Register error callback for notifications
    this.errorService.onError((error) => {
      if (error.severity === 'critical' || error.severity === 'high') {
        this.errorService.notifyError(error);
      }
    });

    // Initialize embedding index
    this.embedding.initialize().catch(err => {
      console.error('Failed to initialize embedding index:', err);
    });

    // Register the Jarvis view
    this.registerView(
      JARVIS_VIEW_TYPE,
      (leaf) => new JarvisView(leaf, this)
    );

    // Add ribbon icon
    this.addRibbonIcon('bot', 'Jarvis AI Assistant', () => {
      this.activateView();
    });

    // Add commands
    this.addCommand({
      id: 'open-jarvis',
      name: 'Open Jarvis',
      hotkeys: [{ modifiers: ['Ctrl', 'Shift'], key: 'j' }],
      callback: () => this.activateView()
    });

    this.addCommand({
      id: 'jarvis-ask',
      name: 'Quick Ask',
      hotkeys: [{ modifiers: ['Ctrl', 'Shift'], key: 'a' }],
      callback: () => this.quickAsk()
    });

    this.addCommand({
      id: 'jarvis-summarize',
      name: 'Summarize Current Note',
      callback: () => this.summarizeCurrentNote()
    });

    this.addCommand({
      id: 'jarvis-plan',
      name: 'Create Plan',
      hotkeys: [{ modifiers: ['Ctrl', 'Shift'], key: 'p' }],
      callback: () => this.createPlan()
    });

    this.addCommand({
      id: 'jarvis-task',
      name: 'Create Task',
      hotkeys: [{ modifiers: ['Ctrl', 'Shift'], key: 't' }],
      callback: () => this.createTask()
    });

    this.addCommand({
      id: 'jarvis-rag-search',
      name: 'RAG Search',
      hotkeys: [{ modifiers: ['Ctrl', 'Shift'], key: 's' }],
      callback: () => this.ragSearch()
    });

    this.addCommand({
      id: 'jarvis-index-vault',
      name: 'Index Vault for RAG',
      callback: () => this.indexVault()
    });

    this.addCommand({
      id: 'jarvis-clip-page',
      name: 'Clip Web Page to Note',
      callback: () => this.clipPageToNote()
    });

    this.addCommand({
      id: 'jarvis-daily-briefing',
      name: 'Generate Daily Briefing',
      callback: () => this.generateDailyBriefing()
    });

    this.addCommand({
      id: 'jarvis-continue-writing',
      name: 'Continue Writing',
      hotkeys: [{ modifiers: ['Ctrl', 'Shift'], key: 'c' }],
      callback: () => this.continueWriting()
    });

    this.addCommand({
      id: 'jarvis-proofread',
      name: 'Proofread Selection',
      callback: () => this.proofreadSelection()
    });

    this.addCommand({
      id: 'jarvis-rewrite-formal',
      name: 'Rewrite Selection (Formal)',
      callback: () => this.rewriteSelection('formal')
    });

    this.addCommand({
      id: 'jarvis-rewrite-casual',
      name: 'Rewrite Selection (Casual)',
      callback: () => this.rewriteSelection('casual')
    });

    this.addCommand({
      id: 'jarvis-reasoning',
      name: 'Deep Reasoning Query',
      callback: () => this.deepReasoningQuery()
    });

    this.addCommand({
      id: 'jarvis-daily-review',
      name: 'Generate Daily Review',
      callback: () => this.generateDailyReview()
    });

    this.addCommand({
      id: 'jarvis-weekly-review',
      name: 'Generate Weekly Review',
      callback: () => this.generateWeeklyReview()
    });

    this.addCommand({
      id: 'jarvis-memory-stats',
      name: 'Show Memory Stats',
      callback: () => this.showMemoryStats()
    });

    this.addCommand({
      id: 'jarvis-suggest-focus',
      name: 'Suggest Daily Focus',
      callback: () => this.suggestDailyFocus()
    });

    // Add settings tab
    this.addSettingTab(new JarvisSettingTab(this.app, this));

    // Add status bar item
    if (this.settings.showStatusBar) {
      this.statusBarItem = this.addStatusBarItem();
      this.updateStatusBar('Ready');
    }

    // Check Ollama connection on startup
    this.checkOllamaConnection();

    console.log('Jarvis AI Assistant loaded');
  }

  onunload() {
    console.log('Jarvis AI Assistant unloaded');
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
    // Reinitialize services with new settings
    this.ollama = new OllamaService(this.settings);
    this.embedding = new EmbeddingService(this.ollama, this.vault, this.app);
    this.pageAssist = new PageAssistService(this.ollama);
    this.webResearch = new WebResearchService(this.ollama);
    this.slashCommands = new SlashCommandService(this);
    this.agentOrchestrator = new AgentOrchestrator(this);
    this.writingCopilot = new WritingCopilotService(this);
    this.memory = new MemoryService(this);
    this.reviewAssistant = new ReviewAssistantService(this);
  }

  async activateView() {
    const { workspace } = this.app;

    let leaf: WorkspaceLeaf | null = null;
    const leaves = workspace.getLeavesOfType(JARVIS_VIEW_TYPE);

    if (leaves.length > 0) {
      leaf = leaves[0];
    } else {
      leaf = workspace.getRightLeaf(false);
      await leaf?.setViewState({ type: JARVIS_VIEW_TYPE, active: true });
    }

    if (leaf) {
      workspace.revealLeaf(leaf);
    }
  }

  async checkOllamaConnection() {
    const connected = await this.ollama.checkConnection();
    if (connected) {
      this.updateStatusBar('Connected');
      new Notice('Jarvis: Connected to Ollama');
    } else {
      this.updateStatusBar('Disconnected');
      new Notice('Jarvis: Cannot connect to Ollama. Please ensure Ollama is running.');
    }
  }

  updateStatusBar(status: string) {
    if (this.statusBarItem) {
      this.statusBarItem.setText(`Jarvis: ${status}`);
    }
  }

  async quickAsk() {
    // Get current selection or note content
    const view = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (!view) {
      new Notice('No active markdown view');
      return;
    }

    const selection = view.editor.getSelection();
    const context = selection || view.editor.getValue().substring(0, 1000);

    // Open Jarvis with context
    await this.activateView();
    // The view will handle the question
  }

  async summarizeCurrentNote() {
    const view = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (!view) {
      new Notice('No active markdown view');
      return;
    }

    const content = view.editor.getValue();
    this.updateStatusBar('Summarizing...');

    try {
      const summary = await this.ollama.chat([
        { role: 'system', content: 'You are a helpful assistant. Summarize the following note in 3-5 bullet points.' },
        { role: 'user', content: content }
      ]);

      new Notice('Summary generated! Check Jarvis panel.');
      await this.activateView();
      // Pass summary to view
    } catch (error) {
      new Notice('Failed to generate summary');
      console.error(error);
    } finally {
      this.updateStatusBar('Ready');
    }
  }

  async createPlan() {
    // Open modal for plan creation
    await this.activateView();
    new Notice('Enter your goal in the Jarvis panel to create a plan');
  }

  async createTask() {
    // Open modal for task creation
    await this.activateView();
    new Notice('Enter your task in the Jarvis panel');
  }

  async ragSearch() {
    // Get current selection for search
    const view = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (view) {
      const selection = view.editor.getSelection();
      if (selection) {
        // Could pre-populate search with selection
      }
    }

    await this.activateView();
    new Notice('Use RAG Search mode to search your vault semantically');
  }

  async indexVault() {
    this.updateStatusBar('Indexing...');
    new Notice('Starting vault indexing... This may take a while.');

    try {
      const count = await this.embedding.indexVault((current, total) => {
        this.updateStatusBar(`Indexing ${current}/${total}`);
      });
      new Notice(`Indexed ${count} notes successfully!`);
      this.updateStatusBar('Ready');
    } catch (error) {
      new Notice(`Indexing failed: ${error.message}`);
      this.updateStatusBar('Index failed');
      console.error('Indexing error:', error);
    }
  }

  async clipPageToNote() {
    // Prompt user for URL
    const url = await this.promptForUrl();
    if (!url) return;

    this.updateStatusBar('Clipping...');
    new Notice('Clipping page...');

    try {
      const noteContent = await this.pageAssist.createNoteFromPage(url);
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const path = `0-Inbox/web-clip-${timestamp}.md`;

      await this.vault.writeFile(path, noteContent);
      new Notice(`Page clipped to ${path}`);
      this.updateStatusBar('Ready');

      // Open the new note
      const file = this.app.vault.getAbstractFileByPath(path);
      if (file && file instanceof TFile) {
        const leaf = this.app.workspace.getLeaf(false);
        await leaf.openFile(file);
      }
    } catch (error) {
      new Notice(`Failed to clip page: ${error.message}`);
      this.updateStatusBar('Clip failed');
      console.error('Clip error:', error);
    }
  }

  async generateDailyBriefing() {
    this.updateStatusBar('Generating briefing...');
    new Notice('Generating daily briefing...');

    try {
      const briefing = await this.agentOrchestrator.generateDailyBriefing();

      // Create a new note with the briefing
      const date = new Date().toISOString().split('T')[0];
      const path = `0-Inbox/Daily-Briefing-${date}.md`;

      await this.vault.writeFile(path, briefing);
      new Notice(`Daily briefing created: ${path}`);
      this.updateStatusBar('Ready');

      // Open the briefing note
      const file = this.app.vault.getAbstractFileByPath(path);
      if (file && file instanceof TFile) {
        const leaf = this.app.workspace.getLeaf(false);
        await leaf.openFile(file);
      }
    } catch (error) {
      new Notice('Failed to generate daily briefing');
      console.error(error);
      this.updateStatusBar('Ready');
    }
  }

  async continueWriting() {
    const view = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (!view) {
      new Notice('No active markdown view');
      return;
    }

    const editor = view.editor;
    const cursor = editor.getCursor();
    const textBefore = editor.getRange({ line: 0, ch: 0 }, cursor);

    if (!textBefore.trim()) {
      new Notice('No text to continue from');
      return;
    }

    this.updateStatusBar('Writing...');

    try {
      const result = await this.writingCopilot.smartContinue(textBefore);

      // Insert the continuation at cursor position
      editor.replaceRange(result.text, cursor);

      new Notice(`Added ${result.metadata?.wordCountAfter} words`);
      this.updateStatusBar('Ready');
    } catch (error) {
      new Notice('Failed to continue writing');
      console.error(error);
      this.updateStatusBar('Ready');
    }
  }

  async proofreadSelection() {
    const view = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (!view) {
      new Notice('No active markdown view');
      return;
    }

    const selection = view.editor.getSelection();
    if (!selection) {
      new Notice('No text selected');
      return;
    }

    this.updateStatusBar('Proofreading...');

    try {
      const result = await this.writingCopilot.proofreadDetailed(selection);

      // Replace selection with corrected text
      view.editor.replaceSelection(result.correctedText);

      // Show summary of changes
      const issueCount = result.issues.length;
      new Notice(`Proofread complete: ${issueCount} issue(s) fixed. Score: ${result.score}/100`);
      this.updateStatusBar('Ready');
    } catch (error) {
      new Notice('Failed to proofread');
      console.error(error);
      this.updateStatusBar('Ready');
    }
  }

  async rewriteSelection(style: 'formal' | 'casual') {
    const view = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (!view) {
      new Notice('No active markdown view');
      return;
    }

    const selection = view.editor.getSelection();
    if (!selection) {
      new Notice('No text selected');
      return;
    }

    this.updateStatusBar(`Rewriting (${style})...`);

    try {
      const result = await this.writingCopilot.performAction('rewrite', { text: selection }, { style });

      view.editor.replaceSelection(result.text);
      new Notice(`Rewritten in ${style} style`);
      this.updateStatusBar('Ready');
    } catch (error) {
      new Notice('Failed to rewrite');
      console.error(error);
      this.updateStatusBar('Ready');
    }
  }

  async deepReasoningQuery() {
    // Open modal for reasoning query
    const query = await this.promptForQuery();
    if (!query) return;

    this.updateStatusBar('Reasoning...');
    new Notice('Processing complex query with reasoning agent...');

    try {
      const result = await this.agentOrchestrator.runReasoningQuery(query);

      // Show result in Jarvis view
      await this.activateView();

      // Create a note with the reasoning result
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const path = `0-Inbox/reasoning-${timestamp}.md`;

      const content = `# Reasoning Query\n\n**Query:** ${query}\n\n---\n\n${result}`;
      await this.vault.writeFile(path, content);

      new Notice('Reasoning complete! Check the new note.');
      this.updateStatusBar('Ready');
    } catch (error) {
      new Notice('Reasoning query failed');
      console.error(error);
      this.updateStatusBar('Ready');
    }
  }

  async generateDailyReview() {
    this.updateStatusBar('Generating review...');
    new Notice('Generating daily review...');

    try {
      const summary = await this.reviewAssistant.generateReviewSummary('daily');
      const date = new Date().toISOString().split('T')[0];
      const path = `0-Inbox/Daily-Review-${date}.md`;

      await this.vault.writeFile(path, summary);
      new Notice(`Daily review created: ${path}`);
      this.updateStatusBar('Ready');

      // Open the review note
      const file = this.app.vault.getAbstractFileByPath(path);
      if (file && file instanceof TFile) {
        const leaf = this.app.workspace.getLeaf(false);
        await leaf.openFile(file);
      }
    } catch (error) {
      new Notice('Failed to generate daily review');
      console.error(error);
      this.updateStatusBar('Ready');
    }
  }

  async generateWeeklyReview() {
    this.updateStatusBar('Generating review...');
    new Notice('Generating weekly review...');

    try {
      const summary = await this.reviewAssistant.generateReviewSummary('weekly');
      const date = new Date().toISOString().split('T')[0];
      const path = `0-Inbox/Weekly-Review-${date}.md`;

      await this.vault.writeFile(path, summary);
      new Notice(`Weekly review created: ${path}`);
      this.updateStatusBar('Ready');

      // Open the review note
      const file = this.app.vault.getAbstractFileByPath(path);
      if (file && file instanceof TFile) {
        const leaf = this.app.workspace.getLeaf(false);
        await leaf.openFile(file);
      }
    } catch (error) {
      new Notice('Failed to generate weekly review');
      console.error(error);
      this.updateStatusBar('Ready');
    }
  }

  async showMemoryStats() {
    try {
      const stats = await this.memory.getStats();

      let message = `Memory Stats:\n`;
      message += `• Total facts: ${stats.totalFacts}\n`;
      message += `• Avg confidence: ${Math.round(stats.avgConfidence * 100)}%\n`;

      for (const [cat, count] of Object.entries(stats.byCategory)) {
        message += `• ${cat}: ${count}\n`;
      }

      new Notice(message, 8000);
    } catch (error) {
      new Notice('Failed to get memory stats');
      console.error(error);
    }
  }

  async suggestDailyFocus() {
    this.updateStatusBar('Analyzing...');
    new Notice('Analyzing your vault for focus suggestion...');

    try {
      const focus = await this.reviewAssistant.suggestTodaysFocus();

      // Show in a notice and also open Jarvis view
      await this.activateView();
      new Notice('Focus suggestion ready! Check Jarvis panel.');
      this.updateStatusBar('Ready');
    } catch (error) {
      new Notice('Failed to suggest focus');
      console.error(error);
      this.updateStatusBar('Ready');
    }
  }

  private async promptForQuery(): Promise<string | null> {
    return new Promise((resolve) => {
      const modal = new QueryInputModal(this.app, (query) => {
        resolve(query);
      });
      modal.open();
    });
  }

  private async promptForUrl(): Promise<string | null> {
    return new Promise((resolve) => {
      const modal = new UrlInputModal(this.app, (url) => {
        resolve(url);
      });
      modal.open();
    });
  }
}

class UrlInputModal extends Modal {
  private onSubmit: (url: string | null) => void;

  constructor(app: App, onSubmit: (url: string | null) => void) {
    super(app);
    this.onSubmit = onSubmit;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.createEl('h2', { text: 'Enter URL to clip' });

    const inputContainer = contentEl.createDiv({ cls: 'jarvis-url-input-container' });
    const input = inputContainer.createEl('input', {
      type: 'text',
      placeholder: 'https://example.com/article',
      cls: 'jarvis-url-input'
    });
    input.style.width = '100%';
    input.style.padding = '8px';
    input.style.marginBottom = '16px';

    const buttonContainer = contentEl.createDiv({ cls: 'jarvis-url-buttons' });
    buttonContainer.style.display = 'flex';
    buttonContainer.style.gap = '8px';
    buttonContainer.style.justifyContent = 'flex-end';

    const cancelBtn = buttonContainer.createEl('button', { text: 'Cancel' });
    cancelBtn.addEventListener('click', () => {
      this.close();
      this.onSubmit(null);
    });

    const submitBtn = buttonContainer.createEl('button', { text: 'Clip', cls: 'mod-cta' });
    submitBtn.addEventListener('click', () => {
      const url = input.value.trim();
      if (url) {
        this.close();
        this.onSubmit(url);
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const url = input.value.trim();
        if (url) {
          this.close();
          this.onSubmit(url);
        }
      }
    });

    input.focus();
  }

  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
}

class QueryInputModal extends Modal {
  private onSubmit: (query: string | null) => void;

  constructor(app: App, onSubmit: (query: string | null) => void) {
    super(app);
    this.onSubmit = onSubmit;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.createEl('h2', { text: 'Deep Reasoning Query' });
    contentEl.createEl('p', {
      text: 'Ask a complex question that requires multi-step reasoning and vault analysis.',
      cls: 'jarvis-query-desc'
    });

    const inputContainer = contentEl.createDiv({ cls: 'jarvis-query-input-container' });
    const textarea = inputContainer.createEl('textarea', {
      placeholder: 'e.g., "What connections exist between my notes on machine learning and my project ideas?"',
      cls: 'jarvis-query-input'
    });
    textarea.style.width = '100%';
    textarea.style.minHeight = '100px';
    textarea.style.padding = '8px';
    textarea.style.marginBottom = '16px';
    textarea.style.resize = 'vertical';

    const buttonContainer = contentEl.createDiv({ cls: 'jarvis-query-buttons' });
    buttonContainer.style.display = 'flex';
    buttonContainer.style.gap = '8px';
    buttonContainer.style.justifyContent = 'flex-end';

    const cancelBtn = buttonContainer.createEl('button', { text: 'Cancel' });
    cancelBtn.addEventListener('click', () => {
      this.close();
      this.onSubmit(null);
    });

    const submitBtn = buttonContainer.createEl('button', { text: 'Analyze', cls: 'mod-cta' });
    submitBtn.addEventListener('click', () => {
      const query = textarea.value.trim();
      if (query) {
        this.close();
        this.onSubmit(query);
      }
    });

    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.ctrlKey) {
        const query = textarea.value.trim();
        if (query) {
          this.close();
          this.onSubmit(query);
        }
      }
    });

    textarea.focus();
  }

  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
}

class JarvisSettingTab extends PluginSettingTab {
  plugin: JarvisPlugin;

  constructor(app: App, plugin: JarvisPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl('h2', { text: 'Jarvis AI Assistant Settings' });

    // Ollama Settings
    containerEl.createEl('h3', { text: 'Ollama Configuration' });

    new Setting(containerEl)
      .setName('Ollama Endpoint')
      .setDesc('The URL of your Ollama server')
      .addText(text => text
        .setPlaceholder('http://localhost:11434')
        .setValue(this.plugin.settings.ollamaEndpoint)
        .onChange(async (value) => {
          this.plugin.settings.ollamaEndpoint = value;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('Text Model')
      .setDesc('The model to use for text generation')
      .addText(text => text
        .setPlaceholder('granite3.1-dense:2b')
        .setValue(this.plugin.settings.textModel)
        .onChange(async (value) => {
          this.plugin.settings.textModel = value;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('Vision Model')
      .setDesc('The model to use for image analysis')
      .addText(text => text
        .setPlaceholder('granite3.2-vision:2b')
        .setValue(this.plugin.settings.visionModel)
        .onChange(async (value) => {
          this.plugin.settings.visionModel = value;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('Temperature')
      .setDesc('Controls randomness (0.0 = deterministic, 1.0 = creative)')
      .addSlider(slider => slider
        .setLimits(0, 1, 0.1)
        .setValue(this.plugin.settings.temperature)
        .setDynamicTooltip()
        .onChange(async (value) => {
          this.plugin.settings.temperature = value;
          await this.plugin.saveSettings();
        }));

    // Feature Toggles
    containerEl.createEl('h3', { text: 'Features' });

    new Setting(containerEl)
      .setName('Enable Planning Agent')
      .setDesc('Allow Jarvis to create and manage task plans')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.enablePlanning)
        .onChange(async (value) => {
          this.plugin.settings.enablePlanning = value;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('Enable Vision')
      .setDesc('Allow Jarvis to analyze images and screenshots')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.enableVision)
        .onChange(async (value) => {
          this.plugin.settings.enableVision = value;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('Enable TaskWarrior Integration')
      .setDesc('Allow Jarvis to create and manage TaskWarrior tasks')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.enableTaskWarrior)
        .onChange(async (value) => {
          this.plugin.settings.enableTaskWarrior = value;
          await this.plugin.saveSettings();
        }));

    // UI Settings
    containerEl.createEl('h3', { text: 'UI' });

    new Setting(containerEl)
      .setName('Show Status Bar')
      .setDesc('Show Jarvis status in the status bar')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.showStatusBar)
        .onChange(async (value) => {
          this.plugin.settings.showStatusBar = value;
          await this.plugin.saveSettings();
        }));

    // Connection Test
    containerEl.createEl('h3', { text: 'Connection' });

    new Setting(containerEl)
      .setName('Test Connection')
      .setDesc('Test the connection to Ollama')
      .addButton(button => button
        .setButtonText('Test')
        .onClick(async () => {
          button.setButtonText('Testing...');
          await this.plugin.checkOllamaConnection();
          button.setButtonText('Test');
        }));
  }
}
