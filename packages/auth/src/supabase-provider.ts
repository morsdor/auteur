/**
 * Supabase authentication provider implementation
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import {
  AuthProvider,
  type AuthUser,
  type AuthStateChangeCallback,
  type TokenChangeCallback,
} from './auth-provider';
import type { StorageAdapter } from '@auteur/types';

export interface SupabaseConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
  storage: StorageAdapter;
}

const STORAGE_KEY = 'auteur_auth_session';

export class SupabaseAuthProvider extends AuthProvider {
  private client: SupabaseClient;
  private storage: StorageAdapter;
  private tokenCallbacks: Set<TokenChangeCallback> = new Set();

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

    // Notify token change
    this.notifyTokenChange(data.session.access_token);

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

    // If session exists (no email confirmation required), save and notify
    if (data.session?.access_token) {
      await this.saveSession(data.session);
      this.notifyTokenChange(data.session.access_token);
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

    // Notify token cleared
    this.notifyTokenChange(null);
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

    // Notify token change
    this.notifyTokenChange(data.session.access_token);

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

        // Also notify token change
        this.notifyTokenChange(session.access_token);
      } else {
        callback(null);

        // Notify token cleared
        this.notifyTokenChange(null);
      }
    });

    return () => {
      subscription.subscription.unsubscribe();
    };
  }

  onTokenChange(callback: TokenChangeCallback): () => void {
    this.tokenCallbacks.add(callback);

    // Immediately call with current token
    this.getToken()
      .then((token) => callback(token))
      .catch((err: Error) => console.warn('Failed to get initial token:', err));

    // Return unsubscribe function
    return () => {
      this.tokenCallbacks.delete(callback);
    };
  }

  /**
   * Notify all token change subscribers
   */
  private notifyTokenChange(token: string | null): void {
    this.tokenCallbacks.forEach((callback) => callback(token));
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
