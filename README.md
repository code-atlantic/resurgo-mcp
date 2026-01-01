# Resurgo MCP Server

Official MCP (Model Context Protocol) server for [Resurgo](https://resurgo.app) - your ideas rise again.

## What is Resurgo?

Resurgo helps you capture important information (URLs, notes, ideas) and **forces** them to resurface at scheduled times - via email digests, browser new tab override, and AI assistant integration. Never lose track of what matters.

## Installation

```bash
npm install resurgo-mcp
# or
pnpm add resurgo-mcp
```

## Quick Start

### Get Your API Key

1. Log in to [Resurgo](https://resurgo.app)
2. Go to **Settings → API**
3. Click **Create API Key**
4. Copy your key

### Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "resurgo": {
      "command": "npx",
      "args": ["resurgo-mcp"],
      "env": {
        "RESURGO_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

**Optional:** Override the API URL (for self-hosted instances):

```json
{
  "mcpServers": {
    "resurgo": {
      "command": "npx",
      "args": ["resurgo-mcp"],
      "env": {
        "RESURGO_API_KEY": "your_api_key_here",
        "RESURGO_API_URL": "https://your-instance.com/api"
      }
    }
  }
}
```

## Available Tools

The MCP server provides 5 tools for managing your knowledge:

### 1. search_nodes

Search your saved items with full-text search and filters.

```typescript
{
  query: string;          // Search term
  tags?: string[];        // Filter by tags
  status?: 'active' | 'parked' | 'done' | 'archived';
  limit?: number;         // Max results (default: 20)
}
```

**Example:**
> "Search my Resurgo nodes for 'react hooks' with the tag 'development'"

### 2. get_due_items

Get items that are due for review today (your inbox).

```typescript
{
  includeOverdue?: boolean; // Include overdue items (default: true)
}
```

**Example:**
> "Show me what's due in my Resurgo inbox today"

### 3. quick_capture

Save a new item with optional scheduling.

```typescript
{
  title: string;        // Item title
  note?: string;        // Optional notes
  url?: string;         // Optional URL
  tags?: string[];      // Tags for organization
  resurfaceIn?: string; // When to resurface (see below)
}
```

**Scheduling options:**
- `"tomorrow"` - Resurface tomorrow at 9am
- `"next week"` or `"1 week"` - In 7 days
- `"2 weeks"` - In 14 days
- `"next month"` or `"1 month"` - In 30 days
- `"2025-06-15"` - Specific ISO date

**Example:**
> "Save this URL to Resurgo: https://react.dev/learn with the note 'Review new hooks API' and resurface next week"

### 4. snooze_node

Defer an item to resurface later.

```typescript
{
  nodeId: string;     // Item UUID
  until: string;      // When to resurface (same format as quick_capture)
}
```

**Example:**
> "Snooze this Resurgo item until tomorrow"

### 5. complete_node

Mark an item as done.

```typescript
{
  nodeId: string;     // Item UUID
}
```

**Example:**
> "Mark this Resurgo item as complete"

## How It Works

The MCP server connects to your Resurgo account via API and provides AI assistants like Claude with tools to:

- **Search** through your saved knowledge
- **Capture** new items during conversations
- **Schedule** when items should resurface
- **Manage** your inbox (snooze, complete, etc.)

This means you can have natural conversations like:

> "Search my Resurgo notes about TypeScript patterns and create a new note summarizing the key points to review next week"

The AI will use the MCP tools to search, synthesize the information, and create a scheduled note automatically.

## Use Cases

- **Research Management**: Save articles, papers, and links during research sessions
- **Learning**: Schedule spaced repetition for concepts you're learning
- **Project Planning**: Capture ideas and schedule them for review at the right time
- **Meeting Notes**: Save action items and have them resurface before deadlines
- **Reading List**: Never lose track of articles you want to read

## Requirements

- Node.js 20+
- Active Resurgo account ([sign up](https://resurgo.app))
- Resurgo API key ([create one](https://resurgo.app/home/settings/api))
- MCP-compatible AI assistant (Claude Desktop, etc.)

## Support

- **Issues**: [GitHub Issues](https://github.com/code-atlantic/resurgo/issues)

## Privacy & Security

- **API Key Authentication**: Secure token-based access
- **Scoped Access**: API keys are tied to your account and can be revoked anytime
- **HTTPS Only**: All communication encrypted in transit

## License

MIT License - see [LICENSE](LICENSE) for details

---

Made with ❤️ by [Code Atlantic](https://code-atlantic.com)
