import Link from "next/link";
import { Cormorant_Garamond, Inter } from "next/font/google";

import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * Root 404, for a URL that matches no route at all.
 *
 * The localized `[locale]/not-found.tsx` only runs for `notFound()` called
 * inside that segment, so an unknown top-level path used to land on Next's
 * unstyled default page. This one has to supply its own `<html>`: the root
 * layout passes children straight through, since the locale layout is what
 * normally owns the document.
 *
 * Bilingual rather than locale-aware, because there is no locale segment to
 * read on a path that matched nothing.
 */
export default function NotFound() {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${inter.variable}`}
    >
      <body className="flex min-h-screen items-center justify-center px-6">
        <main className="max-w-md text-center">
          <p className="type-eyebrow mb-4">404</p>

          <h1 className="type-h1 mb-4 text-foreground">Page not found</h1>
          <p className="type-lede mb-2">
            The page you are looking for has moved or no longer exists.
          </p>
          <p lang="ja" className="type-lede mb-8">
            お探しのページは移動したか、存在しません。
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-semibold">
            <Link href="/" className="text-primary hover:underline">
              Back to home
            </Link>
            <Link href="/ja" lang="ja" className="text-primary hover:underline">
              ホームに戻る
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
