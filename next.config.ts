import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "appwrite",
      "node-appwrite",
    ],
  },
  // Canonical route rewrites implementing Section 49 of the Supermassive Implementation Plan
  async rewrites() {
    return [
      { source: "/cockpit", destination: "/dashboard" },
      { source: "/prepare", destination: "/learn" },
      { source: "/prepare/:path*", destination: "/learn/:path*" },
      { source: "/evaluate", destination: "/mock-tests" },
      { source: "/evaluate/interviews", destination: "/mock-interviews" },
      { source: "/evaluate/interviews/:path*", destination: "/mock-interviews/:path*" },
      { source: "/passport", destination: "/career-passport" },
      { source: "/opportunities", destination: "/jobs" },
      { source: "/opportunities/:path*", destination: "/jobs/:path*" },
    ];
  },
  // Primary security headers are applied in middleware.ts / proxy.ts
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
