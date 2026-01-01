# Changelog

All notable changes to the Resurgo MCP Server will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-XX

### Added
- Initial public release
- `search_nodes` - Full-text search with tag and status filtering
- `get_due_items` - Retrieve items scheduled for review
- `quick_capture` - Save new items with flexible scheduling
- `snooze_node` - Defer items to resurface later
- `complete_node` - Mark items as done
- Support for natural language date parsing (tomorrow, next week, etc.)
- Claude Desktop integration via Model Context Protocol
- Secure API key authentication
- Comprehensive README with examples and troubleshooting

### Security
- API key-based authentication
- HTTPS-only communication
- Scoped access tied to user accounts

[1.0.0]: https://github.com/code-atlantic/resurgo/releases/tag/mcp-v1.0.0
