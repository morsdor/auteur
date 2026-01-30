/**
 * Electron storage adapter using electron-store
 *
 * Note: electron-store is a peer dependency that should be installed
 * in the Electron app. This adapter dynamically requires it.
 */

import { StorageAdapter } from './storage-adapter';

interface ElectronStoreOptions {
  name?: string;
  encryptionKey?: string;
}

export class ElectronStorageAdapter extends StorageAdapter {
  private store: any;

  constructor(options: ElectronStoreOptions = {}) {
    super();

    try {
      // Dynamic require to avoid bundling in web builds
      const ElectronStore = require('electron-store');
      this.store = new ElectronStore(options);
    } catch (error) {
      throw new Error(
        'electron-store not found. Please install it in your Electron app: pnpm add electron-store'
      );
    }
  }

  async get<T>(key: string): Promise<T | null> {
    const value = this.store.get(key);
    return value !== undefined ? (value as T) : null;
  }

  async set<T>(key: string, value: T): Promise<void> {
    this.store.set(key, value);
  }

  async delete(key: string): Promise<void> {
    this.store.delete(key);
  }

  async clear(): Promise<void> {
    this.store.clear();
  }

  async keys(): Promise<string[]> {
    return Object.keys(this.store.store);
  }
}
