"use client";

import { animate, utils } from "animejs";
import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

interface CountUpProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

/**
 * Counts a number up once, on entry, then stops.
 *
 * anime.js drives a plain proxy object and writes the rounded result straight
 * to the DOM, which is cheaper than re-rendering React sixty times a second.
 *
 * The server renders the final value, so the markup is correct for crawlers
 * and for anyone whose JS never arrives. The client resets it to zero on
 * mount, before the element is likely to be on screen.
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 1600,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = usePrefersReducedMotion();
  const hasRun = useRef(false);

  useEffect(() => {
    if (reduced || hasRun.current || !ref.current) return;
    ref.current.textContent = `${prefix}0${suffix}`;
  }, [prefix, suffix, reduced]);

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView || hasRun.current) return;

    if (reduced) {
      node.textContent = `${prefix}${value}${suffix}`;
      hasRun.current = true;
      return;
    }

    hasRun.current = true;
    const proxy = { n: 0 };

    const animation = animate(proxy, {
      n: value,
      duration,
      // Strong deceleration: the number arrives quickly and settles.
      ease: "out(4)",
      onUpdate: () => {
        node.textContent = `${prefix}${utils.round(proxy.n, 0)}${suffix}`;
      },
      onComplete: () => {
        node.textContent = `${prefix}${value}${suffix}`;
      },
    });

    return () => {
      animation.pause();
    };
  }, [inView, value, prefix, suffix, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
