import { create } from 'zustand';
import { SupabaseAuthProvider, type AuthUser, type SupabaseConfig } from '@auteur/auth';
import { WebStorageAdapter } from '@auteur/storage';
import type { User } from '@auteur/types';

// Initialize the auth provider
const createAuthProvider = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
      'Supabase credentials not found. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file.'
    );
  }

  const config: SupabaseConfig = {
    supabaseUrl,
    supabaseAnonKey,
    storage: new WebStorageAdapter(),
  };

  return new SupabaseAuthProvider(config);
};

// Convert AuthUser to our User type
const mapAuthUserToUser = (authUser: AuthUser): User => ({
  id: authUser.id,
  email: authUser.email,
  name: authUser.name ?? null,
  avatar_url: null, // Will be populated from user metadata later
  created_at: new Date(), // Placeholder - will be from DB in Phase 2
  updated_at: new Date(), // Placeholder - will be from DB in Phase 2
});

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  authProvider: SupabaseAuthProvider;

  // Actions
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
  initialize: () => Promise<void>;
  getToken: () => Promise<string | null>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  authProvider: createAuthProvider(),

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

      set({
        user: mapAuthUserToUser(authUser),
        isAuthenticated: true,
        isLoading: false,
      });
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

      // Get current user
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
      authProvider.onAuthStateChange((authUser) => {
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
    } catch (error) {
      console.error('Auth initialization error:', error);
      set({ isLoading: false });
    }
  },
}));
