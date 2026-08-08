"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { useEffect, useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  // When a route renders slower than the browser's view-transition deadline
  // (slow connections, heavy pages), Chrome aborts the animation and rejects
  // the transition promise. next-view-transitions never catches it, so it
  // shows up as an uncaught TimeoutError even though navigation completed
  // fine and only the crossfade was skipped. Swallow exactly that rejection.
  useEffect(() => {
    const onRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      if (
        reason instanceof DOMException &&
        reason.name === "TimeoutError" &&
        reason.message.includes("Transition")
      ) {
        event.preventDefault();
      }
    };
    window.addEventListener("unhandledrejection", onRejection);
    return () => window.removeEventListener("unhandledrejection", onRejection);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {children}
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
