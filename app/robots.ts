/**
 * robots.txt, generated so it can name the sitemap.
 *
 * This replaces the static `public/robots.txt`, which said nothing a bare
 * "allow everything" default does not already say, and crucially did not
 * point anywhere. A static file in public/ wins over this route, so the old
 * one had to go rather than sit there shadowing it.
 */

import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        /* Nothing to index behind the contact endpoint, and the Next build
           output is not content. */
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
