"use client";

import { useLenis } from "lenis/react";
import { useEffect } from "react";

/**
 * Freezes the page behind a full-screen overlay.
 *
 * `overflow: hidden` on its own is not enough here. Lenis drives `window`
 * directly, so it happily keeps scrolling a body that CSS has locked; it has
 * to be told to stop as well. The overflow rule still matters for the
 * reduced-motion path, where Lenis is not mounted at all.
 */
export function useScrollLock(locked: boolean) {
  const lenis = useLenis();

  useEffect(() => {
    if (!locked) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenis?.stop();

    return () => {
      document.body.style.overflow = previous;
      lenis?.start();
    };
  }, [locked, lenis]);
}
