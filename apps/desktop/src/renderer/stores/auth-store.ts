import { createAuthStore } from '@auteur/auth';
import { ElectronStorageAdapter } from '../lib/storage/electron-storage-adapter';
import { apiClient } from '../services/api';
import type { UserProfile } from '@auteur/api-client';

// For Electron, we might need to inject these from main process or use a config file
// For now, hardcoding/using sync env vars if available (Vite exposes import.meta.env)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found in Desktop App.');
}

export const useAuthStore = createAuthStore({
  supabaseUrl,
  supabaseAnonKey,
  storage: new ElectronStorageAdapter(),
  onTokenChange: (token) => {
    if (token) {
      console.info('[Desktop Auth] Token acquired');
      apiClient.setAuthToken(token);
    } else {
      console.info('[Desktop Auth] Token cleared');
      apiClient.clearAuthToken();
    }
  },
});

import { useQuery } from '@tanstack/react-query';

export const useUser = () => {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ['user', 'profile'],
    queryFn: async () => {
      if (!isAuthenticated) return null;
      return apiClient.users.getMe();
    },
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
