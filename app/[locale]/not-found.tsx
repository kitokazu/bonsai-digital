"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n";

export default function NotFound() {
  const { t, locale } = useTranslation();
  const homeHref = locale === "en" ? "/" : "/ja";

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">{t.notFound.title}</h1>
        <p className="mb-4 text-xl text-muted-foreground">
          {t.notFound.message}
        </p>
        <Link
          href={homeHref}
          className="text-primary underline hover:text-primary/90"
        >
          {t.notFound.link}
        </Link>
      </div>
    </div>
  );
}
