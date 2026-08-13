"use client";

import { useEffect, useState } from "react";

/**
 * Tracks a media query. Reports `false` during SSR and on the first client
 * render, so anything gated on it renders its no-JS-safe branch first and
 * upgrades after mount rather than mismatching hydration.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const list = window.matchMedia(query);
    const onChange = () => setMatches(list.matches);

    onChange();
    list.addEventListener("change", onChange);
    return () => list.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
