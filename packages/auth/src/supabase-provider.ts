/**
 * Supabase authentication provider implementation
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { AuthProvider, type AuthUser, type AuthStateChangeCallback } from './auth-provider';
import type { StorageAdapter } from './storage-adapter';

export interface SupabaseConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
  storage: StorageAdapter;
}

const STORAGE_KEY = 'auteur_auth_session';

export class SupabaseAuthProvider extends AuthProvider {
  private client: SupabaseClient;
  private storage: StorageAdapter;

  constructor(config: SupabaseConfig) {
    super();
    this.storage = config.storage;

    this.client = createClient(config.supabaseUrl, config.supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: false, // We handle persistence manually
      },
    });

    // Restore session on init
    this.restoreSession();
  }

  async login(email: string, password: string): Promise<AuthUser> {
    const { data, error } = await this.client.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(`Login failed: ${error.message}`);
    }

    if (!data.user) {
      throw new Error('Login failed: No user returned');
    }

    // Persist session
    await this.saveSession(data.session);

    return {
      id: data.user.id,
      email: data.user.email!,
      name: data.user.user_metadata['name'] as string | undefined,
    };
  }

  async signup(email: string, password: string): Promise<AuthUser> {
    const { data, error } = await this.client.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(`Signup failed: ${error.message}`);
    }

    if (!data.user) {
      throw new Error('Signup failed: No user returned');
    }

    return {
      id: data.user.id,
      email: data.user.email!,
      name: data.user.user_metadata['name'] as string | undefined,
    };
  }

  async logout(): Promise<void> {
    await this.client.auth.signOut();
    await this.storage.delete(STORAGE_KEY);
  }

  async getToken(): Promise<string | null> {
    const { data } = await this.client.auth.getSession();
    return data.session?.access_token || null;
  }

  async refreshToken(): Promise<string | null> {
    const { data, error } = await this.client.auth.refreshSession();

    if (error || !data.session) {
      return null;
    }

    await this.saveSession(data.session);
    return data.session.access_token;
  }

  async getUser(): Promise<AuthUser | null> {
    const { data } = await this.client.auth.getUser();

    if (!data.user) {
      return null;
    }

    return {
      id: data.user.id,
      email: data.user.email!,
      name: data.user.user_metadata['name'] as string | undefined,
    };
  }

  onAuthStateChange(callback: AuthStateChangeCallback): () => void {
    const { data: subscription } = this.client.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        callback({
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata['name'] as string | undefined,
        });
      } else {
        callback(null);
      }
    });

    return () => {
      subscription.subscription.unsubscribe();
    };
  }

  /**
   * Save session to storage
   */
  private async saveSession(session: unknown): Promise<void> {
    await this.storage.set(STORAGE_KEY, session);
  }

  /**
   * Restore session from storage
   */
  private async restoreSession(): Promise<void> {
    try {
      const session = await this.storage.get<{
        access_token: string;
        refresh_token: string;
      }>(STORAGE_KEY);
      if (session) {
        await this.client.auth.setSession({
          access_token: session.access_token,
          refresh_token: session.refresh_token,
        });
      }
    } catch (error) {
      // Ignore errors during restoration
      console.warn('Failed to restore session:', error);
    }
  }
}
