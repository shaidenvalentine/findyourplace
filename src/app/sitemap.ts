import type { MetadataRoute } from "next";
import { BREEDS } from "@/data/breeds";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://findyourdog.app";

/**
 * Sitemap over the public, indexable surface: the landing page, the /breeds index, the
 * /adopt layer, the entry point, and every one of the statically-generated breed guides
 * (the SEO play). User-specific /results, /admin, /portal are intentionally excluded
 * (see robots.ts).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const breeds: MetadataRoute.Sitemap = BREEDS.map((b) => ({
    url: `${SITE_URL}/breeds/${b.id}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/breeds`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/adopt`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/start`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/terms`, changeFrequency: "yearly", priority: 0.2 },
    ...breeds,
  ];
}
