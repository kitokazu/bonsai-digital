"use client";

import { motion } from "framer-motion";
import { Fragment } from "react";

import { useTranslation } from "@/lib/i18n";
import { maskRise, stagger, STAGGER, viewportOnce } from "@/lib/motion";

const TAGS = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  div: motion.div,
} as const;

interface MaskHeadingProps {
  /** Newlines become hard line breaks, matching the design's manual wraps. */
  text: string;
  as?: keyof typeof TAGS;
  className?: string;
  /** Words rendered in the gradient accent. Matched case-sensitively. */
  accent?: string[];
  /** Above-the-fold headings animate on mount, everything else on scroll. */
  trigger?: "mount" | "view";
  delay?: number;
  each?: number;
  /**
   * Word masks read best in English. Japanese has no word spaces and its
   * line-breaking rules are per character, so JA falls back to whole lines
   * unless a call site asks otherwise.
   */
  split?: "words" | "lines";
}

/**
 * Heading reveal: each word (or line) rides up out of an overflow-hidden mask.
 *
 * The split happens in React rather than at runtime, so the server sends real,
 * complete text. Runtime splitters have to wait for `document.fonts.ready`
 * before they can measure, which means either a flash of unsplit text or a
 * heading that stays invisible until the fonts land.
 *
 * Transform-only, no opacity: Chrome skips `opacity: 0` elements when choosing
 * the LCP candidate, so fading the hero headline in would add its full delay
 * plus duration to the reported LCP.
 */
export function MaskHeading({
  text,
  as = "h2",
  className,
  accent = [],
  trigger = "view",
  delay = 0,
  each = STAGGER.tight,
  split,
}: MaskHeadingProps) {
  const Component = TAGS[as];
  const { locale } = useTranslation();
  const mode = split ?? (locale === "ja" ? "lines" : "words");
  const lines = text.split("\n");
  const accents = new Set(accent);

  const animation =
    trigger === "mount"
      ? ({ animate: "visible" } as const)
      : ({ whileInView: "visible", viewport: viewportOnce } as const);

  return (
    <Component
      className={className}
      variants={stagger(each, delay)}
      initial="hidden"
      {...animation}
    >
      {lines.map((line, lineIndex) => (
        <span className="mask-line" key={lineIndex}>
          {mode === "lines" ? (
            <span className="mask-word">
              <motion.span
                variants={maskRise}
                className={accents.has(line) ? "text-gradient" : undefined}
              >
                {line}
              </motion.span>
            </span>
          ) : (
            line.split(" ").map((word, wordIndex) => (
              <Fragment key={wordIndex}>
                {/* A real space between the masks keeps text selection and
                    screen-reader output intact; the masks are inline-block. */}
                {wordIndex > 0 ? " " : null}
                <span className="mask-word">
                  <motion.span
                    variants={maskRise}
                    className={accents.has(word) ? "text-gradient" : undefined}
                  >
                    {word}
                  </motion.span>
                </span>
              </Fragment>
            ))
          )}
        </span>
      ))}
    </Component>
  );
}
