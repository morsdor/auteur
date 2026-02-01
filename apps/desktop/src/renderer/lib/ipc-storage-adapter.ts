/**
 * IPC Storage Adapter for Electron Renderer Process
 * Uses Electron IPC to communicate with main process storage
 */

import { StorageAdapter } from '@auteur/types';

/**
 * Storage adapter that uses Electron IPC to access electron-store in the main process
 * This is the correct way to handle storage in the renderer process
 */
export class IPCStorageAdapter extends StorageAdapter {
  async get<T>(key: string): Promise<T | null> {
    if (!window.electronAPI) {
      throw new Error('Electron API not available');
    }

    const value = await window.electronAPI.storage.get<T>(key);
    return value !== undefined ? value : null;
  }

  async set<T>(key: string, value: T): Promise<void> {
    if (!window.electronAPI) {
      throw new Error('Electron API not available');
    }

    await window.electronAPI.storage.set(key, value);
  }

  async delete(key: string): Promise<void> {
    if (!window.electronAPI) {
      throw new Error('Electron API not available');
    }

    await window.electronAPI.storage.delete(key);
  }

  async clear(): Promise<void> {
    if (!window.electronAPI) {
      throw new Error('Electron API not available');
    }

    await window.electronAPI.storage.clear();
  }

  async keys(): Promise<string[]> {
    throw new Error('IPCStorageAdapter.keys() not implemented - add IPC handler if needed');
  }
}
