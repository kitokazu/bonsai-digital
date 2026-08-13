"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

import { useTransitionRouter } from "@/components/providers/TransitionProvider";
import { useTranslation } from "@/lib/i18n";
import { localizedPath } from "@/lib/locale-path";

interface TransitionLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  /**
   * A locale-neutral path (`/work`, `/contact`), a section anchor (`#about`),
   * or an external URL. Internal paths pick up the active locale here, so call
   * sites never build `/ja/...` by hand.
   */
  href: string;
  children: ReactNode;
  prefetch?: boolean;
}

const isExternal = (href: string) =>
  /^(https?:|mailto:|tel:)/.test(href);

/**
 * Internal link that routes through the curtain transition.
 *
 * Still a real `<Link>`, so prefetching, middle-click, "open in new tab" and
 * crawlers all behave normally. The click handler only takes over for plain
 * left-clicks, which is the one case where we want to animate first.
 *
 * Section anchors resolve against the home page: `#about` scrolls when you are
 * already home and routes to the localized home page otherwise, so the same
 * link works in the navbar on every route.
 */
export function TransitionLink({
  href,
  children,
  onClick,
  prefetch,
  ...rest
}: TransitionLinkProps) {
  const { navigate } = useTransitionRouter();
  const { locale } = useTranslation();
  const pathname = usePathname() ?? "/";

  if (isExternal(href)) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }

  const resolved = href.startsWith("#")
    ? `${localizedPath("/", locale)}${href}`
    : localizedPath(href, locale);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    // Let the browser own anything that is not a plain left-click.
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      rest.target === "_blank"
    ) {
      return;
    }

    event.preventDefault();
    navigate(resolved);
  };

  // English lives at the root, so `/` and `/en` are the same page. The
  // rewrite in middleware.ts keeps the URL clean either way.
  const current =
    pathname === resolved ||
    (locale === "en" && pathname === `/en${resolved === "/" ? "" : resolved}`);

  return (
    <Link
      href={resolved}
      onClick={handleClick}
      prefetch={prefetch}
      aria-current={current && !href.startsWith("#") ? "page" : undefined}
      {...rest}
    >
      {children}
    </Link>
  );
}
