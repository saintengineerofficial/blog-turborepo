import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  webpack: (config, { dev }) => {
    if (!dev) {
      config.cache = {
        type: "filesystem",
        maxMemoryPages: 50,
      };
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "loremflickr.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "bxnuiwimsibolylzkjya.supabase.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
