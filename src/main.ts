import { App, Plugin, PluginSettingTab, Setting, WorkspaceLeaf, Notice, MarkdownView } from 'obsidian';
import { JarvisView, JARVIS_VIEW_TYPE } from './ui/JarvisView';
import { OllamaService } from './services/OllamaService';
import { VaultService } from './services/VaultService';

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
  statusBarItem: HTMLElement;

  async onload() {
    await this.loadSettings();

    // Initialize services
    this.ollama = new OllamaService(this.settings);
    this.vault = new VaultService(this.app);

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
    // Reinitialize Ollama with new settings
    this.ollama = new OllamaService(this.settings);
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
