import sharedConfig from '@auteur/eslint-config';

export default [
  ...sharedConfig,
  {
    ignores: ['node_modules', 'dist/**', 'dist-electron/**', 'release/**', '.vite/**'],
  },
  // Main process: Node environment
  {
    files: ['src/main/**/*', 'src/preload/**/*'],
    languageOptions: {
      globals: {
        window: 'off',
        document: 'off',
      },
    },
  },
  // Renderer process: Browser environment
  {
    files: ['src/renderer/**/*'],
    languageOptions: {
      // Browser globals are already included in sharedConfig (which includes globals.browser)
      // but we can be explicit if needed, or just let sharedConfig handle it.
      // Shared config has both browser and node, so it's a mix.
      // For renderer we might want to ensure node globals are restricted if desired,
      // but typically with Electron preload/contextBridge, some node usage might be present or not.
      // For now, let's trust the shared config's broad permissions or just rely on its defaults.
    },
  },
];
