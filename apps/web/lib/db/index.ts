import Dexie, { type EntityTable } from 'dexie';
import type { Project, MediaFile } from '@auteur/types';

// Settings type for local preferences (not in backend DB)
interface LocalSettings {
  key: string;
  value: unknown;
  updatedAt: Date;
}

// Create Dexie database class for client-side storage
class AuteurDatabase extends Dexie {
  // Using types from @auteur/types package
  projects!: EntityTable<Project, 'id'>;
  mediaFiles!: EntityTable<MediaFile, 'id'>;
  settings!: EntityTable<LocalSettings, 'key'>;

  constructor() {
    super('AuteurDB');

    // Define schema - using camelCase to match @auteur/types
    this.version(1).stores({
      projects: 'id, userId, name, createdAt, updatedAt',
      mediaFiles: 'id, projectId, userId, type, createdAt',
      settings: 'key, updatedAt',
    });
  }
}

// Create and export database instance
export const db = new AuteurDatabase();

// Re-export types for convenience
export type { Project, MediaFile, LocalSettings };
