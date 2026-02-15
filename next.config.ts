import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // Disable image optimization for external images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sloomy.co.uk',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.figma.com',
        pathname: '/api/mcp/asset/**',
      },
    ],
  },
};

export default nextConfig;
