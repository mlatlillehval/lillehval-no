import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/ai-utviklingen", destination: "/ai-forklart", permanent: true },
      { source: "/trenger-hjelp-med-ai", destination: "/hjelp-med-ai", permanent: true },
    ];
  },
};

export default nextConfig;
