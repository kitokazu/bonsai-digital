/**
 * Organization and WebSite structured data, on the home page only.
 *
 * Two jobs. The `WebSite` block is how Google decides what to print on the
 * first line of a result: without it the line falls back to the bare domain,
 * which is why the search shows "bonsaidigitalstudio.com" rather than the
 * studio's name. Google reads it from the home page and nowhere else, so this
 * belongs on `/` and `/ja` rather than in the layout.
 *
 * The `Organization` block says who is behind the site. It is not a lever on
 * the result the way the site name is, but it is what a search engine reads
 * when it is working out that the studio, the person, and the address are one
 * entity rather than three.
 *
 * A server component on purpose: this needs to be in the HTML that a crawler
 * receives, not added after hydration.
 */

import { SITE_NAME, SITE_URL, type SeoLocale } from "@/lib/seo";

export function SiteSchema({
  locale,
  description,
}: {
  locale: SeoLocale;
  description: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: SITE_NAME,
        inLanguage: locale === "ja" ? "ja-JP" : "en-US",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/logo.png`,
        image: `${SITE_URL}/og.png`,
        description,
        email: "kaito@bonsaidigitalstudio.com",
        founder: {
          "@type": "Person",
          name: "Kaito Itokazu",
          jobTitle: "Founder and Engineer",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Tokyo",
          addressCountry: "JP",
        },
        areaServed: { "@type": "Country", name: "Japan" },
        knowsLanguage: ["en", "ja"],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      /* JSON, not markup: the only character that can break out of a script
         tag is "<", and escaping it keeps the block inert either way. */
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
