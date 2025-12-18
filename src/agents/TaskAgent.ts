import { AgentBase, AgentInput, AgentOutput, AgentAction, StreamCallback } from '../core/AgentBase';

const TASK_PROMPT = `You are a TaskWarrior command generator. Convert natural language task descriptions into TaskWarrior commands.

Rules:
1. Output ONLY the task command, nothing else
2. Use proper TaskWarrior syntax
3. Include relevant attributes when mentioned

Attributes:
- due:DATE (tomorrow, monday, 2024-12-31, eow, eom, eoy)
- priority:H/M/L
- project:NAME (use dots for hierarchy: work.backend)
- +TAG (use + for tags)
- depends:ID (for dependencies)
- scheduled:DATE (when to start)
- wait:DATE (hide until)

Examples:
"remind me to call mom tomorrow" → task add "Call mom" due:tomorrow
"high priority fix auth bug by friday for backend" → task add "Fix auth bug" priority:H due:friday project:backend
"review PR after lunch" → task add "Review PR" scheduled:today+4h
"buy groceries this weekend" → task add "Buy groceries" due:saturday +shopping
"finish report depends on getting data" → task add "Finish report" depends:UUID

Now convert:`;

export class TaskAgent extends AgentBase {
  readonly name = 'task';
  readonly description = 'Create TaskWarrior tasks from natural language';
  readonly icon = 'check-square';

  // Keywords that indicate task intent
  private taskKeywords = [
    'task', 'todo', 'remind', 'remember', 'add to', 'schedule',
    'due', 'deadline', 'by', 'before', 'priority', 'urgent'
  ];

  canHandle(input: AgentInput): boolean {
    const query = input.query.toLowerCase();

    for (const keyword of this.taskKeywords) {
      if (query.includes(keyword)) {
        return true;
      }
    }

    // Check for imperative statements
    const imperativeStarters = ['do', 'make', 'create', 'write', 'send', 'call', 'email', 'buy', 'fix', 'review'];
    for (const starter of imperativeStarters) {
      if (query.startsWith(starter + ' ')) {
        return true;
      }
    }

    return false;
  }

  async execute(input: AgentInput, _stream?: StreamCallback): Promise<AgentOutput> {
    this.validateInput(input);

    // Check if TaskWarrior is enabled
    if (!this.context.settings.enabled) {
      return this.createTextOutput('TaskWarrior integration is disabled in settings.');
    }

    try {
      const response = await this.context.ollama.chat([
        { role: 'system', content: TASK_PROMPT },
        { role: 'user', content: input.query }
      ]);

      // Clean up the response
      const command = this.cleanCommand(response);

      // Validate it looks like a task command
      if (!command.startsWith('task add')) {
        throw new Error('Failed to generate valid TaskWarrior command');
      }

      // Parse the command for display
      const parsed = this.parseCommand(command);

      const content = `**TaskWarrior Command:**

\`\`\`bash
${command}
\`\`\`

**Parsed:**
- Description: ${parsed.description}
${parsed.due ? `- Due: ${parsed.due}` : ''}
${parsed.priority ? `- Priority: ${parsed.priority}` : ''}
${parsed.project ? `- Project: ${parsed.project}` : ''}
${parsed.tags.length > 0 ? `- Tags: ${parsed.tags.join(', ')}` : ''}

Copy the command above or click "Run Command" to create the task.`;

      const actions: AgentAction[] = [
        {
          type: 'run_command',
          label: 'Run Command',
          payload: { command }
        }
      ];

      return {
        content,
        type: 'task',
        metadata: {
          command,
          parsed
        },
        actions
      };
    } catch (error) {
      throw new Error(`Task creation failed: ${error.message}`);
    }
  }

  /**
   * Clean up the LLM response to get just the command
   */
  private cleanCommand(response: string): string {
    // Remove markdown code blocks
    let cleaned = response.replace(/```(?:bash|sh)?\n?/g, '').replace(/```/g, '');

    // Get just the first line that looks like a task command
    const lines = cleaned.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('task add')) {
        return trimmed;
      }
    }

    return cleaned.trim();
  }

  /**
   * Parse a TaskWarrior command to extract components
   */
  private parseCommand(command: string): {
    description: string;
    due?: string;
    priority?: string;
    project?: string;
    tags: string[];
  } {
    const result = {
      description: '',
      due: undefined as string | undefined,
      priority: undefined as string | undefined,
      project: undefined as string | undefined,
      tags: [] as string[]
    };

    // Extract description (quoted string)
    const descMatch = command.match(/"([^"]+)"/);
    if (descMatch) {
      result.description = descMatch[1];
    }

    // Extract due date
    const dueMatch = command.match(/due:(\S+)/);
    if (dueMatch) {
      result.due = dueMatch[1];
    }

    // Extract priority
    const priorityMatch = command.match(/priority:([HML])/i);
    if (priorityMatch) {
      result.priority = priorityMatch[1].toUpperCase();
    }

    // Extract project
    const projectMatch = command.match(/project:(\S+)/);
    if (projectMatch) {
      result.project = projectMatch[1];
    }

    // Extract tags
    const tagMatches = command.matchAll(/\+(\w+)/g);
    for (const match of tagMatches) {
      result.tags.push(match[1]);
    }

    return result;
  }
}
