import { Notice } from 'obsidian';
import { z } from 'zod';

// Error types for categorization
export enum ErrorCategory {
  NETWORK = 'network',
  OLLAMA = 'ollama',
  VALIDATION = 'validation',
  VAULT = 'vault',
  EMBEDDING = 'embedding',
  GRAPH = 'graph',
  UNKNOWN = 'unknown'
}

export enum ErrorSeverity {
  LOW = 'low',       // Recoverable, user can retry
  MEDIUM = 'medium', // Degraded functionality
  HIGH = 'high',     // Feature unavailable
  CRITICAL = 'critical' // Plugin may not work
}

export interface JarvisError {
  category: ErrorCategory;
  severity: ErrorSeverity;
  message: string;
  originalError?: Error;
  context?: Record<string, unknown>;
  timestamp: Date;
  retryable: boolean;
}

export interface RetryConfig {
  maxRetries: number;
  baseDelayMs: number;
  maxDelayMs: number;
  backoffMultiplier: number;
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  baseDelayMs: 1000,
  maxDelayMs: 10000,
  backoffMultiplier: 2
};

// Validation schemas
export const Schemas = {
  // URL validation
  url: z.string().url('Invalid URL format'),

  // Note path validation
  notePath: z.string()
    .min(1, 'Note path cannot be empty')
    .regex(/^[^<>:"|?*]+$/, 'Invalid characters in path'),

  // Search query validation
  searchQuery: z.string()
    .min(1, 'Search query cannot be empty')
    .max(1000, 'Search query too long'),

  // Embedding vector validation
  embedding: z.array(z.number()).min(1, 'Embedding cannot be empty'),

  // Chat message validation
  chatMessage: z.object({
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string().min(1, 'Message content cannot be empty')
  }),

  // Ollama response validation
  ollamaResponse: z.object({
    model: z.string(),
    message: z.object({
      role: z.string(),
      content: z.string()
    }).optional(),
    response: z.string().optional()
  }),

  // Graph node validation
  graphNode: z.object({
    path: z.string(),
    title: z.string(),
    links: z.array(z.string()),
    backlinks: z.array(z.string())
  })
};

export class ErrorHandlingService {
  private errorLog: JarvisError[] = [];
  private maxLogSize = 100;
  private onErrorCallbacks: ((error: JarvisError) => void)[] = [];

  /**
   * Create a standardized Jarvis error
   */
  createError(
    category: ErrorCategory,
    message: string,
    options?: {
      severity?: ErrorSeverity;
      originalError?: Error;
      context?: Record<string, unknown>;
      retryable?: boolean;
    }
  ): JarvisError {
    const error: JarvisError = {
      category,
      severity: options?.severity || this.inferSeverity(category),
      message,
      originalError: options?.originalError,
      context: options?.context,
      timestamp: new Date(),
      retryable: options?.retryable ?? this.inferRetryable(category)
    };

    this.logError(error);
    return error;
  }

  /**
   * Wrap an async function with error handling
   */
  async withErrorHandling<T>(
    fn: () => Promise<T>,
    category: ErrorCategory,
    context?: Record<string, unknown>
  ): Promise<{ success: true; data: T } | { success: false; error: JarvisError }> {
    try {
      const data = await fn();
      return { success: true, data };
    } catch (e) {
      const error = this.createError(
        category,
        e instanceof Error ? e.message : String(e),
        {
          originalError: e instanceof Error ? e : undefined,
          context
        }
      );
      return { success: false, error };
    }
  }

  /**
   * Execute with retry logic
   */
  async withRetry<T>(
    fn: () => Promise<T>,
    category: ErrorCategory,
    config: Partial<RetryConfig> = {}
  ): Promise<T> {
    const retryConfig = { ...DEFAULT_RETRY_CONFIG, ...config };
    let lastError: Error | undefined;
    let delay = retryConfig.baseDelayMs;

    for (let attempt = 0; attempt <= retryConfig.maxRetries; attempt++) {
      try {
        return await fn();
      } catch (e) {
        lastError = e instanceof Error ? e : new Error(String(e));

        if (attempt < retryConfig.maxRetries) {
          console.log(`Jarvis: Retry ${attempt + 1}/${retryConfig.maxRetries} for ${category} after ${delay}ms`);
          await this.sleep(delay);
          delay = Math.min(delay * retryConfig.backoffMultiplier, retryConfig.maxDelayMs);
        }
      }
    }

    throw this.createError(
      category,
      `Failed after ${retryConfig.maxRetries} retries: ${lastError?.message}`,
      { originalError: lastError, retryable: false }
    );
  }

  /**
   * Validate data against a schema
   */
  validate<T>(schema: z.ZodType<T>, data: unknown, context?: string): T {
    const result = schema.safeParse(data);

    if (!result.success) {
      const issues = result.error.issues || [];
      const errorMessages = issues.map(e => `${String(e.path?.join?.('.') || '')}: ${e.message}`).join('; ');
      throw this.createError(
        ErrorCategory.VALIDATION,
        `Validation failed${context ? ` for ${context}` : ''}: ${errorMessages}`,
        {
          severity: ErrorSeverity.MEDIUM,
          context: { data, issueCount: issues.length }
        }
      );
    }

    return result.data;
  }

  /**
   * Safe validate - returns null on failure instead of throwing
   */
  safeValidate<T>(schema: z.ZodType<T>, data: unknown): T | null {
    const result = schema.safeParse(data);
    return result.success ? result.data : null;
  }

  /**
   * Show user-friendly error notification
   */
  notifyError(error: JarvisError, showDetails = false): void {
    let message = `Jarvis: ${error.message}`;

    if (error.retryable) {
      message += ' (you can retry)';
    }

    if (showDetails && error.context) {
      console.error('Jarvis Error Details:', error);
    }

    new Notice(message, error.severity === ErrorSeverity.CRITICAL ? 10000 : 5000);
  }

  /**
   * Format error for display in chat
   */
  formatErrorForChat(error: JarvisError): string {
    const severityEmoji = {
      [ErrorSeverity.LOW]: '⚠️',
      [ErrorSeverity.MEDIUM]: '🔶',
      [ErrorSeverity.HIGH]: '🔴',
      [ErrorSeverity.CRITICAL]: '💥'
    };

    let response = `${severityEmoji[error.severity]} **Error:** ${error.message}\n\n`;

    if (error.retryable) {
      response += `💡 *This error may be temporary. Try again.*\n`;
    }

    switch (error.category) {
      case ErrorCategory.NETWORK:
        response += `\n**Troubleshooting:**\n- Check your internet connection\n- Verify the service is accessible`;
        break;
      case ErrorCategory.OLLAMA:
        response += `\n**Troubleshooting:**\n- Ensure Ollama is running: \`ollama serve\`\n- Check model is installed: \`ollama list\``;
        break;
      case ErrorCategory.EMBEDDING:
        response += `\n**Troubleshooting:**\n- Try \`/index\` to rebuild the index\n- Ensure embedding model is available`;
        break;
      case ErrorCategory.GRAPH:
        response += `\n**Troubleshooting:**\n- Try \`/graph\` to rebuild the graph`;
        break;
    }

    return response;
  }

  /**
   * Check if Ollama is responsive
   */
  async checkOllamaHealth(endpoint: string): Promise<{ healthy: boolean; error?: string }> {
    try {
      const response = await fetch(`${endpoint}/api/tags`, {
        method: 'GET',
        signal: AbortSignal.timeout(5000)
      });

      if (!response.ok) {
        return { healthy: false, error: `HTTP ${response.status}` };
      }

      return { healthy: true };
    } catch (e) {
      return {
        healthy: false,
        error: e instanceof Error ? e.message : 'Connection failed'
      };
    }
  }

  /**
   * Circuit breaker pattern for external services
   */
  createCircuitBreaker(
    name: string,
    options: { failureThreshold: number; resetTimeMs: number } = { failureThreshold: 5, resetTimeMs: 30000 }
  ) {
    let failures = 0;
    let lastFailure: Date | null = null;
    let isOpen = false;

    return {
      async execute<T>(fn: () => Promise<T>): Promise<T> {
        // Check if circuit should be reset
        if (isOpen && lastFailure) {
          const timeSinceFailure = Date.now() - lastFailure.getTime();
          if (timeSinceFailure > options.resetTimeMs) {
            isOpen = false;
            failures = 0;
            console.log(`Jarvis: Circuit breaker ${name} reset`);
          }
        }

        if (isOpen) {
          throw new Error(`Service ${name} is temporarily unavailable (circuit open)`);
        }

        try {
          const result = await fn();
          failures = 0; // Reset on success
          return result;
        } catch (e) {
          failures++;
          lastFailure = new Date();

          if (failures >= options.failureThreshold) {
            isOpen = true;
            console.warn(`Jarvis: Circuit breaker ${name} opened after ${failures} failures`);
          }

          throw e;
        }
      },

      getState() {
        return { isOpen, failures, lastFailure };
      },

      reset() {
        isOpen = false;
        failures = 0;
        lastFailure = null;
      }
    };
  }

  /**
   * Register error callback
   */
  onError(callback: (error: JarvisError) => void): () => void {
    this.onErrorCallbacks.push(callback);
    return () => {
      const idx = this.onErrorCallbacks.indexOf(callback);
      if (idx >= 0) this.onErrorCallbacks.splice(idx, 1);
    };
  }

  /**
   * Get recent errors
   */
  getRecentErrors(count = 10): JarvisError[] {
    return this.errorLog.slice(-count);
  }

  /**
   * Clear error log
   */
  clearErrors(): void {
    this.errorLog = [];
  }

  // Private methods
  private logError(error: JarvisError): void {
    this.errorLog.push(error);

    // Trim log if too large
    if (this.errorLog.length > this.maxLogSize) {
      this.errorLog = this.errorLog.slice(-this.maxLogSize);
    }

    // Notify callbacks
    for (const callback of this.onErrorCallbacks) {
      try {
        callback(error);
      } catch (e) {
        console.error('Error in error callback:', e);
      }
    }

    // Log to console
    console.error(`[Jarvis ${error.category}] ${error.message}`, error.context || '');
  }

  private inferSeverity(category: ErrorCategory): ErrorSeverity {
    switch (category) {
      case ErrorCategory.VALIDATION:
        return ErrorSeverity.LOW;
      case ErrorCategory.NETWORK:
      case ErrorCategory.EMBEDDING:
      case ErrorCategory.GRAPH:
        return ErrorSeverity.MEDIUM;
      case ErrorCategory.OLLAMA:
        return ErrorSeverity.HIGH;
      default:
        return ErrorSeverity.MEDIUM;
    }
  }

  private inferRetryable(category: ErrorCategory): boolean {
    switch (category) {
      case ErrorCategory.NETWORK:
      case ErrorCategory.OLLAMA:
      case ErrorCategory.EMBEDDING:
        return true;
      case ErrorCategory.VALIDATION:
      case ErrorCategory.VAULT:
        return false;
      default:
        return true;
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Singleton instance
let errorService: ErrorHandlingService | null = null;

export function getErrorService(): ErrorHandlingService {
  if (!errorService) {
    errorService = new ErrorHandlingService();
  }
  return errorService;
}
