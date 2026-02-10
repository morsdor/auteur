import type { AuthProvider, AuthUser } from './auth-provider';
import type { User } from '@auteur/types';

// Helper to map Supabase user to our User type
const mapAuthUserToUser = (authUser: AuthUser): User => ({
  id: authUser.id,
  email: authUser.email!,
  name: authUser.name || null,
  avatarUrl: null,
  createdAt: new Date(), // Placeholder until backend is ready
  updatedAt: new Date(), // Placeholder until backend is ready
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
