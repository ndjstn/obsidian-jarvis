# Jarvis AI Assistant - Development Guide

## Project Overview
Obsidian plugin providing PKM AI assistant with local LLM support via Ollama.

## Quick Commands
```bash
npm run dev    # Development build with watch
npm run build  # Production build
```

## Architecture
- **RouterAgent**: 5-layer intelligent query routing (Intent → Context → Plan → Execute → Synthesize)
- **ToolRegistry**: Deterministic tool execution without LLM overhead
- **DashboardService**: Real-time goals, agenda, finances, metrics
- **PKMTools**: Note/project/task management

## Key Files
- `src/main.ts` - Plugin entry, service initialization
- `src/ui/JarvisView.ts` - Main UI with modes (Smart, Dashboard, Chat, etc.)
- `src/agents/RouterAgent.ts` - 5-layer agent architecture
- `src/tools/ToolRegistry.ts` - Tool definitions and execution
- `src/services/DashboardService.ts` - Dashboard data aggregation

## Modes
- **Smart**: Uses RouterAgent for intelligent query processing
- **Dashboard**: Shows goals, agenda, finances at a glance
- **Chat/Research/Plan/Task/RAG**: Specialized modes

## Adding New Tools
1. Add to `src/tools/ToolRegistry.ts` or `src/tools/PKMTools.ts`
2. Register in `registerBuiltinTools()` or `registerPKMTools()`

## Testing
Open Obsidian with plugin enabled, use Ctrl+Shift+I for DevTools.
