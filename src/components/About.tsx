"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Leaf, Target, Heart } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

const valueIcons = [Leaf, Target, Heart];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useTranslation();

  return (
    <section id="about" className="section-padding bg-primary/5">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
              {t.about.label}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
              {t.about.heading}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              {t.about.paragraph1}
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t.about.paragraph2}
            </p>
          </motion.div>

          {/* Right - Values */}
          <div className="space-y-6">
            {t.about.values.map((value, index) => {
              const Icon = valueIcons[index];
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, x: 40 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="flex gap-5 p-6 rounded-2xl bg-card border border-border/50 card-elevated"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-semibold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
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
