/**
 * Abstract storage adapter interface
 * Matches the Supabase Auth storage requirement
 */

export abstract class StorageAdapter {
  abstract get<T>(key: string): Promise<T | null>;
  abstract set<T>(key: string, value: T): Promise<void>;
  abstract delete(key: string): Promise<void>;
  abstract clear(): Promise<void>;

  // Optional: For inspection
  async keys(): Promise<string[]> {
    return [];
  }
}
