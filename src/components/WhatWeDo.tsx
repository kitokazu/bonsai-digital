"use client";

import { motion } from "framer-motion";
import { Bot, Check, Globe, Wrench } from "lucide-react";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Magnetic } from "@/components/motion/Magnetic";
import { TransitionLink } from "@/components/nav/TransitionLink";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";
import { fadeRise, STAGGER, viewportOnce } from "@/lib/motion";
import { cn, textAlign } from "@/lib/utils";

const bucketIcons = [Globe, Bot, Wrench];

const WhatWeDo = () => {
  const { t, locale } = useTranslation();

  return (
    <section id="services" className="section-padding bg-secondary/20">
      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow={t.whatWeDo.label}
          heading={t.whatWeDo.heading}
          lede={t.whatWeDo.description}
          className="mb-16"
        />

        {/* Pricing cards — subgrid keeps header, description, price, CTA, and
            checklist rows aligned across all three cards on desktop */}
        <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto items-stretch">
          {t.whatWeDo.buckets.map((bucket, index) => {
            const Icon = bucketIcons[index];
            const dark = index === 2;
            return (
              <motion.div
                key={bucket.title}
                variants={fadeRise}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                transition={{ delay: index * STAGGER.loose }}
                className={cn(
                  "rounded-[1.75rem] p-8 shadow-sm flex flex-col gap-6 lg:grid lg:grid-rows-subgrid lg:row-span-5",
                  "transition-shadow duration-500 hover:shadow-[var(--card-shadow-hover)]",
                  dark
                    ? "bg-foreground text-background"
                    : "bg-card text-foreground border border-border/60"
                )}
              >
                {/* Icon, title, tagline */}
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                      dark ? "bg-background/10" : "bg-primary/10"
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-5 h-5",
                        dark ? "text-background" : "text-primary"
                      )}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-serif font-bold leading-tight">
                      {bucket.title}
                    </h3>
                    <p
                      className={cn(
                        "text-sm mt-1",
                        dark ? "text-background/60" : "text-muted-foreground"
                      )}
                    >
                      {bucket.tagline}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p
                  className={cn(
                    "text-[0.95rem] leading-relaxed",
                    dark ? "text-background/70" : "text-muted-foreground"
                  )}
                >
                  {bucket.description}
                </p>

                {/* Price */}
                <div className="lg:self-end">
                  <p
                    className={cn(
                      "text-xs font-medium uppercase tracking-widest mb-2",
                      dark ? "text-background/50" : "text-muted-foreground/70"
                    )}
                  >
                    {bucket.priceLabel}
                  </p>
                  <p
                    className={cn(
                      "text-4xl md:text-[2.75rem] font-semibold tracking-tight tabular-nums leading-none",
                      dark ? "text-[hsl(150,32%,58%)]" : "text-primary"
                    )}
                  >
                    {bucket.price}
                  </p>
                </div>

                {/* CTA */}
                <Magnetic className="w-full">
                  <Button
                    asChild
                    variant={dark ? "default" : "outline"}
                    size="lg"
                    className={cn(
                      "w-full",
                      dark &&
                        "bg-background text-foreground hover:bg-background/90"
                    )}
                  >
                    <TransitionLink href="/contact">
                      {t.whatWeDo.cta}
                    </TransitionLink>
                  </Button>
                </Magnetic>

                {/* What's included */}
                <div
                  className={cn(
                    "pt-6 border-t",
                    dark ? "border-background/15" : "border-border/60"
                  )}
                >
                  <p className="text-sm font-medium mb-4">
                    {t.whatWeDo.includedLabel}
                  </p>
                  <ul className="space-y-3">
                    {bucket.features.map((feature) => (
                      <li
                        key={feature}
                        className={cn(
                          "flex items-start gap-3 text-sm leading-relaxed",
                          dark ? "text-background/75" : "text-muted-foreground"
                        )}
                      >
                        <Check
                          className={cn(
                            "w-4 h-4 mt-0.5 shrink-0",
                            dark ? "text-background/80" : "text-primary"
                          )}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Pricing footnote */}
        <p
          className={cn(
            "max-w-5xl mx-auto mt-8 text-sm text-muted-foreground/80 leading-relaxed",
            textAlign(locale)
          )}
        >
          {t.whatWeDo.footnote}
        </p>
      </div>
    </section>
  );
};

export default WhatWeDo;
