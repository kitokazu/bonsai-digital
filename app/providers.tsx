"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MotionConfig } from "framer-motion";
import { useState } from "react";

import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { TransitionProvider } from "@/components/providers/TransitionProvider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DURATION, transition } from "@/lib/motion";

/**
 * Client-side providers, outermost first.
 *
 * `reducedMotion="user"` makes Framer Motion drop transforms automatically for
 * anyone who has asked for less motion: the components still declare their
 * animations, the library just refuses to move things. Opacity crossfades
 * survive, which is the behaviour we want.
 *
 * TransitionProvider sits inside SmoothScroll because the route curtain hands
 * its scroll jumps to Lenis.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <MotionConfig
      reducedMotion="user"
      transition={transition(DURATION.base)}
    >
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <SmoothScroll>
            <TransitionProvider>{children}</TransitionProvider>
          </SmoothScroll>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </QueryClientProvider>
    </MotionConfig>
  );
}
