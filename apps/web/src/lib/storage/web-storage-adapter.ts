/**
 * Web storage adapter using IndexedDB via Dexie
 */

import Dexie, { type Table } from 'dexie';
import { StorageAdapter } from '@auteur/types';

interface StorageItem {
  key: string;
  value: unknown;
}

class AuteurDatabase extends Dexie {
  storage!: Table<StorageItem, string>;

  constructor() {
    super('AuteurStorage');

    this.version(1).stores({
      storage: 'key',
    });
  }
}

export class WebStorageAdapter extends StorageAdapter {
  private db: AuteurDatabase;

  constructor() {
    super();
    this.db = new AuteurDatabase();
  }

  async get<T>(key: string): Promise<T | null> {
    const item = await this.db.storage.get(key);
    return item ? (item.value as T) : null;
  }

  async set<T>(key: string, value: T): Promise<void> {
    await this.db.storage.put({ key, value });
  }

  async delete(key: string): Promise<void> {
    await this.db.storage.delete(key);
  }

  async clear(): Promise<void> {
    await this.db.storage.clear();
  }

  async keys(): Promise<string[]> {
    const items = await this.db.storage.toArray();
    return items.map((item) => item.key);
  }
}
