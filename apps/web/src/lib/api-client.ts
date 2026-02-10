import { AuteurApiClient } from '@auteur/api-client';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const apiClient = new AuteurApiClient({
  baseURL: API_URL,
});
