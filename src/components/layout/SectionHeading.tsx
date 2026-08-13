"use client";

import { motion } from "framer-motion";

import { MaskHeading } from "@/components/motion/MaskHeading";
import { useTranslation } from "@/lib/i18n";
import { blurFadeRise, DURATION, EASE, viewportOnce } from "@/lib/motion";
import { cn, textAlign } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  heading: string;
  lede?: string;
  /** Words rendered in the gradient accent. English only, matched by word. */
  accent?: string[];
  as?: "h1" | "h2";
  /** Above-the-fold headings animate on mount, everything else on scroll. */
  trigger?: "mount" | "view";
  /** Override the locale default (centred English, flush-left Japanese). */
  align?: "start" | "center";
  className?: string;
}

/**
 * The shared section header: eyebrow, heading, lede.
 *
 * Every section used to hand-roll this trio along with its own alignment
 * ternary, its own eyebrow sizing and its own entrance timing, which is why no
 * two of them matched. One component means one rhythm down the page.
 */
export function SectionHeading({
  eyebrow,
  heading,
  lede,
  accent = [],
  as = "h2",
  trigger = "view",
  align,
  className,
}: SectionHeadingProps) {
  const { locale } = useTranslation();
  const centered = align ? align === "center" : locale !== "ja";

  const revealProps =
    trigger === "mount"
      ? ({ animate: "visible" } as const)
      : ({ whileInView: "visible", viewport: viewportOnce } as const);

  return (
    <div
      className={cn(
        "max-w-2xl",
        centered ? "mx-auto text-center" : textAlign(locale),
        className,
      )}
    >
      {eyebrow && (
        <motion.span
          className="type-eyebrow mb-4"
          variants={blurFadeRise}
          initial="hidden"
          transition={{ duration: DURATION.short, ease: EASE.expoOut }}
          {...revealProps}
        >
          {eyebrow}
        </motion.span>
      )}

      <MaskHeading
        as={as}
        text={heading}
        accent={accent}
        trigger={trigger}
        delay={eyebrow ? 0.08 : 0}
        className={as === "h1" ? "type-h1 mb-6" : "type-h2 mb-6"}
      />

      {lede && (
        <motion.p
          className="type-lede"
          variants={blurFadeRise}
          initial="hidden"
          transition={{ delay: 0.16 }}
          {...revealProps}
        >
          {lede}
        </motion.p>
      )}
    </div>
  );
}
