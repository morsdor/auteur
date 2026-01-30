/**
 * Storage adapter interface for token persistence
 * Implemented by @auteur/storage package
 */

export interface StorageAdapter {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T): Promise<void>;
  delete(key: string): Promise<void>;
}
