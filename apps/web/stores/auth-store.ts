import { createAuthStore } from '@auteur/auth';
import { WebStorageAdapter } from '../src/lib/storage/web-storage-adapter';
import { apiClient } from '../src/lib/api-client';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase credentials not found. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file.'
  );
}

export const useAuthStore = createAuthStore({
  supabaseUrl,
  supabaseAnonKey,
  storage: new WebStorageAdapter(),
  onTokenChange: (token) => {
    if (token) {
      apiClient.setAuthToken(token);
      console.info('[Auth] Token acquired');
    } else {
      apiClient.clearAuthToken();
      console.info('[Auth] Token cleared');
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
