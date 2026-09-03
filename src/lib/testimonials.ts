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
};

/**
 * Case studies a testimonial belongs on beyond the one its `projectHref`
 * points at, by project slug.
 *
 * A client can be behind more than one project: Taisei runs both DefineX and
 * EnPadel, and what he says about working with us holds for both. The link in
 * the testimonial still points at a single case study, so that stays here
 * rather than in the dictionaries, which carry words and not routing.
 */
const alsoShownOn: Record<string, string[]> = {
  taisei: ["definex"],
};

/** Last path segment, ignoring a locale prefix and any trailing slash. */
function slugOf(path: string): string | undefined {
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
