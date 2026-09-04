import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "ja"];

/**
 * The extensions public/ actually ships. Deliberately not a general "has a
 * dot" test: everything else lives under /_next, which is skipped above, and
 * a list that reaches wider just hands 200s back to paths that do not exist.
 */
const ASSET_FILE =
  /\.(?:avif|ico|jpe?g|json|mp4|png|svg|webm|webmanifest|webp|woff2?)$/i;

/** Routes Next generates itself, which have no page to rewrite to. */
const METADATA_ROUTES = new Set(["/robots.txt", "/sitemap.xml"]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname already starts with a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  if (pathname.startsWith("/_next") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Real files, served as they are. This used to skip anything with a dot in
  // it, which meant every made-up path ending in an extension slipped past
  // the rewrite, found no route, and came back as the 404 page under a 200.
  // Google reads that as a real page: asked for /sitemap_index.xml it got
  // HTML and a success code, and reported the sitemap as HTML. Matching on
  // the extensions we actually ship sends the rest through the rewrite, where
  // a missing page 404s like any other.
  if (ASSET_FILE.test(pathname) || METADATA_ROUTES.has(pathname)) {
    return NextResponse.next();
  }

  // Rewrite to /en for default locale (no redirect, URL stays clean)
  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
