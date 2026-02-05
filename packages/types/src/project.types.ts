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
  frameRate: number;
  durationMs: number;
}

export interface Project {
  id: string;
  userId: string;
  name: string;
  description: string | null;
  resolution: string; // e.g., "1920x1080"
  frameRate: number;
  edlId: string | null; // MongoDB document ID
  thumbnailUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface MediaFile {
  id: string;
  projectId: string;
  userId: string;
  name: string;
  type: MediaType;
  mimeType: string;
  durationMs: number | null;
  fileSizeBytes: number;
  r2Key: string; // Cloudflare R2 object key
  r2Url: string;
  thumbnailR2Key: string | null;
  metadata: {
    width?: number;
    height?: number;
    codec?: string;
    bitrate?: number;
    [key: string]: unknown;
  } | null;
  createdAt: Date;
}

export interface VoiceClone {
  id: string;
  userId: string;
  name: string;
  sampleR2Key: string; // R2 storage key
  sampleR2Url: string; // R2 public URL
  mimeType: string; // e.g., 'audio/wav', 'audio/mp3'
  sampleDurationMs: number;
  fileSizeBytes: number;
  createdAt: Date;
}
