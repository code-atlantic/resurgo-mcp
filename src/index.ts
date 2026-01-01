#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

import { registerNodesTools } from './nodes.js';

async function main() {
  // Create server instance
  const server = new McpServer({
    name: 'resurgo',
    version: '1.0.0',
  });

  const transport = new StdioServerTransport();

  // Register Resurgo tools
  registerNodesTools(server);

  await server.connect(transport);

  console.error('Resurgo MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
