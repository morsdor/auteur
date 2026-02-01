import type { Config } from 'tailwindcss';
import sharedConfig from '@auteur/tailwind-config';

const config: Config = {
  content: ['./src/renderer/**/*.{js,ts,jsx,tsx}', '../../packages/ui/src/**/*.{js,ts,jsx,tsx}'],
  presets: [sharedConfig as Config],
};

export default config;
