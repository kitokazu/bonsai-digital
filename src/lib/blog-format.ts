import type { Locale } from "@/lib/i18n";

export function formatBlogDate(isoDate: string, locale: Locale): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  if (locale === "ja") {
    return `${year}年${month}月${day}日`;
  }
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
