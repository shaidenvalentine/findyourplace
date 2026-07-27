import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Find Your Dog",
    short_name: "Find Your Dog",
    description: "Find the dog breed you're actually meant to have — then adopt it near you.",
    start_url: "/",
    display: "standalone",
    background_color: "#10161d",
    theme_color: "#10161d",
    icons: [
      { src: "/api/icon?size=192", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/api/icon?size=512", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/api/icon?size=512", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
