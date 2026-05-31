import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Find Your Place",
    short_name: "Find Your Place",
    description: "Find the place on Earth that actually fits you.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0b12",
    theme_color: "#0a0b12",
    icons: [
      { src: "/api/icon?size=192", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/api/icon?size=512", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/api/icon?size=512", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
