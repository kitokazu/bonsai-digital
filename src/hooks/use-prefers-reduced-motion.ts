"use client";

import { useMediaQuery } from "@/hooks/use-media-query";

/** Tracks the visitor's reduced-motion preference. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
