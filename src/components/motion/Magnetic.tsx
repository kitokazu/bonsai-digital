"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCallback, type PointerEvent, type ReactNode } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** Maximum pull in px. Small on purpose: machined, not springy. */
  strength?: number;
}

/**
 * Cursor-magnetic wrapper for primary calls to action.
 *
 * Clamped to a handful of pixels and damped hard, so it reads as a control
 * that is precisely made rather than a toy. Pointer-driven only, and skipped
 * for coarse pointers and reduced motion: there is no cursor to be magnetic
 * toward on a touchscreen.
 */
export function Magnetic({ children, className, strength = 8 }: MagneticProps) {
  const reduced = usePrefersReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 220, damping: 22, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 22, mass: 0.4 });

  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLSpanElement>) => {
      if (event.pointerType !== "mouse") return;
      const rect = event.currentTarget.getBoundingClientRect();
      const offsetX = event.clientX - (rect.left + rect.width / 2);
      const offsetY = event.clientY - (rect.top + rect.height / 2);
      // Normalised to the element's own size, so a wide button does not pull
      // harder than a narrow one.
      x.set((offsetX / (rect.width / 2)) * strength);
      y.set((offsetY / (rect.height / 2)) * strength);
    },
    [strength, x, y],
  );

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  if (reduced) return <span className={className}>{children}</span>;

  return (
    <motion.span
      className={className}
      style={{ x: springX, y: springY, display: "inline-flex" }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      {children}
    </motion.span>
  );
}
