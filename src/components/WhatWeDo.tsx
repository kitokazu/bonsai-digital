"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Bot, Check, Globe, Wrench } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const bucketIcons = [Globe, Bot, Wrench];

const WhatWeDo = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });
  const { t, locale } = useTranslation();
  const contactHref = locale === "en" ? "/contact" : "/ja/contact";

  return (
    <section id="services" className="section-padding bg-secondary/20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className={cn(
            "max-w-2xl mx-auto mb-16",
            locale === "ja" ? "text-left" : "text-center"
          )}
        >
          <span
            className={cn(
              "text-primary text-sm font-medium tracking-wider uppercase mb-4 block",
              locale === "ja" && "text-base"
            )}
          >
            {t.whatWeDo.label}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            {t.whatWeDo.heading}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {t.whatWeDo.description}
          </p>
        </motion.div>

        {/* Pricing cards — subgrid keeps header, description, price, CTA, and
            checklist rows aligned across all three cards on desktop */}
        <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto items-stretch">
          {t.whatWeDo.buckets.map((bucket, index) => {
            const Icon = bucketIcons[index];
            const dark = index === 2;
            return (
              <motion.div
                key={bucket.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className={cn(
                  "rounded-[1.75rem] p-8 shadow-sm flex flex-col gap-6 lg:grid lg:grid-rows-subgrid lg:row-span-5",
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
                  <Link href={contactHref}>{t.whatWeDo.cta}</Link>
                </Button>

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
            locale === "ja" ? "text-left" : "text-center"
          )}
        >
          {t.whatWeDo.footnote}
        </p>
      </div>
    </section>
  );
};

export default WhatWeDo;
