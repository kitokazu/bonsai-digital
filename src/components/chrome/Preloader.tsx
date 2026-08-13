"use client";

import { createScope, createTimeline, stagger } from "animejs";
import { useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useScrollLock } from "@/hooks/use-scroll-lock";

export const PRELOADER_FLAG = "bonsai:preloaded";

/**
 * Inline, pre-paint script.
 *
 * The overlay is hidden by default in CSS and only shown once this script adds
 * `.js-preload`, which it does exclusively for a first visit with JS enabled
 * and motion allowed. Three failure modes fall out of that for free:
 *
 * - No JS: the class is never added, so the overlay stays hidden instead of
 *   covering the page forever with nothing to dismiss it.
 * - Repeat visit within the session: hidden, so moving around the site does
 *   not replay it.
 * - Reduced motion: hidden.
 *
 * Deciding this in an effect instead would paint one frame of the loader
 * before React could remove it.
 */
export const preloaderFlagScript = `try{var f=${JSON.stringify(
  PRELOADER_FLAG,
)};var s=sessionStorage.getItem(f);var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches;var c=document.documentElement.classList;if(s){c.add('preloaded')}if(!s&&!r){c.add('js-preload')}}catch(e){}`;

/**
 * First-visit intro: a hairline rule opens from the centre, the wordmark rides
 * up out of its mask, then the panel lifts away. Around 2.2s, once per
 * session.
 *
 * anime.js runs this rather than Framer Motion: it is a fixed, imperative
 * sequence with no React state between its steps, which is what
 * `createTimeline` is for.
 */
export function Preloader({ tagline }: { tagline: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [done, setDone] = useState(false);
  const [playing, setPlaying] = useState(false);

  // Locked only while the intro is actually on screen. Keying this off "not
  // done yet" instead would freeze every repeat visit, where the intro is
  // skipped and `done` therefore never flips.
  useScrollLock(playing && !done);

  useEffect(() => {
    const markSeen = () => {
      try {
        sessionStorage.setItem(PRELOADER_FLAG, "1");
      } catch {
        /* private mode: the intro simply plays again next session */
      }
      document.documentElement.classList.add("preloaded");
      document.documentElement.classList.remove("js-preload");
    };

    // The pre-paint script already decided whether the intro runs. When it
    // decided "no", the overlay is `display: none` via CSS, so there is
    // nothing to tear down and no state to set.
    const shouldPlay =
      document.documentElement.classList.contains("js-preload");
    if (!shouldPlay || reduced) {
      markSeen();
      return;
    }

    const root = rootRef.current;
    if (!root) return;

    setPlaying(true);

    const scope = createScope({ root: rootRef }).add(() => {
      createTimeline()
        .add(
          ".preloader-rule",
          { scaleX: [0, 1], duration: 900, ease: "inOut(3)" },
          80,
        )
        .add(
          ".mask-word > span",
          { y: ["110%", "0%"], duration: 900, delay: stagger(70), ease: "out(4)" },
          220,
        )
        .add(".preloader-meta", { opacity: [0, 1], duration: 500 }, 620)
        // Brief hold, then take the words back out the way they came in. The
        // whole thing lands under 2.3s: this sits in front of a sales pitch,
        // so it has to read as craft, not as a wait.
        .add(
          ".mask-word > span",
          { y: ["0%", "-110%"], duration: 560, delay: stagger(45), ease: "in(3)" },
          1180,
        )
        .add(
          ".preloader-rule, .preloader-meta",
          { opacity: [1, 0], duration: 380 },
          1240,
        )
        .add(
          root,
          {
            y: ["0%", "-100%"],
            duration: 720,
            ease: "inOut(4)",
            onComplete: () => {
              markSeen();
              setDone(true);
            },
          },
          1560,
        );
    });

    return () => {
      scope.revert();
    };
  }, [reduced]);

  if (done) return null;

  return (
    <div className="preloader" ref={rootRef} aria-hidden="true">
      <div className="preloader-words font-serif">
        {["Bonsai", "Digital"].map((word) => (
          <span className="mask-word" key={word}>
            <span>{word}</span>
          </span>
        ))}
      </div>

      <div className="preloader-rule">
        <span />
      </div>

      <div className="preloader-meta">{tagline}</div>
    </div>
  );
}
