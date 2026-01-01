import { type McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import { apiClient } from './api-client.js';

/**
 * @name registerNodesTools
 * @description Registers node-related tools to the McpServer instance.
 */
export function registerNodesTools(server: McpServer) {
  // 1. Search Nodes
  server.tool(
    'search_nodes',
    'Search saved nodes with full-text and semantic search',
    {
      state: z.object({
        query: z
          .string()
          .describe('Search term (matches title, body, or tags)'),
        tags: z
          .array(z.string())
          .optional()
          .describe('Filter by specific tags'),
        status: z
          .enum(['active', 'parked', 'done', 'archived'])
          .optional()
          .describe('Filter by status'),
        limit: z
          .number()
          .optional()
          .default(20)
          .describe('Maximum number of results'),
      }),
    },
    async ({ state }) => {
      const result = await apiClient.searchNodes(state);

      if (result.error) {
        return {
          content: [{ type: 'text', text: result.error }],
          isError: true,
        };
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result.data, null, 2),
          },
        ],
      };
    },
  );

  // 2. Get Due Items
  server.tool(
    'get_due_items',
    'Get items due for review (inbox items)',
    {
      state: z.object({
        includeOverdue: z
          .boolean()
          .optional()
          .default(true)
          .describe('Include overdue items'),
      }),
    },
    async ({ state }) => {
      const result = await apiClient.getDueItems(state);

      if (result.error) {
        return {
          content: [{ type: 'text', text: result.error }],
          isError: true,
        };
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result.data, null, 2),
          },
        ],
      };
    },
  );

  // 3. Quick Capture
  server.tool(
    'quick_capture',
    'Save a new node with optional scheduling',
    {
      state: z.object({
        title: z.string().describe('The title of the node'),
        note: z.string().optional().describe('Optional notes or body content'),
        url: z.string().url().optional().describe('Optional URL to attach'),
        tags: z
          .array(z.string())
          .optional()
          .default([])
          .describe('Tags for categorization'),
        resurfaceIn: z
          .string()
          .optional()
          .describe(
            'When to resurface: "tomorrow", "1 week", "2025-01-15", etc.',
          ),
      }),
    },
    async ({ state }) => {
      const result = await apiClient.quickCapture(state);

      if (result.error) {
        return {
          content: [{ type: 'text', text: result.error }],
          isError: true,
        };
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result.data, null, 2),
          },
        ],
      };
    },
  );

  // 4. Snooze Node
  server.tool(
    'snooze_node',
    'Defer resurfacing to a later date',
    {
      state: z.object({
        nodeId: z.string().uuid().describe('The ID of the node to snooze'),
        until: z
          .string()
          .describe(
            'When to resurface: "tomorrow", "next week", "2025-01-15", etc.',
          ),
      }),
    },
    async ({ state }) => {
      const result = await apiClient.snoozeNode(state);

      if (result.error) {
        return {
          content: [{ type: 'text', text: result.error }],
          isError: true,
        };
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result.data, null, 2),
          },
        ],
      };
    },
  );

  // 5. Complete Node
  server.tool(
    'complete_node',
    'Mark a node as done',
    {
      state: z.object({
        nodeId: z
          .string()
          .uuid()
          .describe('The ID of the node to mark as done'),
      }),
    },
    async ({ state }) => {
      const result = await apiClient.completeNode(state);

      if (result.error) {
        return {
          content: [{ type: 'text', text: result.error }],
          isError: true,
        };
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result.data, null, 2),
          },
        ],
      };
    },
  );
}
