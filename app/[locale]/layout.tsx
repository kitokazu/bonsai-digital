import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Providers from "../providers";
import { preloaderFlagScript } from "@/components/chrome/Preloader";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { LocaleProvider } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import "lenis/dist/lenis.css";
import "../globals.css";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

/* The search snippet. Kept in step with about.paragraph1 in the dictionaries,
   which is the other block search engines tend to pull from. */
const descriptions: Record<Locale, string> = {
  en: "Japan-based digital studio cultivating your digital growth. We build websites, web applications, internal tools, and AI agents with precision and care.",
  ja: "日本拠点のデジタルスタジオ。ウェブサイトやウェブアプリケーション、社内ツール、AIエージェントまで、ビジネスに本当に役立つデジタルプロダクトを丁寧に設計し、形にします。",
};

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  const locale = (params.locale === "ja" ? "ja" : "en") as Locale;
  const description = descriptions[locale];

  return {
    metadataBase: new URL("https://bonsaidigitalstudio.com"),
    title: "Bonsai Digital",
    description,
    icons: {
      icon: [
        { url: "/favicon/favicon.ico", sizes: "any" },
        { url: "/favicon/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      ],
      apple: "/favicon/apple-touch-icon.png",
    },
    manifest: "/favicon/site.webmanifest",
    openGraph: {
      title: "Bonsai Digital",
      description,
      siteName: "Bonsai Digital",
      url: locale === "ja" ? "/ja" : "/",
      type: "website",
      locale: locale === "ja" ? "ja_JP" : "en_US",
      images: [
        {
          url: "/og.png",
          width: 1572,
          height: 1030,
          alt: "Bonsai Digital, a Japan-based digital studio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Bonsai Digital",
      description,
      images: ["/og.png"],
    },
  };
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ja" }];
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = (params.locale === "ja" ? "ja" : "en") as Locale;

  return (
    // The pre-paint script below adds `js-preload` / `preloaded` to this
    // element before React hydrates, so its class list is expected to differ
    // from the server's. Suppressed here only: the warning is correct in
    // general, and this is the one element that legitimately trips it.
    <html
      lang={locale}
      className={`${cormorantGaramond.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Must run before first paint; see Preloader.tsx. */}
        <script dangerouslySetInnerHTML={{ __html: preloaderFlagScript }} />

        {/*
          Framer Motion serialises each element's `initial` variant as an
          inline style, so a page ships dozens of nodes reading `opacity: 0`,
          waiting on a scroll observer that never arrives without JS. Left
          alone that is a blank page. This resets them to the finished state,
          scoped to <noscript> so it costs nothing when scripts do run.
        */}
        <noscript>
          <style>{`
            [style*="opacity:0"],
            [style*="opacity: 0"],
            [style*="translateY"],
            [style*="translateX"],
            [style*="blur("] {
              opacity: 1 !important;
              filter: none !important;
              transform: none !important;
              clip-path: none !important;
            }
          `}</style>
        </noscript>
      </head>
      <body>
        <LocaleProvider locale={locale}>
          <Providers>
            <SiteChrome>{children}</SiteChrome>
          </Providers>
        </LocaleProvider>
      </body>
    </html>
  );
}
