import { StorageAdapter } from './base';

// Interface matching the one exposed in preload/index.ts (subset needed for storage)
interface ElectronStorageAPI {
  storage: {
    get: <T = unknown>(key: string) => Promise<T | undefined>;
    set: <T = unknown>(key: string, value: T) => Promise<boolean>;
    delete: (key: string) => Promise<boolean>;
    clear: () => Promise<boolean>;
    has: (key: string) => Promise<boolean>;
  };
}

export class ElectronStorageAdapter extends StorageAdapter {
  private get electronAPI(): ElectronStorageAPI | undefined {
    return (window as any).electronAPI;
  }

  async get<T>(key: string): Promise<T | null> {
    if (!this.electronAPI) {
      console.warn('ElectronAPI not found, falling back to localStorage');
      // Fallback for dev if not in electron window but using this adapter
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }

    const result = await this.electronAPI.storage.get<T>(key);
    return result === undefined ? null : result;
  }

  async set<T>(key: string, value: T): Promise<void> {
    if (!this.electronAPI) {
      localStorage.setItem(key, JSON.stringify(value));
      return;
    }
    await this.electronAPI.storage.set(key, value);
  }

  async delete(key: string): Promise<void> {
    if (!this.electronAPI) {
      localStorage.removeItem(key);
      return;
    }
    await this.electronAPI.storage.delete(key);
  }

  async clear(): Promise<void> {
    if (!this.electronAPI) {
      localStorage.clear();
      return;
    }
    await this.electronAPI.storage.clear();
  }
}
