/**
 * Storage adapter interface for token persistence
 * Implemented by @auteur/storage package
 */

export interface StorageAdapter {
  getItem<T>(key: string): Promise<T | null>;
  setItem<T>(key: string, value: T): Promise<void>;
  removeItem(key: string): Promise<void>;
}
