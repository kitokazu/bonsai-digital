"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const FreeSample = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { t, locale } = useTranslation();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-foreground border-y border-primary/20 py-12 md:py-16"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/8 rounded-full blur-3xl pointer-events-none" />

      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      <div className="relative z-10 container mx-auto px-6">
        <div className={cn("max-w-3xl", locale === "ja" ? "" : "mx-auto text-center")}>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className={cn(
              "mb-6 flex items-center gap-3",
              locale === "ja" ? "" : "justify-center"
            )}
          >
            {locale !== "ja" && <span className="h-px w-8 bg-primary/50" />}
            <span className="text-primary text-sm font-medium tracking-widest uppercase">
              {t.freeSample.eyebrow}
            </span>
            {locale !== "ja" && <span className="h-px w-8 bg-primary/50" />}
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-background leading-[1.1] mb-6"
          >
            {t.freeSample.heading}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={cn(
              "text-background/55 text-lg leading-relaxed mb-10",
              locale === "ja" ? "" : "max-w-xl mx-auto"
            )}
          >
            {t.freeSample.description}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={cn(locale === "ja" ? "" : "flex justify-center")}
          >
            <Button
              variant="hero"
              onClick={() => scrollToSection("#contact")}
              className="group"
            >
              {t.freeSample.cta}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FreeSample;
