/**
 * Metadata only. The page itself is a client component and so cannot carry
 * its own, and a layout that returns its children adds nothing to the markup.
 */

import type { Metadata } from "next";
import type { ReactNode } from "react";

import { toLocale, workMetadata } from "@/lib/seo";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return workMetadata(toLocale(params.locale), "chnl301", "chnl301", "/chnl301/chnl301-landing.png");
}

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
