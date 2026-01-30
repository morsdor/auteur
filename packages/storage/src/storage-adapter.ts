/**
 * Abstract storage adapter interface
 * Platform-agnostic key-value storage
 */

export abstract class StorageAdapter {
  /**
   * Get value by key
   */
  abstract get<T>(key: string): Promise<T | null>;

  /**
   * Set value by key
   */
  abstract set<T>(key: string, value: T): Promise<void>;

  /**
   * Delete value by key
   */
  abstract delete(key: string): Promise<void>;

  /**
   * Clear all storage
   */
  abstract clear(): Promise<void>;

  /**
   * Get all keys
   */
  abstract keys(): Promise<string[]>;

  /**
   * Check if key exists
   */
  async has(key: string): Promise<boolean> {
    const value = await this.get(key);
    return value !== null;
  }
}
