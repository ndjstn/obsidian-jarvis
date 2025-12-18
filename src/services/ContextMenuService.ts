import { Menu, Editor, MarkdownView, Notice, Modal, App } from 'obsidian';
import type JarvisPlugin from '../main';

export interface ContextAction {
  id: string;
  name: string;
  icon: string;
  handler: (text: string, plugin: JarvisPlugin) => Promise<string>;
}

export class ContextMenuService {
  private plugin: JarvisPlugin;
  private actions: ContextAction[] = [];

  constructor(plugin: JarvisPlugin) {
    this.plugin = plugin;
    this.registerBuiltinActions();
    this.registerEditorMenu();
  }

  private registerBuiltinActions(): void {
    // Summarize selection
    this.actions.push({
      id: 'summarize',
      name: 'Summarize',
      icon: 'file-text',
      handler: async (text, plugin) => {
        return await plugin.ollama.summarize(text, 'bullets');
      }
    });

    // Explain selection
    this.actions.push({
      id: 'explain',
      name: 'Explain',
      icon: 'help-circle',
      handler: async (text, plugin) => {
        const response = await plugin.ollama.chat([
          {
            role: 'system',
            content: 'Explain the following concept or text clearly and concisely. Use bullet points if helpful.'
          },
          { role: 'user', content: text }
        ]);
        return response;
      }
    });

    // Expand selection (turn bullets into paragraphs)
    this.actions.push({
      id: 'expand',
      name: 'Expand',
      icon: 'maximize-2',
      handler: async (text, plugin) => {
        const response = await plugin.ollama.chat([
          {
            role: 'system',
            content: 'Expand the following bullet points or brief notes into well-written paragraphs. Maintain the same meaning but add detail and flow.'
          },
          { role: 'user', content: text }
        ]);
        return response;
      }
    });

    // Condense selection (make it more concise)
    this.actions.push({
      id: 'condense',
      name: 'Condense',
      icon: 'minimize-2',
      handler: async (text, plugin) => {
        const response = await plugin.ollama.chat([
          {
            role: 'system',
            content: 'Condense the following text to be more concise while keeping all key information. Use bullet points if appropriate.'
          },
          { role: 'user', content: text }
        ]);
        return response;
      }
    });

    // Rewrite - formal
    this.actions.push({
      id: 'rewrite-formal',
      name: 'Rewrite (Formal)',
      icon: 'graduation-cap',
      handler: async (text, plugin) => {
        const response = await plugin.ollama.chat([
          {
            role: 'system',
            content: 'Rewrite the following text in a formal, professional tone. Keep the same meaning.'
          },
          { role: 'user', content: text }
        ]);
        return response;
      }
    });

    // Rewrite - casual
    this.actions.push({
      id: 'rewrite-casual',
      name: 'Rewrite (Casual)',
      icon: 'smile',
      handler: async (text, plugin) => {
        const response = await plugin.ollama.chat([
          {
            role: 'system',
            content: 'Rewrite the following text in a casual, friendly tone. Keep the same meaning.'
          },
          { role: 'user', content: text }
        ]);
        return response;
      }
    });

    // Create flashcard
    this.actions.push({
      id: 'flashcard',
      name: 'Create Flashcard',
      icon: 'layers',
      handler: async (text, plugin) => {
        const response = await plugin.ollama.chat([
          {
            role: 'system',
            content: `Create a flashcard from the given content.
Format your response as:
Q: [question]
A: [answer]

Make the question test understanding, not just recall. Be concise.`
          },
          { role: 'user', content: text }
        ]);
        return response;
      }
    });

    // Extract tasks
    this.actions.push({
      id: 'extract-tasks',
      name: 'Extract Tasks',
      icon: 'check-square',
      handler: async (text, plugin) => {
        const response = await plugin.ollama.chat([
          {
            role: 'system',
            content: 'Extract any action items or tasks from the following text. Format each as a Markdown task: - [ ] Task description'
          },
          { role: 'user', content: text }
        ]);
        return response;
      }
    });

    // Find similar notes
    this.actions.push({
      id: 'find-similar',
      name: 'Find Similar Notes',
      icon: 'search',
      handler: async (text, plugin) => {
        if (!plugin.embedding) {
          return '❌ Embedding service not available.';
        }

        try {
          const results = await plugin.embedding.search(text, 5, 0.3);
          if (results.length === 0) {
            return '🔍 No similar notes found. Try indexing your vault first.';
          }

          let response = '## Similar Notes\n\n';
          for (const result of results) {
            const score = Math.round(result.score * 100);
            response += `- [[${result.document.metadata.title}]] (${score}%)\n`;
          }
          return response;
        } catch (e) {
          return `❌ Search failed: ${e.message}`;
        }
      }
    });

    // Web research
    this.actions.push({
      id: 'research',
      name: 'Research This',
      icon: 'globe',
      handler: async (text, plugin) => {
        if (!plugin.webResearch) {
          return '❌ Web research service not available.';
        }

        try {
          const result = await plugin.webResearch.research(text, 'quick');
          let response = `## Research: ${text.substring(0, 50)}...\n\n${result.summary}`;
          if (result.sources.length > 0) {
            response += '\n\n### Sources\n';
            for (const source of result.sources.slice(0, 3)) {
              response += `- [${source.title}](${source.url})\n`;
            }
          }
          return response;
        } catch (e) {
          return `❌ Research failed: ${e.message}`;
        }
      }
    });

    // Suggest tags
    this.actions.push({
      id: 'suggest-tags',
      name: 'Suggest Tags',
      icon: 'tag',
      handler: async (text, plugin) => {
        const response = await plugin.ollama.chat([
          {
            role: 'system',
            content: `Analyze the text and suggest 3-5 relevant tags.
Format: Return only a comma-separated list of tags (without #).`
          },
          { role: 'user', content: text }
        ]);
        const tags = response.split(',').map(t => `#${t.trim()}`).join(' ');
        return `**Suggested Tags:**\n\n${tags}`;
      }
    });
  }

  private registerEditorMenu(): void {
    this.plugin.registerEvent(
      this.plugin.app.workspace.on('editor-menu', (menu: Menu, editor: Editor, view: MarkdownView) => {
        const selection = editor.getSelection();
        if (!selection || selection.trim().length === 0) return;

        // Add a separator before Jarvis items
        menu.addSeparator();

        // Add Jarvis section header
        menu.addItem((item) => {
          item
            .setTitle('🤖 Jarvis AI')
            .setIcon('bot')
            .setDisabled(true);
        });

        // Add main actions directly (not as submenu since setSubmenu isn't available)
        const mainActions = this.actions.slice(0, 5); // Show top 5 actions
        for (const action of mainActions) {
          menu.addItem((menuItem) => {
            menuItem
              .setTitle(`  ${action.name}`)
              .setIcon(action.icon)
              .onClick(async () => {
                await this.executeAction(action, selection, editor);
              });
          });
        }

        // Add "More..." item that opens all actions
        menu.addItem((menuItem) => {
          menuItem
            .setTitle('  More Jarvis Actions...')
            .setIcon('more-horizontal')
            .onClick(() => {
              this.showAllActionsModal(selection, editor);
            });
        });

        // Add Ask in Jarvis option
        menu.addItem((menuItem) => {
          menuItem
            .setTitle('  Ask in Jarvis...')
            .setIcon('message-circle')
            .onClick(async () => {
              await this.askInJarvis(selection);
            });
        });
      })
    );
  }

  private showAllActionsModal(selection: string, editor: Editor): void {
    const modal = new ActionPickerModal(this.plugin.app, this.actions, async (action) => {
      if (action) {
        await this.executeAction(action, selection, editor);
      }
    });
    modal.open();
  }

  private async executeAction(action: ContextAction, text: string, editor: Editor): Promise<void> {
    new Notice(`Jarvis: ${action.name}...`);

    try {
      const result = await action.handler(text, this.plugin);

      // Show result in a modal or insert below selection
      const modal = new ResultModal(this.plugin.app, action.name, result, (insert) => {
        if (insert) {
          // Insert result below selection
          const cursor = editor.getCursor('to');
          const insertText = `\n\n> [!ai] ${action.name}\n> ${result.split('\n').join('\n> ')}\n`;
          editor.replaceRange(insertText, { line: cursor.line, ch: editor.getLine(cursor.line).length });
        }
      });
      modal.open();

      new Notice('Jarvis: Done!');
    } catch (error) {
      new Notice(`Jarvis: ${action.name} failed - ${error.message}`);
      console.error('Context menu action error:', error);
    }
  }

  private async askInJarvis(text: string): Promise<void> {
    // Open Jarvis panel and pre-fill with selection
    await this.plugin.activateView();

    // Try to find the Jarvis view and set the input
    const leaves = this.plugin.app.workspace.getLeavesOfType('jarvis-view');
    if (leaves.length > 0) {
      const view = leaves[0].view as any;
      if (view.inputField) {
        view.inputField.value = `Regarding this text:\n\n"${text.substring(0, 500)}${text.length > 500 ? '...' : ''}"\n\nMy question: `;
        view.inputField.focus();
      }
    }
  }
}

// Simple modal to show results
class ResultModal extends Modal {
  private title: string;
  private resultContent: string;
  private onResult: (insert: boolean) => void;

  constructor(app: App, title: string, content: string, onResult: (insert: boolean) => void) {
    super(app);
    this.title = title;
    this.resultContent = content;
    this.onResult = onResult;
  }

  onOpen() {
    const { contentEl } = this;

    // Header
    const header = contentEl.createDiv({ cls: 'jarvis-modal-header' });
    header.createEl('h2', { text: `Jarvis: ${this.title}` });

    // Content
    const contentDiv = contentEl.createDiv({ cls: 'jarvis-modal-content' });
    contentDiv.style.maxHeight = '400px';
    contentDiv.style.overflow = 'auto';
    contentDiv.style.padding = '16px';
    contentDiv.style.background = 'var(--background-secondary)';
    contentDiv.style.borderRadius = '8px';
    contentDiv.style.marginBottom = '16px';
    contentDiv.style.whiteSpace = 'pre-wrap';
    contentDiv.setText(this.resultContent);

    // Buttons
    const buttonDiv = contentEl.createDiv({ cls: 'jarvis-modal-buttons' });
    buttonDiv.style.display = 'flex';
    buttonDiv.style.gap = '8px';
    buttonDiv.style.justifyContent = 'flex-end';

    const copyBtn = buttonDiv.createEl('button', { text: 'Copy' });
    copyBtn.addEventListener('click', async () => {
      await navigator.clipboard.writeText(this.resultContent);
      new Notice('Copied to clipboard!');
    });

    const insertBtn = buttonDiv.createEl('button', { text: 'Insert Below', cls: 'mod-cta' });
    insertBtn.addEventListener('click', () => {
      this.onResult(true);
      this.close();
    });

    const closeBtn = buttonDiv.createEl('button', { text: 'Close' });
    closeBtn.addEventListener('click', () => {
      this.onResult(false);
      this.close();
    });
  }

  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
}

// Modal to pick from all actions
class ActionPickerModal extends Modal {
  private actions: ContextAction[];
  private onSelect: (action: ContextAction | null) => void;

  constructor(app: App, actions: ContextAction[], onSelect: (action: ContextAction | null) => void) {
    super(app);
    this.actions = actions;
    this.onSelect = onSelect;
  }

  onOpen() {
    const { contentEl } = this;

    contentEl.createEl('h2', { text: 'Jarvis AI Actions' });

    const list = contentEl.createDiv({ cls: 'jarvis-action-list' });
    list.style.display = 'flex';
    list.style.flexDirection = 'column';
    list.style.gap = '4px';

    for (const action of this.actions) {
      const item = list.createDiv({ cls: 'jarvis-action-item' });
      item.style.padding = '8px 12px';
      item.style.cursor = 'pointer';
      item.style.borderRadius = '4px';
      item.style.display = 'flex';
      item.style.alignItems = 'center';
      item.style.gap = '8px';

      item.addEventListener('mouseenter', () => {
        item.style.background = 'var(--background-modifier-hover)';
      });
      item.addEventListener('mouseleave', () => {
        item.style.background = 'transparent';
      });

      item.createSpan({ text: action.name });

      item.addEventListener('click', () => {
        this.onSelect(action);
        this.close();
      });
    }

    // Cancel button
    const btnDiv = contentEl.createDiv();
    btnDiv.style.marginTop = '16px';
    btnDiv.style.textAlign = 'right';

    const cancelBtn = btnDiv.createEl('button', { text: 'Cancel' });
    cancelBtn.addEventListener('click', () => {
      this.onSelect(null);
      this.close();
    });
  }

  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
}
