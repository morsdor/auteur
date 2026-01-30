/**
 * User-related types
 * Matches Postgres schema from Supabase
 */

export interface User {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface Profile {
  id: string;
  user_id: string;
  bio: string | null;
  website: string | null;
  social_links: Record<string, string> | null;
  updated_at: Date;
}

export interface AccountSettings {
  user_id: string;
  theme: 'dark' | 'light' | 'system';
  notifications_enabled: boolean;
  auto_save_interval: number; // seconds
  default_resolution: string; // e.g., "1920x1080"
  default_frame_rate: number;
}
