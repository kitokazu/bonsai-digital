/**
 * Shared testimonial data.
 *
 * The words live in the dictionaries so both locales stay in step; what sits
 * here is everything that is not translated: the headshot each client is
 * keyed to, and the lookup that lets a case study find its own testimonial.
 */

export interface TestimonialSection {
  label: string;
  text: string;
}

export interface TestimonialItem {
  /** Keys `headshots` and the company marks. Not translated. */
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  /** Case study path, or "" for no link. */
  projectHref: string;
  projectLabel: string;
  /** The full write-up, when the client gave one. Empty for a plain quote. */
  sections: TestimonialSection[];
}

export const headshots: Record<string, string> = {
  taisei: "/definex/taisei-headshot.webp",
  victor: "/uncharted/victor-headshot.avif",
  nagato: "/home-hair-coffee/home-hair-headshot.webp",
  luc: "/public-sector/luc-headshot.webp",
  yotaro: "/enpadel/yotaro-headshot.webp",
};

/**
 * The language a client actually wrote in. Not translated, so it lives here:
 * it is a fact about the person, not about the page they land on.
 *
 * A visitor reading a locale other than this one is reading our translation,
 * and the quote says so. Leave a client out when we are not sure which
 * language they wrote in, and no claim is made either way.
 */
export const wroteIn: Record<string, "en" | "ja"> = {
  victor: "en",
  luc: "en",
  yotaro: "en",
  nagato: "ja",
};

/** True when the words on screen are our translation rather than the original. */
export function isTranslated(id: string, locale: string): boolean {
  const source = wroteIn[id];
  return Boolean(source) && source !== locale;
}

/**
 * Case studies a testimonial belongs on beyond the one its `projectHref`
 * points at, by project slug.
 *
 * Empty at the moment. Taisei used to sit here because his testimonial
 * covered both DefineX and EnPadel; now that EnPadel's founder has given one
 * of his own, each project has a client of its own to speak for it. The
 * mechanism stays for the next time one person's words cover two jobs.
 */
const alsoShownOn: Record<string, string[]> = {};

/** Last path segment, ignoring a locale prefix and any trailing slash. */
export function slugOf(path: string): string | undefined {
  return path.replace(/\/+$/, "").split("/").filter(Boolean).pop();
}

/**
 * The testimonial belonging to a case study, matched on the project path so a
 * page only has to drop the component in. Locale prefixes and trailing
 * slashes are stripped, since `/ja/work/enpadel` is the same project as
 * `/work/enpadel`.
 */
export function testimonialForPath(
  items: TestimonialItem[],
  pathname: string,
): TestimonialItem | null {
  const slug = slugOf(pathname);
  if (!slug) return null;

  return (
    items.find((item) => {
      if (item.projectHref && slugOf(item.projectHref) === slug) return true;
      return (alsoShownOn[item.id] ?? []).includes(slug);
    }) ?? null
  );
}
