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

// Rough reading time at about 230 words per minute. Post content is English.
export function readingMinutes(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 230));
}

// The first ![alt](src) image in a post, used as its card image on the blog index.
export function firstImage(content: string): string | undefined {
  return content.match(/!\[[^\]]*\]\(([^)]+)\)/)?.[1];
}
