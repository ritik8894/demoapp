import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {} // enable Turbopack with default options
  }  
};

export default nextConfig;
