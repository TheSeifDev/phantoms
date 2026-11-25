import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: { unoptimized: true },
  allowedDevOrigins: ["**.manus.computer"],
  experimental: {
    reactDebugChannel: false,
  },
};

export default nextConfig;
