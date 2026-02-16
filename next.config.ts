import type { NextConfig } from "next";

const nextConfig: any = {
  /* config options here */
  reactCompiler: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
