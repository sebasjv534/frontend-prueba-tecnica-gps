import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const repoName = 'frontend-prueba-tecnica-gps';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Para GitHub Pages, el assetPrefix debe coincidir exactamente con basePath
  assetPrefix: isProd ? `/${repoName}` : '',
  basePath: isProd ? `/${repoName}` : '',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
