# Jarvis AI Assistant for Obsidian

A comprehensive AI assistant plugin for Obsidian powered by local LLMs via Ollama. Features planning, vision, semantic search, and task management capabilities.

## Features

- **Chat Mode**: General conversation with context awareness
- **Plan Mode**: Break down goals into actionable tasks
- **Summarize Mode**: Generate summaries of notes (brief, detailed, or bullet points)
- **Task Mode**: Natural language to TaskWarrior commands
- **Vision Mode**: Analyze images using multimodal models
- **RAG Search**: Semantic search across your vault (coming soon)

## Requirements

- [Obsidian](https://obsidian.md/) v1.5.0 or higher
- [Ollama](https://ollama.ai/) running locally
- Recommended models:
  - `granite3.1-dense:2b` - Text generation
  - `granite3.2-vision:2b` - Image analysis
  - `granite-embedding:278m` - Embeddings for RAG

## Installation

### Via BRAT (Recommended for Beta Testing)

1. Install [BRAT](https://github.com/TfTHacker/obsidian42-brat) plugin
2. Open BRAT settings
3. Click "Add Beta Plugin"
4. Enter: `ndjstn/obsidian-jarvis`
5. Enable the plugin in Community Plugins

### Manual Installation

1. Download the latest release from [Releases](../../releases)
2. Extract `main.js`, `manifest.json`, and `styles.css` to:
   ```
   YOUR_VAULT/.obsidian/plugins/obsidian-jarvis/
   ```
3. Enable the plugin in Obsidian settings

## Setup

1. Ensure Ollama is running: `ollama serve`
2. Pull required models:
   ```bash
   ollama pull granite3.1-dense:2b
   ollama pull granite3.2-vision:2b
   ollama pull granite-embedding:278m
   ```
3. Open Obsidian and enable Jarvis in Community Plugins
4. Configure settings (optional):
   - Ollama endpoint (default: `http://localhost:11434`)
   - Model selection
   - Feature toggles

## Usage

### Commands

| Shortcut | Command | Description |
|----------|---------|-------------|
| `Ctrl+Shift+J` | Open Jarvis | Open the Jarvis side panel |
| `Ctrl+Shift+A` | Quick Ask | Ask about current selection |
| `Ctrl+Shift+P` | Create Plan | Decompose a goal into tasks |
| `Ctrl+Shift+T` | Create Task | Natural language task creation |

### Modes

**Chat**: General conversation with your AI assistant. Maintains conversation history for context.

**Plan**: Enter a goal and Jarvis will break it down into:
- Task list with estimates
- Dependencies between tasks
- Implementation notes

**Summarize**: Summarize notes or selected text in three styles:
- Brief (2-3 sentences)
- Detailed (comprehensive)
- Bullets (3-5 bullet points)

**Task**: Describe a task in natural language and get a TaskWarrior command:
- "remind me to call mom tomorrow" → `task add "Call mom" due:tomorrow`

**Vision**: Upload an image and ask questions about it using multimodal AI.

## Configuration

Access settings via: Settings → Community Plugins → Jarvis AI Assistant

| Setting | Description | Default |
|---------|-------------|---------|
| Ollama Endpoint | URL of your Ollama server | `http://localhost:11434` |
| Text Model | Model for text generation | `granite3.1-dense:2b` |
| Vision Model | Model for image analysis | `granite3.2-vision:2b` |
| Temperature | Creativity (0=deterministic, 1=creative) | `0.7` |
| Enable Planning | Allow task decomposition | `true` |
| Enable Vision | Allow image analysis | `true` |
| Enable TaskWarrior | Allow task creation | `true` |

## Development

```bash
# Clone the repository
git clone https://github.com/ndjstn/obsidian-jarvis.git
cd obsidian-jarvis

# Install dependencies
npm install

# Development build (with watch)
npm run dev

# Production build
npm run build
```

## Roadmap

- [ ] RAG with semantic search
- [ ] LangGraph.js for multi-step reasoning
- [ ] Web research agent
- [ ] TaskWarrior bi-directional sync
- [ ] Daily/weekly review automation
- [ ] Graph analysis for note connections

## License

MIT License - see [LICENSE](LICENSE) for details.

## Credits

Built with:
- [Obsidian Plugin API](https://docs.obsidian.md/Plugins)
- [Ollama](https://ollama.ai/)
- [ollama-js](https://github.com/ollama/ollama-js)
