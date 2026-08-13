import type { Transition, Variants } from "framer-motion";

/**
 * The site's shared motion vocabulary.
 *
 * Bonsai commits to one entrance primitive (blur-fade-rise), one heading
 * reveal (word mask) and one media reveal (rounded clip wipe), reused
 * everywhere. Repetition is the point: a page where every section arrives
 * differently reads as a demo reel, one where everything arrives the same way
 * reads as a system.
 *
 * Numbers follow the calm/premium archetype the brand asks for: 350-900ms,
 * decelerating, zero overshoot. Bounce reads playful; we sell craft.
 */

/** Cubic beziers. `expoOut` is the signature deceleration. */
export const EASE = {
  expoOut: [0.16, 1, 0.3, 1],
  power3Out: [0.33, 1, 0.68, 1],
  power2Out: [0.25, 1, 0.5, 1],
  power2In: [0.5, 0, 0.75, 0],
  inOutQuint: [0.83, 0, 0.17, 1],
} as const;

export const DURATION = {
  /** Hover, focus, small state flips. */
  micro: 0.2,
  /** Card enter, tab crossfade. */
  short: 0.35,
  /** The default entrance. */
  base: 0.6,
  /** Curtain, hero reveal, heading masks. */
  long: 0.9,
} as const;

/** Per-item stagger. Keep the whole cascade under ~500ms: with n items, 0.5/n. */
export const STAGGER = {
  tight: 0.05,
  base: 0.075,
  loose: 0.09,
} as const;

export const transition = (
  duration: number = DURATION.base,
  ease: readonly number[] = EASE.expoOut,
  delay = 0,
): Transition => ({ duration, ease: ease as [number, number, number, number], delay });

/**
 * The universal primitive: opacity + blur + rise.
 *
 * Keep the blur on text blocks and small media. `filter` is GPU-costly over
 * large surfaces, so full-bleed imagery uses `clipReveal` instead.
 */
export const blurFadeRise: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: transition(DURATION.base),
  },
};

/** The same primitive without the blur, for large or numerous elements. */
export const fadeRise: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: transition(DURATION.base) },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transition(DURATION.base) },
};

/**
 * Word-mask reveal: the child rides up inside an `overflow: hidden` wrapper.
 *
 * 130%, not 100%. The mask is padded past the line box so it does not shave
 * ascenders and descenders (see `.mask-word` in globals.css), which means the
 * text has to clear that padding too. At the tight leading these headings use,
 * anything under ~120% leaves a sliver of type showing below the mask.
 *
 * Transform-only on purpose. Chrome skips `opacity: 0` elements when picking
 * the LCP candidate, so fading a headline in adds its full delay plus duration
 * to the reported LCP.
 */
export const maskRise: Variants = {
  hidden: { y: "130%" },
  visible: { y: "0%", transition: transition(DURATION.long) },
};

/** Parent that cascades its children. Pair with any child variant above. */
export const stagger = (each: number = STAGGER.base, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: each, delayChildren } },
});

/**
 * Rounded clip-path reveal for imagery. The rounded corners *during* the wipe
 * are what make it read as crafted: a square wipe reads as a loading state.
 */
export const clipReveal: Variants = {
  hidden: { clipPath: "inset(12% 12% 12% 12% round 14px)", scale: 1.05 },
  visible: {
    clipPath: "inset(0% 0% 0% 0% round 14px)",
    scale: 1,
    transition: transition(DURATION.long + 0.2),
  },
};

/** Directional wipe, for full-bleed section media. */
export const wipeReveal: Variants = {
  hidden: { clipPath: "inset(0% 100% 0% 0% round 14px)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0% round 14px)",
    transition: transition(DURATION.long + 0.3),
  },
};

/** Standard viewport config: play once, trigger a little before full entry. */
export const viewportOnce = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -10% 0px",
} as const;
