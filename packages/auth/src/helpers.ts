import type { AuthProvider } from './auth-provider';
import type { User } from '@auteur/types';

// Helper to map Supabase user to our User type
const mapAuthUserToUser = (authUser: any): User => ({
  id: authUser.id,
  email: authUser.email!,
  name: authUser.user_metadata?.name || null,
  avatarUrl: authUser.user_metadata?.avatar_url || null,
  createdAt: new Date(authUser.created_at),
  updatedAt: new Date(authUser.updated_at || authUser.created_at),
});

/**
 * Fetch user profile helper
 * Can be used by React Query in apps
 */
export const fetchUserProfile = async (authProvider: AuthProvider): Promise<User | null> => {
  const user = await authProvider.getUser();
  if (!user) return null;
  return mapAuthUserToUser(user);
};
