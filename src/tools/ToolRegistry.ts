import type JarvisPlugin from '../main';

export interface ToolParameter {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array';
  description: string;
  required: boolean;
  default?: unknown;
}

export interface ToolDefinition {
  name: string;
  description: string;
  category: 'web' | 'vault' | 'graph' | 'finance' | 'task' | 'utility';
  parameters: ToolParameter[];
  execute: (params: Record<string, unknown>, plugin: JarvisPlugin) => Promise<ToolResult>;
}

export interface ToolResult {
  success: boolean;
  data?: unknown;
  error?: string;
  metadata?: {
    executionTimeMs: number;
    source?: string;
  };
}

export interface ToolExecutionPlan {
  steps: Array<{
    toolName: string;
    params: Record<string, unknown>;
    dependsOn?: string[]; // IDs of previous steps
  }>;
}

export class ToolRegistry {
  private tools: Map<string, ToolDefinition> = new Map();
  private plugin: JarvisPlugin;

  constructor(plugin: JarvisPlugin) {
    this.plugin = plugin;
    this.registerBuiltinTools();
  }

  private registerBuiltinTools(): void {
    // Web Search Tool
    this.register({
      name: 'web_search',
      description: 'Search the web using SearXNG for current information',
      category: 'web',
      parameters: [
        { name: 'query', type: 'string', description: 'Search query', required: true },
        { name: 'limit', type: 'number', description: 'Max results', required: false, default: 5 }
      ],
      execute: async (params, plugin) => {
        const start = Date.now();
        try {
          if (!plugin.webResearch) {
            return { success: false, error: 'Web research service not available' };
          }
          const result = await plugin.webResearch.research(params.query as string, 'quick');
          return {
            success: true,
            data: {
              summary: result.summary,
              sources: result.sources.slice(0, params.limit as number || 5)
            },
            metadata: { executionTimeMs: Date.now() - start, source: 'searxng' }
          };
        } catch (e) {
          return { success: false, error: e.message, metadata: { executionTimeMs: Date.now() - start } };
        }
      }
    });

    // Vault Search Tool
    this.register({
      name: 'vault_search',
      description: 'Search notes in the vault using semantic embeddings',
      category: 'vault',
      parameters: [
        { name: 'query', type: 'string', description: 'Search query', required: true },
        { name: 'limit', type: 'number', description: 'Max results', required: false, default: 5 },
        { name: 'minScore', type: 'number', description: 'Minimum similarity score', required: false, default: 0.3 }
      ],
      execute: async (params, plugin) => {
        const start = Date.now();
        try {
          if (!plugin.embedding) {
            return { success: false, error: 'Embedding service not available' };
          }
          const results = await plugin.embedding.search(
            params.query as string,
            params.limit as number || 5,
            params.minScore as number || 0.3
          );
          return {
            success: true,
            data: results.map(r => ({
              title: r.document.metadata.title,
              path: r.document.path,
              score: r.score,
              snippet: r.snippet
            })),
            metadata: { executionTimeMs: Date.now() - start, source: 'embeddings' }
          };
        } catch (e) {
          return { success: false, error: e.message, metadata: { executionTimeMs: Date.now() - start } };
        }
      }
    });

    // Vault Iterator Tool
    this.register({
      name: 'vault_iterate',
      description: 'Iterate over notes matching a pattern and extract data',
      category: 'vault',
      parameters: [
        { name: 'folder', type: 'string', description: 'Folder to search in', required: false, default: '' },
        { name: 'pattern', type: 'string', description: 'Filename pattern (regex)', required: false },
        { name: 'extractFrontmatter', type: 'boolean', description: 'Extract frontmatter', required: false, default: true },
        { name: 'limit', type: 'number', description: 'Max notes to process', required: false, default: 50 }
      ],
      execute: async (params, plugin) => {
        const start = Date.now();
        try {
          const allNotes = await plugin.vault.getAllNotes();
          let filtered = allNotes;

          if (params.folder) {
            filtered = filtered.filter(n => n.path.startsWith(params.folder as string));
          }

          if (params.pattern) {
            const regex = new RegExp(params.pattern as string, 'i');
            filtered = filtered.filter(n => regex.test(n.path));
          }

          const results = [];
          for (const note of filtered.slice(0, params.limit as number || 50)) {
            const content = await plugin.vault.readFile(note.path);
            let frontmatter: Record<string, unknown> = {};

            if (params.extractFrontmatter && content) {
              const match = content.match(/^---\n([\s\S]*?)\n---/);
              if (match) {
                try {
                  // Simple YAML parsing for common cases
                  const lines = match[1].split('\n');
                  for (const line of lines) {
                    const [key, ...valueParts] = line.split(':');
                    if (key && valueParts.length > 0) {
                      frontmatter[key.trim()] = valueParts.join(':').trim();
                    }
                  }
                } catch {
                  // Skip frontmatter parsing errors
                }
              }
            }

            results.push({
              path: note.path,
              title: note.path.split('/').pop()?.replace('.md', '') || note.path,
              frontmatter,
              wordCount: content?.split(/\s+/).length || 0
            });
          }

          return {
            success: true,
            data: results,
            metadata: { executionTimeMs: Date.now() - start, source: 'vault' }
          };
        } catch (e) {
          return { success: false, error: e.message, metadata: { executionTimeMs: Date.now() - start } };
        }
      }
    });

    // Graph Connections Tool
    this.register({
      name: 'graph_connections',
      description: 'Find connections between notes in the knowledge graph',
      category: 'graph',
      parameters: [
        { name: 'notePath', type: 'string', description: 'Note to analyze', required: true },
        { name: 'depth', type: 'number', description: 'Connection depth', required: false, default: 2 }
      ],
      execute: async (params, plugin) => {
        const start = Date.now();
        try {
          if (!plugin.knowledgeGraph) {
            return { success: false, error: 'Knowledge graph not available' };
          }

          if (!plugin.knowledgeGraph.isGraphBuilt()) {
            await plugin.knowledgeGraph.buildGraph();
          }

          const node = plugin.knowledgeGraph.getNode(params.notePath as string);
          if (!node) {
            return { success: false, error: 'Note not found in graph' };
          }

          return {
            success: true,
            data: {
              note: node.title,
              outgoingLinks: node.links,
              incomingLinks: node.backlinks,
              tags: node.tags
            },
            metadata: { executionTimeMs: Date.now() - start, source: 'graph' }
          };
        } catch (e) {
          return { success: false, error: e.message, metadata: { executionTimeMs: Date.now() - start } };
        }
      }
    });

    // TaskWarrior Query Tool
    this.register({
      name: 'task_query',
      description: 'Query TaskWarrior for tasks',
      category: 'task',
      parameters: [
        { name: 'filter', type: 'string', description: 'TaskWarrior filter', required: false, default: 'status:pending' },
        { name: 'limit', type: 'number', description: 'Max tasks', required: false, default: 10 }
      ],
      execute: async (params) => {
        const start = Date.now();
        try {
          const { exec } = require('child_process');
          const { promisify } = require('util');
          const execAsync = promisify(exec);

          const filter = params.filter as string || 'status:pending';
          const { stdout } = await execAsync(`task ${filter} export`, { timeout: 5000 });
          const tasks = JSON.parse(stdout);

          return {
            success: true,
            data: tasks.slice(0, params.limit as number || 10).map((t: any) => ({
              id: t.id,
              uuid: t.uuid,
              description: t.description,
              project: t.project,
              priority: t.priority,
              due: t.due,
              status: t.status,
              urgency: t.urgency
            })),
            metadata: { executionTimeMs: Date.now() - start, source: 'taskwarrior' }
          };
        } catch (e) {
          return { success: false, error: e.message, metadata: { executionTimeMs: Date.now() - start } };
        }
      }
    });

    // Date Parser Tool
    this.register({
      name: 'parse_date',
      description: 'Parse natural language date expressions',
      category: 'utility',
      parameters: [
        { name: 'expression', type: 'string', description: 'Date expression like "tomorrow", "next week"', required: true }
      ],
      execute: async (params) => {
        const start = Date.now();
        const expr = (params.expression as string).toLowerCase().trim();
        const now = new Date();

        let result: Date;

        if (expr === 'today') {
          result = now;
        } else if (expr === 'tomorrow') {
          result = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        } else if (expr === 'yesterday') {
          result = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        } else if (expr.startsWith('next ')) {
          const unit = expr.replace('next ', '');
          if (unit === 'week') {
            result = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
          } else if (unit === 'month') {
            result = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
          } else {
            // Day of week
            const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
            const targetDay = days.indexOf(unit);
            if (targetDay >= 0) {
              const currentDay = now.getDay();
              const daysUntil = (targetDay - currentDay + 7) % 7 || 7;
              result = new Date(now.getTime() + daysUntil * 24 * 60 * 60 * 1000);
            } else {
              result = now;
            }
          }
        } else if (expr.match(/in (\d+) (day|week|month)s?/)) {
          const match = expr.match(/in (\d+) (day|week|month)s?/)!;
          const count = parseInt(match[1]);
          const unit = match[2];
          if (unit === 'day') {
            result = new Date(now.getTime() + count * 24 * 60 * 60 * 1000);
          } else if (unit === 'week') {
            result = new Date(now.getTime() + count * 7 * 24 * 60 * 60 * 1000);
          } else {
            result = new Date(now.getFullYear(), now.getMonth() + count, now.getDate());
          }
        } else {
          // Try parsing as date string
          result = new Date(expr);
        }

        return {
          success: !isNaN(result.getTime()),
          data: {
            iso: result.toISOString(),
            date: result.toISOString().split('T')[0],
            formatted: result.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
          },
          metadata: { executionTimeMs: Date.now() - start }
        };
      }
    });

    // Memory Recall Tool
    this.register({
      name: 'memory_recall',
      description: 'Recall facts about the user from memory',
      category: 'utility',
      parameters: [
        { name: 'query', type: 'string', description: 'What to recall', required: false },
        { name: 'category', type: 'string', description: 'Category filter', required: false },
        { name: 'limit', type: 'number', description: 'Max facts', required: false, default: 5 }
      ],
      execute: async (params, plugin) => {
        const start = Date.now();
        try {
          if (!plugin.memory) {
            return { success: false, error: 'Memory service not available' };
          }

          const facts = await plugin.memory.recall(
            params.query as string || '',
            {
              limit: params.limit as number || 5,
              category: params.category as any
            }
          );

          return {
            success: true,
            data: facts.map(f => ({
              fact: f.fact,
              category: f.category,
              confidence: f.confidence
            })),
            metadata: { executionTimeMs: Date.now() - start, source: 'memory' }
          };
        } catch (e) {
          return { success: false, error: e.message, metadata: { executionTimeMs: Date.now() - start } };
        }
      }
    });
  }

  register(tool: ToolDefinition): void {
    this.tools.set(tool.name, tool);
  }

  get(name: string): ToolDefinition | undefined {
    return this.tools.get(name);
  }

  list(): ToolDefinition[] {
    return Array.from(this.tools.values());
  }

  listByCategory(category: string): ToolDefinition[] {
    return this.list().filter(t => t.category === category);
  }

  /**
   * Get tool descriptions for LLM context
   */
  getToolDescriptions(): string {
    let desc = 'Available tools:\n\n';
    for (const tool of this.list()) {
      desc += `**${tool.name}** (${tool.category}): ${tool.description}\n`;
      desc += `  Parameters: ${tool.parameters.map(p => `${p.name}${p.required ? '*' : ''}: ${p.type}`).join(', ')}\n\n`;
    }
    return desc;
  }

  /**
   * Execute a single tool
   */
  async execute(name: string, params: Record<string, unknown>): Promise<ToolResult> {
    const tool = this.tools.get(name);
    if (!tool) {
      return { success: false, error: `Tool not found: ${name}` };
    }

    // Validate required parameters
    for (const param of tool.parameters) {
      if (param.required && params[param.name] === undefined) {
        return { success: false, error: `Missing required parameter: ${param.name}` };
      }
      // Apply defaults
      if (params[param.name] === undefined && param.default !== undefined) {
        params[param.name] = param.default;
      }
    }

    return tool.execute(params, this.plugin);
  }

  /**
   * Execute a plan of multiple tools
   */
  async executePlan(plan: ToolExecutionPlan): Promise<Map<number, ToolResult>> {
    const results = new Map<number, ToolResult>();

    for (let i = 0; i < plan.steps.length; i++) {
      const step = plan.steps[i];

      // Check dependencies
      if (step.dependsOn) {
        for (const depIdx of step.dependsOn) {
          const depResult = results.get(parseInt(depIdx));
          if (!depResult?.success) {
            results.set(i, { success: false, error: `Dependency ${depIdx} failed` });
            continue;
          }
        }
      }

      const result = await this.execute(step.toolName, step.params);
      results.set(i, result);
    }

    return results;
  }
}
