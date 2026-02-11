/**
 * Abstract authentication provider interface
 */

import type { User } from '@auteur/types';

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
}

export type AuthStateChangeCallback = (user: AuthUser | null) => void;
export type TokenChangeCallback = (token: string | null) => void;

export abstract class AuthProvider {
  /**
   * Sign in with email and password
   */
  abstract login(email: string, password: string): Promise<AuthUser>;

  /**
   * Sign up with email and password
   */
  abstract signup(email: string, password: string): Promise<AuthUser>;

  /**
   * Sign in with OAuth provider
   */
  abstract signInWithOAuth(provider: 'google' | 'github', scopes?: string): Promise<void>;

  /**
   * Sign out
   */
  abstract logout(): Promise<void>;

  /**
   * Get current access token
   */
  abstract getToken(): Promise<string | null>;

  /**
   * Refresh access token
   */
  abstract refreshToken(): Promise<string | null>;

  /**
   * Get current user
   */
  abstract getUser(): Promise<AuthUser | null>;

  /**
   * Subscribe to auth state changes
   */
  abstract onAuthStateChange(callback: AuthStateChangeCallback): () => void;

  /**
   * Subscribe to token changes
   * Fires whenever the access token changes (login, logout, refresh)
   * Returns an unsubscribe function
   */
  abstract onTokenChange(callback: TokenChangeCallback): () => void;
}
