import type JarvisPlugin from '../main';
import { Notice, MarkdownView } from 'obsidian';

export interface SlashCommand {
  name: string;
  aliases: string[];
  description: string;
  usage: string;
  execute: (args: string, plugin: JarvisPlugin) => Promise<SlashCommandResult>;
}

export interface SlashCommandResult {
  content: string;
  type: 'response' | 'action' | 'error';
  action?: 'create_note' | 'insert_text' | 'open_modal';
  data?: any;
}

export class SlashCommandService {
  private commands: Map<string, SlashCommand> = new Map();
  private plugin: JarvisPlugin;

  constructor(plugin: JarvisPlugin) {
    this.plugin = plugin;
    this.registerBuiltinCommands();
  }

  private registerBuiltinCommands(): void {
    // /summarize - Summarize current note or provided text
    this.register({
      name: 'summarize',
      aliases: ['sum', 's'],
      description: 'Summarize current note or provided text',
      usage: '/summarize [optional text]',
      execute: async (args, plugin) => {
        let content = args.trim();

        if (!content) {
          // Get current note content
          const noteContent = await plugin.vault.getActiveNoteContent();
          if (!noteContent) {
            return {
              content: '❌ No active note and no text provided. Open a note or provide text to summarize.',
              type: 'error'
            };
          }
          content = noteContent;
        }

        const summary = await plugin.ollama.summarize(content, 'bullets');
        return {
          content: `## Summary\n\n${summary}`,
          type: 'response'
        };
      }
    });

    // /plan - Create action plan from goal
    this.register({
      name: 'plan',
      aliases: ['p', 'breakdown'],
      description: 'Break down a goal into actionable steps',
      usage: '/plan <goal description>',
      execute: async (args, plugin) => {
        if (!args.trim()) {
          return {
            content: '❌ Please provide a goal to plan. Usage: `/plan Write a blog post about productivity`',
            type: 'error'
          };
        }

        const plan = await plugin.ollama.decomposePlan(args);
        return {
          content: `## Plan: ${args}\n\n${plan}`,
          type: 'response'
        };
      }
    });

    // /task - Create TaskWarrior task
    this.register({
      name: 'task',
      aliases: ['t', 'todo'],
      description: 'Convert natural language to TaskWarrior command',
      usage: '/task <task description in natural language>',
      execute: async (args, plugin) => {
        if (!args.trim()) {
          return {
            content: '❌ Please describe the task. Usage: `/task review PRs by tomorrow with high priority`',
            type: 'error'
          };
        }

        const cmd = await plugin.ollama.generateTaskWarriorCommand(args);
        return {
          content: `## TaskWarrior Command\n\n\`\`\`bash\n${cmd}\n\`\`\`\n\nCopy and run this command in your terminal.`,
          type: 'response'
        };
      }
    });

    // /link - Suggest links for current note
    this.register({
      name: 'link',
      aliases: ['links', 'suggest-links'],
      description: 'Suggest relevant links for the current note',
      usage: '/link',
      execute: async (args, plugin) => {
        const noteContent = await plugin.vault.getActiveNoteContent();
        if (!noteContent) {
          return {
            content: '❌ No active note. Open a note to get link suggestions.',
            type: 'error'
          };
        }

        // Get active note metadata
        const activeFile = plugin.app.workspace.getActiveFile();
        const currentPath = activeFile?.path || '';

        // Use RAG to find similar notes
        if (plugin.embedding) {
          try {
            const results = await plugin.embedding.search(noteContent.substring(0, 500), 5, 0.3);
            const filteredResults = results.filter(r => r.document.path !== currentPath);

            if (filteredResults.length === 0) {
              return {
                content: '🔍 No related notes found. Try indexing your vault with `/index` first.',
                type: 'response'
              };
            }

            let response = '## Suggested Links\n\nThese notes might be relevant:\n\n';
            for (const result of filteredResults.slice(0, 5)) {
              const score = Math.round(result.score * 100);
              response += `- [[${result.document.metadata.title}]] (${score}% match)\n`;
              response += `  > ${result.snippet.substring(0, 100)}...\n\n`;
            }

            return { content: response, type: 'response' };
          } catch (e) {
            return {
              content: '❌ RAG search failed. Try `/index` to rebuild the index.',
              type: 'error'
            };
          }
        }

        return {
          content: '❌ Embedding service not available. Please restart the plugin.',
          type: 'error'
        };
      }
    });

    // /tag - Suggest tags for current note
    this.register({
      name: 'tag',
      aliases: ['tags', 'suggest-tags'],
      description: 'Suggest tags for the current note',
      usage: '/tag',
      execute: async (args, plugin) => {
        const noteContent = await plugin.vault.getActiveNoteContent();
        if (!noteContent) {
          return {
            content: '❌ No active note. Open a note to get tag suggestions.',
            type: 'error'
          };
        }

        const response = await plugin.ollama.chat([
          {
            role: 'system',
            content: `You are a tagging assistant. Analyze the note content and suggest 3-7 relevant tags.
Format: Return only a comma-separated list of tags (without #).
Focus on: topic, type of content, project, area, and status.
Example: productivity, pkm, review, project/jarvis, status/active`
          },
          { role: 'user', content: noteContent.substring(0, 2000) }
        ]);

        const tags = response.split(',').map(t => `#${t.trim()}`).join(' ');

        return {
          content: `## Suggested Tags\n\n${tags}\n\n*Click to copy and paste into your note.*`,
          type: 'response'
        };
      }
    });

    // /flashcard - Create flashcard from selection/text
    this.register({
      name: 'flashcard',
      aliases: ['fc', 'card'],
      description: 'Create a flashcard from text',
      usage: '/flashcard <text to convert to flashcard>',
      execute: async (args, plugin) => {
        let content = args.trim();

        if (!content) {
          // Try to get selection
          const view = plugin.app.workspace.getActiveViewOfType(MarkdownView);
          if (view) {
            content = view.editor.getSelection();
          }
        }

        if (!content) {
          return {
            content: '❌ No text provided. Select text or provide content to create a flashcard.',
            type: 'error'
          };
        }

        const response = await plugin.ollama.chat([
          {
            role: 'system',
            content: `Create a flashcard from the given content.
Format your response as:
Q: [question]
A: [answer]

Make the question test understanding, not just recall. Be concise.`
          },
          { role: 'user', content }
        ]);

        return {
          content: `## Flashcard\n\n${response}\n\n*Copy this to your flashcard deck.*`,
          type: 'response'
        };
      }
    });

    // /research - Web research
    this.register({
      name: 'research',
      aliases: ['r', 'search', 'web'],
      description: 'Research a topic on the web',
      usage: '/research <query>',
      execute: async (args, plugin) => {
        if (!args.trim()) {
          return {
            content: '❌ Please provide a research query. Usage: `/research best practices for note-taking`',
            type: 'error'
          };
        }

        if (!plugin.webResearch) {
          return {
            content: '❌ Web research service not available.',
            type: 'error'
          };
        }

        try {
          const result = await plugin.webResearch.research(args, 'thorough');

          let response = `## Research: ${args}\n\n${result.summary}`;

          if (result.sources.length > 0) {
            response += '\n\n### Sources\n';
            for (const source of result.sources) {
              response += `- [${source.title}](${source.url})\n`;
            }
          }

          return { content: response, type: 'response' };
        } catch (e) {
          return {
            content: `❌ Research failed: ${e.message}`,
            type: 'error'
          };
        }
      }
    });

    // /similar - Find similar notes
    this.register({
      name: 'similar',
      aliases: ['related', 'find'],
      description: 'Find notes similar to current note or query',
      usage: '/similar [optional query]',
      execute: async (args, plugin) => {
        let query = args.trim();

        if (!query) {
          const noteContent = await plugin.vault.getActiveNoteContent();
          if (!noteContent) {
            return {
              content: '❌ No active note and no query provided.',
              type: 'error'
            };
          }
          query = noteContent.substring(0, 500);
        }

        if (!plugin.embedding) {
          return {
            content: '❌ Embedding service not available.',
            type: 'error'
          };
        }

        try {
          const results = await plugin.embedding.search(query, 5, 0.3);

          if (results.length === 0) {
            return {
              content: '🔍 No similar notes found. Try `/index` to rebuild the index.',
              type: 'response'
            };
          }

          let response = '## Similar Notes\n\n';
          for (const result of results) {
            const score = Math.round(result.score * 100);
            response += `### [[${result.document.metadata.title}]] (${score}%)\n`;
            response += `> ${result.snippet}\n\n`;
          }

          return { content: response, type: 'response' };
        } catch (e) {
          return {
            content: `❌ Search failed: ${e.message}`,
            type: 'error'
          };
        }
      }
    });

    // /index - Rebuild RAG index
    this.register({
      name: 'index',
      aliases: ['reindex', 'rebuild'],
      description: 'Rebuild the semantic search index',
      usage: '/index',
      execute: async (args, plugin) => {
        if (!plugin.embedding) {
          return {
            content: '❌ Embedding service not available.',
            type: 'error'
          };
        }

        new Notice('Indexing vault... This may take a while.');

        try {
          const count = await plugin.embedding.indexVault((current, total) => {
            // Progress updates
          });

          return {
            content: `✅ Successfully indexed ${count} notes!\n\nYou can now use semantic search with \`/similar\` or \`/link\`.`,
            type: 'response'
          };
        } catch (e) {
          return {
            content: `❌ Indexing failed: ${e.message}`,
            type: 'error'
          };
        }
      }
    });

    // /explain - Explain selected text or concept
    this.register({
      name: 'explain',
      aliases: ['x', 'what', 'define'],
      description: 'Explain a concept or selected text',
      usage: '/explain <concept or text>',
      execute: async (args, plugin) => {
        let content = args.trim();

        if (!content) {
          const view = plugin.app.workspace.getActiveViewOfType(MarkdownView);
          if (view) {
            content = view.editor.getSelection();
          }
        }

        if (!content) {
          return {
            content: '❌ Please provide text to explain or select text in the editor.',
            type: 'error'
          };
        }

        const response = await plugin.ollama.chat([
          {
            role: 'system',
            content: 'Explain the following concept or text clearly and concisely. Use bullet points if helpful. If it\'s a term, provide definition, context, and examples.'
          },
          { role: 'user', content }
        ]);

        return {
          content: `## Explanation\n\n${response}`,
          type: 'response'
        };
      }
    });

    // /graph - Build and show graph stats
    this.register({
      name: 'graph',
      aliases: ['g', 'stats'],
      description: 'Build knowledge graph and show statistics',
      usage: '/graph',
      execute: async (args, plugin) => {
        if (!plugin.knowledgeGraph) {
          return { content: '❌ Knowledge Graph service not available.', type: 'error' };
        }

        const count = await plugin.knowledgeGraph.buildGraph();
        const stats = plugin.knowledgeGraph.getStats();

        let response = `## Knowledge Graph Statistics\n\n`;
        response += `| Metric | Value |\n|--------|-------|\n`;
        response += `| Total Notes | ${stats.totalNodes} |\n`;
        response += `| Total Links | ${stats.totalEdges} |\n`;
        response += `| Orphan Notes | ${stats.orphanCount} |\n`;
        response += `| Clusters | ${stats.clusters} |\n`;
        response += `| Avg Connections | ${stats.avgConnections.toFixed(1)} |\n`;

        if (stats.mostConnected.length > 0) {
          response += `\n### Most Connected Notes\n`;
          for (const item of stats.mostConnected) {
            const title = item.path.split('/').pop()?.replace('.md', '') || item.path;
            response += `- [[${title}]] (${item.connections} connections)\n`;
          }
        }

        return { content: response, type: 'response' };
      }
    });

    // /orphans - Find orphan notes
    this.register({
      name: 'orphans',
      aliases: ['lonely', 'unlinked'],
      description: 'Find notes with no links',
      usage: '/orphans',
      execute: async (args, plugin) => {
        if (!plugin.knowledgeGraph) {
          return { content: '❌ Knowledge Graph service not available.', type: 'error' };
        }

        if (!plugin.knowledgeGraph.isGraphBuilt()) {
          await plugin.knowledgeGraph.buildGraph();
        }

        const orphans = plugin.knowledgeGraph.findOrphans();

        if (orphans.length === 0) {
          return {
            content: '✅ No orphan notes found! All your notes are connected.',
            type: 'response'
          };
        }

        let response = `## Orphan Notes (${orphans.length})\n\n`;
        response += `These notes have no incoming or outgoing links:\n\n`;

        for (const orphan of orphans.slice(0, 20)) {
          response += `- [[${orphan.title}]]`;
          if (orphan.tags.length > 0) {
            response += ` ${orphan.tags.slice(0, 3).join(' ')}`;
          }
          response += `\n`;
        }

        if (orphans.length > 20) {
          response += `\n*...and ${orphans.length - 20} more*`;
        }

        response += `\n\n💡 **Tip:** Consider linking these notes or archiving unused ones.`;

        return { content: response, type: 'response' };
      }
    });

    // /bridges - Find bridge notes
    this.register({
      name: 'bridges',
      aliases: ['hubs', 'connectors'],
      description: 'Find important connector notes',
      usage: '/bridges',
      execute: async (args, plugin) => {
        if (!plugin.knowledgeGraph) {
          return { content: '❌ Knowledge Graph service not available.', type: 'error' };
        }

        if (!plugin.knowledgeGraph.isGraphBuilt()) {
          await plugin.knowledgeGraph.buildGraph();
        }

        const bridges = plugin.knowledgeGraph.findBridgeNotes(10);

        if (bridges.length === 0) {
          return {
            content: '🔍 No bridge notes found. Your graph may need more connections.',
            type: 'response'
          };
        }

        let response = `## Bridge Notes\n\n`;
        response += `These notes connect different parts of your knowledge:\n\n`;

        for (const bridge of bridges) {
          response += `### [[${bridge.title}]]\n`;
          response += `- Links out: ${bridge.links.length} | Links in: ${bridge.backlinks.length}\n`;
          if (bridge.tags.length > 0) {
            response += `- Tags: ${bridge.tags.slice(0, 5).join(' ')}\n`;
          }
          response += `\n`;
        }

        response += `💡 **Tip:** These notes are valuable connectors. Keep them well-maintained!`;

        return { content: response, type: 'response' };
      }
    });

    // /path - Find path between two notes
    this.register({
      name: 'path',
      aliases: ['connect', 'route'],
      description: 'Find path between two notes',
      usage: '/path <note1> to <note2>',
      execute: async (args, plugin) => {
        if (!plugin.knowledgeGraph) {
          return { content: '❌ Knowledge Graph service not available.', type: 'error' };
        }

        if (!args.trim()) {
          return {
            content: '❌ Usage: `/path Note A to Note B`',
            type: 'error'
          };
        }

        // Parse "note1 to note2" format
        const parts = args.split(/\s+to\s+/i);
        if (parts.length !== 2) {
          return {
            content: '❌ Please use format: `/path Note A to Note B`',
            type: 'error'
          };
        }

        const [start, end] = parts.map(p => p.trim());

        if (!plugin.knowledgeGraph.isGraphBuilt()) {
          await plugin.knowledgeGraph.buildGraph();
        }

        const result = plugin.knowledgeGraph.findPath(start, end);

        if (!result) {
          return {
            content: `❌ No path found between "${start}" and "${end}".\n\nThey may be in disconnected parts of your graph.`,
            type: 'response'
          };
        }

        let response = `## Path Found!\n\n`;
        response += `**Length:** ${result.length} hop(s)\n\n`;
        response += `### Route:\n`;

        for (let i = 0; i < result.path.length; i++) {
          const title = result.path[i].split('/').pop()?.replace('.md', '') || result.path[i];
          response += `${i + 1}. [[${title}]]`;
          if (i < result.path.length - 1) {
            response += ` →`;
          }
          response += `\n`;
        }

        return { content: response, type: 'response' };
      }
    });

    // /clusters - Show topic clusters
    this.register({
      name: 'clusters',
      aliases: ['topics', 'groups'],
      description: 'Show topic clusters in your vault',
      usage: '/clusters',
      execute: async (args, plugin) => {
        if (!plugin.knowledgeGraph) {
          return { content: '❌ Knowledge Graph service not available.', type: 'error' };
        }

        if (!plugin.knowledgeGraph.isGraphBuilt()) {
          await plugin.knowledgeGraph.buildGraph();
        }

        const clusters = plugin.knowledgeGraph.findClusters();

        if (clusters.length === 0) {
          return {
            content: '🔍 No clusters found. Your notes may all be connected or all separate.',
            type: 'response'
          };
        }

        let response = `## Knowledge Clusters (${clusters.length})\n\n`;

        for (const cluster of clusters.slice(0, 10)) {
          response += `### ${cluster.mainTopic} (${cluster.size} notes)\n`;
          const sampleNotes = cluster.nodes.slice(0, 5).map(p => {
            const title = p.split('/').pop()?.replace('.md', '') || p;
            return `[[${title}]]`;
          });
          response += `${sampleNotes.join(', ')}`;
          if (cluster.nodes.length > 5) {
            response += ` *+${cluster.nodes.length - 5} more*`;
          }
          response += `\n\n`;
        }

        return { content: response, type: 'response' };
      }
    });

    // /maintenance - Get vault maintenance report
    this.register({
      name: 'maintenance',
      aliases: ['health', 'audit'],
      description: 'Get vault health report',
      usage: '/maintenance',
      execute: async (args, plugin) => {
        if (!plugin.knowledgeGraph) {
          return { content: '❌ Knowledge Graph service not available.', type: 'error' };
        }

        if (!plugin.knowledgeGraph.isGraphBuilt()) {
          await plugin.knowledgeGraph.buildGraph();
        }

        const report = plugin.knowledgeGraph.getMaintenanceReport();
        const stats = plugin.knowledgeGraph.getStats();

        let response = `## Vault Health Report\n\n`;

        // Overall health score
        const healthyRatio = report.wellConnected.length / stats.totalNodes;
        const healthEmoji = healthyRatio > 0.7 ? '🟢' : healthyRatio > 0.4 ? '🟡' : '🔴';
        response += `### Overall: ${healthEmoji} ${Math.round(healthyRatio * 100)}% healthy\n\n`;

        response += `| Category | Count | % |\n|----------|-------|---|\n`;
        response += `| ✅ Well Connected | ${report.wellConnected.length} | ${Math.round(report.wellConnected.length / stats.totalNodes * 100)}% |\n`;
        response += `| ⚠️ Dead Ends | ${report.deadEnds.length} | ${Math.round(report.deadEnds.length / stats.totalNodes * 100)}% |\n`;
        response += `| ⚠️ Sources Only | ${report.sources.length} | ${Math.round(report.sources.length / stats.totalNodes * 100)}% |\n`;
        response += `| ❌ Orphans | ${report.orphans.length} | ${Math.round(report.orphans.length / stats.totalNodes * 100)}% |\n`;

        if (report.deadEnds.length > 0) {
          response += `\n### Dead Ends (notes with no outgoing links)\n`;
          for (const node of report.deadEnds.slice(0, 5)) {
            response += `- [[${node.title}]]\n`;
          }
          if (report.deadEnds.length > 5) {
            response += `*...and ${report.deadEnds.length - 5} more*\n`;
          }
        }

        if (report.sources.length > 0) {
          response += `\n### Sources (notes with no incoming links)\n`;
          for (const node of report.sources.slice(0, 5)) {
            response += `- [[${node.title}]]\n`;
          }
          if (report.sources.length > 5) {
            response += `*...and ${report.sources.length - 5} more*\n`;
          }
        }

        response += `\n💡 **Recommendations:**\n`;
        if (report.orphans.length > 0) {
          response += `- Link or archive ${report.orphans.length} orphan note(s)\n`;
        }
        if (report.deadEnds.length > 0) {
          response += `- Add outgoing links to ${report.deadEnds.length} dead-end note(s)\n`;
        }
        if (report.sources.length > 0) {
          response += `- Reference ${report.sources.length} source note(s) from other notes\n`;
        }

        return { content: response, type: 'response' };
      }
    });

    // /help - Show available commands
    this.register({
      name: 'help',
      aliases: ['?', 'commands'],
      description: 'Show available slash commands',
      usage: '/help',
      execute: async () => {
        let response = '## Jarvis Slash Commands\n\n';
        response += '| Command | Description | Usage |\n';
        response += '|---------|-------------|-------|\n';

        const commandList = Array.from(this.commands.values());
        // Deduplicate by name
        const seen = new Set<string>();
        for (const cmd of commandList) {
          if (seen.has(cmd.name)) continue;
          seen.add(cmd.name);
          const aliases = cmd.aliases.map(a => `/${a}`).join(', ');
          response += `| \`/${cmd.name}\` | ${cmd.description} | \`${cmd.usage}\` |\n`;
        }

        response += '\n### Aliases\n';
        for (const cmd of commandList) {
          if (seen.has(`alias-${cmd.name}`)) continue;
          seen.add(`alias-${cmd.name}`);
          if (cmd.aliases.length > 0) {
            response += `- \`/${cmd.name}\`: ${cmd.aliases.map(a => `\`/${a}\``).join(', ')}\n`;
          }
        }

        return { content: response, type: 'response' };
      }
    });
  }

  register(command: SlashCommand): void {
    this.commands.set(command.name, command);
    for (const alias of command.aliases) {
      this.commands.set(alias, command);
    }
  }

  isSlashCommand(input: string): boolean {
    return input.trim().startsWith('/');
  }

  parseCommand(input: string): { command: string; args: string } | null {
    const trimmed = input.trim();
    if (!trimmed.startsWith('/')) return null;

    const match = trimmed.match(/^\/(\S+)\s*([\s\S]*)?$/);
    if (!match) return null;

    return {
      command: match[1].toLowerCase(),
      args: match[2] || ''
    };
  }

  async execute(input: string): Promise<SlashCommandResult> {
    const parsed = this.parseCommand(input);
    if (!parsed) {
      return {
        content: '❌ Invalid command format. Use `/help` to see available commands.',
        type: 'error'
      };
    }

    const command = this.commands.get(parsed.command);
    if (!command) {
      return {
        content: `❌ Unknown command: \`/${parsed.command}\`\n\nUse \`/help\` to see available commands.`,
        type: 'error'
      };
    }

    try {
      return await command.execute(parsed.args, this.plugin);
    } catch (e) {
      return {
        content: `❌ Command failed: ${e.message}`,
        type: 'error'
      };
    }
  }

  getCommandNames(): string[] {
    const names = new Set<string>();
    for (const [key, cmd] of this.commands) {
      names.add(cmd.name);
    }
    return Array.from(names);
  }

  getSuggestions(partial: string): string[] {
    const lowerPartial = partial.toLowerCase().replace(/^\//, '');
    const suggestions: string[] = [];

    for (const [key, cmd] of this.commands) {
      if (key.startsWith(lowerPartial) && !suggestions.includes(cmd.name)) {
        suggestions.push(cmd.name);
      }
    }

    return suggestions.slice(0, 5);
  }
}
