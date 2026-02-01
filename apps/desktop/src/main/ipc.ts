import { ipcMain, app } from 'electron';
import type Store from 'electron-store';

let store: Store | null = null;

// Initialize electron-store with dynamic import (ES Module)
async function initStore(): Promise<Store> {
  if (store) return store;

  const { default: ElectronStore } = await import('electron-store');
  store = new ElectronStore({
    encryptionKey: 'auteur-secure-storage-key', // In production, use environment variable
    name: 'auteur-storage',
  });

  return store;
}

export async function setupIPC(): Promise<void> {
  // Ensure store is initialized
  const storeInstance = await initStore();

  // Storage operations
  ipcMain.handle('storage:get', async (_event, key: string) => {
    try {
      return storeInstance.get(key);
    } catch (error) {
      console.error('Storage get error:', error);
      return undefined;
    }
  });

  ipcMain.handle('storage:set', async (_event, key: string, value: unknown) => {
    try {
      storeInstance.set(key, value);
      return true;
    } catch (error) {
      console.error('Storage set error:', error);
      return false;
    }
  });

  ipcMain.handle('storage:delete', async (_event, key: string) => {
    try {
      storeInstance.delete(key);
      return true;
    } catch (error) {
      console.error('Storage delete error:', error);
      return false;
    }
  });

  ipcMain.handle('storage:clear', async () => {
    try {
      storeInstance.clear();
      return true;
    } catch (error) {
      console.error('Storage clear error:', error);
      return false;
    }
  });

  ipcMain.handle('storage:has', async (_event, key: string) => {
    try {
      return storeInstance.has(key);
    } catch (error) {
      console.error('Storage has error:', error);
      return false;
    }
  });

  // App metadata
  ipcMain.handle('app:getVersion', async () => {
    return app.getVersion();
  });

  ipcMain.handle('app:getPlatform', async () => {
    return process.platform;
  });

  ipcMain.handle('app:getName', async () => {
    return app.getName();
  });

  ipcMain.handle('app:getPath', async (_event, name: string) => {
    try {
      return app.getPath(name as Parameters<typeof app.getPath>[0]);
    } catch (error) {
      console.error('Get path error:', error);
      return null;
    }
  });

  // System info
  ipcMain.handle('system:getInfo', async () => {
    return {
      platform: process.platform,
      arch: process.arch,
      version: process.getSystemVersion(),
      electron: process.versions.electron,
      chrome: process.versions.chrome,
      node: process.versions.node,
    };
  });
}
