export type EventHandler<T = unknown> = (data: T) => void | Promise<void>;

export interface EventSubscription {
  unsubscribe: () => void;
}

export class EventBus {
  private handlers: Map<string, Set<EventHandler>> = new Map();

  /**
   * Subscribe to an event
   */
  on<T = unknown>(event: string, handler: EventHandler<T>): EventSubscription {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set());
    }
    this.handlers.get(event)!.add(handler as EventHandler);

    return {
      unsubscribe: () => {
        this.off(event, handler);
      }
    };
  }

  /**
   * Subscribe to an event (one-time)
   */
  once<T = unknown>(event: string, handler: EventHandler<T>): EventSubscription {
    const wrapper: EventHandler<T> = (data) => {
      this.off(event, wrapper);
      return handler(data);
    };
    return this.on(event, wrapper);
  }

  /**
   * Unsubscribe from an event
   */
  off<T = unknown>(event: string, handler: EventHandler<T>): void {
    const eventHandlers = this.handlers.get(event);
    if (eventHandlers) {
      eventHandlers.delete(handler as EventHandler);
      if (eventHandlers.size === 0) {
        this.handlers.delete(event);
      }
    }
  }

  /**
   * Emit an event
   */
  async emit<T = unknown>(event: string, data?: T): Promise<void> {
    const eventHandlers = this.handlers.get(event);
    if (eventHandlers) {
      const promises: Promise<void>[] = [];
      for (const handler of eventHandlers) {
        const result = handler(data);
        if (result instanceof Promise) {
          promises.push(result);
        }
      }
      await Promise.all(promises);
    }
  }

  /**
   * Emit an event synchronously (fire and forget)
   */
  emitSync<T = unknown>(event: string, data?: T): void {
    const eventHandlers = this.handlers.get(event);
    if (eventHandlers) {
      for (const handler of eventHandlers) {
        try {
          handler(data);
        } catch (error) {
          console.error(`Error in event handler for '${event}':`, error);
        }
      }
    }
  }

  /**
   * Clear all handlers for an event
   */
  clear(event: string): void {
    this.handlers.delete(event);
  }

  /**
   * Clear all handlers
   */
  clearAll(): void {
    this.handlers.clear();
  }

  /**
   * Get the number of handlers for an event
   */
  listenerCount(event: string): number {
    return this.handlers.get(event)?.size ?? 0;
  }
}

// Predefined events
export const JarvisEvents = {
  // Agent events
  AGENT_STARTED: 'agent:started',
  AGENT_COMPLETED: 'agent:completed',
  AGENT_ERROR: 'agent:error',
  AGENT_STREAM: 'agent:stream',

  // Vault events
  NOTE_CREATED: 'vault:note_created',
  NOTE_UPDATED: 'vault:note_updated',
  NOTE_DELETED: 'vault:note_deleted',

  // Task events
  TASK_CREATED: 'task:created',
  TASK_COMPLETED: 'task:completed',

  // UI events
  VIEW_OPENED: 'ui:view_opened',
  VIEW_CLOSED: 'ui:view_closed',
  MODE_CHANGED: 'ui:mode_changed',

  // Connection events
  OLLAMA_CONNECTED: 'ollama:connected',
  OLLAMA_DISCONNECTED: 'ollama:disconnected',

  // Embedding events
  EMBEDDING_STARTED: 'embedding:started',
  EMBEDDING_PROGRESS: 'embedding:progress',
  EMBEDDING_COMPLETED: 'embedding:completed'
} as const;

// Event data types
export interface AgentStartedEvent {
  agentName: string;
  input: unknown;
}

export interface AgentCompletedEvent {
  agentName: string;
  output: unknown;
  duration: number;
}

export interface AgentErrorEvent {
  agentName: string;
  error: Error;
}

export interface AgentStreamEvent {
  agentName: string;
  chunk: string;
}

export interface EmbeddingProgressEvent {
  current: number;
  total: number;
  currentFile?: string;
}

// Global event bus instance
export const eventBus = new EventBus();
