import { AgentBase, AgentContext, AgentInput, AgentOutput, StreamCallback } from './AgentBase';

export interface AgentRegistration {
  agent: AgentBase;
  priority: number;
}

export class AgentRegistry {
  private agents: Map<string, AgentRegistration> = new Map();
  private context: AgentContext;

  constructor(context: AgentContext) {
    this.context = context;
  }

  /**
   * Register an agent with the registry
   */
  register(agent: AgentBase, priority: number = 0): void {
    this.agents.set(agent.name, { agent, priority });
  }

  /**
   * Unregister an agent
   */
  unregister(name: string): boolean {
    return this.agents.delete(name);
  }

  /**
   * Get an agent by name
   */
  get(name: string): AgentBase | undefined {
    return this.agents.get(name)?.agent;
  }

  /**
   * Get all registered agents
   */
  getAll(): AgentBase[] {
    return Array.from(this.agents.values())
      .sort((a, b) => b.priority - a.priority)
      .map(r => r.agent);
  }

  /**
   * Get all enabled agents
   */
  getEnabled(): AgentBase[] {
    return this.getAll().filter(agent => {
      const settings = agent.getDefaultSettings();
      return settings.enabled !== false;
    });
  }

  /**
   * Find the best agent to handle the input
   * Returns the highest priority agent that can handle the input
   */
  findHandler(input: AgentInput): AgentBase | undefined {
    const sorted = Array.from(this.agents.values())
      .sort((a, b) => b.priority - a.priority);

    for (const { agent } of sorted) {
      if (agent.canHandle(input)) {
        return agent;
      }
    }
    return undefined;
  }

  /**
   * Find all agents that can handle the input
   */
  findAllHandlers(input: AgentInput): AgentBase[] {
    return Array.from(this.agents.values())
      .filter(({ agent }) => agent.canHandle(input))
      .sort((a, b) => b.priority - a.priority)
      .map(r => r.agent);
  }

  /**
   * Execute input with automatic agent selection
   */
  async execute(input: AgentInput, stream?: StreamCallback): Promise<AgentOutput> {
    const agent = this.findHandler(input);
    if (!agent) {
      return {
        content: 'No agent available to handle this request.',
        type: 'text'
      };
    }
    return agent.execute(input, stream);
  }

  /**
   * Execute input with a specific agent
   */
  async executeWith(
    agentName: string,
    input: AgentInput,
    stream?: StreamCallback
  ): Promise<AgentOutput> {
    const agent = this.get(agentName);
    if (!agent) {
      throw new Error(`Agent '${agentName}' not found`);
    }
    return agent.execute(input, stream);
  }

  /**
   * Get agent metadata for UI display
   */
  getAgentInfo(): Array<{ name: string; description: string; icon: string; enabled: boolean }> {
    return this.getAll().map(agent => ({
      name: agent.name,
      description: agent.description,
      icon: agent.icon,
      enabled: agent.getDefaultSettings().enabled !== false
    }));
  }
}
