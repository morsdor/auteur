import { contextBridge, ipcRenderer } from 'electron';

// Define the Electron API interface
export interface ElectronAPI {
  storage: {
    get: <T = unknown>(_key: string) => Promise<T | undefined>;
    set: <T = unknown>(_key: string, _value: T) => Promise<boolean>;
    delete: (_key: string) => Promise<boolean>;
    clear: () => Promise<boolean>;
    has: (_key: string) => Promise<boolean>;
  };
  app: {
    getVersion: () => Promise<string>;
    getPlatform: () => Promise<string>;
    getName: () => Promise<string>;
    getPath: (_name: string) => Promise<string | null>;
  };
  system: {
    getInfo: () => Promise<{
      platform: string;
      arch: string;
      version: string;
      electron: string;
      chrome: string;
      node: string;
    }>;
  };
  window: {
    minimize: () => void;
    maximize: () => void;
    close: () => void;
  };
}

// Expose protected methods via contextBridge
const electronAPI: ElectronAPI = {
  storage: {
    get: <T = unknown>(key: string) =>
      ipcRenderer.invoke('storage:get', key) as Promise<T | undefined>,
    set: <T = unknown>(key: string, value: T) => ipcRenderer.invoke('storage:set', key, value),
    delete: (key: string) => ipcRenderer.invoke('storage:delete', key),
    clear: () => ipcRenderer.invoke('storage:clear'),
    has: (key: string) => ipcRenderer.invoke('storage:has', key),
  },
  app: {
    getVersion: () => ipcRenderer.invoke('app:getVersion'),
    getPlatform: () => ipcRenderer.invoke('app:getPlatform'),
    getName: () => ipcRenderer.invoke('app:getName'),
    getPath: (name: string) => ipcRenderer.invoke('app:getPath', name),
  },
  system: {
    getInfo: () => ipcRenderer.invoke('system:getInfo'),
  },
  window: {
    minimize: () => ipcRenderer.send('window:minimize'),
    maximize: () => ipcRenderer.send('window:maximize'),
    close: () => ipcRenderer.send('window:close'),
  },
};

// Use `contextBridge` to safely expose the API to the renderer process
contextBridge.exposeInMainWorld('electronAPI', electronAPI);

// Type declaration for renderer process
declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
