import { AgentBase, AgentInput, AgentOutput, StreamCallback, StreamableAgent } from '../core/AgentBase';
import type { ChatMessage } from '../services/OllamaService';

const SYSTEM_PROMPT = `You are Jarvis, an AI assistant integrated into Obsidian. You help with:
- Answering questions about notes and knowledge
- General conversation and brainstorming
- Explaining concepts
- Providing suggestions and recommendations

Be concise, helpful, and format responses with Markdown when appropriate.
When referencing notes, use [[note name]] wiki-link syntax.`;

export class ChatAgent extends AgentBase implements StreamableAgent {
  readonly name = 'chat';
  readonly description = 'General conversation and Q&A';
  readonly icon = 'message-circle';
  readonly supportsStreaming = true;

  private conversationHistory: ChatMessage[] = [];
  private maxHistoryLength = 20;

  canHandle(input: AgentInput): boolean {
    // Chat agent is the fallback - handles everything
    return true;
  }

  async execute(input: AgentInput, stream?: StreamCallback): Promise<AgentOutput> {
    this.validateInput(input);

    const messages = this.buildMessages(input);

    try {
      let response: string;

      if (stream) {
        response = await this.context.ollama.chat(messages, stream);
      } else {
        response = await this.context.ollama.chat(messages);
      }

      // Add to conversation history
      this.conversationHistory.push(
        { role: 'user', content: input.query },
        { role: 'assistant', content: response }
      );

      // Trim history if too long
      if (this.conversationHistory.length > this.maxHistoryLength * 2) {
        this.conversationHistory = this.conversationHistory.slice(-this.maxHistoryLength * 2);
      }

      return this.createTextOutput(response);
    } catch (error) {
      throw new Error(`Chat failed: ${error.message}`);
    }
  }

  private buildMessages(input: AgentInput): ChatMessage[] {
    const messages: ChatMessage[] = [
      { role: 'system', content: SYSTEM_PROMPT }
    ];

    // Add conversation history
    messages.push(...this.conversationHistory);

    // Add context if provided
    if (input.context) {
      messages.push({
        role: 'user',
        content: `Context:\n${input.context}\n\nQuestion: ${input.query}`
      });
    } else {
      messages.push({ role: 'user', content: input.query });
    }

    return messages;
  }

  /**
   * Clear conversation history
   */
  clearHistory(): void {
    this.conversationHistory = [];
  }

  /**
   * Get conversation history for export
   */
  getHistory(): ChatMessage[] {
    return [...this.conversationHistory];
  }
}
