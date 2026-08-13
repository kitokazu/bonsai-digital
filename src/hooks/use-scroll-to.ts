"use client";

import { useLenis } from "lenis/react";
import { useCallback } from "react";

/** Height of the fixed header, plus breathing room above an anchored section. */
export const HEADER_OFFSET = 96;

/**
 * Scrolls to a section anchor, or back to the top when given nothing.
 *
 * Lenis animates `scrollTop` itself, so a native `scrollIntoView` alongside it
 * produces two competing animations, and a bare `window.scrollTo` gets lerped
 * straight back. Everything goes through Lenis while it is running; without it
 * (reduced motion) the native calls are the right behaviour anyway.
 *
 * `immediate` skips the animation, for jumps that happen behind the route
 * curtain where a smooth trip would only surface as a lurch.
 */
export function useScrollTo() {
  const lenis = useLenis();

  return useCallback(
    (hash?: string, { immediate = false }: { immediate?: boolean } = {}) => {
      const target = hash
        ? document.querySelector<HTMLElement>(hash)
        : null;
      if (hash && !target) return;

      if (lenis) {
        lenis.scrollTo(target ?? 0, {
          offset: target ? -HEADER_OFFSET : 0,
          duration: 1.1,
          immediate,
        });
        return;
      }

      const top = target
        ? target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
        : 0;
      window.scrollTo({ top, behavior: immediate ? "auto" : "smooth" });
    },
    [lenis],
  );
}
