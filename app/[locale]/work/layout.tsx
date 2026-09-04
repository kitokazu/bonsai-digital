/**
 * Metadata only. The page itself is a client component and so cannot carry
 * its own, and a layout that returns its children adds nothing to the markup.
 */

import type { Metadata } from "next";
import type { ReactNode } from "react";

import { staticPageMetadata, toLocale } from "@/lib/seo";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return staticPageMetadata(toLocale(params.locale), "work", "/work");
}

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
