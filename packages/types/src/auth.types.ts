/**
 * Authentication-specific types
 */

import { User } from './user.types';

export interface AuthSession {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at?: number;
  token_type: string;
  user: User | null;
}

export interface AuthError {
  message: string;
  status?: number;
  code?: string;
}

export interface AuthResponse {
  user: User | null;
  session: AuthSession | null;
  error: AuthError | null;
}
