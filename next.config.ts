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
      { source: "/ai-raadgivning", destination: "/ai-radgivning", permanent: true },
      { source: "/ai-rådgivning", destination: "/ai-radgivning", permanent: true },
      { source: "/norske-ai-konsulenter", destination: "/ai-radgivning", permanent: true },
      { source: "/ai-implementering-bedrift", destination: "/ai-implementering", permanent: true },
    ];
  },
};

export default nextConfig;
