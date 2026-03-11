import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/AI-Dashboard",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
