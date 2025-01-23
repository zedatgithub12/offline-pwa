import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // Disables ESLint during builds
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ethiohajj.com",
        port: "",
        pathname: "/storage/photo/**",
      },
    ],
  },
};

export default nextConfig;


