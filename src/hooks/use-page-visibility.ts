"use client";

import { useEffect, useState } from "react";

function pageIsVisible(): boolean {
  return (
    typeof document === "undefined" || document.visibilityState === "visible"
  );
}

/** Tracks whether the page is currently visible to the visitor. */
export function usePageVisibility(): boolean {
  const [isVisible, setIsVisible] = useState(pageIsVisible);

  useEffect(() => {
    const handleVisibilityChange = () => setIsVisible(pageIsVisible());

    document.addEventListener("visibilitychange", handleVisibilityChange);
    handleVisibilityChange();

    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return isVisible;
}
