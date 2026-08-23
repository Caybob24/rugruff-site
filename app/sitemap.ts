import type { MetadataRoute } from "next";
import { NAV, SITE_URL } from "@/lib/site";

/**
 * Built from NAV so the sitemap cannot drift from the real navigation —
 * adding a page to NAV adds it here automatically.
 *
 * `force-static` matters: without it this would not be emitted into the
 * static export that gets uploaded to shared hosting.
 */
export const dynamic = "force-static";

/**
 * Pages that are reachable from the site but deliberately not in the top
 * nav — they still need to be in the sitemap to get indexed.
 */
const EXTRA = ["/collaborations/skategrounds"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ...NAV.map((item) => ({
      url: `${SITE_URL}${item.href === "/" ? "" : item.href}/`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: item.href === "/" ? 1 : 0.8,
    })),
    ...EXTRA.map((href) => ({
      url: `${SITE_URL}${href}/`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
