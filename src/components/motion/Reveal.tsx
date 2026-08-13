"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { blurFadeRise, fadeRise, stagger, STAGGER, viewportOnce } from "@/lib/motion";

/**
 * Pre-created motion components.
 *
 * Built once at module scope on purpose. Creating them during render returns a
 * new component type every pass, which unmounts and remounts the whole
 * subtree, losing focus, state and any running animation.
 */
const TAGS = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  header: motion.header,
  footer: motion.footer,
  ul: motion.ul,
  li: motion.li,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
  figure: motion.figure,
} as const;

export type RevealTag = keyof typeof TAGS;

interface RevealProps {
  children: ReactNode;
  /** Drop the blur on large surfaces or long lists; `filter` is not free. */
  blur?: boolean;
  delay?: number;
  className?: string;
  as?: RevealTag;
  id?: string;
}

/**
 * The site's default entrance: blur-fade-rise, once, on scroll into view.
 *
 * One primitive everywhere is deliberate. Variety reads as a demo reel,
 * consistency reads as a system.
 */
export function Reveal({
  children,
  blur = true,
  delay = 0,
  className,
  as = "div",
  id,
}: RevealProps) {
  const Component = TAGS[as];

  return (
    <Component
      id={id}
      className={className}
      variants={blur ? blurFadeRise : fadeRise}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  each?: number;
  delayChildren?: number;
  as?: RevealTag;
}

/**
 * Cascades `RevealItem` children. Keep the whole cascade under ~500ms: with
 * many items, pass a smaller `each`.
 */
export function RevealGroup({
  children,
  className,
  each = STAGGER.base,
  delayChildren = 0,
  as = "div",
}: RevealGroupProps) {
  const Component = TAGS[as];

  return (
    <Component
      className={className}
      variants={stagger(each, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </Component>
  );
}

interface RevealItemProps {
  children: ReactNode;
  className?: string;
  blur?: boolean;
  as?: RevealTag;
}

export function RevealItem({
  children,
  className,
  blur = false,
  as = "div",
}: RevealItemProps) {
  const Component = TAGS[as];

  return (
    <Component className={className} variants={blur ? blurFadeRise : fadeRise}>
      {children}
    </Component>
  );
}
