"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Zap, Gem, ScanEye, Handshake } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const valueIcons = [Zap, Gem, ScanEye, Handshake];

// Drop logo files here and they render automatically.
// Any company without a matching file falls back to a text label.
// Heights are per logo because the source images have different aspect
// ratios (square marks read smaller than wide wordmarks at equal height).
const companyLogos: Record<string, { src: string; heightClass: string }> = {
  Meta: { src: "/logos/meta.png", heightClass: "h-12" },
  Bosch: { src: "/logos/bosch.png", heightClass: "h-12" },
  Woven: { src: "/logos/woven.png", heightClass: "h-12" },
  Toyota: { src: "/logos/toyota.png", heightClass: "h-9" },
};

const CompanyLogo = ({ name }: { name: string }) => {
  const logo = companyLogos[name];
  const [failed, setFailed] = useState(false);

  if (!logo || failed) {
    return (
      <span className="px-3 py-1.5 rounded-lg border border-border/60 bg-card text-sm font-medium text-foreground/70">
        {name}
      </span>
    );
  }

  return (
    <img
      src={logo.src}
      alt={name}
      className={cn(
        "w-auto object-contain grayscale opacity-60 mix-blend-multiply transition-opacity duration-300 hover:opacity-90",
        logo.heightClass
      )}
      onError={() => setFailed(true)}
    />
  );
};

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t, locale } = useTranslation();
  const companies: string[] = (t.about as any).companies ?? [];
  const companiesLabel: string = (t.about as any).companiesLabel ?? "";

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
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              {t.about.paragraph2}
            </p>

            {/* Company credibility */}
            <div>
              <p className="text-xs font-medium text-muted-foreground/60 uppercase tracking-widest mb-3">
                {companiesLabel}
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                {companies.map((name) => (
                  <CompanyLogo key={name} name={name} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — 4-value grid */}
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
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
                  className="p-5 rounded-2xl bg-card border border-border/50"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif font-semibold text-foreground leading-snug mb-2">
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
