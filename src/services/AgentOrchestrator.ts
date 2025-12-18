import { StateGraph, END, START, Annotation } from '@langchain/langgraph';
import { BaseMessage, HumanMessage, AIMessage, SystemMessage } from '@langchain/core/messages';
import { z } from 'zod';
import type JarvisPlugin from '../main';
import { getErrorService, ErrorCategory, Schemas } from './ErrorHandlingService';

// Agent state definition
const AgentState = Annotation.Root({
  messages: Annotation<BaseMessage[]>({
    reducer: (x, y) => x.concat(y),
    default: () => []
  }),
  currentTask: Annotation<string>({
    reducer: (_, y) => y,
    default: () => ''
  }),
  context: Annotation<Record<string, unknown>>({
    reducer: (x, y) => ({ ...x, ...y }),
    default: () => ({})
  }),
  toolResults: Annotation<string[]>({
    reducer: (x, y) => x.concat(y),
    default: () => []
  }),
  error: Annotation<string | null>({
    reducer: (_, y) => y,
    default: () => null
  }),
  iterations: Annotation<number>({
    reducer: (_, y) => y,
    default: () => 0
  })
});

type AgentStateType = typeof AgentState.State;

// Tool definitions for the agent
interface AgentTool {
  name: string;
  description: string;
  schema: z.ZodType<unknown>;
  execute: (input: unknown, plugin: JarvisPlugin) => Promise<string>;
}

export class AgentOrchestrator {
  private plugin: JarvisPlugin;
  private errorService = getErrorService();
  private tools: Map<string, AgentTool> = new Map();
  private maxIterations = 5;

  constructor(plugin: JarvisPlugin) {
    this.plugin = plugin;
    this.registerBuiltinTools();
  }

  private registerBuiltinTools(): void {
    // Search vault tool
    this.tools.set('search_vault', {
      name: 'search_vault',
      description: 'Search the vault for notes semantically related to a query',
      schema: z.object({ query: z.string() }),
      execute: async (input, plugin) => {
        const { query } = input as { query: string };
        if (!plugin.embedding) return 'Embedding service not available';

        const results = await plugin.embedding.search(query, 5, 0.3);
        if (results.length === 0) return 'No results found';

        return results.map(r =>
          `[[${r.document.metadata.title}]] (${Math.round(r.score * 100)}%): ${r.snippet.substring(0, 100)}...`
        ).join('\n');
      }
    });

    // Read note tool
    this.tools.set('read_note', {
      name: 'read_note',
      description: 'Read the content of a specific note',
      schema: z.object({ path: z.string() }),
      execute: async (input, plugin) => {
        const { path } = input as { path: string };
        const content = await plugin.vault.readFile(path);
        if (!content) return `Note not found: ${path}`;
        return content.substring(0, 2000) + (content.length > 2000 ? '...' : '');
      }
    });

    // Get current note tool
    this.tools.set('get_current_note', {
      name: 'get_current_note',
      description: 'Get the content of the currently active note',
      schema: z.object({}),
      execute: async (_, plugin) => {
        const content = await plugin.vault.getActiveNoteContent();
        if (!content) return 'No active note';
        return content.substring(0, 2000) + (content.length > 2000 ? '...' : '');
      }
    });

    // Web search tool
    this.tools.set('web_search', {
      name: 'web_search',
      description: 'Search the web for information',
      schema: z.object({ query: z.string() }),
      execute: async (input, plugin) => {
        const { query } = input as { query: string };
        if (!plugin.webResearch) return 'Web research service not available';

        try {
          const results = await plugin.webResearch.search(query, 3);
          return results.map(r => `${r.title}: ${r.snippet}`).join('\n\n');
        } catch (e) {
          return `Search failed: ${e instanceof Error ? e.message : 'Unknown error'}`;
        }
      }
    });

    // Graph analysis tool
    this.tools.set('analyze_graph', {
      name: 'analyze_graph',
      description: 'Analyze the knowledge graph for insights',
      schema: z.object({ analysis_type: z.enum(['stats', 'orphans', 'bridges', 'clusters']) }),
      execute: async (input, plugin) => {
        const { analysis_type } = input as { analysis_type: string };
        if (!plugin.knowledgeGraph) return 'Knowledge graph service not available';

        if (!plugin.knowledgeGraph.isGraphBuilt()) {
          await plugin.knowledgeGraph.buildGraph();
        }

        switch (analysis_type) {
          case 'stats':
            const stats = plugin.knowledgeGraph.getStats();
            return `Nodes: ${stats.totalNodes}, Edges: ${stats.totalEdges}, Orphans: ${stats.orphanCount}, Clusters: ${stats.clusters}`;
          case 'orphans':
            const orphans = plugin.knowledgeGraph.findOrphans();
            return orphans.slice(0, 10).map(o => o.title).join(', ') || 'No orphans';
          case 'bridges':
            const bridges = plugin.knowledgeGraph.findBridgeNotes(5);
            return bridges.map(b => `${b.title} (${b.links.length} out, ${b.backlinks.length} in)`).join(', ');
          case 'clusters':
            const clusters = plugin.knowledgeGraph.findClusters();
            return clusters.slice(0, 5).map(c => `${c.mainTopic}: ${c.size} notes`).join(', ');
          default:
            return 'Unknown analysis type';
        }
      }
    });

    // Summarize tool
    this.tools.set('summarize', {
      name: 'summarize',
      description: 'Summarize a piece of text',
      schema: z.object({ text: z.string() }),
      execute: async (input, plugin) => {
        const { text } = input as { text: string };
        return await plugin.ollama.summarize(text, 'bullets');
      }
    });

    // Find path tool
    this.tools.set('find_path', {
      name: 'find_path',
      description: 'Find the connection path between two notes',
      schema: z.object({ from: z.string(), to: z.string() }),
      execute: async (input, plugin) => {
        const { from, to } = input as { from: string; to: string };
        if (!plugin.knowledgeGraph) return 'Knowledge graph not available';

        if (!plugin.knowledgeGraph.isGraphBuilt()) {
          await plugin.knowledgeGraph.buildGraph();
        }

        const path = plugin.knowledgeGraph.findPath(from, to);
        if (!path) return `No path found between ${from} and ${to}`;

        return `Path (${path.length} hops): ${path.path.map(p => p.split('/').pop()?.replace('.md', '')).join(' → ')}`;
      }
    });
  }

  /**
   * Create a reasoning agent for complex queries
   */
  createReasoningAgent() {
    const self = this;

    // Node functions
    async function planNode(state: AgentStateType): Promise<Partial<AgentStateType>> {
      const lastMessage = state.messages[state.messages.length - 1];
      const task = lastMessage?.content?.toString() || '';

      // Use LLM to create a plan
      const planPrompt = `You are a planning assistant. Given this task, create a brief plan (2-4 steps):

Task: ${task}

Available tools: ${Array.from(self.tools.keys()).join(', ')}

Respond with a numbered list of steps. Be concise.`;

      try {
        const plan = await self.plugin.ollama.chat([
          { role: 'system', content: 'You are a planning assistant. Create brief, actionable plans.' },
          { role: 'user', content: planPrompt }
        ]);

        return {
          context: { plan },
          messages: [new AIMessage(`Plan created:\n${plan}`)]
        };
      } catch (e) {
        return {
          error: `Planning failed: ${e instanceof Error ? e.message : 'Unknown error'}`
        };
      }
    }

    async function executeNode(state: AgentStateType): Promise<Partial<AgentStateType>> {
      const task = state.currentTask || state.messages[0]?.content?.toString() || '';
      const plan = (state.context.plan as string) || '';

      // Determine which tool to use based on the task
      const toolSelectionPrompt = `Given this task and plan, which tool should be used?

Task: ${task}
Plan: ${plan}

Available tools:
${Array.from(self.tools.entries()).map(([name, tool]) => `- ${name}: ${tool.description}`).join('\n')}

Respond with ONLY the tool name, nothing else. If no tool is needed, respond with "none".`;

      try {
        const toolChoice = await self.plugin.ollama.chat([
          { role: 'system', content: 'You select the appropriate tool. Respond with only the tool name.' },
          { role: 'user', content: toolSelectionPrompt }
        ]);

        const toolName = toolChoice.trim().toLowerCase();
        const tool = self.tools.get(toolName);

        if (!tool) {
          return {
            toolResults: [`No tool needed or tool not found: ${toolName}`],
            iterations: state.iterations + 1
          };
        }

        // Generate tool input
        const inputPrompt = `Generate the input for the "${toolName}" tool based on this task: ${task}

Respond with a valid JSON object matching the tool's requirements.`;

        const inputStr = await self.plugin.ollama.chat([
          { role: 'system', content: 'Generate JSON input for tools. Respond with only valid JSON.' },
          { role: 'user', content: inputPrompt }
        ]);

        // Parse and execute
        let input: unknown;
        try {
          // Extract JSON from response
          const jsonMatch = inputStr.match(/\{[\s\S]*\}/);
          input = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
        } catch {
          input = {};
        }

        const result = await tool.execute(input, self.plugin);

        return {
          toolResults: [result],
          iterations: state.iterations + 1,
          messages: [new AIMessage(`Tool ${toolName} result:\n${result}`)]
        };
      } catch (e) {
        return {
          error: `Execution failed: ${e instanceof Error ? e.message : 'Unknown error'}`,
          iterations: state.iterations + 1
        };
      }
    }

    async function synthesizeNode(state: AgentStateType): Promise<Partial<AgentStateType>> {
      const task = state.currentTask || state.messages[0]?.content?.toString() || '';
      const results = state.toolResults.join('\n\n');

      const synthesisPrompt = `Based on the following task and results, provide a comprehensive answer:

Task: ${task}

Results gathered:
${results}

Provide a clear, well-structured response.`;

      try {
        const response = await self.plugin.ollama.chat([
          { role: 'system', content: 'Synthesize information into clear, helpful responses.' },
          { role: 'user', content: synthesisPrompt }
        ]);

        return {
          messages: [new AIMessage(response)]
        };
      } catch (e) {
        return {
          error: `Synthesis failed: ${e instanceof Error ? e.message : 'Unknown error'}`
        };
      }
    }

    // Routing function
    function shouldContinue(state: AgentStateType): string {
      if (state.error) return 'error';
      if (state.iterations >= self.maxIterations) return 'synthesize';
      if (state.toolResults.length === 0) return 'execute';
      return 'synthesize';
    }

    // Build the graph
    const workflow = new StateGraph(AgentState)
      .addNode('plan', planNode)
      .addNode('execute', executeNode)
      .addNode('synthesize', synthesizeNode)
      .addNode('error', async (state) => ({
        messages: [new AIMessage(`I encountered an error: ${state.error}`)]
      }))
      .addEdge(START, 'plan')
      .addEdge('plan', 'execute')
      .addConditionalEdges('execute', shouldContinue, {
        execute: 'execute',
        synthesize: 'synthesize',
        error: 'error'
      })
      .addEdge('synthesize', END)
      .addEdge('error', END);

    return workflow.compile();
  }

  /**
   * Run a complex query through the reasoning agent
   */
  async runReasoningQuery(query: string): Promise<string> {
    try {
      const agent = this.createReasoningAgent();

      const result = await agent.invoke({
        messages: [new HumanMessage(query)],
        currentTask: query
      });

      // Extract the final message
      const messages = result.messages as BaseMessage[];
      const lastMessage = messages[messages.length - 1];

      return lastMessage?.content?.toString() || 'No response generated';
    } catch (e) {
      const error = this.errorService.createError(
        ErrorCategory.UNKNOWN,
        `Reasoning agent failed: ${e instanceof Error ? e.message : 'Unknown error'}`,
        { originalError: e instanceof Error ? e : undefined }
      );
      return this.errorService.formatErrorForChat(error);
    }
  }

  /**
   * Create a simple chain for quick operations
   */
  async runSimpleChain(
    task: 'summarize' | 'explain' | 'expand' | 'plan',
    input: string
  ): Promise<string> {
    const prompts: Record<string, string> = {
      summarize: 'Summarize the following text in bullet points:\n\n',
      explain: 'Explain the following concept clearly:\n\n',
      expand: 'Expand the following notes into detailed paragraphs:\n\n',
      plan: 'Create an actionable plan for:\n\n'
    };

    try {
      const response = await this.errorService.withRetry(
        () => this.plugin.ollama.chat([
          { role: 'system', content: 'You are a helpful assistant. Be concise and clear.' },
          { role: 'user', content: prompts[task] + input }
        ]),
        ErrorCategory.OLLAMA
      );

      return response;
    } catch (e) {
      if (e && typeof e === 'object' && 'message' in e) {
        return this.errorService.formatErrorForChat(e as any);
      }
      return `Error: ${e}`;
    }
  }

  /**
   * Writing copilot - continue writing from context
   */
  async continueWriting(context: string, instruction?: string): Promise<string> {
    const prompt = instruction
      ? `Continue the following text according to this instruction: "${instruction}"\n\nText:\n${context}`
      : `Continue the following text naturally, maintaining the same style and tone:\n\n${context}`;

    try {
      const response = await this.errorService.withRetry(
        () => this.plugin.ollama.chat([
          {
            role: 'system',
            content: 'You are a writing assistant. Continue text naturally, matching the style and tone. Only output the continuation, not the original text.'
          },
          { role: 'user', content: prompt }
        ]),
        ErrorCategory.OLLAMA
      );

      return response;
    } catch (e) {
      throw e;
    }
  }

  /**
   * Generate daily briefing
   */
  async generateDailyBriefing(): Promise<string> {
    const results: string[] = [];

    // Get graph stats if available
    if (this.plugin.knowledgeGraph) {
      if (!this.plugin.knowledgeGraph.isGraphBuilt()) {
        await this.plugin.knowledgeGraph.buildGraph();
      }
      const stats = this.plugin.knowledgeGraph.getStats();
      results.push(`📊 **Vault Stats:** ${stats.totalNodes} notes, ${stats.totalEdges} links`);

      const orphans = this.plugin.knowledgeGraph.findOrphans();
      if (orphans.length > 0) {
        results.push(`⚠️ **Attention needed:** ${orphans.length} orphan notes`);
      }
    }

    // Get recent notes (would need vault service enhancement)
    // For now, provide structure
    results.push(`\n📅 **Today's Focus:**`);
    results.push(`- Review recent notes`);
    results.push(`- Process inbox items`);
    results.push(`- Check due tasks`);

    // Random insight
    if (this.plugin.embedding) {
      try {
        const randomSearch = await this.plugin.embedding.search('important', 1, 0.2);
        if (randomSearch.length > 0) {
          results.push(`\n💡 **Random insight:** [[${randomSearch[0].document.metadata.title}]]`);
        }
      } catch {
        // Ignore embedding errors for briefing
      }
    }

    // Synthesize with AI
    try {
      const synthesis = await this.plugin.ollama.chat([
        {
          role: 'system',
          content: 'Create a brief, motivating daily briefing from the following data. Be encouraging and actionable.'
        },
        { role: 'user', content: results.join('\n') }
      ]);

      return `# 🌅 Daily Briefing\n\n${synthesis}`;
    } catch {
      return `# 🌅 Daily Briefing\n\n${results.join('\n')}`;
    }
  }

  /**
   * Get available tools info
   */
  getToolsInfo(): { name: string; description: string }[] {
    return Array.from(this.tools.entries()).map(([name, tool]) => ({
      name,
      description: tool.description
    }));
  }
}
