import type { MetadataRoute } from "next";
import { LOCATIONS } from "@/data/locations";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://findyourplace.app";

/**
 * Sitemap over the public, indexable surface: the landing page, the /places index, the
 * entry point, and every one of the statically-generated place guides (the SEO play).
 * User-specific /results, /admin, /portal are intentionally excluded (see robots.ts).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const places: MetadataRoute.Sitemap = LOCATIONS.map((l) => ({
    url: `${SITE_URL}/places/${l.id}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/places`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/start`, changeFrequency: "monthly", priority: 0.7 },
    ...places,
  ];
}
