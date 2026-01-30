/**
 * Base API client with fetch wrapper, error handling, and retry logic
 */

import type { ApiResponse, ApiError } from '@auteur/types';
import { isApiError } from '@auteur/types';

export interface ClientConfig {
  baseURL: string;
  authToken?: string;
  timeout?: number;
}

export class ApiClient {
  private baseURL: string;
  private authToken?: string;
  private timeout: number;

  constructor(config: ClientConfig) {
    this.baseURL = config.baseURL;
    this.authToken = config.authToken;
    this.timeout = config.timeout || 30000; // 30 seconds default
  }

  /**
   * Set authentication token
   */
  setAuthToken(token: string): void {
    this.authToken = token;
  }

  /**
   * Clear authentication token
   */
  clearAuthToken(): void {
    this.authToken = undefined;
  }

  /**
   * Make a GET request
   */
  async get<T>(path: string): Promise<T> {
    return this.request<T>('GET', path);
  }

  /**
   * Make a POST request
   */
  async post<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>('POST', path, body);
  }

  /**
   * Make a PUT request
   */
  async put<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>('PUT', path, body);
  }

  /**
   * Make a DELETE request
   */
  async delete<T>(path: string): Promise<T> {
    return this.request<T>('DELETE', path);
  }

  /**
   * Core request method with retry logic
   */
  private async request<T>(method: string, path: string, body?: unknown, retries = 3): Promise<T> {
    const url = `${this.baseURL}${path}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // ✅ Check status first
      if (!response.ok) {
        // Try to parse error as JSON, fallback to text
        let errorMessage = 'Request failed';
        let errorCode = 'UNKNOWN_ERROR';

        try {
          const data = await response.text();
          if (isApiError(data)) {
            errorMessage = data.error.message;
            errorCode = data.error.code;
          }
        } catch {
          // Not JSON, try to get text
          errorMessage = (await response.text()) || 'Request failed';
        }

        throw new ApiClientError(errorMessage, errorCode, response.status);
      }

      // ✅ Only parse JSON for successful responses
      const data = await response.json();

      // Extract data from ApiResponse wrapper
      if (this.isApiResponse(data)) {
        return data.data as T;
      }

      return data as T;
    } catch (error) {
      clearTimeout(timeoutId);

      // Handle network errors and timeouts with retry
      if (error instanceof TypeError || error instanceof DOMException) {
        if (retries > 0) {
          const delay = this.calculateRetryDelay(3 - retries);
          await this.sleep(delay);
          return this.request<T>(method, path, body, retries - 1);
        }
      }

      throw error;
    }
  }
  /**
   * Type guard for ApiResponse
   */
  private isApiResponse<T>(data: unknown): data is ApiResponse<T> {
    return (
      typeof data === 'object' &&
      data !== null &&
      'success' in data &&
      data.success === true &&
      'data' in data
    );
  }

  /**
   * Calculate retry delay with exponential backoff
   */
  private calculateRetryDelay(attempt: number): number {
    return Math.pow(2, attempt) * 1000; // 1s, 2s, 4s
  }

  /**
   * Sleep utility for retry delays
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

/**
 * Custom error class for API errors
 */
export class ApiClientError extends Error {
  constructor(
    message: string,
    public code: string,
    public status: number
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}
