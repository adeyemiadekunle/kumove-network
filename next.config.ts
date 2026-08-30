import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  // Silence workspace root detection warning caused by parent pnpm-lock.yaml
  outputFileTracingRoot: path.join(__dirname),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
