import type { OllamaService } from './OllamaService';
import { requestUrl } from 'obsidian';

export interface PageContent {
  url: string;
  title: string;
  content: string;
  description?: string;
  links: string[];
  timestamp: number;
}

export interface PageAnalysis {
  summary: string;
  keyPoints: string[];
  topics: string[];
  sentiment?: 'positive' | 'negative' | 'neutral';
}

export class PageAssistService {
  private ollama: OllamaService;
  private cache: Map<string, PageContent> = new Map();
  private cacheExpiry = 1000 * 60 * 30; // 30 minutes

  constructor(ollama: OllamaService) {
    this.ollama = ollama;
  }

  async fetchPage(url: string): Promise<PageContent> {
    // Check cache first
    const cached = this.cache.get(url);
    if (cached && Date.now() - cached.timestamp < this.cacheExpiry) {
      return cached;
    }

    try {
      const response = await requestUrl({
        url,
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; ObsidianJarvis/1.0)',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        }
      });

      const html = response.text;
      const pageContent = this.parseHtml(html, url);

      this.cache.set(url, pageContent);
      return pageContent;
    } catch (error) {
      throw new Error(`Failed to fetch page: ${error.message}`);
    }
  }

  private parseHtml(html: string, url: string): PageContent {
    // Extract title
    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    const title = titleMatch ? this.decodeHtmlEntities(titleMatch[1].trim()) : 'Untitled';

    // Extract meta description
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
    const description = descMatch ? this.decodeHtmlEntities(descMatch[1]) : undefined;

    // Remove script, style, nav, footer, header elements
    let cleanHtml = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '')
      .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '')
      .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '')
      .replace(/<aside[^>]*>[\s\S]*?<\/aside>/gi, '')
      .replace(/<!--[\s\S]*?-->/g, '');

    // Try to extract main content (article, main, or body)
    let contentHtml = cleanHtml;
    const articleMatch = cleanHtml.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
    const mainMatch = cleanHtml.match(/<main[^>]*>([\s\S]*?)<\/main>/i);

    if (articleMatch) {
      contentHtml = articleMatch[1];
    } else if (mainMatch) {
      contentHtml = mainMatch[1];
    }

    // Convert to plain text
    const content = this.htmlToText(contentHtml);

    // Extract links
    const linkRegex = /<a[^>]*href=["']([^"'#][^"']*)["'][^>]*>/gi;
    const links: string[] = [];
    let linkMatch;
    while ((linkMatch = linkRegex.exec(html)) !== null && links.length < 20) {
      const href = linkMatch[1];
      if (href.startsWith('http')) {
        links.push(href);
      } else if (href.startsWith('/')) {
        const baseUrl = new URL(url);
        links.push(`${baseUrl.origin}${href}`);
      }
    }

    return {
      url,
      title,
      content: content.substring(0, 10000), // Limit content size
      description,
      links: [...new Set(links)], // Remove duplicates
      timestamp: Date.now()
    };
  }

  private htmlToText(html: string): string {
    return html
      // Convert headers to text with newlines
      .replace(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi, '\n\n$1\n\n')
      // Convert paragraphs
      .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '\n$1\n')
      // Convert list items
      .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '\n• $1')
      // Convert breaks
      .replace(/<br\s*\/?>/gi, '\n')
      // Remove remaining tags
      .replace(/<[^>]+>/g, '')
      // Decode entities
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      // Clean up whitespace
      .replace(/\n{3,}/g, '\n\n')
      .replace(/[ \t]+/g, ' ')
      .trim();
  }

  private decodeHtmlEntities(text: string): string {
    return text
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code)));
  }

  async askAboutPage(url: string, question: string): Promise<string> {
    const page = await this.fetchPage(url);

    const systemPrompt = `You are a helpful assistant analyzing a web page.
Answer questions based ONLY on the provided page content.
If the information isn't available in the content, say so.
Be concise and accurate.`;

    const userPrompt = `Page Title: ${page.title}
${page.description ? `Description: ${page.description}` : ''}

Page Content:
${page.content}

Question: ${question}`;

    return this.ollama.chat([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ]);
  }

  async summarizePage(url: string, style: 'brief' | 'detailed' | 'bullets' = 'bullets'): Promise<string> {
    const page = await this.fetchPage(url);

    const stylePrompts = {
      brief: 'Provide a 2-3 sentence summary.',
      detailed: 'Provide a comprehensive summary with all key points and context.',
      bullets: 'Summarize in 5-7 bullet points covering the main ideas.'
    };

    const systemPrompt = `You are a helpful assistant that summarizes web pages.
${stylePrompts[style]}
Focus on the most important information.`;

    const userPrompt = `Page Title: ${page.title}

Content:
${page.content}

Provide a summary:`;

    return this.ollama.chat([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ]);
  }

  async analyzePage(url: string): Promise<PageAnalysis> {
    const page = await this.fetchPage(url);

    const systemPrompt = `Analyze the following web page and respond in JSON format:
{
  "summary": "2-3 sentence summary",
  "keyPoints": ["point 1", "point 2", ...],
  "topics": ["topic1", "topic2", ...],
  "sentiment": "positive" | "negative" | "neutral"
}`;

    const response = await this.ollama.chat([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Title: ${page.title}\n\nContent:\n${page.content}` }
    ]);

    try {
      // Try to parse JSON from response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch {
      // Fallback if JSON parsing fails
    }

    return {
      summary: response,
      keyPoints: [],
      topics: []
    };
  }

  async extractKeyInfo(url: string, infoType: 'dates' | 'names' | 'numbers' | 'links' | 'quotes'): Promise<string[]> {
    const page = await this.fetchPage(url);

    const typePrompts = {
      dates: 'Extract all dates and time references',
      names: 'Extract all people and organization names',
      numbers: 'Extract all important numbers and statistics',
      links: 'List the most relevant linked resources',
      quotes: 'Extract notable quotes or statements'
    };

    const response = await this.ollama.chat([
      { role: 'system', content: `${typePrompts[infoType]}. Output each item on a new line, nothing else.` },
      { role: 'user', content: page.content }
    ]);

    return response
      .split('\n')
      .map(line => line.replace(/^[-•*]\s*/, '').trim())
      .filter(line => line.length > 0);
  }

  async createNoteFromPage(url: string): Promise<string> {
    const page = await this.fetchPage(url);
    const analysis = await this.analyzePage(url);

    const date = new Date().toISOString().split('T')[0];

    return `---
url: ${page.url}
title: "${page.title.replace(/"/g, '\\"')}"
created: ${date}
tags: [web-clip, ${analysis.topics.slice(0, 3).join(', ')}]
---

# ${page.title}

**Source:** [${page.url}](${page.url})
**Clipped:** ${date}

## Summary

${analysis.summary}

## Key Points

${analysis.keyPoints.map(p => `- ${p}`).join('\n')}

## Original Content

${page.content.substring(0, 5000)}${page.content.length > 5000 ? '\n\n...(truncated)' : ''}

---
*Clipped by Jarvis AI*
`;
  }

  clearCache(): void {
    this.cache.clear();
  }
}
