import type JarvisPlugin from '../main';
import type { ToolDefinition, ToolResult } from './ToolRegistry';
import { TFile } from 'obsidian';

/**
 * PKM Management Tools
 * Tools for managing projects, notes, templates, and vault organization
 */

export function registerPKMTools(registry: any, plugin: JarvisPlugin): void {
  // Create Note Tool
  registry.register({
    name: 'create_note',
    description: 'Create a new note in the vault',
    category: 'vault',
    parameters: [
      { name: 'title', type: 'string', description: 'Note title', required: true },
      { name: 'content', type: 'string', description: 'Note content', required: false, default: '' },
      { name: 'folder', type: 'string', description: 'Target folder', required: false, default: '0-Inbox' },
      { name: 'template', type: 'string', description: 'Template name to use', required: false },
      { name: 'tags', type: 'array', description: 'Tags to add', required: false, default: [] }
    ],
    execute: async (params): Promise<ToolResult> => {
      const start = Date.now();
      try {
        const title = params.title as string;
        const folder = params.folder as string || '0-Inbox';
        const tags = params.tags as string[] || [];
        let content = params.content as string || '';

        // Apply template if specified
        if (params.template) {
          const templateContent = await getTemplate(plugin, params.template as string);
          if (templateContent) {
            content = templateContent.replace(/\{\{title\}\}/g, title)
              .replace(/\{\{date\}\}/g, new Date().toISOString().split('T')[0])
              .replace(/\{\{time\}\}/g, new Date().toLocaleTimeString());
          }
        }

        // Build frontmatter
        const frontmatter = `---
title: "${title}"
created: ${new Date().toISOString()}
tags: [${tags.map(t => `"${t}"`).join(', ')}]
---

`;

        const fullContent = frontmatter + (content || `# ${title}\n\n`);
        const path = `${folder}/${sanitizeFilename(title)}.md`;

        await plugin.vault.writeFile(path, fullContent);

        return {
          success: true,
          data: { path, title },
          metadata: { executionTimeMs: Date.now() - start, source: 'pkm' }
        };
      } catch (e) {
        return { success: false, error: e.message, metadata: { executionTimeMs: Date.now() - start } };
      }
    }
  } as ToolDefinition);

  // Update Note Tool
  registry.register({
    name: 'update_note',
    description: 'Update an existing note',
    category: 'vault',
    parameters: [
      { name: 'path', type: 'string', description: 'Note path', required: true },
      { name: 'content', type: 'string', description: 'New content (replaces all)', required: false },
      { name: 'append', type: 'string', description: 'Content to append', required: false },
      { name: 'prepend', type: 'string', description: 'Content to prepend after frontmatter', required: false }
    ],
    execute: async (params): Promise<ToolResult> => {
      const start = Date.now();
      try {
        const path = params.path as string;
        let existing = await plugin.vault.readFile(path);

        if (!existing) {
          return { success: false, error: 'Note not found' };
        }

        if (params.content) {
          existing = params.content as string;
        }
        if (params.append) {
          existing += '\n' + params.append;
        }
        if (params.prepend) {
          // Insert after frontmatter
          const fmEnd = existing.indexOf('---', 4);
          if (fmEnd > 0) {
            existing = existing.slice(0, fmEnd + 3) + '\n' + params.prepend + existing.slice(fmEnd + 3);
          } else {
            existing = params.prepend + '\n' + existing;
          }
        }

        await plugin.vault.writeFile(path, existing);

        return {
          success: true,
          data: { path, updated: true },
          metadata: { executionTimeMs: Date.now() - start, source: 'pkm' }
        };
      } catch (e) {
        return { success: false, error: e.message, metadata: { executionTimeMs: Date.now() - start } };
      }
    }
  } as ToolDefinition);

  // Move Note Tool
  registry.register({
    name: 'move_note',
    description: 'Move a note to a different folder',
    category: 'vault',
    parameters: [
      { name: 'path', type: 'string', description: 'Current note path', required: true },
      { name: 'destination', type: 'string', description: 'Destination folder', required: true }
    ],
    execute: async (params): Promise<ToolResult> => {
      const start = Date.now();
      try {
        const path = params.path as string;
        const dest = params.destination as string;
        const filename = path.split('/').pop();
        const newPath = `${dest}/${filename}`;

        const content = await plugin.vault.readFile(path);
        if (!content) {
          return { success: false, error: 'Note not found' };
        }

        await plugin.vault.writeFile(newPath, content);
        // Note: actual deletion requires Obsidian API

        return {
          success: true,
          data: { oldPath: path, newPath },
          metadata: { executionTimeMs: Date.now() - start, source: 'pkm' }
        };
      } catch (e) {
        return { success: false, error: e.message, metadata: { executionTimeMs: Date.now() - start } };
      }
    }
  } as ToolDefinition);

  // List Templates Tool
  registry.register({
    name: 'list_templates',
    description: 'List available note templates',
    category: 'vault',
    parameters: [],
    execute: async (): Promise<ToolResult> => {
      const start = Date.now();
      try {
        const templates = await findTemplates(plugin);
        return {
          success: true,
          data: templates,
          metadata: { executionTimeMs: Date.now() - start, source: 'pkm' }
        };
      } catch (e) {
        return { success: false, error: e.message, metadata: { executionTimeMs: Date.now() - start } };
      }
    }
  } as ToolDefinition);

  // Project Management Tool
  registry.register({
    name: 'manage_project',
    description: 'Create or update a project',
    category: 'vault',
    parameters: [
      { name: 'action', type: 'string', description: 'create, update, archive, list', required: true },
      { name: 'name', type: 'string', description: 'Project name', required: false },
      { name: 'status', type: 'string', description: 'Project status', required: false },
      { name: 'goals', type: 'array', description: 'Project goals', required: false }
    ],
    execute: async (params): Promise<ToolResult> => {
      const start = Date.now();
      try {
        const action = params.action as string;

        if (action === 'list') {
          const projects = await findProjects(plugin);
          return { success: true, data: projects, metadata: { executionTimeMs: Date.now() - start } };
        }

        if (action === 'create' && params.name) {
          const name = params.name as string;
          const goals = params.goals as string[] || [];
          const path = `1-Projects/${sanitizeFilename(name)}.md`;

          const content = `---
title: "${name}"
type: project
status: active
created: ${new Date().toISOString()}
---

# ${name}

## Goals
${goals.map(g => `- [ ] ${g}`).join('\n') || '- [ ] Define project goals'}

## Tasks
- [ ] Initial planning

## Notes


## Log
- ${new Date().toISOString().split('T')[0]}: Project created
`;

          await plugin.vault.writeFile(path, content);
          return { success: true, data: { path, name }, metadata: { executionTimeMs: Date.now() - start } };
        }

        return { success: false, error: 'Invalid action or missing parameters' };
      } catch (e) {
        return { success: false, error: e.message, metadata: { executionTimeMs: Date.now() - start } };
      }
    }
  } as ToolDefinition);

  // Graph Analysis Tool
  registry.register({
    name: 'analyze_graph',
    description: 'Analyze knowledge graph for insights',
    category: 'graph',
    parameters: [
      { name: 'analysis', type: 'string', description: 'orphans, clusters, bridges, connections', required: true },
      { name: 'notePath', type: 'string', description: 'Note to analyze (for connections)', required: false }
    ],
    execute: async (params): Promise<ToolResult> => {
      const start = Date.now();
      try {
        const kg = plugin.knowledgeGraph;
        if (!kg.isGraphBuilt()) {
          await kg.buildGraph();
        }

        const analysis = params.analysis as string;

        if (analysis === 'orphans') {
          const orphans = kg.findOrphans();
          return { success: true, data: orphans.slice(0, 20), metadata: { executionTimeMs: Date.now() - start } };
        }

        if (analysis === 'clusters') {
          const clusters = kg.findClusters();
          return { success: true, data: clusters.slice(0, 10), metadata: { executionTimeMs: Date.now() - start } };
        }

        if (analysis === 'bridges') {
          const bridges = kg.findBridgeNotes();
          return { success: true, data: bridges.slice(0, 10), metadata: { executionTimeMs: Date.now() - start } };
        }

        if (analysis === 'connections' && params.notePath) {
          const node = kg.getNode(params.notePath as string);
          if (node) {
            return {
              success: true,
              data: { outgoing: node.links, incoming: node.backlinks, tags: node.tags },
              metadata: { executionTimeMs: Date.now() - start }
            };
          }
        }

        return { success: false, error: 'Invalid analysis type' };
      } catch (e) {
        return { success: false, error: e.message, metadata: { executionTimeMs: Date.now() - start } };
      }
    }
  } as ToolDefinition);

  // Quick Capture Tool
  registry.register({
    name: 'quick_capture',
    description: 'Quickly capture a thought or note',
    category: 'vault',
    parameters: [
      { name: 'content', type: 'string', description: 'Content to capture', required: true },
      { name: 'tags', type: 'array', description: 'Tags to add', required: false, default: [] }
    ],
    execute: async (params): Promise<ToolResult> => {
      const start = Date.now();
      try {
        const content = params.content as string;
        const tags = params.tags as string[] || [];
        const file = await plugin.vault.quickCapture(content, tags);
        return {
          success: true,
          data: { path: file.path },
          metadata: { executionTimeMs: Date.now() - start, source: 'pkm' }
        };
      } catch (e) {
        return { success: false, error: e.message, metadata: { executionTimeMs: Date.now() - start } };
      }
    }
  } as ToolDefinition);

  // Add Task Tool
  registry.register({
    name: 'add_task',
    description: 'Add a task to TaskWarrior',
    category: 'task',
    parameters: [
      { name: 'description', type: 'string', description: 'Task description', required: true },
      { name: 'project', type: 'string', description: 'Project name', required: false },
      { name: 'priority', type: 'string', description: 'H, M, or L', required: false },
      { name: 'due', type: 'string', description: 'Due date', required: false },
      { name: 'tags', type: 'array', description: 'Tags', required: false }
    ],
    execute: async (params): Promise<ToolResult> => {
      const start = Date.now();
      try {
        const { exec } = require('child_process');
        const { promisify } = require('util');
        const execAsync = promisify(exec);

        let cmd = `task add "${(params.description as string).replace(/"/g, '\\"')}"`;
        if (params.project) cmd += ` project:${params.project}`;
        if (params.priority) cmd += ` priority:${params.priority}`;
        if (params.due) cmd += ` due:${params.due}`;
        if (params.tags) {
          for (const tag of params.tags as string[]) {
            cmd += ` +${tag}`;
          }
        }

        const { stdout } = await execAsync(cmd, { timeout: 5000 });
        const match = stdout.match(/Created task (\d+)/);
        const taskId = match ? match[1] : null;

        return {
          success: true,
          data: { taskId, description: params.description },
          metadata: { executionTimeMs: Date.now() - start, source: 'taskwarrior' }
        };
      } catch (e) {
        return { success: false, error: e.message, metadata: { executionTimeMs: Date.now() - start } };
      }
    }
  } as ToolDefinition);
}

// Helper functions
function sanitizeFilename(name: string): string {
  return name.replace(/[<>:"/\\|?*]/g, '-').replace(/\s+/g, ' ').trim();
}

async function getTemplate(plugin: JarvisPlugin, templateName: string): Promise<string | null> {
  const templatePaths = [
    `Templates/${templateName}.md`,
    `templates/${templateName}.md`,
    `_templates/${templateName}.md`
  ];

  for (const path of templatePaths) {
    const content = await plugin.vault.readFile(path);
    if (content) return content;
  }
  return null;
}

async function findTemplates(plugin: JarvisPlugin): Promise<string[]> {
  const allNotes = plugin.vault.getAllNotes();
  return allNotes
    .filter((note: TFile) =>
      note.path.toLowerCase().includes('template') ||
      note.path.startsWith('Templates/') ||
      note.path.startsWith('_templates/')
    )
    .map((note: TFile) => note.basename);
}

async function findProjects(plugin: JarvisPlugin): Promise<{ name: string; path: string; status: string }[]> {
  const allNotes = plugin.vault.getAllNotes();
  const projects: { name: string; path: string; status: string }[] = [];

  for (const note of allNotes.filter((n: TFile) => n.path.startsWith('1-Projects/'))) {
    const content = await plugin.vault.readFile(note.path);
    if (content) {
      const statusMatch = content.match(/status:\s*(\w+)/);
      projects.push({
        name: note.basename,
        path: note.path,
        status: statusMatch ? statusMatch[1] : 'unknown'
      });
    }
  }

  return projects;
}
