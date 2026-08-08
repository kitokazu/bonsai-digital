import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Providers from "../providers";
import { LocaleProvider } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
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

const descriptions: Record<Locale, string> = {
  en: "Japan-based digital agency cultivating your digital growth. We craft websites and applications with precision and care.",
  ja: "日本拠点のデジタルスタジオ。ウェブサイトからアプリケーションまで、ビジネスに本当に役立つデジタルプロダクトを丁寧に設計し、形にします。",
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
    <html
      lang={locale}
      className={`${cormorantGaramond.variable} ${inter.variable}`}
    >
      <body>
        <Providers>
          <LocaleProvider locale={locale}>{children}</LocaleProvider>
        </Providers>
      </body>
    </html>
  );
}
