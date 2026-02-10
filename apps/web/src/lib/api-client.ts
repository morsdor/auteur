import { AuteurApiClient } from '@auteur/api-client';

const getApiUrl = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (process.env.NODE_ENV === 'production' && !apiUrl) {
    throw new Error(
      'NEXT_PUBLIC_API_URL is not defined. This environment variable is required in production.'
    );
  }

  return apiUrl || 'http://localhost:8080';
};

export const apiClient = new AuteurApiClient({
  baseURL: getApiUrl(),
});
