/**
 * Metadata only. The page itself is a client component and so cannot carry
 * its own, and a layout that returns its children adds nothing to the markup.
 *
 * Posts are written once, in English, so the title and excerpt are the same
 * in both locales. What still differs is the canonical and the hreflang pair,
 * which is the point of routing this through the same helper as everything
 * else.
 */

import type { Metadata } from "next";
import type { ReactNode } from "react";

import { getBlogPost } from "@/lib/blog";
import { pageMetadata, seoDictionary, toLocale } from "@/lib/seo";

export function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Metadata {
  const locale = toLocale(params.locale);
  const post = getBlogPost(params.slug);

  /* An unknown slug renders the 404, so describe the blog rather than
     inventing a title for a post that does not exist. */
  if (!post) {
    const { title, description } = seoDictionary(locale).seo.blog;
    return pageMetadata({ locale, path: "/blog", title, description });
  }

  const base = pageMetadata({
    locale,
    path: `/blog/${post.slug}`,
    title: post.title,
    description: post.excerpt,
  });

  return {
    ...base,
    authors: [{ name: "Kaito Itokazu" }],
    /* A post is an article, not a page about the studio, and saying so is
       what gets it a byline and a date in a share card. */
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: post.date,
      authors: ["Kaito Itokazu"],
    },
  };
}

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
