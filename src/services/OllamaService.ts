import { Ollama } from 'ollama';

interface JarvisSettings {
  ollamaEndpoint: string;
  textModel: string;
  visionModel: string;
  embeddingModel: string;
  enablePlanning: boolean;
  enableVision: boolean;
  enableTaskWarrior: boolean;
  showStatusBar: boolean;
  temperature: number;
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  images?: string[];
}

export interface StreamCallback {
  (chunk: string): void;
}

export class OllamaService {
  private client: Ollama;
  private settings: JarvisSettings;

  constructor(settings: JarvisSettings) {
    this.settings = settings;
    this.client = new Ollama({ host: settings.ollamaEndpoint });
  }

  async checkConnection(): Promise<boolean> {
    try {
      await this.client.list();
      return true;
    } catch (error) {
      console.error('Ollama connection failed:', error);
      return false;
    }
  }

  async listModels(): Promise<string[]> {
    try {
      const response = await this.client.list();
      return response.models.map(m => m.name);
    } catch (error) {
      console.error('Failed to list models:', error);
      return [];
    }
  }

  async chat(messages: ChatMessage[], stream?: StreamCallback): Promise<string> {
    try {
      if (stream) {
        return await this.streamChat(messages, stream);
      }

      const response = await this.client.chat({
        model: this.settings.textModel,
        messages: messages.map(m => ({
          role: m.role,
          content: m.content
        })),
        options: {
          temperature: this.settings.temperature
        }
      });

      return response.message.content;
    } catch (error) {
      console.error('Chat failed:', error);
      throw error;
    }
  }

  private async streamChat(messages: ChatMessage[], callback: StreamCallback): Promise<string> {
    let fullResponse = '';

    const response = await this.client.chat({
      model: this.settings.textModel,
      messages: messages.map(m => ({
        role: m.role,
        content: m.content
      })),
      stream: true,
      options: {
        temperature: this.settings.temperature
      }
    });

    for await (const chunk of response) {
      const text = chunk.message.content;
      fullResponse += text;
      callback(text);
    }

    return fullResponse;
  }

  async analyzeImage(imageBase64: string, prompt: string, stream?: StreamCallback): Promise<string> {
    if (!this.settings.enableVision) {
      throw new Error('Vision is disabled in settings');
    }

    try {
      if (stream) {
        return await this.streamVision(imageBase64, prompt, stream);
      }

      const response = await this.client.chat({
        model: this.settings.visionModel,
        messages: [{
          role: 'user',
          content: prompt,
          images: [imageBase64]
        }],
        options: {
          temperature: this.settings.temperature
        }
      });

      return response.message.content;
    } catch (error) {
      console.error('Vision analysis failed:', error);
      throw error;
    }
  }

  private async streamVision(imageBase64: string, prompt: string, callback: StreamCallback): Promise<string> {
    let fullResponse = '';

    const response = await this.client.chat({
      model: this.settings.visionModel,
      messages: [{
        role: 'user',
        content: prompt,
        images: [imageBase64]
      }],
      stream: true,
      options: {
        temperature: this.settings.temperature
      }
    });

    for await (const chunk of response) {
      const text = chunk.message.content;
      fullResponse += text;
      callback(text);
    }

    return fullResponse;
  }

  async embed(text: string): Promise<number[]> {
    try {
      const response = await this.client.embed({
        model: this.settings.embeddingModel,
        input: text
      });

      return response.embeddings[0];
    } catch (error) {
      console.error('Embedding failed:', error);
      throw error;
    }
  }

  async embedBatch(texts: string[]): Promise<number[][]> {
    try {
      const response = await this.client.embed({
        model: this.settings.embeddingModel,
        input: texts
      });

      return response.embeddings;
    } catch (error) {
      console.error('Batch embedding failed:', error);
      throw error;
    }
  }

  // Planning-specific prompts
  async decomposePlan(goal: string): Promise<string> {
    if (!this.settings.enablePlanning) {
      throw new Error('Planning is disabled in settings');
    }

    const systemPrompt = `You are a planning assistant. Given a goal, break it down into actionable tasks.
Output format:
## Goal Analysis
Brief analysis of the goal

## Tasks
- [ ] Task 1 (estimated time)
- [ ] Task 2 (estimated time)
...

## Dependencies
Note any task dependencies

## Notes
Any additional considerations`;

    return this.chat([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Create a plan for: ${goal}` }
    ]);
  }

  async summarize(content: string, style: 'brief' | 'detailed' | 'bullets' = 'bullets'): Promise<string> {
    const stylePrompts = {
      brief: 'Provide a 2-3 sentence summary.',
      detailed: 'Provide a comprehensive summary with key points and context.',
      bullets: 'Summarize in 3-5 bullet points.'
    };

    return this.chat([
      { role: 'system', content: `You are a summarization assistant. ${stylePrompts[style]}` },
      { role: 'user', content: content }
    ]);
  }

  async suggestTags(content: string): Promise<string[]> {
    const response = await this.chat([
      { role: 'system', content: 'Suggest 3-5 lowercase tags for the following content. Output only comma-separated tags, nothing else.' },
      { role: 'user', content: content }
    ]);

    return response
      .toLowerCase()
      .split(',')
      .map(tag => tag.trim().replace(/[^a-z0-9_-]/g, ''))
      .filter(tag => tag.length > 0)
      .slice(0, 5);
  }

  async suggestLinks(content: string, existingNotes: string[]): Promise<string[]> {
    const notesList = existingNotes.slice(0, 50).join('\n');

    const response = await this.chat([
      { role: 'system', content: `You are a knowledge management assistant. Given content and a list of existing notes, suggest which notes might be relevant to link to. Output only note names, one per line.` },
      { role: 'user', content: `Content:\n${content}\n\nExisting notes:\n${notesList}` }
    ]);

    return response
      .split('\n')
      .map(line => line.trim())
      .filter(line => existingNotes.includes(line));
  }

  async generateTaskWarriorCommand(naturalLanguage: string): Promise<string> {
    if (!this.settings.enableTaskWarrior) {
      throw new Error('TaskWarrior integration is disabled in settings');
    }

    const response = await this.chat([
      { role: 'system', content: `Convert natural language to TaskWarrior command. Output only the task add command, nothing else.
Examples:
"remind me to call mom tomorrow" -> task add "Call mom" due:tomorrow
"high priority fix the bug in auth by friday" -> task add "Fix the bug in auth" priority:H due:friday
"work on report for project alpha" -> task add "Work on report" project:alpha` },
      { role: 'user', content: naturalLanguage }
    ]);

    return response.trim();
  }
}
