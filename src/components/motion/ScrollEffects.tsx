"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Scroll-linked effects.
 *
 * These map scroll position linearly and let a spring supply the smoothing.
 * Easing a scroll-scrubbed value makes the element lag or race the pointer;
 * the cinematic feel comes from the spring's catch-up, not from an ease.
 */

interface ClipRevealProps {
  children: ReactNode;
  className?: string;
  /** Starting inset, in percent. */
  from?: number;
  /** Corner radius held during the wipe. */
  radius?: number;
}

/**
 * Rounded clip-path wipe, scrubbed across the element's journey into view.
 * The rounded corners during the wipe are the signature; a square wipe reads
 * as a loading state.
 */
export function ClipReveal({
  children,
  className,
  from = 10,
  radius = 16,
}: ClipRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const clipPath = useTransform(smooth, (value) => {
    const inset = from * (1 - Math.min(Math.max(value, 0), 1));
    return `inset(${inset}% round ${radius}px)`;
  });

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} className={className} style={{ clipPath }}>
      {children}
    </motion.div>
  );
}

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /**
   * Travel as a percentage of the element's own height. Background layers sit
   * at 0.1-0.3x scroll speed; keep this modest or the depth ordering visibly
   * inverts.
   */
  distance?: number;
}

export function Parallax({ children, className, distance = 10 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`-${distance}%`, `${distance}%`]);
  const smoothY = useSpring(y, { stiffness: 90, damping: 30, restDelta: 0.001 });

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} className={className} style={{ y: smoothY }}>
      {children}
    </motion.div>
  );
}
