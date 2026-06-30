"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const Process = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });
  const { t, locale } = useTranslation();

  return (
    <section id="process" className="section-padding bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className={cn(
            "max-w-2xl mx-auto mb-20",
            locale === "ja" ? "text-left" : "text-center"
          )}
        >
          <span
            className={cn(
              "text-primary text-sm font-medium tracking-wider uppercase mb-4 block",
              locale === "ja" && "text-base"
            )}
          >
            {t.process.label}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
            {t.process.heading}
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connector line — desktop only, behind the circles */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-8 left-[calc(12.5%+2rem)] right-[calc(12.5%+2rem)] h-px bg-border/60"
          />

          <div className="grid md:grid-cols-4 gap-10 md:gap-6">
            {t.process.steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  locale === "ja" ? "text-left" : "text-center"
                )}
              >
                {/* Step number bubble */}
                <div
                  className={cn(
                    "relative z-10 w-16 h-16 rounded-full border border-border bg-background flex items-center justify-center mb-6 shadow-sm",
                    locale === "ja" ? "" : "mx-auto"
                  )}
                >
                  <span className="text-2xl font-serif font-semibold text-primary">
                    {index + 1}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-lg font-serif font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
