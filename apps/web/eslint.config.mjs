import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import sharedConfig from '@auteur/eslint-config';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  ...sharedConfig.map((config) => {
    if (config.plugins && config.plugins['react-hooks']) {
      // eslint-config-next already defines react-hooks, so we remove it from shared config
      // to avoid "Cannot redefine plugin" error.
      const { 'react-hooks': _, ...plugins } = config.plugins;
      return {
        ...config,
        plugins,
      };
    }
    return config;
  }),
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
