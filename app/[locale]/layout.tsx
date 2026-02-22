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

export const metadata: Metadata = {
  title: "Bonsai Digital",
  description:
    "Japan-based digital agency cultivating your digital growth. We craft websites and applications with precision and care.",
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Bonsai Digital",
    description:
      "Japan-based digital agency cultivating your digital growth. We craft websites and applications with precision and care.",
    type: "website",
  },
};

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
