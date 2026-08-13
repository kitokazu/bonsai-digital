import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import type { Locale } from "@/lib/i18n";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Centred English, flush-left Japanese.
 *
 * Centred Latin display copy reads as considered; centred Japanese does not.
 * Its glyphs are fixed-width and its lines wrap at almost any character, so a
 * centred block ends up with ragged edges on both sides and no anchor for the
 * eye. Every section header on the site goes through this rather than
 * repeating the ternary.
 */
export function textAlign(locale: Locale) {
  return locale === "ja" ? "text-left" : "text-center";
}

/** Flex/grid cross-axis equivalent of `textAlign`, for centred item stacks. */
export function itemsAlign(locale: Locale) {
  return locale === "ja" ? "items-start" : "items-center";
}
