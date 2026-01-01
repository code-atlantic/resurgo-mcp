/**
 * Resurgo API Client
 * Handles authentication and API requests to Resurgo backend
 */

const RESURGO_API_URL =
  process.env.RESURGO_API_URL || 'https://resurgo.app/api';
const RESURGO_API_KEY = process.env.RESURGO_API_KEY || '';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

class ResurgoApiClient {
  private apiUrl: string;
  private apiKey: string;

  constructor(apiUrl?: string, apiKey?: string) {
    this.apiUrl = apiUrl || RESURGO_API_URL;
    this.apiKey = apiKey || RESURGO_API_KEY;

    if (!this.apiKey) {
      throw new Error(
        'RESURGO_API_KEY environment variable is required. Get your API key from https://resurgo.app/settings/api',
      );
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.apiUrl}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
          ...options.headers,
        },
      });

      if (!response.ok) {
        const error = await response.text();
        return { error: `API Error: ${response.status} - ${error}` };
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return {
        error: `Request failed: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  }

  async searchNodes(params: {
    query: string;
    tags?: string[];
    status?: string;
    limit?: number;
  }): Promise<ApiResponse<any>> {
    return this.request('/mcp/search-nodes', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  async getDueItems(params: {
    includeOverdue?: boolean;
  }): Promise<ApiResponse<any>> {
    return this.request('/mcp/due-items', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  async quickCapture(params: {
    title: string;
    note?: string;
    url?: string;
    tags?: string[];
    resurfaceIn?: string;
  }): Promise<ApiResponse<any>> {
    return this.request('/mcp/quick-capture', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  async snoozeNode(params: {
    nodeId: string;
    until: string;
  }): Promise<ApiResponse<any>> {
    return this.request('/mcp/snooze-node', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  async completeNode(params: {
    nodeId: string;
  }): Promise<ApiResponse<any>> {
    return this.request('/mcp/complete-node', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }
}

export const apiClient = new ResurgoApiClient();
