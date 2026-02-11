/**
 * Authentication Context for Desktop App
 * Integrates @auteur/auth with Electron storage
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { SupabaseClientOptions } from '@supabase/supabase-js';
import { SupabaseAuthProvider, type AuthUser } from '@auteur/auth';
import { ElectronStorageAdapter } from '@auteur/storage/electron';
import { apiClient } from '../services/api';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initialize auth provider
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Missing required Supabase environment variables');
}

// Use IPC storage adapter for renderer process
// This properly communicates with the main process electron-store via IPC
const storage = new ElectronStorageAdapter();
const authProvider = new SupabaseAuthProvider({
  supabaseUrl: SUPABASE_URL,
  supabaseAnonKey: SUPABASE_ANON_KEY,
  storage,
  options: {
    detectSessionInUrl: false,
  } as unknown as SupabaseClientOptions<string>,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        const currentUser = await authProvider.getUser();
        setUser(currentUser);
      } catch (err) {
        console.error('Failed to initialize auth:', err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Subscribe to auth state changes
    const unsubAuthState = authProvider.onAuthStateChange((newUser) => {
      setUser(newUser);
    });

    // Subscribe to token changes - automatically syncs with API client
    const unsubToken = authProvider.onTokenChange((token) => {
      if (token) {
        apiClient.setAuthToken(token);
      } else {
        apiClient.clearAuthToken();
      }
    });

    return () => {
      unsubAuthState();
      unsubToken();
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      const loggedInUser = await authProvider.login(email, password);
      setUser(loggedInUser);
      // Token automatically synced via onTokenChange subscription
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = useCallback(async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      const newUser = await authProvider.signup(email, password);
      setUser(newUser);
      // Token automatically synced via onTokenChange subscription
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Signup failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setError(null);
      await authProvider.logout();
      setUser(null);
      // Token automatically cleared via onTokenChange subscription
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Logout failed';
      setError(errorMessage);
      throw err;
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
