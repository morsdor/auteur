import { StorageAdapter } from './base';

export class WebStorageAdapter extends StorageAdapter {
  async get<T>(key: string): Promise<T | null> {
    if (typeof window === 'undefined') return null;

    const item = localStorage.getItem(key);
    if (!item) return null;
    try {
      return JSON.parse(item) as T;
    } catch {
      return null;
    }
  }

  async set<T>(key: string, value: T): Promise<void> {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(value));
  }

  async delete(key: string): Promise<void> {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  }

  async clear(): Promise<void> {
    if (typeof window === 'undefined') return;
    localStorage.clear();
  }

  override async keys(): Promise<string[]> {
    if (typeof window === 'undefined') return [];
    return Object.keys(localStorage);
  }
}
