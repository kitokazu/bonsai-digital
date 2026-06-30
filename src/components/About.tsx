"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Gem, Users, Handshake, ScanEye, TrendingUp } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const valueIcons = [Zap, Gem, Users, Handshake, ScanEye, TrendingUp];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t, locale } = useTranslation();

  return (
    <section id="about" className="section-padding bg-primary/5">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — intro */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.6 }}
          >
            <span
              className={cn(
                "text-primary text-sm font-medium tracking-wider uppercase mb-4 block",
                locale === "ja" && "text-base"
              )}
            >
              {t.about.label}
            </span>
            <h2
              className={cn(
                "text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 leading-tight",
                locale === "ja" && "md:text-[2.6rem]"
              )}
            >
              {t.about.heading}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              {t.about.paragraph1}
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t.about.paragraph2}
            </p>
          </motion.div>

          {/* Right — 6-value grid */}
          <div className="grid grid-cols-2 gap-4">
            {t.about.values.map((value, index) => {
              const Icon = valueIcons[index];
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
                  }
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.07 }}
                  className={cn(
                    "p-5 rounded-2xl bg-card border border-border/50",
                    locale === "ja" ? "text-left" : ""
                  )}
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="text-base font-serif font-semibold text-foreground mb-1.5">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
