import { createAuthStore } from '@auteur/auth';
import { WebStorageAdapter } from '@auteur/storage/web';
import { apiClient } from '../src/lib/api-client';
import { useQuery } from '@tanstack/react-query';

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

export const useUser = () => {
  const { isAuthenticated, user } = useAuthStore();

  return useQuery({
    queryKey: ['user', 'profile', user?.id],
    queryFn: async () => {
      if (!isAuthenticated) return null;
      return apiClient.users.getMe();
    },
    enabled: isAuthenticated && !!user?.id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
