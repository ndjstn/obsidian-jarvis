import type { OllamaService } from './OllamaService';
import { requestUrl } from 'obsidian';

export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
}

export interface ResearchResult {
  query: string;
  summary: string;
  sources: SearchResult[];
  keyFindings: string[];
  relatedQueries: string[];
}

export class WebResearchService {
  private ollama: OllamaService;
  private searxngUrl: string;

  constructor(ollama: OllamaService, searxngUrl = 'http://localhost:8888') {
    this.ollama = ollama;
    this.searxngUrl = searxngUrl;
  }

  async search(query: string, numResults = 5): Promise<SearchResult[]> {
    // Try SearXNG first (local privacy-respecting search)
    try {
      return await this.searchSearxng(query, numResults);
    } catch (e) {
      console.log('SearXNG not available, trying DuckDuckGo...');
    }

    // Fallback to DuckDuckGo HTML parsing
    try {
      return await this.searchDuckDuckGo(query, numResults);
    } catch (e) {
      console.log('DuckDuckGo failed, trying Google...');
    }

    // Last resort: Google (may have issues with rate limiting)
    return await this.searchGoogle(query, numResults);
  }

  private async searchSearxng(query: string, numResults: number): Promise<SearchResult[]> {
    const url = `${this.searxngUrl}/search?q=${encodeURIComponent(query)}&format=json&categories=general`;

    const response = await requestUrl({
      url,
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });

    const data = JSON.parse(response.text);
    return (data.results || []).slice(0, numResults).map((r: { title: string; url: string; content: string }) => ({
      title: r.title,
      url: r.url,
      snippet: r.content
    }));
  }

  private async searchDuckDuckGo(query: string, numResults: number): Promise<SearchResult[]> {
    // DuckDuckGo instant answers API (limited but works)
    const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_redirect=1`;

    const response = await requestUrl({
      url,
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });

    const data = JSON.parse(response.text);
    const results: SearchResult[] = [];

    // Abstract (main answer)
    if (data.Abstract) {
      results.push({
        title: data.Heading || query,
        url: data.AbstractURL || '',
        snippet: data.Abstract
      });
    }

    // Related topics
    if (data.RelatedTopics) {
      for (const topic of data.RelatedTopics.slice(0, numResults - 1)) {
        if (topic.Text && topic.FirstURL) {
          results.push({
            title: topic.Text.substring(0, 60) + '...',
            url: topic.FirstURL,
            snippet: topic.Text
          });
        }
      }
    }

    return results.slice(0, numResults);
  }

  private async searchGoogle(query: string, numResults: number): Promise<SearchResult[]> {
    // Use Google's programmable search (requires API key for real use)
    // For now, return empty and let the AI do its best
    console.warn('Google search requires API key configuration');
    return [];
  }

  async research(query: string, depth: 'quick' | 'thorough' = 'quick'): Promise<ResearchResult> {
    const numResults = depth === 'thorough' ? 8 : 4;

    // Search for relevant pages
    const searchResults = await this.search(query, numResults);

    if (searchResults.length === 0) {
      // Fallback to AI knowledge
      return this.researchWithAI(query);
    }

    // Fetch content from top results
    const contents: string[] = [];
    for (const result of searchResults.slice(0, 3)) {
      try {
        const content = await this.fetchPageContent(result.url);
        contents.push(`Source: ${result.title}\nURL: ${result.url}\n\n${content}`);
      } catch (e) {
        contents.push(`Source: ${result.title}\n${result.snippet}`);
      }
    }

    // Synthesize with AI
    const systemPrompt = `You are a research assistant. Synthesize information from the provided sources to answer the query.

Guidelines:
- Provide a comprehensive but concise summary
- Extract key findings as bullet points
- Cite sources when making claims
- Suggest related topics for further research
- Be objective and note any conflicting information

Output format:
## Summary
[2-3 paragraph synthesis]

## Key Findings
- Finding 1
- Finding 2
...

## Related Topics
- Topic 1
- Topic 2`;

    const userPrompt = `Query: ${query}

Sources:
${contents.join('\n\n---\n\n')}

Synthesize this information:`;

    const aiResponse = await this.ollama.chat([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ]);

    // Parse AI response
    const keyFindings = this.extractBulletPoints(aiResponse, 'Key Findings');
    const relatedQueries = this.extractBulletPoints(aiResponse, 'Related Topics');

    return {
      query,
      summary: aiResponse,
      sources: searchResults,
      keyFindings,
      relatedQueries
    };
  }

  private async researchWithAI(query: string): Promise<ResearchResult> {
    const systemPrompt = `You are a knowledgeable research assistant. The user is asking about a topic but web search is unavailable.
Provide the best answer you can based on your training data.
Be honest about the limitations and suggest how they could verify the information.`;

    const response = await this.ollama.chat([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: query }
    ]);

    return {
      query,
      summary: response + '\n\n*Note: This answer is based on AI knowledge and was not verified with live web search.*',
      sources: [],
      keyFindings: [],
      relatedQueries: []
    };
  }

  private async fetchPageContent(url: string): Promise<string> {
    const response = await requestUrl({
      url,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ObsidianResearch/1.0)',
        'Accept': 'text/html'
      }
    });

    return this.htmlToText(response.text).substring(0, 3000);
  }

  private htmlToText(html: string): string {
    return html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '')
      .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private extractBulletPoints(text: string, section: string): string[] {
    const regex = new RegExp(`##\\s*${section}[\\s\\S]*?(?=##|$)`, 'i');
    const match = text.match(regex);
    if (!match) return [];

    return match[0]
      .split('\n')
      .filter(line => line.trim().startsWith('-'))
      .map(line => line.replace(/^-\s*/, '').trim())
      .filter(line => line.length > 0);
  }

  async quickAnswer(question: string): Promise<string> {
    const result = await this.research(question, 'quick');
    return result.summary;
  }

  async factCheck(claim: string): Promise<string> {
    const systemPrompt = `You are a fact-checker. Analyze the claim and search results.
Rate the claim as: TRUE, FALSE, PARTIALLY TRUE, or UNVERIFIED.
Explain your reasoning and cite sources.`;

    const searchResults = await this.search(claim, 5);

    if (searchResults.length === 0) {
      return `**Claim:** ${claim}\n\n**Verdict:** UNVERIFIED\n\nUnable to verify this claim with live web search. Please check reliable sources manually.`;
    }

    const context = searchResults.map(r => `- ${r.title}: ${r.snippet}`).join('\n');

    const response = await this.ollama.chat([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Claim: ${claim}\n\nSearch Results:\n${context}` }
    ]);

    return response;
  }
}
