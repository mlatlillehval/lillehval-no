import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [{ source: "/ai-utviklingen", destination: "/ai-forklart", permanent: true }];
  },
};

export default nextConfig;
