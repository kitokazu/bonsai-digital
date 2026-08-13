"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useScrollTo } from "@/hooks/use-scroll-to";
import { useTranslation } from "@/lib/i18n";
import { EASE } from "@/lib/motion";

type Phase = "idle" | "covering" | "revealing";
/** How far the navigation travels, which decides how much ceremony it gets. */
type Mode = "curtain" | "veil";

interface TransitionContextValue {
  navigate: (href: string) => void;
  isTransitioning: boolean;
}

const TransitionContext = createContext<TransitionContextValue>({
  navigate: () => {},
  isTransitioning: false,
});

export const useTransitionRouter = () => useContext(TransitionContext);

const PANELS = 5;
const PANEL_DURATION = 0.55;
const PANEL_STAGGER = 0.04;

const VEIL_IN = 0.2;
const VEIL_OUT = 0.28;

/** Longest a transition may hold the screen if a route never resolves. */
const SAFETY_MS = 4000;

const LOCALES = new Set(["en", "ja"]);

const pathOf = (href: string) => href.split("#")[0].split("?")[0] || "/";

/**
 * The top-level area a path belongs to, with any locale prefix dropped.
 * `/work`, `/work/definex` and `/ja/work/nicolita` are all "work"; the home
 * page is "".
 */
const sectionOf = (href: string) => {
  const segments = pathOf(href).split("/").filter(Boolean);
  if (LOCALES.has(segments[0])) segments.shift();
  return segments[0] ?? "";
};

/**
 * Route transitions, in two weights.
 *
 * Moving between areas of the site (home to work, work to contact) gets the
 * full curtain: five panels wipe up over the outgoing page, the route commits
 * while the screen is covered, then they wipe off the top. It reads as
 * arriving somewhere new.
 *
 * Moving *within* an area (the work index into a case study, one case study to
 * the next, a case study back to the index) gets a veil instead: a single
 * quick dissolve, about a third of the length. Browsing a portfolio means
 * making that trip repeatedly, and a gesture that flatters the first time
 * grates by the fifth. The rule is deliberately simple, so the same click
 * always feels the same way.
 *
 * The App Router unmounts the old tree the moment navigation commits, so an
 * exit animation has to run *before* the push rather than through an
 * AnimatePresence wrapped around the page. Hence the explicit
 * cover, push, reveal sequence in both modes.
 */
export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();
  const scrollTo = useScrollTo();
  const { t } = useTranslation();

  const [phase, setPhase] = useState<Phase>("idle");
  const [mode, setMode] = useState<Mode>("curtain");
  const pending = useRef<string | null>(null);
  const safetyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearSafety = () => {
    if (safetyTimer.current) {
      clearTimeout(safetyTimer.current);
      safetyTimer.current = null;
    }
  };

  const navigate = useCallback(
    (href: string) => {
      const target = pathOf(href);
      const hash = href.includes("#") ? href.slice(href.indexOf("#")) : "";

      // Same page: let the hash scroll, or return to the top.
      if (target === pathname) {
        scrollTo(hash && hash !== "#" ? hash : undefined);
        return;
      }

      if (reduced) {
        router.push(href);
        return;
      }

      if (phase !== "idle") return;

      pending.current = href;
      setMode(
        sectionOf(href) === sectionOf(pathname ?? "/") ? "veil" : "curtain",
      );
      setPhase("covering");
      clearSafety();
      safetyTimer.current = setTimeout(() => {
        pending.current = null;
        setPhase("idle");
      }, SAFETY_MS);
    },
    [pathname, phase, reduced, router, scrollTo],
  );

  // The route has committed underneath: settle the scroll position and lift.
  useEffect(() => {
    if (phase !== "covering" || !pending.current) return;

    const href = pending.current;
    if (pathOf(href) !== pathname) return;

    pending.current = null;
    clearSafety();

    // The screen is still covered, so the jump is instant on purpose:
    // animating underneath would only surface as a lurch on the reveal.
    const hash = href.includes("#") ? href.slice(href.indexOf("#")) : "";
    scrollTo(hash && hash !== "#" ? hash : undefined, { immediate: true });

    setPhase("revealing");
  }, [pathname, phase, scrollTo]);

  useEffect(() => () => clearSafety(), []);

  /** Called by whichever element finishes last in the current phase. */
  const onSettled = () => {
    if (phase === "covering") {
      if (pending.current) router.push(pending.current);
      return;
    }
    if (phase === "revealing") setPhase("idle");
  };

  const covering = phase === "covering";

  return (
    <TransitionContext.Provider
      value={{ navigate, isTransitioning: phase !== "idle" }}
    >
      {children}

      <AnimatePresence>
        {phase !== "idle" &&
          (mode === "curtain" ? (
            <motion.div className="curtain" key="curtain" aria-hidden="true">
              {Array.from({ length: PANELS }, (_, index) => (
                <motion.div
                  key={index}
                  className="curtain-panel"
                  initial={{ y: "100%" }}
                  animate={{ y: covering ? "0%" : "-100%" }}
                  transition={{
                    duration: PANEL_DURATION,
                    ease: EASE.inOutQuint,
                    delay: index * PANEL_STAGGER,
                  }}
                  // The last panel to move finishes the phase.
                  onAnimationComplete={
                    index === PANELS - 1 ? onSettled : undefined
                  }
                />
              ))}

              <motion.span
                className="curtain-mark"
                initial={{ opacity: 0 }}
                animate={{ opacity: covering ? 1 : 0 }}
                transition={{ duration: 0.3, delay: covering ? 0.3 : 0 }}
              >
                Bonsai Digital
              </motion.span>
            </motion.div>
          ) : (
            <motion.div
              className="veil"
              key="veil"
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: covering ? 1 : 0 }}
              transition={{
                duration: covering ? VEIL_IN : VEIL_OUT,
                ease: covering ? EASE.power2In : EASE.expoOut,
              }}
              onAnimationComplete={onSettled}
            />
          ))}
      </AnimatePresence>

      {/* Announced to screen readers so a route change is not silent. */}
      <div aria-live="polite" className="sr-only">
        {covering ? t.chrome.loading : ""}
      </div>
    </TransitionContext.Provider>
  );
}
