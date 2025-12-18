import type JarvisPlugin from '../main';
import { getErrorService, ErrorCategory } from './ErrorHandlingService';

export type WritingStyle = 'formal' | 'casual' | 'academic' | 'creative' | 'technical' | 'concise';
export type WritingAction = 'continue' | 'rewrite' | 'expand' | 'condense' | 'improve' | 'proofread' | 'outline' | 'brainstorm';

interface WritingContext {
  text: string;
  cursorPosition?: number;
  selectionStart?: number;
  selectionEnd?: number;
  noteTitle?: string;
  noteTags?: string[];
}

interface WritingResult {
  text: string;
  suggestions?: string[];
  metadata?: {
    wordCountBefore: number;
    wordCountAfter: number;
    action: WritingAction;
    style?: WritingStyle;
  };
}

const STYLE_PROMPTS: Record<WritingStyle, string> = {
  formal: 'Use formal, professional language. Avoid contractions and colloquialisms.',
  casual: 'Use casual, conversational language. Be friendly and approachable.',
  academic: 'Use academic language with precise terminology. Include citations placeholders where appropriate.',
  creative: 'Use creative, engaging language. Employ literary devices and vivid descriptions.',
  technical: 'Use technical language appropriate for documentation. Be precise and clear.',
  concise: 'Be extremely concise. Every word must earn its place. Use bullet points when appropriate.'
};

const ACTION_PROMPTS: Record<WritingAction, string> = {
  continue: `Continue writing naturally from where the text ends. Match the existing style, tone, and voice.
Don't repeat what's already written. Provide a natural continuation that flows seamlessly.`,

  rewrite: `Rewrite the text while preserving the core meaning. Improve clarity, flow, and engagement.
Make it more compelling while keeping the same information.`,

  expand: `Expand the text with more detail, examples, and explanation.
Add depth without being redundant. Include relevant elaborations.`,

  condense: `Condense the text to its essential points. Remove redundancy and filler.
Keep the core message intact but make it more concise.`,

  improve: `Improve the text for clarity, grammar, and style. Fix any errors.
Enhance readability while preserving the author's voice.`,

  proofread: `Proofread and correct:
- Grammar and spelling errors
- Punctuation issues
- Awkward phrasing
- Consistency issues
Return the corrected text with a brief summary of changes.`,

  outline: `Create a structured outline from this content:
- Main topics as headers
- Key points as sub-items
- Logical flow and organization
Format as a hierarchical Markdown outline.`,

  brainstorm: `Generate creative ideas and angles related to this topic:
- Alternative perspectives
- Related concepts to explore
- Questions to investigate
- Potential connections to other topics
Be creative and thought-provoking.`
};

export class WritingCopilotService {
  private plugin: JarvisPlugin;
  private errorService = getErrorService();
  private styleHistory: WritingStyle[] = [];
  private defaultStyle: WritingStyle = 'casual';

  constructor(plugin: JarvisPlugin) {
    this.plugin = plugin;
  }

  /**
   * Main writing action with full options
   */
  async performAction(
    action: WritingAction,
    context: WritingContext,
    options?: {
      style?: WritingStyle;
      customInstruction?: string;
      maxLength?: number;
      temperature?: number;
    }
  ): Promise<WritingResult> {
    const style = options?.style || this.defaultStyle;
    const wordCountBefore = this.countWords(context.text);

    try {
      const systemPrompt = this.buildSystemPrompt(action, style, options?.customInstruction);
      const userPrompt = this.buildUserPrompt(action, context);

      const response = await this.errorService.withRetry(
        () => this.plugin.ollama.chat([
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ]),
        ErrorCategory.OLLAMA,
        { maxRetries: 2 }
      );

      const processedText = this.processResponse(response, action, context);
      const wordCountAfter = this.countWords(processedText);

      // Track style usage
      if (options?.style) {
        this.styleHistory.push(options.style);
        if (this.styleHistory.length > 10) this.styleHistory.shift();
      }

      return {
        text: processedText,
        metadata: {
          wordCountBefore,
          wordCountAfter,
          action,
          style
        }
      };
    } catch (e) {
      const error = this.errorService.createError(
        ErrorCategory.OLLAMA,
        `Writing action '${action}' failed: ${e instanceof Error ? e.message : 'Unknown error'}`,
        { originalError: e instanceof Error ? e : undefined }
      );
      throw error;
    }
  }

  /**
   * Smart continue - analyzes context to determine best continuation approach
   */
  async smartContinue(
    text: string,
    cursorPosition?: number
  ): Promise<WritingResult> {
    // Analyze what kind of content this is
    const analysis = this.analyzeContent(text);

    // Build context-aware continuation
    const systemPrompt = `You are a writing assistant continuing ${analysis.contentType} content.
${analysis.hasHeaders ? 'Maintain the header structure pattern.' : ''}
${analysis.hasBullets ? 'Continue with bullet points if appropriate.' : ''}
${analysis.hasCode ? 'Include code examples if relevant.' : ''}
Match the writing style: ${analysis.detectedStyle}
Continue naturally from the cursor position.`;

    try {
      const response = await this.plugin.ollama.chat([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Continue this text:\n\n${text}` }
      ]);

      return {
        text: response,
        metadata: {
          wordCountBefore: this.countWords(text),
          wordCountAfter: this.countWords(response),
          action: 'continue',
          style: analysis.detectedStyle
        }
      };
    } catch (e) {
      throw e;
    }
  }

  /**
   * Rewrite with multiple variations
   */
  async rewriteWithVariations(
    text: string,
    numVariations: number = 3
  ): Promise<{ variations: string[]; recommended: number }> {
    const styles: WritingStyle[] = ['formal', 'casual', 'concise'];
    const variations: string[] = [];

    for (let i = 0; i < Math.min(numVariations, styles.length); i++) {
      try {
        const result = await this.performAction('rewrite', { text }, { style: styles[i] });
        variations.push(result.text);
      } catch {
        variations.push(`[Error generating ${styles[i]} variation]`);
      }
    }

    // Recommend based on most used style
    const mostUsedStyle = this.getMostUsedStyle();
    const recommended = styles.indexOf(mostUsedStyle);

    return {
      variations,
      recommended: recommended >= 0 ? recommended : 0
    };
  }

  /**
   * Grammar and style check with detailed feedback
   */
  async proofreadDetailed(text: string): Promise<{
    correctedText: string;
    issues: Array<{
      type: 'grammar' | 'spelling' | 'style' | 'clarity';
      original: string;
      suggestion: string;
      explanation: string;
    }>;
    score: number;
  }> {
    const prompt = `Proofread this text and provide detailed feedback in JSON format:

Text: "${text}"

Respond with ONLY valid JSON in this format:
{
  "correctedText": "the corrected text",
  "issues": [
    {
      "type": "grammar|spelling|style|clarity",
      "original": "the problematic text",
      "suggestion": "the fix",
      "explanation": "why this change"
    }
  ],
  "score": 85
}

Score from 0-100 for overall writing quality. Be thorough but fair.`;

    try {
      const response = await this.plugin.ollama.chat([
        { role: 'system', content: 'You are a professional editor. Respond with only valid JSON.' },
        { role: 'user', content: prompt }
      ]);

      // Extract JSON from response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          correctedText: parsed.correctedText || text,
          issues: parsed.issues || [],
          score: parsed.score || 75
        };
      }

      return { correctedText: text, issues: [], score: 75 };
    } catch (e) {
      return { correctedText: text, issues: [], score: 0 };
    }
  }

  /**
   * Generate outline from topic
   */
  async generateOutline(
    topic: string,
    options?: {
      depth?: number;
      style?: 'academic' | 'blog' | 'documentation' | 'presentation';
      sections?: number;
    }
  ): Promise<string> {
    const depth = options?.depth || 2;
    const style = options?.style || 'blog';
    const sections = options?.sections || 5;

    const styleGuide: Record<string, string> = {
      academic: 'Use formal academic structure: Abstract, Introduction, Literature Review, Methodology, Results, Discussion, Conclusion',
      blog: 'Use engaging blog structure: Hook, Problem, Solution, Examples, Call to Action',
      documentation: 'Use documentation structure: Overview, Prerequisites, Installation, Usage, API Reference, Troubleshooting',
      presentation: 'Use presentation structure: Title, Agenda, Key Points (3-5), Examples, Summary, Q&A'
    };

    const prompt = `Create a detailed outline for: "${topic}"

Style: ${styleGuide[style]}
Depth: ${depth} levels of nesting
Target sections: approximately ${sections}

Format as Markdown with headers (## for main sections, ### for subsections, etc.)
Include brief notes on what each section should cover.`;

    try {
      const response = await this.plugin.ollama.chat([
        { role: 'system', content: 'Create well-structured outlines. Be comprehensive but focused.' },
        { role: 'user', content: prompt }
      ]);

      return response;
    } catch (e) {
      throw e;
    }
  }

  /**
   * Transform text between formats
   */
  async transformFormat(
    text: string,
    from: 'prose' | 'bullets' | 'numbered' | 'table' | 'headers',
    to: 'prose' | 'bullets' | 'numbered' | 'table' | 'headers'
  ): Promise<string> {
    const prompt = `Transform this ${from} format text into ${to} format:

${text}

Rules:
- Preserve all information
- Use proper Markdown formatting
- Maintain logical structure`;

    try {
      const response = await this.plugin.ollama.chat([
        { role: 'system', content: 'Transform text between formats accurately. Use proper Markdown.' },
        { role: 'user', content: prompt }
      ]);

      return response;
    } catch (e) {
      throw e;
    }
  }

  /**
   * Suggest improvements without rewriting
   */
  async suggestImprovements(text: string): Promise<{
    suggestions: string[];
    priority: ('high' | 'medium' | 'low')[];
  }> {
    const prompt = `Analyze this text and suggest improvements. Don't rewrite, just suggest.

Text: "${text}"

Provide 3-5 specific, actionable suggestions. Format as JSON:
{
  "suggestions": ["suggestion 1", "suggestion 2"],
  "priority": ["high", "medium"]
}`;

    try {
      const response = await this.plugin.ollama.chat([
        { role: 'system', content: 'Analyze writing and suggest improvements. Respond with JSON only.' },
        { role: 'user', content: prompt }
      ]);

      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          suggestions: parsed.suggestions || [],
          priority: parsed.priority || []
        };
      }

      return { suggestions: [], priority: [] };
    } catch {
      return { suggestions: [], priority: [] };
    }
  }

  /**
   * Complete sentence or paragraph
   */
  async autoComplete(
    textBeforeCursor: string,
    textAfterCursor: string = ''
  ): Promise<string[]> {
    const prompt = `Complete this text naturally. The cursor is at [CURSOR].

"${textBeforeCursor}[CURSOR]${textAfterCursor}"

Provide 3 different completions that flow naturally. Format as JSON array:
["completion 1", "completion 2", "completion 3"]`;

    try {
      const response = await this.plugin.ollama.chat([
        { role: 'system', content: 'Complete text naturally. Provide JSON array of completions.' },
        { role: 'user', content: prompt }
      ]);

      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }

      return [response.trim()];
    } catch {
      return [];
    }
  }

  // Private helper methods

  private buildSystemPrompt(
    action: WritingAction,
    style: WritingStyle,
    customInstruction?: string
  ): string {
    let prompt = `You are an expert writing assistant.
${ACTION_PROMPTS[action]}
${STYLE_PROMPTS[style]}`;

    if (customInstruction) {
      prompt += `\n\nAdditional instruction: ${customInstruction}`;
    }

    prompt += `\n\nRespond with only the resulting text, no explanations or preamble.`;

    return prompt;
  }

  private buildUserPrompt(action: WritingAction, context: WritingContext): string {
    let prompt = '';

    if (context.noteTitle) {
      prompt += `Note title: ${context.noteTitle}\n`;
    }

    if (context.noteTags && context.noteTags.length > 0) {
      prompt += `Tags: ${context.noteTags.join(', ')}\n`;
    }

    prompt += `\nText:\n${context.text}`;

    return prompt;
  }

  private processResponse(
    response: string,
    action: WritingAction,
    context: WritingContext
  ): string {
    // Clean up common AI artifacts
    let text = response.trim();

    // Remove common prefixes
    const prefixPatterns = [
      /^(Here's|Here is|Sure,?|Certainly,?|Of course,?)[^:]*:\s*/i,
      /^(The|A) (continuation|rewrite|expansion|condensed version)[^:]*:\s*/i
    ];

    for (const pattern of prefixPatterns) {
      text = text.replace(pattern, '');
    }

    return text;
  }

  private analyzeContent(text: string): {
    contentType: string;
    hasHeaders: boolean;
    hasBullets: boolean;
    hasCode: boolean;
    detectedStyle: WritingStyle;
  } {
    const hasHeaders = /^#+\s/m.test(text);
    const hasBullets = /^[-*]\s/m.test(text);
    const hasCode = /```/.test(text) || /`[^`]+`/.test(text);

    // Detect style based on characteristics
    let detectedStyle: WritingStyle = 'casual';

    if (/\b(therefore|furthermore|consequently|moreover)\b/i.test(text)) {
      detectedStyle = 'formal';
    } else if (/\b(function|class|const|let|var|import|export)\b/.test(text)) {
      detectedStyle = 'technical';
    } else if (/\b(you|your|we|our|let's)\b/i.test(text)) {
      detectedStyle = 'casual';
    }

    // Determine content type
    let contentType = 'general';
    if (hasCode) contentType = 'technical documentation';
    else if (hasHeaders && hasBullets) contentType = 'structured notes';
    else if (hasBullets) contentType = 'list or outline';
    else contentType = 'prose';

    return { contentType, hasHeaders, hasBullets, hasCode, detectedStyle };
  }

  private countWords(text: string): number {
    return text.trim().split(/\s+/).filter(w => w.length > 0).length;
  }

  private getMostUsedStyle(): WritingStyle {
    if (this.styleHistory.length === 0) return this.defaultStyle;

    const counts = new Map<WritingStyle, number>();
    for (const style of this.styleHistory) {
      counts.set(style, (counts.get(style) || 0) + 1);
    }

    let maxStyle = this.defaultStyle;
    let maxCount = 0;
    for (const [style, count] of counts) {
      if (count > maxCount) {
        maxCount = count;
        maxStyle = style;
      }
    }

    return maxStyle;
  }

  /**
   * Set default writing style
   */
  setDefaultStyle(style: WritingStyle): void {
    this.defaultStyle = style;
  }
}
