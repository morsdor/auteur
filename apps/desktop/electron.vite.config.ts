import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    build: {
      outDir: 'dist-electron/main',
    },
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      lib: {
        entry: 'src/preload/index.ts',
        formats: ['cjs'],
        fileName: () => 'index.cjs',
      },
      outDir: 'dist-electron/preload',
      rollupOptions: {
        external: ['electron'],
      },
    },
  },
  renderer: {
    root: 'src/renderer',
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer'),
        '@': resolve('src/renderer'),
        '@auteur/storage/electron': resolve('../../packages/storage/src/electron.ts'),
        '@auteur/storage': resolve('../../packages/storage/src/index.ts'),
        '@auteur/auth': resolve('../../packages/auth/src/index.ts'),
        '@auteur/ui': resolve('../../packages/ui/src/index.ts'),
        '@auteur/types': resolve('../../packages/types/src/index.ts'),
        '@auteur/utils': resolve('../../packages/utils/src/index.ts'),
        '@auteur/api-client': resolve('../../packages/api-client/src/index.ts'),
      },
    },
    plugins: [react()],
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: resolve(__dirname, 'src/renderer/index.html'),
      },
    },
  },
});
