import { AgentBase, AgentInput, AgentOutput, AgentAction, StreamCallback } from '../core/AgentBase';

const PLANNING_PROMPT = `You are a planning assistant that breaks down goals into actionable tasks.

Given a goal, analyze it and create a structured plan with:
1. Brief analysis of what's needed
2. A prioritized task list with clear, actionable items
3. Dependencies between tasks (if any)
4. Potential blockers or considerations

Format your response EXACTLY as follows:

## Goal Analysis
[2-3 sentences analyzing the goal]

## Tasks
- [ ] **Task 1**: [Description] (Priority: High/Medium/Low)
- [ ] **Task 2**: [Description] (Priority: High/Medium/Low)
[Continue for all tasks]

## Dependencies
- Task X depends on Task Y
[Or "No dependencies" if none]

## Notes
[Any additional considerations, risks, or suggestions]

Keep tasks specific and actionable. Aim for 5-10 tasks for most goals.`;

export class PlanningAgent extends AgentBase {
  readonly name = 'planning';
  readonly description = 'Break down goals into actionable task plans';
  readonly icon = 'list-todo';

  // Keywords that indicate planning intent
  private planningKeywords = [
    'plan', 'break down', 'decompose', 'steps', 'how to', 'roadmap',
    'strategy', 'approach', 'implement', 'build', 'create', 'develop',
    'organize', 'structure', 'outline'
  ];

  canHandle(input: AgentInput): boolean {
    const query = input.query.toLowerCase();

    // Check for explicit planning keywords
    for (const keyword of this.planningKeywords) {
      if (query.includes(keyword)) {
        return true;
      }
    }

    // Check for goal-like statements
    if (query.startsWith('i want to') || query.startsWith('i need to')) {
      return true;
    }

    return false;
  }

  async execute(input: AgentInput, stream?: StreamCallback): Promise<AgentOutput> {
    this.validateInput(input);

    try {
      const response = await this.context.ollama.chat([
        { role: 'system', content: PLANNING_PROMPT },
        { role: 'user', content: `Create a plan for: ${input.query}` }
      ], stream);

      // Parse the response to extract tasks for potential actions
      const tasks = this.extractTasks(response);

      const actions: AgentAction[] = [];

      // Add action to create a note with the plan
      if (tasks.length > 0) {
        actions.push({
          type: 'create_note',
          label: 'Save as Note',
          payload: {
            title: `Plan: ${input.query.substring(0, 50)}`,
            content: response,
            folder: '1-Projects'
          }
        });

        // Add action to create TaskWarrior tasks (if enabled)
        actions.push({
          type: 'run_command',
          label: 'Create Tasks in TaskWarrior',
          payload: {
            tasks: tasks
          }
        });
      }

      return {
        content: response,
        type: 'plan',
        metadata: {
          taskCount: tasks.length,
          tasks
        },
        actions
      };
    } catch (error) {
      throw new Error(`Planning failed: ${error.message}`);
    }
  }

  /**
   * Extract tasks from the planning response
   */
  private extractTasks(response: string): Array<{ description: string; priority: string }> {
    const tasks: Array<{ description: string; priority: string }> = [];

    // Match task lines like "- [ ] **Task 1**: Description (Priority: High)"
    const taskRegex = /- \[ \] \*\*[^*]+\*\*:\s*([^(]+)\s*\(Priority:\s*(High|Medium|Low)\)/gi;

    let match;
    while ((match = taskRegex.exec(response)) !== null) {
      tasks.push({
        description: match[1].trim(),
        priority: match[2]
      });
    }

    // Fallback: match simpler task formats
    if (tasks.length === 0) {
      const simpleRegex = /- \[ \]\s*(.+)/g;
      while ((match = simpleRegex.exec(response)) !== null) {
        tasks.push({
          description: match[1].trim(),
          priority: 'Medium'
        });
      }
    }

    return tasks;
  }

  /**
   * Convert priority to TaskWarrior format
   */
  static priorityToTW(priority: string): string {
    switch (priority.toLowerCase()) {
      case 'high': return 'H';
      case 'low': return 'L';
      default: return 'M';
    }
  }
}
