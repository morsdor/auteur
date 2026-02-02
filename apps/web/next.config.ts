import type { NextConfig } from 'next';
import withPWA from '@ducanh2912/next-pwa';

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  transpilePackages: ['@auteur/types', '@auteur/api-client', '@auteur/utils', '@auteur/auth'],
  // Disable image optimization for now (can enable later)
  images: {
    unoptimized: true,
  },
  // Add empty turbopack config to silence warning
  turbopack: {},
};

export default withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
})(nextConfig);
