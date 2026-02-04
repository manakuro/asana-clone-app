import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {},
  serverExternalPackages: ['utf-8-validate', 'bufferutil'],
};

export default nextConfig;
