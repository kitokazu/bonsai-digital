import type { Locale } from "@/lib/i18n";

const locales: Locale[] = ["en", "ja"];

/**
 * Swap the locale on a path so a language switch stays on the same page.
 * English lives at the root (/work), Japanese sits under /ja (/ja/work).
 */
export function localizedPath(pathname: string, target: Locale) {
  const segments = pathname.split("/").filter(Boolean);

  if (locales.includes(segments[0] as Locale)) {
    segments.shift();
  }

  const rest = segments.join("/");

  if (target === "en") return rest ? `/${rest}` : "/";
  return rest ? `/ja/${rest}` : "/ja";
}
