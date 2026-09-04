/**
 * Per-page metadata.
 *
 * Everything on the site used to share one title and one description, which
 * is why search results came back with no snippet: a description claimed by
 * forty URLs is a description Google throws away and rewrites from the page
 * body. This builds a real one per route, in both languages.
 *
 * Server-only by intent. It reads the dictionaries directly rather than going
 * through `@/lib/i18n`, which is a client module: `getDictionary` would work,
 * but pulling a client boundary into `generateMetadata` is asking for trouble
 * the first time that file grows a hook.
 */

import type { Metadata } from "next";

import enDict from "@/dictionaries/en.json";
import jaDict from "@/dictionaries/ja.json";
import type { WorkProjectId } from "@/lib/work";

export type SeoLocale = "en" | "ja";

/**
 * The host content actually resolves at. The apex redirects here, so the
 * canonical has to name the destination rather than the hop.
 */
export const SITE_URL = "https://www.bonsaidigitalstudio.com";

export const SITE_NAME = "Bonsai Digital";

const dictionaries = { en: enDict, ja: jaDict };

export function seoDictionary(locale: SeoLocale) {
  return dictionaries[locale] ?? dictionaries.en;
}

/** Narrow whatever the route handed us; anything but "ja" is English. */
export function toLocale(value: string | undefined): SeoLocale {
  return value === "ja" ? "ja" : "en";
}

/**
 * A path in one locale's public form. English lives at the root and Japanese
 * under /ja, matching `localizedPath`, so `/work/definex` and
 * `/ja/work/definex` are the same page in two languages.
 *
 * `path` is always the English form with a leading slash, or "/" for home.
 */
export function localeHref(path: string, locale: SeoLocale): string {
  const rest = path === "/" ? "" : path;
  if (locale === "ja") return rest ? `/ja${rest}` : "/ja";
  return rest || "/";
}

interface PageSeo {
  locale: SeoLocale;
  /** English-form path, e.g. "/work/definex". */
  path: string;
  /** Page title, without the site name. Omit on the home page. */
  title?: string;
  description: string;
  /** Overrides the site card. Case studies use their own hero. */
  image?: string;
}

/**
 * Title, description, canonical, hreflang and social cards for one page.
 *
 * Next merges metadata down the tree by shallow assignment, so `openGraph`
 * and `twitter` are rebuilt in full here rather than half-inherited from the
 * layout: setting only a title on a child would drop the parent's image.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  image = "/og.png",
}: PageSeo): Metadata {
  const href = localeHref(path, locale);
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;

  return {
    /* Absolute rather than leaning on the layout's `%s | Bonsai Digital`
       template. A plain string title in an intermediate segment clears that
       template for everything below it, which left the case studies under
       /work titled "DefineX" with no studio name attached. Spelling the whole
       title out here means every page gets the same treatment wherever it
       sits in the tree. */
    title: { absolute: fullTitle },
    description,
    alternates: {
      canonical: href,
      /* Both directions plus a default, so neither language is treated as a
         duplicate of the other and search engines know which to serve where.
         x-default points at English, which is what the bare path already
         serves to everyone who has not asked for Japanese. */
      languages: {
        "en-US": localeHref(path, "en"),
        "ja-JP": localeHref(path, "ja"),
        "x-default": localeHref(path, "en"),
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      url: href,
      type: "website",
      locale: locale === "ja" ? "ja_JP" : "en_US",
      images: [{ url: image, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

/**
 * Metadata for one case study, off the copy the page already renders. The
 * client gave us a title and a one-line summary for every project in both
 * languages, so there is nothing to write twice and nothing to drift.
 */
export function workMetadata(
  locale: SeoLocale,
  id: WorkProjectId,
  slug: string,
  image?: string,
): Metadata {
  const detail = seoDictionary(locale).workDetail[id];

  return pageMetadata({
    locale,
    path: `/work/${slug}`,
    title: detail.title,
    description: detail.description,
    image,
  });
}

/** Metadata for one of the pages that carries its own `seo` block. */
export function staticPageMetadata(
  locale: SeoLocale,
  key: keyof (typeof enDict)["seo"],
  path: string,
): Metadata {
  const { title, description } = seoDictionary(locale).seo[key];

  return pageMetadata({
    locale,
    path,
    title: title || undefined,
    description,
  });
}
