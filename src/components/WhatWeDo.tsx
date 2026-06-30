"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, Wrench } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const bucketIcons = [Globe, Wrench];

const WhatWeDo = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });
  const { t, locale } = useTranslation();

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

        {/* Bucket cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {t.whatWeDo.buckets.map((bucket, index) => {
            const Icon = bucketIcons[index];
            return (
              <motion.div
                key={bucket.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className="p-px rounded-[1.75rem] bg-gradient-to-br from-border/60 to-border/20 shadow-sm"
              >
                {/* Inner card */}
                <div
                  className={cn(
                    "relative overflow-hidden rounded-[1.625rem] bg-card p-8 md:p-10 h-full",
                    "shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]"
                  )}
                >
                  {/* Subtle gradient accent */}
                  <div
                    className={cn(
                      "absolute inset-0 pointer-events-none bg-gradient-to-br opacity-50",
                      index === 0
                        ? "from-primary/6 to-transparent"
                        : "from-accent/6 to-transparent"
                    )}
                  />

                  <div className="relative">
                    {/* Icon */}
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-8">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">
                      {bucket.title}
                    </h3>

                    {/* Description */}
                    <p
                      className={cn(
                        "text-muted-foreground leading-relaxed mb-8",
                        locale === "ja" ? "text-base" : "text-base"
                      )}
                    >
                      {bucket.description}
                    </p>

                    {/* Tag chips */}
                    <div className="flex flex-wrap gap-2">
                      {bucket.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-medium text-foreground/55 border border-border/80 rounded-full px-3 py-1 bg-background/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
