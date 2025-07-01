import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
};module.exports = {
  reactStrictMode: true,
};

export default nextConfig;
