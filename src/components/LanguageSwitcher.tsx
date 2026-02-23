"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n";

export default function LanguageSwitcher({ className }: { className?: string }) {
  const { locale } = useTranslation();

  const otherLocale = locale === "en" ? "ja" : "en";
  const href = locale === "en" ? "/ja" : "/";

  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/50 text-sm font-medium text-foreground/70 hover:text-foreground hover:border-primary/30 transition-all ${className ?? ""}`}
    >
      <span className={locale === "en" ? "text-foreground" : "text-foreground/40"}>
        EN
      </span>
      <span className="text-foreground/30">|</span>
      <span className={locale === "ja" ? "text-foreground" : "text-foreground/40"}>
        日本語
      </span>
    </Link>
  );
}
