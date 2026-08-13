"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Lenis smooth scrolling.
 *
 * Native wheel scrolling arrives in discrete steps, which makes every
 * scroll-linked animation visibly tick between deltas. Lenis lerps the scroll
 * position each frame on top of the real scroll, so sticky positioning,
 * anchors and keyboard navigation all keep working.
 *
 * `syncTouch` stays off: native mobile momentum beats a simulated version, and
 * touch smoothing is the source of most Lenis bug reports.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        wheelMultiplier: 1,
        syncTouch: false,
        // Anchor offsets are handled by the callers, which know the header
        // height; Lenis just supplies the animation.
        anchors: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
