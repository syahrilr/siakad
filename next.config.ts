import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/photos/**',
      },
      {
        protocol: 'https',
        hostname: 'videos.pexels.com',
        pathname: '/video-file/**',
      },
      {
        protocol: 'https',
        hostname: '**.github.com',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
