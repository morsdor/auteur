import { create } from 'zustand';
import { SupabaseAuthProvider, type SupabaseConfig } from './supabase-provider';
import type { User, StorageAdapter } from '@auteur/types';
import type { AuthUser } from './auth-provider';

// Convert AuthUser to our User type
const mapAuthUserToUser = (authUser: AuthUser): User => ({
  id: authUser.id,
  email: authUser.email,
  name: authUser.name ?? null,
  avatarUrl: null, // Will be populated from user metadata later
  createdAt: new Date(), // Placeholder - will be from DB in Phase 2
  updatedAt: new Date(), // Placeholder - will be from DB in Phase 2
});

export interface AuthStoreConfig extends SupabaseConfig {
  onTokenChange?: (token: string | null) => void;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  authProvider: SupabaseAuthProvider;
  unsubscribe: (() => void) | null;

  // Actions
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<User>;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
  initialize: () => Promise<void>;
  getToken: () => Promise<string | null>;
}

export const createAuthStore = (config: AuthStoreConfig) => {
  const authProvider = new SupabaseAuthProvider(config);

  return create<AuthState>((set, get) => ({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    authProvider,
    unsubscribe: null,

    signIn: async (email: string, password: string) => {
      set({ isLoading: true });
      try {
        const authProvider = get().authProvider;
        const authUser = await authProvider.login(email, password);

        set({
          user: mapAuthUserToUser(authUser),
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error) {
        console.error('Sign in error:', error);
        set({ isLoading: false });
        throw error;
      }
    },

    signUp: async (email: string, password: string) => {
      set({ isLoading: true });
      try {
        const authProvider = get().authProvider;
        const authUser = await authProvider.signup(email, password);
        const user = mapAuthUserToUser(authUser);

        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        });

        return user;
      } catch (error) {
        console.error('Sign up error:', error);
        set({ isLoading: false });
        throw error;
      }
    },

    signOut: async () => {
      try {
        const authProvider = get().authProvider;
        await authProvider.logout();
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      } catch (error) {
        console.error('Sign out error:', error);
        throw error;
      }
    },

    setUser: (user: User | null) => {
      // Basic user from session is still useful
      set({ user, isAuthenticated: !!user });
    },

    getToken: async () => {
      const authProvider = get().authProvider;
      return authProvider.getToken();
    },

    initialize: async () => {
      set({ isLoading: true });
      try {
        const authProvider = get().authProvider;

        // Cleanup previous listener if exists
        const previousUnsubscribe = get().unsubscribe;
        if (previousUnsubscribe) {
          previousUnsubscribe();
        }

        // Restore session (this handles Supabase session check)
        const authUser = await authProvider.getUser();
        if (authUser) {
          set({
            user: mapAuthUserToUser(authUser),
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }

        // Listen to auth state changes
        const unsubAuthState = authProvider.onAuthStateChange((authUser) => {
          if (authUser) {
            set({
              user: mapAuthUserToUser(authUser),
              isAuthenticated: true,
            });
          } else {
            set({
              user: null,
              isAuthenticated: false,
            });
          }
        });

        // Listen to token changes and notify callback if provided
        const unsubToken = authProvider.onTokenChange((token) => {
          if (config.onTokenChange) {
            config.onTokenChange(token);
          }

          if (token) {
            // Token logic
          }
        });

        // Combine unsubscribe functions
        const unsubscribe = () => {
          unsubAuthState();
          unsubToken();
        };

        set({ unsubscribe });
      } catch (error) {
        console.error('Auth initialization error:', error);
        set({
          isLoading: false,
          user: null,
          isAuthenticated: false,
        });
      }
    },
  }));
};
