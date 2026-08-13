"use client";

import { ArrowLeft } from "lucide-react";

import { MaskHeading } from "@/components/motion/MaskHeading";
import { Reveal } from "@/components/motion/Reveal";
import { TransitionLink } from "@/components/nav/TransitionLink";
import { useTranslation } from "@/lib/i18n";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-[80svh] items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <MaskHeading
          as="h1"
          trigger="mount"
          text={t.notFound.title}
          className="type-h1 mb-4 text-foreground"
        />
        <Reveal delay={0.15}>
          <p className="type-lede mb-8">{t.notFound.message}</p>
          <TransitionLink
            href="/"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {t.notFound.link}
          </TransitionLink>
        </Reveal>
      </div>
    </div>
  );
}
