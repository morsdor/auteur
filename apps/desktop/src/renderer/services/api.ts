/**
 * API Client Service for Desktop App
 * Singleton instance of the Auteur API client
 */

import { AuteurApiClient } from '@auteur/api-client';

// Get API URL from environment or use default
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

/**
 * Shared API client instance
 *
 * All API calls should use this instance to ensure consistent configuration.
 * Auth context directly uses apiClient.setAuthToken() and apiClient.clearAuthToken().
 */
export const apiClient = new AuteurApiClient({
  baseURL: API_URL,
});
