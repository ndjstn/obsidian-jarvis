import type JarvisPlugin from '../main';
import { getErrorService, ErrorCategory } from './ErrorHandlingService';

export interface ReviewInsight {
  type: 'pattern' | 'suggestion' | 'warning' | 'celebration';
  title: string;
  description: string;
  action?: string;
  relatedNotes?: string[];
}

export interface DailyReviewData {
  date: string;
  notesCreated: number;
  notesModified: number;
  tasksCompleted: number;
  tasksCreated: number;
  orphansFound: number;
  insights: ReviewInsight[];
  suggestedActions: string[];
}

export interface WeeklyReviewData {
  weekNumber: number;
  year: number;
  startDate: string;
  endDate: string;
  dailyNotes: number;
  totalNotesCreated: number;
  totalTasksCompleted: number;
  projectProgress: Array<{ project: string; progress: number }>;
  topConnectedNotes: string[];
  neglectedAreas: string[];
  insights: ReviewInsight[];
  weeklyScore: number;
}

export class ReviewAssistantService {
  private plugin: JarvisPlugin;
  private errorService = getErrorService();

  constructor(plugin: JarvisPlugin) {
    this.plugin = plugin;
  }

  /**
   * Generate daily review data and insights
   */
  async generateDailyReview(date?: Date): Promise<DailyReviewData> {
    const reviewDate = date || new Date();
    const dateStr = reviewDate.toISOString().split('T')[0];

    // Get notes activity from vault
    const allNotes = await this.plugin.vault.getAllNotes();
    const createdToday = allNotes.filter(n => {
      const ctime = n.stat?.ctime;
      if (!ctime) return false;
      const noteDate = new Date(ctime).toISOString().split('T')[0];
      return noteDate === dateStr;
    });

    const modifiedToday = allNotes.filter(n => {
      const mtime = n.stat?.mtime;
      if (!mtime) return false;
      const noteDate = new Date(mtime).toISOString().split('T')[0];
      return noteDate === dateStr && !createdToday.includes(n);
    });

    // Get graph insights if available
    let orphansFound = 0;
    if (this.plugin.knowledgeGraph) {
      if (!this.plugin.knowledgeGraph.isGraphBuilt()) {
        await this.plugin.knowledgeGraph.buildGraph();
      }
      const orphans = this.plugin.knowledgeGraph.findOrphans();
      orphansFound = orphans.length;
    }

    // Generate insights
    const insights = await this.generateDailyInsights(createdToday.length, modifiedToday.length, orphansFound);

    // Generate suggested actions
    const suggestedActions = await this.generateDailySuggestions(dateStr);

    return {
      date: dateStr,
      notesCreated: createdToday.length,
      notesModified: modifiedToday.length,
      tasksCompleted: 0, // Would need task tracking
      tasksCreated: 0,
      orphansFound,
      insights,
      suggestedActions
    };
  }

  /**
   * Generate weekly review data
   */
  async generateWeeklyReview(weekOffset: number = 0): Promise<WeeklyReviewData> {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay() + (weekOffset * 7));
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const weekNumber = this.getWeekNumber(startOfWeek);
    const year = startOfWeek.getFullYear();

    // Get notes from this week
    const allNotes = await this.plugin.vault.getAllNotes();
    const weekNotes = allNotes.filter(n => {
      const ctime = n.stat?.ctime;
      if (!ctime) return false;
      const noteTime = new Date(ctime).getTime();
      return noteTime >= startOfWeek.getTime() && noteTime <= endOfWeek.getTime();
    });

    // Find daily notes for this week
    const dailyNotes = allNotes.filter(n => {
      const name = n.basename || n.path.split('/').pop()?.replace('.md', '') || '';
      return /^\d{4}-\d{2}-\d{2}$/.test(name);
    }).filter(n => {
      const name = n.basename || n.path.split('/').pop()?.replace('.md', '') || '';
      const noteDate = new Date(name);
      return noteDate >= startOfWeek && noteDate <= endOfWeek;
    });

    // Get graph analysis
    let topConnectedNotes: string[] = [];
    if (this.plugin.knowledgeGraph) {
      if (!this.plugin.knowledgeGraph.isGraphBuilt()) {
        await this.plugin.knowledgeGraph.buildGraph();
      }
      const bridges = this.plugin.knowledgeGraph.findBridgeNotes(5);
      topConnectedNotes = bridges.map(b => b.title);
    }

    // Identify neglected areas
    const neglectedAreas = await this.findNeglectedAreas();

    // Generate insights
    const insights = await this.generateWeeklyInsights(weekNotes.length, dailyNotes.length);

    // Calculate weekly score
    const weeklyScore = this.calculateWeeklyScore(weekNotes.length, dailyNotes.length);

    return {
      weekNumber,
      year,
      startDate: startOfWeek.toISOString().split('T')[0],
      endDate: endOfWeek.toISOString().split('T')[0],
      dailyNotes: dailyNotes.length,
      totalNotesCreated: weekNotes.length,
      totalTasksCompleted: 0,
      projectProgress: [],
      topConnectedNotes,
      neglectedAreas,
      insights,
      weeklyScore
    };
  }

  /**
   * Get review prompts for reflection
   */
  async getReviewPrompts(type: 'daily' | 'weekly' | 'monthly'): Promise<string[]> {
    const prompts: Record<string, string[]> = {
      daily: [
        "What was my most important accomplishment today?",
        "What challenged me today and how did I handle it?",
        "What am I grateful for right now?",
        "What could I have done better?",
        "What's one thing I learned today?",
        "Did I move closer to my goals? How?",
        "What drained my energy? What energized me?",
        "What's my intention for tomorrow?"
      ],
      weekly: [
        "What were my top 3 wins this week?",
        "What projects made progress? Which ones stalled?",
        "What patterns do I notice in my productivity?",
        "Did I maintain my habits? Which ones need attention?",
        "What conversations or insights stand out?",
        "What should I stop doing? Start doing? Continue doing?",
        "Am I aligned with my long-term goals?",
        "What's my focus for next week?"
      ],
      monthly: [
        "What were the major themes of this month?",
        "Which goals did I achieve? Which need adjustment?",
        "How has my knowledge base grown?",
        "What relationships did I nurture or neglect?",
        "What skills did I develop?",
        "What habits are becoming automatic?",
        "What decisions am I most proud of?",
        "What would I tell myself at the start of this month?"
      ]
    };

    return prompts[type] || prompts.daily;
  }

  /**
   * Generate AI-powered review summary
   */
  async generateReviewSummary(type: 'daily' | 'weekly'): Promise<string> {
    let context = '';

    if (type === 'daily') {
      const review = await this.generateDailyReview();
      context = `Daily Review for ${review.date}:
- Notes created: ${review.notesCreated}
- Notes modified: ${review.notesModified}
- Orphan notes: ${review.orphansFound}
- Insights: ${review.insights.map(i => i.title).join(', ')}`;
    } else {
      const review = await this.generateWeeklyReview();
      context = `Weekly Review for Week ${review.weekNumber}:
- Daily notes: ${review.dailyNotes}/7
- Total notes created: ${review.totalNotesCreated}
- Top connected notes: ${review.topConnectedNotes.join(', ')}
- Neglected areas: ${review.neglectedAreas.join(', ')}
- Score: ${review.weeklyScore}/10`;
    }

    const prompt = `Based on this ${type} review data, provide a brief, encouraging summary with actionable next steps:

${context}

Format as:
## Summary
[2-3 sentence overview]

## Key Insights
- [insight 1]
- [insight 2]

## Suggested Actions
1. [action]
2. [action]

Keep it concise and motivating.`;

    try {
      const response = await this.plugin.ollama.chat([
        {
          role: 'system',
          content: 'You are a productivity coach helping with personal knowledge management reviews. Be encouraging but honest.'
        },
        { role: 'user', content: prompt }
      ]);

      return response;
    } catch (e) {
      return `## ${type.charAt(0).toUpperCase() + type.slice(1)} Review\n\n${context}`;
    }
  }

  /**
   * Find notes that need attention
   */
  async findNotesNeedingAttention(): Promise<{
    stale: string[];
    unfinished: string[];
    unlinked: string[];
  }> {
    const allNotes = await this.plugin.vault.getAllNotes();
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);

    // Stale notes - not modified in 30 days but in active areas
    const stale = allNotes
      .filter(n => {
        const mtime = n.stat?.mtime || 0;
        const path = n.path;
        const isActive = path.startsWith('1-Projects/') || path.startsWith('2-Areas/');
        return isActive && mtime < thirtyDaysAgo;
      })
      .map(n => n.path.split('/').pop()?.replace('.md', '') || n.path)
      .slice(0, 10);

    // Unfinished notes - have TODO markers but old
    const unfinished: string[] = [];
    for (const note of allNotes.slice(0, 50)) { // Limit to avoid performance issues
      try {
        const content = await this.plugin.vault.readFile(note.path);
        if (content && /- \[ \]/.test(content)) {
          const mtime = note.stat?.mtime || 0;
          if (mtime < sevenDaysAgo) {
            unfinished.push(note.path.split('/').pop()?.replace('.md', '') || note.path);
          }
        }
      } catch {
        // Skip notes we can't read
      }
    }

    // Unlinked notes
    let unlinked: string[] = [];
    if (this.plugin.knowledgeGraph) {
      if (!this.plugin.knowledgeGraph.isGraphBuilt()) {
        await this.plugin.knowledgeGraph.buildGraph();
      }
      const orphans = this.plugin.knowledgeGraph.findOrphans();
      unlinked = orphans.slice(0, 10).map(o => o.title);
    }

    return { stale, unfinished: unfinished.slice(0, 10), unlinked };
  }

  /**
   * Get today's focus suggestion
   */
  async suggestTodaysFocus(): Promise<string> {
    const attention = await this.findNotesNeedingAttention();

    // Get memory context if available
    let memoryContext = '';
    if (this.plugin.memory) {
      try {
        const goals = await this.plugin.memory.getByCategory('goal');
        const projects = await this.plugin.memory.getByCategory('project');
        if (goals.length > 0) {
          memoryContext += `\nUser's goals: ${goals.slice(0, 3).map((g: { fact: string }) => g.fact).join('; ')}`;
        }
        if (projects.length > 0) {
          memoryContext += `\nActive projects: ${projects.slice(0, 3).map((p: { fact: string }) => p.fact).join('; ')}`;
        }
      } catch {
        // Memory service might not be initialized
      }
    }

    const context = `
Notes needing attention:
- Stale notes (30+ days): ${attention.stale.slice(0, 3).join(', ') || 'None'}
- Notes with pending tasks: ${attention.unfinished.slice(0, 3).join(', ') || 'None'}
- Unlinked notes: ${attention.unlinked.slice(0, 3).join(', ') || 'None'}
${memoryContext}

Day of week: ${new Date().toLocaleDateString('en-US', { weekday: 'long' })}
`;

    const prompt = `Based on this context, suggest ONE main focus for today. Be specific and actionable.

${context}

Respond with just the focus statement (1-2 sentences).`;

    try {
      const response = await this.plugin.ollama.chat([
        {
          role: 'system',
          content: 'You suggest a single, clear daily focus based on context. Be concise and actionable.'
        },
        { role: 'user', content: prompt }
      ]);

      return response.trim();
    } catch {
      if (attention.stale.length > 0) {
        return `Review and update "${attention.stale[0]}" - it hasn't been touched in 30+ days.`;
      }
      if (attention.unfinished.length > 0) {
        return `Complete the pending tasks in "${attention.unfinished[0]}".`;
      }
      return 'Capture your thoughts and make progress on your current project.';
    }
  }

  // Private helper methods

  private async generateDailyInsights(created: number, modified: number, orphans: number): Promise<ReviewInsight[]> {
    const insights: ReviewInsight[] = [];

    if (created >= 5) {
      insights.push({
        type: 'celebration',
        title: 'Productive capture!',
        description: `You created ${created} notes today. Great job capturing your thoughts!`
      });
    } else if (created === 0 && modified === 0) {
      insights.push({
        type: 'suggestion',
        title: 'Quiet day',
        description: 'No notes created or modified today. Consider a quick capture session.',
        action: 'Open your inbox and jot down one thought.'
      });
    }

    if (orphans > 10) {
      insights.push({
        type: 'warning',
        title: 'Connection opportunity',
        description: `${orphans} orphan notes found. Consider linking them to your knowledge graph.`,
        action: 'Use /orphans to see which notes need connections.'
      });
    }

    return insights;
  }

  private async generateWeeklyInsights(notesCreated: number, dailyNotes: number): Promise<ReviewInsight[]> {
    const insights: ReviewInsight[] = [];

    if (dailyNotes >= 5) {
      insights.push({
        type: 'celebration',
        title: 'Consistent journaling!',
        description: `You wrote ${dailyNotes}/7 daily notes this week. Keep it up!`
      });
    } else if (dailyNotes < 3) {
      insights.push({
        type: 'suggestion',
        title: 'Daily practice',
        description: 'Only a few daily notes this week. Try to journal more consistently.',
        action: 'Set a reminder for your evening reflection.'
      });
    }

    if (notesCreated > 20) {
      insights.push({
        type: 'pattern',
        title: 'High capture week',
        description: `${notesCreated} notes created - lots of new knowledge captured.`
      });
    }

    return insights;
  }

  private async generateDailySuggestions(dateStr: string): Promise<string[]> {
    const suggestions: string[] = [];
    const dayOfWeek = new Date(dateStr).getDay();

    // Day-specific suggestions
    if (dayOfWeek === 0) { // Sunday
      suggestions.push('Plan your week ahead - review upcoming projects');
    } else if (dayOfWeek === 5) { // Friday
      suggestions.push('Do a quick weekly review before the weekend');
    }

    // Always useful
    suggestions.push('Review your inbox and process new captures');
    suggestions.push('Connect at least one note to your graph');

    return suggestions;
  }

  private async findNeglectedAreas(): Promise<string[]> {
    const allNotes = await this.plugin.vault.getAllNotes();
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);

    // Check each area folder
    const areas = ['1-Projects', '2-Areas', '3-Resources'];
    const neglected: string[] = [];

    for (const area of areas) {
      const areaNotes = allNotes.filter(n => n.path.startsWith(area + '/'));
      if (areaNotes.length === 0) continue;

      const recentNotes = areaNotes.filter(n => (n.stat?.mtime || 0) > thirtyDaysAgo);
      const activeRatio = recentNotes.length / areaNotes.length;

      if (activeRatio < 0.2 && areaNotes.length > 5) {
        neglected.push(area);
      }
    }

    return neglected;
  }

  private calculateWeeklyScore(notesCreated: number, dailyNotes: number): number {
    let score = 5; // Base score

    // Daily notes bonus
    score += Math.min(dailyNotes, 7) * 0.5; // Up to 3.5 points

    // Notes created bonus
    if (notesCreated >= 10) score += 1;
    if (notesCreated >= 20) score += 0.5;

    return Math.min(Math.round(score * 10) / 10, 10);
  }

  private getWeekNumber(date: Date): number {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  }
}
