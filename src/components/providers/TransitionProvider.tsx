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
/** Longest a curtain may stay up if a route never resolves. */
const SAFETY_MS = 4000;

const pathOf = (href: string) => href.split("#")[0].split("?")[0] || "/";

/**
 * Route transitions: a panelled curtain wipes up over the outgoing page, the
 * route commits while the screen is covered, then the curtain wipes off the
 * top.
 *
 * The App Router unmounts the old tree the moment navigation commits, so an
 * exit animation has to run *before* the push rather than through an
 * AnimatePresence wrapped around the page. Hence the explicit
 * cover, push, reveal sequence.
 */
export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();
  const scrollTo = useScrollTo();
  const { t } = useTranslation();

  const [phase, setPhase] = useState<Phase>("idle");
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
      setPhase("covering");
      clearSafety();
      safetyTimer.current = setTimeout(() => {
        pending.current = null;
        setPhase("idle");
      }, SAFETY_MS);
    },
    [pathname, phase, reduced, router, scrollTo],
  );

  // The route has committed under the curtain: settle the scroll position and
  // lift it.
  useEffect(() => {
    if (phase !== "covering" || !pending.current) return;

    const href = pending.current;
    if (pathOf(href) !== pathname) return;

    pending.current = null;
    clearSafety();

    // The screen is still covered, so the jump is instant on purpose:
    // animating underneath the curtain would only surface as a lurch when it
    // lifts.
    const hash = href.includes("#") ? href.slice(href.indexOf("#")) : "";
    scrollTo(hash && hash !== "#" ? hash : undefined, { immediate: true });

    setPhase("revealing");
  }, [pathname, phase, scrollTo]);

  useEffect(() => () => clearSafety(), []);

  const onPanelSettled = () => {
    if (phase === "covering") {
      if (pending.current) router.push(pending.current);
      return;
    }
    if (phase === "revealing") setPhase("idle");
  };

  return (
    <TransitionContext.Provider
      value={{ navigate, isTransitioning: phase !== "idle" }}
    >
      {children}

      <AnimatePresence>
        {phase !== "idle" && (
          <motion.div className="curtain" key="curtain" aria-hidden="true">
            {Array.from({ length: PANELS }, (_, index) => (
              <motion.div
                key={index}
                className="curtain-panel"
                initial={{ y: "100%" }}
                animate={{ y: phase === "covering" ? "0%" : "-100%" }}
                transition={{
                  duration: PANEL_DURATION,
                  ease: EASE.inOutQuint,
                  delay: index * PANEL_STAGGER,
                }}
                // The last panel to move is the one that finishes the phase.
                onAnimationComplete={
                  index === PANELS - 1 ? onPanelSettled : undefined
                }
              />
            ))}

            <motion.span
              className="curtain-mark"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "covering" ? 1 : 0 }}
              transition={{ duration: 0.3, delay: phase === "covering" ? 0.3 : 0 }}
            >
              Bonsai Digital
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Announced to screen readers so a route change is not silent. */}
      <div aria-live="polite" className="sr-only">
        {phase === "covering" ? t.chrome.loading : ""}
      </div>
    </TransitionContext.Provider>
  );
}
