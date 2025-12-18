import { AgentBase, AgentInput, AgentOutput, AgentAction, StreamCallback, AgentSettings } from '../core/AgentBase';

const VISION_PROMPTS = {
  describe: 'Describe this image in detail, including objects, people, text, colors, and composition.',
  extract_text: 'Extract and transcribe any text visible in this image. Format it clearly.',
  analyze: 'Analyze this image and provide insights about its content, context, and potential meaning.',
  summarize: 'Provide a brief summary of what this image shows in 2-3 sentences.',
  diagram: 'Analyze this diagram/chart and explain what it represents, including any data or relationships shown.',
  screenshot: 'Analyze this screenshot. Describe the application/website shown, key UI elements, and any notable content.'
};

type VisionMode = keyof typeof VISION_PROMPTS;

export interface VisionAgentSettings extends AgentSettings {
  defaultMode: VisionMode;
}

export class VisionAgent extends AgentBase {
  readonly name = 'vision';
  readonly description = 'Analyze and describe images';
  readonly icon = 'eye';

  // Keywords that indicate vision intent
  private visionKeywords = [
    'image', 'picture', 'photo', 'screenshot', 'diagram', 'chart',
    'analyze', 'describe', 'what is', 'extract text', 'ocr', 'read'
  ];

  canHandle(input: AgentInput): boolean {
    // Must have images to handle
    if (input.images && input.images.length > 0) {
      return true;
    }

    // Check for vision keywords
    const query = input.query.toLowerCase();
    for (const keyword of this.visionKeywords) {
      if (query.includes(keyword)) {
        return true;
      }
    }

    return false;
  }

  async execute(input: AgentInput, stream?: StreamCallback): Promise<AgentOutput> {
    // Check if vision is enabled
    if (!this.context.settings.enabled) {
      return this.createTextOutput('Vision mode is disabled in settings.');
    }

    // Require images
    if (!input.images || input.images.length === 0) {
      return this.createTextOutput('Please provide an image to analyze. You can upload an image using the image button.');
    }

    try {
      // Detect the type of analysis requested
      const mode = this.detectMode(input.query);
      const prompt = input.query.trim() || VISION_PROMPTS[mode];

      // Analyze each image
      const results: string[] = [];

      for (let i = 0; i < input.images.length; i++) {
        const imageBase64 = input.images[i];

        if (input.images.length > 1) {
          results.push(`## Image ${i + 1}\n`);
        }

        const response = await this.context.ollama.analyzeImage(
          imageBase64,
          prompt,
          stream
        );

        results.push(response);
      }

      const content = results.join('\n\n');

      const actions: AgentAction[] = [
        {
          type: 'create_note',
          label: 'Save Analysis',
          payload: {
            title: `Image Analysis - ${new Date().toISOString().split('T')[0]}`,
            content: `# Image Analysis\n\n${content}\n\n---\n*Analyzed by Jarvis Vision*`,
            folder: '0-Inbox'
          }
        }
      ];

      return {
        content,
        type: 'markdown',
        metadata: {
          mode,
          imageCount: input.images.length
        },
        actions
      };
    } catch (error) {
      throw new Error(`Vision analysis failed: ${error.message}`);
    }
  }

  getDefaultSettings(): VisionAgentSettings {
    return {
      enabled: true,
      defaultMode: 'describe'
    };
  }

  /**
   * Detect the type of analysis from the query
   */
  private detectMode(query: string): VisionMode {
    const q = query.toLowerCase();

    if (q.includes('extract') || q.includes('text') || q.includes('ocr') || q.includes('read')) {
      return 'extract_text';
    }

    if (q.includes('diagram') || q.includes('chart') || q.includes('graph')) {
      return 'diagram';
    }

    if (q.includes('screenshot') || q.includes('screen') || q.includes('ui')) {
      return 'screenshot';
    }

    if (q.includes('analyze') || q.includes('analysis')) {
      return 'analyze';
    }

    if (q.includes('brief') || q.includes('summary') || q.includes('short')) {
      return 'summarize';
    }

    return 'describe';
  }
}
