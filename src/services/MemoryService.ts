import type JarvisPlugin from '../main';
import { getErrorService, ErrorCategory } from './ErrorHandlingService';

export interface MemoryFact {
  id: string;
  fact: string;
  category: MemoryCategory;
  confidence: number;
  source: 'conversation' | 'manual' | 'extracted';
  createdAt: string;
  lastAccessedAt: string;
  accessCount: number;
  tags: string[];
}

export type MemoryCategory =
  | 'preference'      // User preferences (likes, dislikes, style)
  | 'project'         // Projects they're working on
  | 'goal'           // Goals and aspirations
  | 'context'        // Current context (job, location, etc.)
  | 'relationship'   // People they mention
  | 'habit'          // Habits and routines
  | 'knowledge'      // Things they know/are learning
  | 'personal';      // Personal details

interface MemoryStore {
  version: string;
  userId: string;
  facts: MemoryFact[];
  lastUpdated: string;
}

const MEMORY_FILE = '.jarvis/memory.json';
const MAX_FACTS = 500;

export class MemoryService {
  private plugin: JarvisPlugin;
  private errorService = getErrorService();
  private memory: MemoryStore | null = null;
  private initialized = false;

  constructor(plugin: JarvisPlugin) {
    this.plugin = plugin;
  }

  /**
   * Initialize memory from vault storage
   */
  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      const content = await this.plugin.vault.readFile(MEMORY_FILE);
      if (content) {
        this.memory = JSON.parse(content);
      } else {
        this.memory = this.createEmptyStore();
        await this.save();
      }
      this.initialized = true;
    } catch (e) {
      console.log('Jarvis: Creating new memory store');
      this.memory = this.createEmptyStore();
      await this.save();
      this.initialized = true;
    }
  }

  private createEmptyStore(): MemoryStore {
    return {
      version: '1.0',
      userId: this.generateId(),
      facts: [],
      lastUpdated: new Date().toISOString()
    };
  }

  /**
   * Remember a fact about the user
   */
  async remember(
    fact: string,
    category: MemoryCategory,
    options?: {
      confidence?: number;
      source?: 'conversation' | 'manual' | 'extracted';
      tags?: string[];
    }
  ): Promise<MemoryFact> {
    await this.initialize();

    // Check for duplicate or similar facts
    const existing = await this.findSimilar(fact);
    if (existing) {
      // Update existing fact
      existing.accessCount++;
      existing.lastAccessedAt = new Date().toISOString();
      if (options?.confidence && options.confidence > existing.confidence) {
        existing.confidence = options.confidence;
      }
      await this.save();
      return existing;
    }

    const newFact: MemoryFact = {
      id: this.generateId(),
      fact: fact.trim(),
      category,
      confidence: options?.confidence || 0.8,
      source: options?.source || 'manual',
      createdAt: new Date().toISOString(),
      lastAccessedAt: new Date().toISOString(),
      accessCount: 1,
      tags: options?.tags || []
    };

    this.memory!.facts.push(newFact);
    this.memory!.lastUpdated = new Date().toISOString();

    // Enforce max facts limit
    if (this.memory!.facts.length > MAX_FACTS) {
      this.pruneOldFacts();
    }

    await this.save();
    return newFact;
  }

  /**
   * Recall facts relevant to a query
   */
  async recall(
    query: string,
    options?: {
      limit?: number;
      category?: MemoryCategory;
      minConfidence?: number;
    }
  ): Promise<MemoryFact[]> {
    await this.initialize();

    const limit = options?.limit || 10;
    const minConfidence = options?.minConfidence || 0.5;

    let facts = this.memory!.facts.filter(f => f.confidence >= minConfidence);

    if (options?.category) {
      facts = facts.filter(f => f.category === options.category);
    }

    // Score facts by relevance to query
    const queryLower = query.toLowerCase();
    const queryWords = queryLower.split(/\s+/).filter(w => w.length > 2);

    const scored = facts.map(fact => {
      const factLower = fact.fact.toLowerCase();
      let score = 0;

      // Exact match boost
      if (factLower.includes(queryLower)) {
        score += 10;
      }

      // Word match scoring
      for (const word of queryWords) {
        if (factLower.includes(word)) {
          score += 2;
        }
      }

      // Category keyword matching
      const categoryKeywords: Record<MemoryCategory, string[]> = {
        preference: ['like', 'prefer', 'favorite', 'hate', 'love', 'enjoy'],
        project: ['project', 'working', 'building', 'developing', 'creating'],
        goal: ['goal', 'want', 'plan', 'aim', 'hope', 'wish', 'target'],
        context: ['job', 'work', 'location', 'live', 'role', 'position'],
        relationship: ['person', 'friend', 'colleague', 'family', 'partner'],
        habit: ['habit', 'routine', 'daily', 'always', 'usually', 'morning', 'evening'],
        knowledge: ['know', 'learn', 'study', 'expert', 'skill', 'understand'],
        personal: ['am', 'my', 'myself', 'birthday', 'age', 'name']
      };

      for (const [cat, keywords] of Object.entries(categoryKeywords)) {
        if (fact.category === cat) {
          for (const kw of keywords) {
            if (queryLower.includes(kw)) {
              score += 3;
            }
          }
        }
      }

      // Recency boost
      const daysSince = (Date.now() - new Date(fact.lastAccessedAt).getTime()) / (1000 * 60 * 60 * 24);
      if (daysSince < 7) score += 2;
      else if (daysSince < 30) score += 1;

      // Confidence boost
      score += fact.confidence * 2;

      // Access count boost (popular facts)
      score += Math.min(fact.accessCount, 5) * 0.5;

      return { fact, score };
    });

    // Sort by score and return top results
    const results = scored
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(s => s.fact);

    // Update access times
    for (const fact of results) {
      fact.lastAccessedAt = new Date().toISOString();
      fact.accessCount++;
    }
    await this.save();

    return results;
  }

  /**
   * Forget a fact
   */
  async forget(factId: string): Promise<boolean> {
    await this.initialize();

    const index = this.memory!.facts.findIndex(f => f.id === factId);
    if (index >= 0) {
      this.memory!.facts.splice(index, 1);
      this.memory!.lastUpdated = new Date().toISOString();
      await this.save();
      return true;
    }
    return false;
  }

  /**
   * Forget facts matching a pattern
   */
  async forgetByPattern(pattern: string): Promise<number> {
    await this.initialize();

    const regex = new RegExp(pattern, 'i');
    const before = this.memory!.facts.length;
    this.memory!.facts = this.memory!.facts.filter(f => !regex.test(f.fact));
    const removed = before - this.memory!.facts.length;

    if (removed > 0) {
      this.memory!.lastUpdated = new Date().toISOString();
      await this.save();
    }

    return removed;
  }

  /**
   * Extract facts from a conversation message
   */
  async extractFacts(message: string): Promise<MemoryFact[]> {
    const prompt = `Analyze this message and extract any facts about the user that would be useful to remember.

Message: "${message}"

For each fact, identify:
1. The fact itself (concise, specific)
2. Category: preference, project, goal, context, relationship, habit, knowledge, or personal
3. Confidence: 0.0 to 1.0 (how certain is this fact)

Respond with JSON array only:
[
  {"fact": "User is working on an Obsidian plugin", "category": "project", "confidence": 0.9},
  {"fact": "User prefers local-first software", "category": "preference", "confidence": 0.8}
]

If no extractable facts, return: []`;

    try {
      const response = await this.plugin.ollama.chat([
        { role: 'system', content: 'Extract user facts from messages. Respond with JSON only.' },
        { role: 'user', content: prompt }
      ]);

      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const extracted = JSON.parse(jsonMatch[0]);
        const facts: MemoryFact[] = [];

        for (const item of extracted) {
          if (item.fact && item.category) {
            const fact = await this.remember(
              item.fact,
              item.category as MemoryCategory,
              {
                confidence: item.confidence || 0.7,
                source: 'extracted'
              }
            );
            facts.push(fact);
          }
        }

        return facts;
      }
    } catch (e) {
      console.error('Jarvis: Fact extraction failed:', e);
    }

    return [];
  }

  /**
   * Get context string for chat system prompt
   */
  async getContextForChat(currentMessage: string): Promise<string> {
    await this.initialize();

    // Get relevant facts based on current message
    const relevantFacts = await this.recall(currentMessage, { limit: 5, minConfidence: 0.6 });

    // Also get some high-confidence facts regardless of query
    const importantFacts = this.memory!.facts
      .filter(f => f.confidence >= 0.85 && f.category !== 'personal')
      .sort((a, b) => b.accessCount - a.accessCount)
      .slice(0, 3);

    // Combine and dedupe
    const allFacts = [...new Map([...relevantFacts, ...importantFacts].map(f => [f.id, f])).values()];

    if (allFacts.length === 0) {
      return '';
    }

    let context = '\n\n## Things I remember about you:\n';
    for (const fact of allFacts) {
      context += `- ${fact.fact}\n`;
    }

    return context;
  }

  /**
   * Get all facts by category
   */
  async getByCategory(category: MemoryCategory): Promise<MemoryFact[]> {
    await this.initialize();
    return this.memory!.facts.filter(f => f.category === category);
  }

  /**
   * Get memory statistics
   */
  async getStats(): Promise<{
    totalFacts: number;
    byCategory: Record<string, number>;
    avgConfidence: number;
    oldestFact: string | null;
    newestFact: string | null;
  }> {
    await this.initialize();

    const facts = this.memory!.facts;
    const byCategory: Record<string, number> = {};

    for (const fact of facts) {
      byCategory[fact.category] = (byCategory[fact.category] || 0) + 1;
    }

    const avgConfidence = facts.length > 0
      ? facts.reduce((sum, f) => sum + f.confidence, 0) / facts.length
      : 0;

    const sorted = [...facts].sort((a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    return {
      totalFacts: facts.length,
      byCategory,
      avgConfidence: Math.round(avgConfidence * 100) / 100,
      oldestFact: sorted[0]?.createdAt || null,
      newestFact: sorted[sorted.length - 1]?.createdAt || null
    };
  }

  /**
   * List all facts (for debugging/management)
   */
  async listAll(): Promise<MemoryFact[]> {
    await this.initialize();
    return [...this.memory!.facts].sort((a, b) =>
      new Date(b.lastAccessedAt).getTime() - new Date(a.lastAccessedAt).getTime()
    );
  }

  // Private methods

  private async findSimilar(fact: string): Promise<MemoryFact | null> {
    const factLower = fact.toLowerCase().trim();
    const factWords = new Set(factLower.split(/\s+/).filter(w => w.length > 3));

    for (const existing of this.memory!.facts) {
      const existingLower = existing.fact.toLowerCase();

      // Exact match
      if (existingLower === factLower) {
        return existing;
      }

      // High word overlap
      const existingWords = new Set(existingLower.split(/\s+/).filter(w => w.length > 3));
      const intersection = [...factWords].filter(w => existingWords.has(w));
      const union = new Set([...factWords, ...existingWords]);

      // Jaccard similarity > 0.7
      if (intersection.length / union.size > 0.7) {
        return existing;
      }
    }

    return null;
  }

  private pruneOldFacts(): void {
    // Remove low-confidence, old, rarely-accessed facts
    this.memory!.facts.sort((a, b) => {
      // Score based on confidence, recency, and access count
      const scoreA = a.confidence * 3 + a.accessCount * 0.5 -
        (Date.now() - new Date(a.lastAccessedAt).getTime()) / (1000 * 60 * 60 * 24 * 30);
      const scoreB = b.confidence * 3 + b.accessCount * 0.5 -
        (Date.now() - new Date(b.lastAccessedAt).getTime()) / (1000 * 60 * 60 * 24 * 30);
      return scoreB - scoreA;
    });

    // Keep top MAX_FACTS
    this.memory!.facts = this.memory!.facts.slice(0, MAX_FACTS);
  }

  private async save(): Promise<void> {
    if (!this.memory) return;

    const content = JSON.stringify(this.memory, null, 2);
    await this.plugin.vault.writeFile(MEMORY_FILE, content);
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
