/**
 * The sitemap.
 *
 * There was not one before, and `/sitemap.xml` fell through to the app shell,
 * so anything asking for it got a page of HTML back. Every route is listed
 * once with both languages hanging off it as alternates, which is the pairing
 * search engines want rather than two unrelated URLs that happen to say the
 * same thing.
 */

import type { MetadataRoute } from "next";

import { blogPosts } from "@/lib/blog";
import { SITE_URL, localeHref } from "@/lib/seo";
import { workProjects } from "@/lib/work";

/** Rough ordering of how much each page matters, for crawlers that read it. */
const PRIORITY: Record<string, number> = {
  "/": 1,
  "/work": 0.9,
  "/about": 0.8,
  "/contact": 0.8,
  "/education": 0.8,
  "/blog": 0.7,
};

function entry(path: string, lastModified?: string): MetadataRoute.Sitemap[number] {
  const en = localeHref(path, "en");
  const ja = localeHref(path, "ja");

  return {
    url: `${SITE_URL}${en}`,
    lastModified: lastModified ? new Date(lastModified) : new Date(),
    changeFrequency: path === "/" || path === "/blog" ? "weekly" : "monthly",
    priority: PRIORITY[path] ?? 0.6,
    alternates: {
      languages: {
        "en-US": `${SITE_URL}${en}`,
        "ja-JP": `${SITE_URL}${ja}`,
      },
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/work", "/about", "/contact", "/education", "/blog"];

  /* Only projects with a case study of their own. `slug` is optional on the
     type, and a project without one has no page to point at. */
  const caseStudies = workProjects
    .filter((project) => project.slug)
    .map((project) => entry(`/work/${project.slug}`));

  const posts = blogPosts.map((post) => entry(`/blog/${post.slug}`, post.date));

  return [...pages.map((path) => entry(path)), ...caseStudies, ...posts];
}
