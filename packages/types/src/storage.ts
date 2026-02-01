/**
 * Abstract storage adapter interface for cross-platform storage
 * Provides a consistent API for storage operations across web and desktop
 */

export abstract class StorageAdapter {
  /**
   * Get a value from storage
   */
  abstract get<T>(key: string): Promise<T | null>;

  /**
   * Set a value in storage
   */
  abstract set<T>(key: string, value: T): Promise<void>;

  /**
   * Delete a value from storage
   */
  abstract delete(key: string): Promise<void>;

  /**
   * Clear all values from storage
   */
  abstract clear(): Promise<void>;

  /**
   * Get all keys from storage
   */
  abstract keys(): Promise<string[]>;
}
