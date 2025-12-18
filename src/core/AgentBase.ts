import type { OllamaService } from '../services/OllamaService';
import type { VaultService } from '../services/VaultService';

export interface AgentContext {
  ollama: OllamaService;
  vault: VaultService;
  settings: AgentSettings;
}

export interface AgentSettings {
  enabled: boolean;
  [key: string]: unknown;
}

export interface AgentInput {
  query: string;
  context?: string;
  images?: string[];
  metadata?: Record<string, unknown>;
}

export interface AgentOutput {
  content: string;
  type: 'text' | 'markdown' | 'json' | 'task' | 'plan';
  metadata?: Record<string, unknown>;
  suggestions?: string[];
  actions?: AgentAction[];
}

export interface AgentAction {
  type: 'create_note' | 'update_note' | 'run_command' | 'open_link';
  payload: Record<string, unknown>;
  label: string;
}

export interface StreamCallback {
  (chunk: string): void;
}

export abstract class AgentBase {
  abstract readonly name: string;
  abstract readonly description: string;
  abstract readonly icon: string;

  protected context: AgentContext;

  constructor(context: AgentContext) {
    this.context = context;
  }

  /**
   * Check if this agent can handle the given input
   * Used for automatic agent routing
   */
  abstract canHandle(input: AgentInput): boolean;

  /**
   * Execute the agent's main logic
   */
  abstract execute(input: AgentInput, stream?: StreamCallback): Promise<AgentOutput>;

  /**
   * Get default settings for this agent
   */
  getDefaultSettings(): AgentSettings {
    return { enabled: true };
  }

  /**
   * Validate input before execution
   */
  protected validateInput(input: AgentInput): void {
    if (!input.query || input.query.trim().length === 0) {
      throw new Error('Query cannot be empty');
    }
  }

  /**
   * Helper to create a standard text output
   */
  protected createTextOutput(content: string, metadata?: Record<string, unknown>): AgentOutput {
    return {
      content,
      type: 'markdown',
      metadata
    };
  }

  /**
   * Helper to create an output with suggested actions
   */
  protected createActionOutput(
    content: string,
    actions: AgentAction[],
    metadata?: Record<string, unknown>
  ): AgentOutput {
    return {
      content,
      type: 'markdown',
      actions,
      metadata
    };
  }
}

/**
 * Interface for agents that support streaming responses
 */
export interface StreamableAgent {
  supportsStreaming: boolean;
}

/**
 * Type guard to check if an agent supports streaming
 */
export function isStreamableAgent(agent: AgentBase): agent is AgentBase & StreamableAgent {
  return 'supportsStreaming' in agent && (agent as StreamableAgent).supportsStreaming === true;
}
