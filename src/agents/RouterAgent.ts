import type JarvisPlugin from '../main';
import type { ToolResult } from '../tools/ToolRegistry';

/**
 * 5-Layer Agent Architecture for Intelligent Routing
 *
 * Layer 1: Intent Router - Classify user intent
 * Layer 2: Context Gatherer - Collect relevant context
 * Layer 3: Tool Planner - Decide which tools to use
 * Layer 4: Tool Executor - Execute tools deterministically
 * Layer 5: Response Synthesizer - Format final response
 */

export interface AgentState {
  query: string;
  intent: IntentClassification | null;
  context: GatheredContext | null;
  plan: ExecutionPlan | null;
  results: Map<string, ToolResult>;
  response: string | null;
  error: string | null;
}

export interface IntentClassification {
  primary: 'query' | 'action' | 'creation' | 'analysis' | 'management';
  secondary: string;
  confidence: number;
  entities: ExtractedEntity[];
  requiresTools: boolean;
  requiresLLM: boolean;
}

export interface ExtractedEntity {
  type: 'note' | 'project' | 'task' | 'date' | 'person' | 'topic' | 'url' | 'file';
  value: string;
  normalized?: string;
}

export interface GatheredContext {
  activeNote: { path: string; content: string } | null;
  recentNotes: { path: string; title: string }[];
  relevantNotes: { path: string; score: number; snippet: string }[];
  memoryFacts: { fact: string; category: string }[];
  taskContext: { pending: number; dueToday: number; overdue: number };
  graphContext: { linkedNotes: string[]; tags: string[] };
}

export interface ExecutionPlan {
  steps: PlanStep[];
  parallel: boolean;
  fallbackStrategy: 'retry' | 'skip' | 'abort';
}

export interface PlanStep {
  id: string;
  tool: string;
  params: Record<string, unknown>;
  dependsOn: string[];
  optional: boolean;
}

export class RouterAgent {
  private plugin: JarvisPlugin;

  constructor(plugin: JarvisPlugin) {
    this.plugin = plugin;
  }

  /**
   * Main entry point - routes query through all 5 layers
   */
  async process(query: string): Promise<string> {
    const state: AgentState = {
      query,
      intent: null,
      context: null,
      plan: null,
      results: new Map(),
      response: null,
      error: null
    };

    try {
      // Layer 1: Intent Classification
      state.intent = await this.classifyIntent(query);

      // Layer 2: Context Gathering
      state.context = await this.gatherContext(query, state.intent);

      // Layer 3: Tool Planning
      state.plan = await this.planExecution(query, state.intent, state.context);

      // Layer 4: Tool Execution
      if (state.plan && state.plan.steps.length > 0) {
        state.results = await this.executeTools(state.plan);
      }

      // Layer 5: Response Synthesis
      state.response = await this.synthesizeResponse(state);

      return state.response;
    } catch (error) {
      console.error('RouterAgent error:', error);
      return `I encountered an error: ${error.message}. Please try rephrasing your request.`;
    }
  }

  /**
   * Layer 1: Intent Classification
   * Fast, deterministic where possible
   */
  private async classifyIntent(query: string): Promise<IntentClassification> {
    const lowerQuery = query.toLowerCase();
    const entities = this.extractEntities(query);

    // Pattern-based classification (fast, no LLM needed)
    let primary: IntentClassification['primary'] = 'query';
    let secondary = 'general';
    let requiresTools = false;
    let requiresLLM = true;

    // Action intents
    if (/^(create|add|make|new|start)\b/i.test(query)) {
      primary = 'creation';
      if (/note|page|file/i.test(query)) secondary = 'note';
      else if (/task|todo|reminder/i.test(query)) secondary = 'task';
      else if (/project/i.test(query)) secondary = 'project';
      else if (/plan|goal/i.test(query)) secondary = 'plan';
      requiresTools = true;
    }
    // Management intents
    else if (/^(update|edit|modify|change|move|rename|delete|remove)\b/i.test(query)) {
      primary = 'management';
      requiresTools = true;
    }
    // Analysis intents
    else if (/^(analyze|find|search|show|list|summarize|explain|compare)\b/i.test(query)) {
      primary = 'analysis';
      if (/search|find/i.test(query)) secondary = 'search';
      else if (/summar/i.test(query)) secondary = 'summarize';
      else if (/connect|link|related/i.test(query)) secondary = 'connections';
      else if (/orphan/i.test(query)) secondary = 'orphans';
      requiresTools = true;
    }
    // Query intents
    else if (/^(what|how|why|when|where|who|which|can|does|is|are)\b/i.test(query)) {
      primary = 'query';
      if (/weather|news|current/i.test(query)) {
        secondary = 'web';
        requiresTools = true;
      } else if (/vault|note|file/i.test(query)) {
        secondary = 'vault';
        requiresTools = true;
      }
    }
    // Web research
    if (/research|look up|google|search.*web|online/i.test(query)) {
      secondary = 'web_research';
      requiresTools = true;
    }

    // Dashboard/status queries
    if (/dashboard|status|overview|today|agenda|focus/i.test(query)) {
      secondary = 'dashboard';
      requiresTools = true;
      requiresLLM = false;
    }

    return {
      primary,
      secondary,
      confidence: 0.8,
      entities,
      requiresTools,
      requiresLLM
    };
  }

  /**
   * Extract entities from query
   */
  private extractEntities(query: string): ExtractedEntity[] {
    const entities: ExtractedEntity[] = [];

    // Extract [[note links]]
    const noteLinks = query.match(/\[\[([^\]]+)\]\]/g);
    if (noteLinks) {
      for (const link of noteLinks) {
        entities.push({
          type: 'note',
          value: link.replace(/\[\[|\]\]/g, '')
        });
      }
    }

    // Extract #tags
    const tags = query.match(/#[\w-]+/g);
    if (tags) {
      for (const tag of tags) {
        entities.push({
          type: 'topic',
          value: tag
        });
      }
    }

    // Extract URLs
    const urls = query.match(/https?:\/\/[^\s]+/g);
    if (urls) {
      for (const url of urls) {
        entities.push({
          type: 'url',
          value: url
        });
      }
    }

    // Extract dates
    const datePatterns = [
      /\b(today|tomorrow|yesterday)\b/gi,
      /\b(next|this|last)\s+(week|month|year|monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/gi,
      /\b\d{4}-\d{2}-\d{2}\b/g,
      /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s+\d{1,2}/gi
    ];

    for (const pattern of datePatterns) {
      const matches = query.match(pattern);
      if (matches) {
        for (const match of matches) {
          entities.push({
            type: 'date',
            value: match
          });
        }
      }
    }

    return entities;
  }

  /**
   * Layer 2: Context Gathering
   */
  private async gatherContext(query: string, intent: IntentClassification): Promise<GatheredContext> {
    const context: GatheredContext = {
      activeNote: null,
      recentNotes: [],
      relevantNotes: [],
      memoryFacts: [],
      taskContext: { pending: 0, dueToday: 0, overdue: 0 },
      graphContext: { linkedNotes: [], tags: [] }
    };

    // Get active note
    const activeFile = this.plugin.vault.getActiveNote();
    if (activeFile) {
      const content = await this.plugin.vault.readNote(activeFile);
      context.activeNote = { path: activeFile.path, content };
    }

    // Get recent notes
    const recentFiles = this.plugin.vault.getRecentNotes(5);
    context.recentNotes = recentFiles.map(f => ({ path: f.path, title: f.basename }));

    // Semantic search for relevant notes (if embedding available)
    if (this.plugin.embedding && intent.requiresTools) {
      try {
        const results = await this.plugin.embedding.search(query, 3, 0.3);
        context.relevantNotes = results.map(r => ({
          path: r.document.path,
          score: r.score,
          snippet: r.snippet || ''
        }));
      } catch {
        // Embedding might not be initialized
      }
    }

    // Get memory facts
    if (this.plugin.memory) {
      try {
        const facts = await this.plugin.memory.recall(query, { limit: 5 });
        context.memoryFacts = facts.map(f => ({ fact: f.fact, category: f.category }));
      } catch {
        // Memory might not be initialized
      }
    }

    // Get task context
    if (intent.secondary === 'task' || intent.secondary === 'dashboard') {
      try {
        const agenda = await this.plugin.dashboard.getAgenda();
        context.taskContext = {
          pending: agenda.filter(a => a.status === 'pending').length,
          dueToday: agenda.filter(a => a.status === 'due_today').length,
          overdue: agenda.filter(a => a.status === 'overdue').length
        };
      } catch {
        // Dashboard might fail
      }
    }

    return context;
  }

  /**
   * Layer 3: Tool Planning
   */
  private async planExecution(
    query: string,
    intent: IntentClassification,
    context: GatheredContext
  ): Promise<ExecutionPlan> {
    const steps: PlanStep[] = [];

    // Dashboard queries
    if (intent.secondary === 'dashboard') {
      steps.push({
        id: 'dashboard',
        tool: 'get_dashboard',
        params: {},
        dependsOn: [],
        optional: false
      });
      return { steps, parallel: false, fallbackStrategy: 'skip' };
    }

    // Web research
    if (intent.secondary === 'web_research' || intent.secondary === 'web') {
      steps.push({
        id: 'web_search',
        tool: 'web_search',
        params: { query, limit: 5 },
        dependsOn: [],
        optional: false
      });
    }

    // Vault search
    if (intent.secondary === 'vault' || intent.secondary === 'search') {
      steps.push({
        id: 'vault_search',
        tool: 'vault_search',
        params: { query, limit: 5 },
        dependsOn: [],
        optional: false
      });
    }

    // Task queries
    if (intent.secondary === 'task') {
      steps.push({
        id: 'task_query',
        tool: 'task_query',
        params: { filter: 'status:pending', limit: 10 },
        dependsOn: [],
        optional: false
      });
    }

    // Graph analysis
    if (intent.secondary === 'connections' || intent.secondary === 'orphans') {
      const notePath = context.activeNote?.path || intent.entities.find(e => e.type === 'note')?.value;
      if (notePath) {
        steps.push({
          id: 'graph',
          tool: 'graph_connections',
          params: { notePath },
          dependsOn: [],
          optional: true
        });
      }
    }

    // Memory recall for relevant facts
    if (intent.primary === 'query' && context.memoryFacts.length === 0) {
      steps.push({
        id: 'memory',
        tool: 'memory_recall',
        params: { query },
        dependsOn: [],
        optional: true
      });
    }

    // Note creation
    if (intent.primary === 'creation' && intent.secondary === 'note') {
      steps.push({
        id: 'create_note',
        tool: 'create_note',
        params: { query },
        dependsOn: [],
        optional: false
      });
    }

    // Task creation
    if (intent.primary === 'creation' && intent.secondary === 'task') {
      steps.push({
        id: 'create_task',
        tool: 'create_task',
        params: { description: query },
        dependsOn: [],
        optional: false
      });
    }

    return {
      steps,
      parallel: steps.length > 1 && !steps.some(s => s.dependsOn.length > 0),
      fallbackStrategy: 'skip'
    };
  }

  /**
   * Layer 4: Tool Execution
   */
  private async executeTools(plan: ExecutionPlan): Promise<Map<string, ToolResult>> {
    const results = new Map<string, ToolResult>();

    if (plan.parallel) {
      // Execute all tools in parallel
      const promises = plan.steps.map(async step => {
        const result = await this.executeTool(step.tool, step.params);
        return { id: step.id, result };
      });

      const outcomes = await Promise.allSettled(promises);
      for (const outcome of outcomes) {
        if (outcome.status === 'fulfilled') {
          results.set(outcome.value.id, outcome.value.result);
        }
      }
    } else {
      // Execute sequentially
      for (const step of plan.steps) {
        // Check dependencies
        const depsOk = step.dependsOn.every(dep => {
          const depResult = results.get(dep);
          return depResult?.success;
        });

        if (!depsOk && step.dependsOn.length > 0) {
          if (!step.optional) {
            results.set(step.id, { success: false, error: 'Dependency failed' });
          }
          continue;
        }

        const result = await this.executeTool(step.tool, step.params);
        results.set(step.id, result);
      }
    }

    return results;
  }

  /**
   * Execute a single tool
   */
  private async executeTool(tool: string, params: Record<string, unknown>): Promise<ToolResult> {
    // Special built-in tools
    if (tool === 'get_dashboard') {
      try {
        const data = await this.plugin.dashboard.getDashboard();
        return { success: true, data };
      } catch (e) {
        return { success: false, error: e.message };
      }
    }

    if (tool === 'create_note') {
      try {
        const title = params.query as string;
        const path = `0-Inbox/${title.replace(/[^a-zA-Z0-9 ]/g, '')}.md`;
        const content = `# ${title}\n\nCreated by Jarvis on ${new Date().toISOString()}\n\n`;
        await this.plugin.vault.writeFile(path, content);
        return { success: true, data: { path } };
      } catch (e) {
        return { success: false, error: e.message };
      }
    }

    if (tool === 'create_task') {
      try {
        const { exec } = require('child_process');
        const { promisify } = require('util');
        const execAsync = promisify(exec);
        const desc = params.description as string;
        await execAsync(`task add "${desc.replace(/"/g, '\\"')}"`, { timeout: 5000 });
        return { success: true, data: { description: desc } };
      } catch (e) {
        return { success: false, error: e.message };
      }
    }

    // Use ToolRegistry for standard tools
    return this.plugin.toolRegistry.execute(tool, params);
  }

  /**
   * Layer 5: Response Synthesis
   */
  private async synthesizeResponse(state: AgentState): Promise<string> {
    // Dashboard response - no LLM needed
    if (state.intent?.secondary === 'dashboard' && state.results.has('dashboard')) {
      const dashResult = state.results.get('dashboard');
      if (dashResult?.success && dashResult.data) {
        return this.plugin.dashboard.formatAsMarkdown(dashResult.data as any);
      }
    }

    // If no LLM needed and we have tool results, format them directly
    if (!state.intent?.requiresLLM && state.results.size > 0) {
      return this.formatToolResults(state.results);
    }

    // Build context for LLM
    let contextPrompt = '';

    // Add tool results to context
    for (const [id, result] of state.results) {
      if (result.success && result.data) {
        contextPrompt += `\n[${id} result]: ${JSON.stringify(result.data, null, 2)}\n`;
      }
    }

    // Add memory context
    if (state.context?.memoryFacts.length) {
      contextPrompt += '\n[User facts]: ' + state.context.memoryFacts.map(f => f.fact).join('; ');
    }

    // Add active note context
    if (state.context?.activeNote) {
      contextPrompt += `\n[Active note: ${state.context.activeNote.path}]: ${state.context.activeNote.content.substring(0, 500)}...`;
    }

    // Generate response with LLM
    try {
      const systemPrompt = `You are Jarvis, a helpful AI assistant for personal knowledge management.
You have access to the user's vault, tasks, and memory.
Be concise and actionable. Use markdown formatting.
${contextPrompt}`;

      const response = await this.plugin.ollama.chat([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: state.query }
      ]);

      return response;
    } catch (e) {
      // Fallback to tool results if LLM fails
      if (state.results.size > 0) {
        return this.formatToolResults(state.results);
      }
      throw e;
    }
  }

  /**
   * Format tool results as readable text
   */
  private formatToolResults(results: Map<string, ToolResult>): string {
    let output = '';

    for (const [id, result] of results) {
      if (!result.success) {
        output += `**${id}**: Error - ${result.error}\n\n`;
        continue;
      }

      output += `**${id}**:\n`;

      if (Array.isArray(result.data)) {
        for (const item of result.data.slice(0, 5)) {
          if (typeof item === 'object') {
            output += `- ${item.title || item.description || item.path || JSON.stringify(item)}\n`;
          } else {
            output += `- ${item}\n`;
          }
        }
      } else if (typeof result.data === 'object') {
        output += '```json\n' + JSON.stringify(result.data, null, 2) + '\n```\n';
      } else {
        output += `${result.data}\n`;
      }

      output += '\n';
    }

    return output || 'No results found.';
  }
}
