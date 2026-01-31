import Dexie, { type EntityTable } from 'dexie';
import type { Project, MediaFile } from '@auteur/types';

// Settings type for local preferences (not in backend DB)
interface LocalSettings {
  key: string;
  value: unknown;
  updated_at: Date;
}

// Create Dexie database class for client-side storage
class AuteurDatabase extends Dexie {
  // Using types from @auteur/types package
  projects!: EntityTable<Project, 'id'>;
  mediaFiles!: EntityTable<MediaFile, 'id'>;
  settings!: EntityTable<LocalSettings, 'key'>;

  constructor() {
    super('AuteurDB');

    // Define schema - using snake_case to match backend DB
    this.version(1).stores({
      projects: 'id, user_id, name, created_at, updated_at',
      mediaFiles: 'id, project_id, user_id, type, created_at',
      settings: 'key, updated_at',
    });
  }
}

// Create and export database instance
export const db = new AuteurDatabase();

// Re-export types for convenience
export type { Project, MediaFile, LocalSettings };
