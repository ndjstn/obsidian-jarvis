import type JarvisPlugin from '../main';
import type { TFile } from 'obsidian';

export interface DashboardData {
  greeting: string;
  date: string;
  focus: FocusSuggestion | null;
  agenda: AgendaItem[];
  goals: GoalProgress[];
  finances: FinanceSummary | null;
  recentNotes: RecentNote[];
  metrics: DashboardMetrics;
}

export interface FocusSuggestion {
  priority: 'high' | 'medium' | 'low';
  suggestion: string;
  reasoning: string;
  relatedTasks: string[];
}

export interface AgendaItem {
  id: string;
  description: string;
  project?: string;
  priority?: string;
  due?: string;
  dueTime?: string;
  status: 'pending' | 'overdue' | 'due_today';
  urgency: number;
}

export interface GoalProgress {
  id: string;
  title: string;
  category: 'personal' | 'professional' | 'health' | 'learning' | 'financial';
  progress: number; // 0-100
  target?: string;
  current?: string;
  deadline?: string;
  milestones: Milestone[];
}

export interface Milestone {
  title: string;
  completed: boolean;
  completedDate?: string;
}

export interface FinanceSummary {
  period: string;
  income: number;
  expenses: number;
  savings: number;
  savingsRate: number;
  budgetStatus: 'on_track' | 'over_budget' | 'under_budget';
  topCategories: { category: string; amount: number }[];
}

export interface RecentNote {
  path: string;
  title: string;
  modifiedTime: number;
  snippet?: string;
}

export interface DashboardMetrics {
  notesCreatedToday: number;
  notesModifiedToday: number;
  tasksCompletedToday: number;
  tasksCompletedThisWeek: number;
  currentStreak: number;
  vaultSize: number;
}

export class DashboardService {
  private plugin: JarvisPlugin;
  private cache: DashboardData | null = null;
  private cacheTime: number = 0;
  private readonly CACHE_TTL = 60000; // 1 minute cache

  constructor(plugin: JarvisPlugin) {
    this.plugin = plugin;
  }

  /**
   * Get complete dashboard data
   */
  async getDashboard(forceRefresh = false): Promise<DashboardData> {
    const now = Date.now();
    if (!forceRefresh && this.cache && (now - this.cacheTime) < this.CACHE_TTL) {
      return this.cache;
    }

    const [focus, agenda, goals, finances, recentNotes, metrics] = await Promise.all([
      this.getFocusSuggestion(),
      this.getAgenda(),
      this.getGoals(),
      this.getFinances(),
      this.getRecentNotes(),
      this.getMetrics()
    ]);

    const dashboard: DashboardData = {
      greeting: this.getGreeting(),
      date: this.formatDate(new Date()),
      focus,
      agenda,
      goals,
      finances,
      recentNotes,
      metrics
    };

    this.cache = dashboard;
    this.cacheTime = now;

    return dashboard;
  }

  private getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    if (hour < 21) return 'Good evening';
    return 'Good night';
  }

  private formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  /**
   * Get AI-suggested focus for the day
   */
  async getFocusSuggestion(): Promise<FocusSuggestion | null> {
    try {
      // Get high-priority pending tasks
      const tasks = await this.queryTaskWarrior('status:pending priority:H limit:5');
      const overdueTasks = await this.queryTaskWarrior('status:pending +OVERDUE limit:3');
      const dueTodayTasks = await this.queryTaskWarrior('status:pending due:today limit:5');

      // Combine and prioritize
      const allTasks = [...overdueTasks, ...dueTodayTasks, ...tasks];
      const uniqueTasks = allTasks.filter((task, i, arr) =>
        arr.findIndex(t => t.uuid === task.uuid) === i
      );

      if (uniqueTasks.length === 0) {
        return {
          priority: 'low',
          suggestion: 'Your task list is clear! Consider reviewing your goals or capturing new ideas.',
          reasoning: 'No urgent tasks found. Great time for reflection or planning.',
          relatedTasks: []
        };
      }

      // Determine priority and suggestion
      const hasOverdue = overdueTasks.length > 0;
      const hasDueToday = dueTodayTasks.length > 0;
      const hasHighPriority = tasks.length > 0;

      let priority: 'high' | 'medium' | 'low' = 'low';
      let suggestion = '';
      let reasoning = '';

      if (hasOverdue) {
        priority = 'high';
        suggestion = `Clear ${overdueTasks.length} overdue task${overdueTasks.length > 1 ? 's' : ''}: "${overdueTasks[0].description}"`;
        reasoning = 'Overdue tasks create cognitive load. Completing or rescheduling them will free up mental space.';
      } else if (hasDueToday) {
        priority = 'high';
        suggestion = `Complete today's ${dueTodayTasks.length} due task${dueTodayTasks.length > 1 ? 's' : ''}: "${dueTodayTasks[0].description}"`;
        reasoning = 'These tasks are due today. Prioritizing them prevents future overdue items.';
      } else if (hasHighPriority) {
        priority = 'medium';
        suggestion = `Work on high-priority: "${tasks[0].description}"`;
        reasoning = 'No urgent deadlines, but this high-priority task will move your goals forward.';
      }

      return {
        priority,
        suggestion,
        reasoning,
        relatedTasks: uniqueTasks.slice(0, 3).map(t => t.description)
      };
    } catch (error) {
      console.error('Failed to get focus suggestion:', error);
      return null;
    }
  }

  /**
   * Get today's agenda from TaskWarrior
   */
  async getAgenda(): Promise<AgendaItem[]> {
    try {
      const overdue = await this.queryTaskWarrior('status:pending +OVERDUE');
      const dueToday = await this.queryTaskWarrior('status:pending due:today');
      const highPriority = await this.queryTaskWarrior('status:pending priority:H -OVERDUE due.not:today limit:5');

      const items: AgendaItem[] = [];

      // Add overdue tasks
      for (const task of overdue) {
        items.push({
          id: task.uuid,
          description: task.description,
          project: task.project,
          priority: task.priority,
          due: task.due,
          status: 'overdue',
          urgency: task.urgency || 10
        });
      }

      // Add due today
      for (const task of dueToday) {
        if (!items.find(i => i.id === task.uuid)) {
          items.push({
            id: task.uuid,
            description: task.description,
            project: task.project,
            priority: task.priority,
            due: task.due,
            status: 'due_today',
            urgency: task.urgency || 8
          });
        }
      }

      // Add high priority
      for (const task of highPriority) {
        if (!items.find(i => i.id === task.uuid)) {
          items.push({
            id: task.uuid,
            description: task.description,
            project: task.project,
            priority: task.priority,
            due: task.due,
            status: 'pending',
            urgency: task.urgency || 5
          });
        }
      }

      // Sort by urgency
      return items.sort((a, b) => b.urgency - a.urgency).slice(0, 10);
    } catch (error) {
      console.error('Failed to get agenda:', error);
      return [];
    }
  }

  /**
   * Get goal progress from vault notes
   */
  async getGoals(): Promise<GoalProgress[]> {
    const goals: GoalProgress[] = [];

    try {
      // Look for goals in memory service first
      if (this.plugin.memory) {
        const memoryGoals = await this.plugin.memory.getByCategory('goal');
        for (const goal of memoryGoals.slice(0, 5)) {
          goals.push({
            id: `mem-${Date.now()}-${Math.random()}`,
            title: goal.fact,
            category: this.categorizeGoal(goal.fact),
            progress: 0, // Can't determine progress from memory alone
            milestones: []
          });
        }
      }

      // Also look for goal notes in vault
      const goalNotes = this.findGoalNotes();
      for (const note of goalNotes) {
        const content = await this.plugin.vault.readFile(note.path);
        if (content) {
          const parsed = this.parseGoalNote(content, note.path);
          if (parsed) {
            goals.push(parsed);
          }
        }
      }

      return goals.slice(0, 6);
    } catch (error) {
      console.error('Failed to get goals:', error);
      return [];
    }
  }

  private categorizeGoal(text: string): GoalProgress['category'] {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('health') || lowerText.includes('fitness') || lowerText.includes('weight')) {
      return 'health';
    }
    if (lowerText.includes('learn') || lowerText.includes('study') || lowerText.includes('skill')) {
      return 'learning';
    }
    if (lowerText.includes('money') || lowerText.includes('save') || lowerText.includes('invest') || lowerText.includes('finance')) {
      return 'financial';
    }
    if (lowerText.includes('work') || lowerText.includes('career') || lowerText.includes('job') || lowerText.includes('business')) {
      return 'professional';
    }
    return 'personal';
  }

  private findGoalNotes(): TFile[] {
    try {
      const allNotes = this.plugin.vault.getAllNotes();
      return allNotes.filter(note =>
        note.path.toLowerCase().includes('goal') ||
        note.path.toLowerCase().includes('objective') ||
        note.path.toLowerCase().includes('okr')
      ).slice(0, 10);
    } catch {
      return [];
    }
  }

  private parseGoalNote(content: string, path: string): GoalProgress | null {
    try {
      // Extract frontmatter
      const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
      let frontmatter: Record<string, string> = {};

      if (fmMatch) {
        const lines = fmMatch[1].split('\n');
        for (const line of lines) {
          const [key, ...valueParts] = line.split(':');
          if (key && valueParts.length > 0) {
            frontmatter[key.trim()] = valueParts.join(':').trim();
          }
        }
      }

      // Count checkboxes for progress
      const totalCheckboxes = (content.match(/- \[[ x]\]/g) || []).length;
      const completedCheckboxes = (content.match(/- \[x\]/gi) || []).length;
      const progress = totalCheckboxes > 0 ? Math.round((completedCheckboxes / totalCheckboxes) * 100) : 0;

      // Extract milestones from checkboxes
      const milestones: Milestone[] = [];
      const checkboxMatches = content.matchAll(/- \[([ x])\] (.+)/gi);
      for (const match of checkboxMatches) {
        milestones.push({
          title: match[2].trim(),
          completed: match[1].toLowerCase() === 'x'
        });
      }

      const title = frontmatter['title'] || path.split('/').pop()?.replace('.md', '') || 'Goal';

      return {
        id: path,
        title,
        category: this.categorizeGoal(title + ' ' + content.substring(0, 200)),
        progress,
        target: frontmatter['target'],
        deadline: frontmatter['deadline'] || frontmatter['due'],
        milestones: milestones.slice(0, 5)
      };
    } catch {
      return null;
    }
  }

  /**
   * Get finance summary from vault notes
   */
  async getFinances(): Promise<FinanceSummary | null> {
    try {
      // Look for finance notes
      const allNotes = this.plugin.vault.getAllNotes();
      const financeNotes = allNotes.filter((note: TFile) =>
        note.path.toLowerCase().includes('finance') ||
        note.path.toLowerCase().includes('budget') ||
        note.path.toLowerCase().includes('money') ||
        note.path.toLowerCase().includes('expense')
      );

      if (financeNotes.length === 0) {
        return null;
      }

      // Parse finance data from notes
      let totalIncome = 0;
      let totalExpenses = 0;
      const categories: Map<string, number> = new Map();

      for (const note of financeNotes.slice(0, 5)) {
        const content = await this.plugin.vault.readFile(note.path);
        if (content) {
          // Look for income entries
          const incomeMatches = content.matchAll(/income[:\s]+\$?([\d,]+(?:\.\d{2})?)/gi);
          for (const match of incomeMatches) {
            totalIncome += parseFloat(match[1].replace(',', ''));
          }

          // Look for expense entries
          const expenseMatches = content.matchAll(/expense[s]?[:\s]+\$?([\d,]+(?:\.\d{2})?)/gi);
          for (const match of expenseMatches) {
            totalExpenses += parseFloat(match[1].replace(',', ''));
          }

          // Look for category spending
          const categoryMatches = content.matchAll(/(\w+)[:\s]+\$?([\d,]+(?:\.\d{2})?)/g);
          for (const match of categoryMatches) {
            const cat = match[1].toLowerCase();
            if (['food', 'rent', 'utilities', 'transport', 'entertainment', 'shopping', 'health'].includes(cat)) {
              categories.set(cat, (categories.get(cat) || 0) + parseFloat(match[2].replace(',', '')));
            }
          }
        }
      }

      if (totalIncome === 0 && totalExpenses === 0) {
        return null;
      }

      const savings = totalIncome - totalExpenses;
      const savingsRate = totalIncome > 0 ? (savings / totalIncome) * 100 : 0;

      return {
        period: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        income: totalIncome,
        expenses: totalExpenses,
        savings,
        savingsRate: Math.round(savingsRate),
        budgetStatus: savingsRate >= 20 ? 'under_budget' : savingsRate >= 0 ? 'on_track' : 'over_budget',
        topCategories: Array.from(categories.entries())
          .map(([category, amount]) => ({ category, amount }))
          .sort((a, b) => b.amount - a.amount)
          .slice(0, 5)
      };
    } catch (error) {
      console.error('Failed to get finances:', error);
      return null;
    }
  }

  /**
   * Get recently modified notes
   */
  async getRecentNotes(): Promise<RecentNote[]> {
    try {
      const allNotes = this.plugin.vault.getAllNotes();
      const notesWithMtime: RecentNote[] = allNotes.map((note: TFile) => ({
        path: note.path,
        title: note.basename || note.path.split('/').pop()?.replace('.md', '') || note.path,
        modifiedTime: note.stat.mtime
      }));

      return notesWithMtime
        .sort((a, b) => b.modifiedTime - a.modifiedTime)
        .slice(0, 5);
    } catch (error) {
      console.error('Failed to get recent notes:', error);
      return [];
    }
  }

  /**
   * Get dashboard metrics
   */
  async getMetrics(): Promise<DashboardMetrics> {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay()).getTime();

    try {
      const allNotes = this.plugin.vault.getAllNotes();
      let notesCreatedToday = 0;
      let notesModifiedToday = 0;

      for (const note of allNotes) {
        if (note.stat.ctime >= todayStart) notesCreatedToday++;
        if (note.stat.mtime >= todayStart) notesModifiedToday++;
      }

      // Get task completion stats
      let tasksCompletedToday = 0;
      let tasksCompletedThisWeek = 0;

      try {
        const todayTasks = await this.queryTaskWarrior(`status:completed end.after:${this.formatTaskDate(new Date(todayStart))}`);
        tasksCompletedToday = todayTasks.length;

        const weekTasks = await this.queryTaskWarrior(`status:completed end.after:${this.formatTaskDate(new Date(weekStart))}`);
        tasksCompletedThisWeek = weekTasks.length;
      } catch {
        // TaskWarrior might not be available
      }

      // Calculate streak (consecutive days with activity)
      let currentStreak = 0;
      const dayMs = 24 * 60 * 60 * 1000;
      let checkDate = todayStart;

      for (let i = 0; i < 30; i++) {
        const hasActivity = allNotes.some((note: TFile) =>
          note.stat.mtime >= checkDate && note.stat.mtime < checkDate + dayMs
        );

        if (hasActivity || i === 0) {
          currentStreak++;
          checkDate -= dayMs;
        } else {
          break;
        }
      }

      return {
        notesCreatedToday,
        notesModifiedToday,
        tasksCompletedToday,
        tasksCompletedThisWeek,
        currentStreak: Math.min(currentStreak, 30), // Cap display at 30
        vaultSize: allNotes.length
      };
    } catch (error) {
      console.error('Failed to get metrics:', error);
      return {
        notesCreatedToday: 0,
        notesModifiedToday: 0,
        tasksCompletedToday: 0,
        tasksCompletedThisWeek: 0,
        currentStreak: 0,
        vaultSize: 0
      };
    }
  }

  private formatTaskDate(date: Date): string {
    return date.toISOString().split('T')[0].replace(/-/g, '');
  }

  /**
   * Query TaskWarrior
   */
  private async queryTaskWarrior(filter: string): Promise<any[]> {
    try {
      const { exec } = require('child_process');
      const { promisify } = require('util');
      const execAsync = promisify(exec);

      const { stdout } = await execAsync(`task ${filter} export`, { timeout: 5000 });
      return JSON.parse(stdout || '[]');
    } catch {
      return [];
    }
  }

  /**
   * Format dashboard as markdown for display
   */
  formatAsMarkdown(data: DashboardData): string {
    let md = '';

    // Header
    md += `# ${data.greeting}! 👋\n`;
    md += `*${data.date}*\n\n`;

    // Focus suggestion
    if (data.focus) {
      const priorityEmoji = {
        high: '🔴',
        medium: '🟡',
        low: '🟢'
      };
      md += `## 🎯 Today's Focus\n`;
      md += `${priorityEmoji[data.focus.priority]} **${data.focus.suggestion}**\n\n`;
      md += `> ${data.focus.reasoning}\n\n`;
    }

    // Agenda
    if (data.agenda.length > 0) {
      md += `## 📋 Agenda\n`;
      for (const item of data.agenda) {
        const statusEmoji = {
          overdue: '⚠️',
          due_today: '📅',
          pending: '⏳'
        };
        const priorityBadge = item.priority ? ` \`${item.priority}\`` : '';
        const projectBadge = item.project ? ` *${item.project}*` : '';
        md += `- ${statusEmoji[item.status]} ${item.description}${priorityBadge}${projectBadge}\n`;
      }
      md += '\n';
    } else {
      md += `## 📋 Agenda\n`;
      md += `*No tasks due today. Great time to work on your goals!*\n\n`;
    }

    // Goals
    if (data.goals.length > 0) {
      md += `## 🎯 Goals\n`;
      for (const goal of data.goals) {
        const categoryEmoji = {
          personal: '🏠',
          professional: '💼',
          health: '💪',
          learning: '📚',
          financial: '💰'
        };
        const progressBar = this.createProgressBar(goal.progress);
        md += `### ${categoryEmoji[goal.category]} ${goal.title}\n`;
        md += `${progressBar} ${goal.progress}%\n`;
        if (goal.deadline) {
          md += `*Due: ${goal.deadline}*\n`;
        }
        md += '\n';
      }
    }

    // Finances
    if (data.finances) {
      md += `## 💰 Finances (${data.finances.period})\n`;
      const statusEmoji = {
        on_track: '✅',
        over_budget: '⚠️',
        under_budget: '🎉'
      };
      md += `${statusEmoji[data.finances.budgetStatus]} `;
      md += `Income: $${data.finances.income.toLocaleString()} | `;
      md += `Expenses: $${data.finances.expenses.toLocaleString()} | `;
      md += `Savings: $${data.finances.savings.toLocaleString()} (${data.finances.savingsRate}%)\n\n`;
    }

    // Quick Metrics
    md += `## 📊 Quick Stats\n`;
    md += `| Metric | Value |\n`;
    md += `|--------|-------|\n`;
    md += `| Notes today | ${data.metrics.notesModifiedToday} |\n`;
    md += `| Tasks completed | ${data.metrics.tasksCompletedToday} |\n`;
    md += `| Weekly tasks | ${data.metrics.tasksCompletedThisWeek} |\n`;
    md += `| Vault size | ${data.metrics.vaultSize} notes |\n`;
    md += `| Streak | ${data.metrics.currentStreak} days 🔥 |\n\n`;

    // Recent Notes
    if (data.recentNotes.length > 0) {
      md += `## 📝 Recently Modified\n`;
      for (const note of data.recentNotes) {
        const ago = this.formatTimeAgo(note.modifiedTime);
        md += `- [[${note.title}]] - ${ago}\n`;
      }
      md += '\n';
    }

    return md;
  }

  private createProgressBar(progress: number): string {
    const filled = Math.round(progress / 10);
    const empty = 10 - filled;
    return '█'.repeat(filled) + '░'.repeat(empty);
  }

  private formatTimeAgo(timestamp: number): string {
    const now = Date.now();
    const diff = now - timestamp;

    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `${minutes}m ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }
}
