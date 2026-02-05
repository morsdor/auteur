/**
 * User-related types
 * Matches Postgres schema from Supabase
 */

export interface User {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Profile {
  id: string;
  userId: string;
  bio: string | null;
  website: string | null;
  socialLinks: Record<string, string> | null;
  updatedAt: Date;
}

export interface AccountSettings {
  userId: string;
  theme: 'dark' | 'light' | 'system';
  notificationsEnabled: boolean;
  autoSaveInterval: number; // seconds
  defaultResolution: string; // e.g., "1920x1080"
  defaultFrameRate: number;
}
