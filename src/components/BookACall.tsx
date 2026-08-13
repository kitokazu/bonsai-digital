"use client";

import { ArrowRight, CalendarDays } from "lucide-react";

import { Magnetic } from "@/components/motion/Magnetic";
import { MaskHeading } from "@/components/motion/MaskHeading";
import { Reveal } from "@/components/motion/Reveal";
import { TransitionLink } from "@/components/nav/TransitionLink";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";
import { cn, textAlign } from "@/lib/utils";

const BookACall = () => {
  const { t, locale } = useTranslation();

  return (
    <section className="relative overflow-hidden border-y border-primary/20 bg-foreground py-20 md:py-28">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div
        className={cn(
          "container relative z-10 mx-auto px-6",
          textAlign(locale),
        )}
      >
        {/* inline-flex, so the section's text-align places it. */}
        <Reveal
          as="span"
          blur={false}
          className="mb-6 inline-flex items-center gap-2"
        >
          <CalendarDays className="h-4 w-4 text-primary" />
          <span className="type-eyebrow inline">{t.bookACall.eyebrow}</span>
        </Reveal>

        <MaskHeading
          text={t.bookACall.heading}
          delay={0.08}
          className="type-h1 mb-6 text-background"
        />

        <Reveal delay={0.16}>
          <p
            className={cn(
              "mb-10 max-w-xl text-lg leading-relaxed text-background/55",
              locale === "ja" ? "" : "mx-auto",
            )}
          >
            {t.bookACall.description}
          </p>

          <div
            className={cn(
              "flex flex-col gap-4 sm:flex-row",
              locale === "ja"
                ? "items-start"
                : "items-center justify-center",
            )}
          >
            <Magnetic>
              <Button asChild variant="hero" className="group">
                <TransitionLink href="/contact">
                  {t.bookACall.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </TransitionLink>
              </Button>
            </Magnetic>
            <TransitionLink
              href="/contact"
              className="text-sm font-medium text-background/50 underline underline-offset-4 transition-colors hover:text-background/80"
            >
              {t.bookACall.ctaAlt}
            </TransitionLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default BookACall;
