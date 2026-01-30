/**
 * Project and media types
 * Matches Postgres schema
 */

export type MediaType = 'video' | 'audio' | 'image';

export interface ProjectSettings {
  resolution: {
    width: number;
    height: number;
  };
  frame_rate: number;
  duration_ms: number;
}

export interface Project {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  resolution: string; // e.g., "1920x1080"
  frame_rate: number;
  edl_id: string | null; // MongoDB document ID
  thumbnail_url: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface MediaFile {
  id: string;
  project_id: string;
  user_id: string;
  name: string;
  type: MediaType;
  mime_type: string;
  duration_ms: number | null;
  file_size_bytes: number;
  r2_key: string; // Cloudflare R2 object key
  r2_url: string;
  thumbnail_r2_key: string | null;
  metadata: {
    width?: number;
    height?: number;
    codec?: string;
    bitrate?: number;
    [key: string]: unknown;
  } | null;
  created_at: Date;
}

export interface VoiceClone {
  id: string;
  user_id: string;
  name: string;
  sample_r2_key: string; // R2 storage key
  sample_r2_url: string; // R2 public URL
  mime_type: string; // e.g., 'audio/wav', 'audio/mp3'
  sample_duration_ms: number;
  file_size_bytes: number;
  created_at: Date;
}
