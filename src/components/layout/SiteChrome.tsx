"use client";

import type { ReactNode } from "react";

import { BackToTop } from "@/components/chrome/BackToTop";
import { Preloader } from "@/components/chrome/Preloader";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useTranslation } from "@/lib/i18n";

/**
 * Header, footer and floating chrome, hoisted out of the individual pages.
 *
 * They used to be repeated in every route, which meant the navbar unmounted
 * and re-ran its entrance on every navigation. Living in the layout, they
 * survive a route change, so the curtain wipes across a page whose header
 * never moves.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  const { t } = useTranslation();

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[110] focus:rounded-lg focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
      >
        {t.chrome.skipToContent}
      </a>

      <Navbar />
      <main id="main">{children}</main>
      <Footer />

      <BackToTop label={t.chrome.backToTop} />
      <Preloader tagline={t.chrome.introTagline} />
    </>
  );
}
