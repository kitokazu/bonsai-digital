"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useState } from "react";

import { useScrollTo } from "@/hooks/use-scroll-to";
import { DURATION, EASE } from "@/lib/motion";

/**
 * Appears once the visitor is well past the fold. Driven by a motion value
 * rather than a scroll listener, so the reads stay batched with the frame.
 */
export function BackToTop({ label }: { label: string }) {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  const scrollTo = useScrollTo();

  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 800));

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          aria-label={label}
          onClick={() => scrollTo()}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          whileHover={{ y: -3 }}
          transition={{ duration: DURATION.micro, ease: EASE.power3Out }}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-foreground/90 text-background backdrop-blur flex items-center justify-center shadow-lg hover:bg-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <ArrowUp className="w-4 h-4" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
