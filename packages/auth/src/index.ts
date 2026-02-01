/**
 * @auteur/auth
 * Authentication abstraction layer with Supabase integration
 */

export {
  AuthProvider,
  type AuthUser,
  type AuthStateChangeCallback,
  type TokenChangeCallback,
} from './auth-provider';
export { SupabaseAuthProvider, type SupabaseConfig } from './supabase-provider';
export type { StorageAdapter } from '@auteur/types';
