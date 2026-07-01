import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*.wikimedia.org" }, // commons.wikimedia.org, etc.
      { protocol: "https", hostname: "*.wikipedia.org" }, // en.wikipedia.org FilePath URLs
    ],
  },
};

export default nextConfig;
