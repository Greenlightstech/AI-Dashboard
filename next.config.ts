import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Project-Dashboard",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
