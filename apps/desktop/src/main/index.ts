import { app, BrowserWindow, ipcMain, shell, globalShortcut } from 'electron';
import { join } from 'path';
import { setupIPC } from './ipc';

// Prevent multiple instances
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  let mainWindow: BrowserWindow | null = null;

  function createWindow(): void {
    mainWindow = new BrowserWindow({
      width: 1440,
      height: 900,
      minWidth: 1024,
      minHeight: 768,
      show: false,
      autoHideMenuBar: true,
      backgroundColor: '#0A0A0A', // Auteur bg-primary
      titleBarStyle: 'hiddenInset',
      webPreferences: {
        preload: join(__dirname, '../preload/index.cjs'),
        // Security settings
        nodeIntegration: false,
        contextIsolation: true,
        webSecurity: !process.env.VITE_DEV_SERVER_URL,
        sandbox: true,
        // Disable remote module (deprecated)
        // @ts-expect-error - enableRemoteModule is deprecated but we disable it explicitly
        enableRemoteModule: false,
      },
    });

    // Set CSP headers
    mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
      const responseHeaders = { ...details.responseHeaders };

      // Remove any existing CSP headers to avoid conflicts
      Object.keys(responseHeaders).forEach((key) => {
        if (key.toLowerCase() === 'content-security-policy') {
          delete responseHeaders[key];
        }
      });

      callback({
        responseHeaders: {
          ...responseHeaders,
          'Content-Security-Policy': [
            "default-src 'self'; " +
              "script-src 'self'; " +
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
              "font-src 'self' https://fonts.gstatic.com; " +
              "img-src 'self' data: https:; " +
              "connect-src 'self' https://*.supabase.co wss://*.supabase.co http://127.0.0.1:* http://localhost:* ws://127.0.0.1:* ws://localhost:*;",
          ],
        },
      });
    });

    // Load app
    if (process.env.VITE_DEV_SERVER_URL) {
      mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
      mainWindow.webContents.openDevTools();
    } else {
      mainWindow.loadFile(join(__dirname, '../../dist/index.html'));
    }

    // Show window when ready
    mainWindow.on('ready-to-show', () => {
      mainWindow?.show();
    });

    // Prevent navigation
    mainWindow.webContents.on('will-navigate', (event, navigationUrl) => {
      const parsedUrl = new URL(navigationUrl);

      // Allow only local navigation
      if (parsedUrl.origin !== 'file://') {
        event.preventDefault();
      }
    });

    // Open links in external browser
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
      if (url.startsWith('http:') || url.startsWith('https:')) {
        shell.openExternal(url);
      }
      return { action: 'deny' };
    });

    mainWindow.on('closed', () => {
      mainWindow = null;
    });
  }

  // Register as default protocol client
  if (process.defaultApp) {
    if (process.argv.length >= 2) {
      const arg = process.argv[1] || '';
      app.setAsDefaultProtocolClient('auteur', process.execPath, [join(process.cwd(), arg)]);
    }
  } else {
    app.setAsDefaultProtocolClient('auteur');
  }

  // Handle deep links on macOS
  app.on('open-url', (event, url) => {
    event.preventDefault();
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
      // Send URL to renderer to handle auth callback
      // We need to implement a listener in renderer or just let Supabase handle it if it listens to window location?
      // Supabase JS in renderer usually needs the URL to be passed to it via handleOpenURL or similar if not using standard browser flow.
      // But actually, we will likely just load the URL if it's a callback, OR pass the code to the renderer.
      // For now, let's just log it. Supabase might need `supaase.auth.getSession()` to pick it up?
      // Actually Supabase's `signInWithOAuth` redirects.
      // If we use `redirect`, we need to handle the callback route in the app.
      // Since we are SPA, we should probably navigate to the URL.
      // But typical Electron deep linking passes `auteur://auth/callback#access_token=...`

      // Send to renderer
      mainWindow.webContents.send('app:deep-link', url);
    }
  });

  // Window controls IPC
  ipcMain.on('window:minimize', () => {
    mainWindow?.minimize();
  });

  ipcMain.on('window:maximize', () => {
    if (mainWindow?.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow?.maximize();
    }
  });

  ipcMain.on('window:close', () => {
    mainWindow?.close();
  });

  // App lifecycle
  app.whenReady().then(async () => {
    // Setup IPC handlers (async for electron-store)
    await setupIPC();

    // Register global shortcut to toggle DevTools
    // CommandOrControl+Shift+I is the standard Chrome shortcut
    // CommandOrControl+Shift+I is the standard Chrome shortcut
    globalShortcut.register('CommandOrControl+Shift+I', () => {
      if (mainWindow) {
        if (mainWindow.webContents.isDevToolsOpened()) {
          mainWindow.webContents.closeDevTools();
        } else {
          mainWindow.webContents.openDevTools();
        }
      }
    });

    createWindow();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  });

  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      }
      mainWindow.focus();
    }
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  // Cleanup on quit
  app.on('before-quit', () => {
    // Clean up resources if needed
  });
}
