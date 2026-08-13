"use client";

import { Gem, Handshake, ScanEye, Zap } from "lucide-react";
import { useState } from "react";

import { MaskHeading } from "@/components/motion/MaskHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { useTranslation } from "@/lib/i18n";
import { STAGGER } from "@/lib/motion";
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
        logo.heightClass,
      )}
      onError={() => setFailed(true)}
    />
  );
};

const About = () => {
  const { t } = useTranslation();
  const companies = t.about.companies;
  const companiesLabel = t.about.companiesLabel;

  return (
    <section id="about" className="section-padding bg-primary/5">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left, intro */}
          <div>
            <Reveal as="span" className="type-eyebrow mb-4" blur={false}>
              {t.about.label}
            </Reveal>

            <MaskHeading
              text={t.about.heading}
              className="type-h2 mb-6 text-foreground"
            />

            <Reveal delay={0.1}>
              <p className="type-lede mb-6">{t.about.paragraph1}</p>
              <p className="type-lede mb-10">{t.about.paragraph2}</p>
            </Reveal>

            {/* Company credibility */}
            <Reveal delay={0.2} blur={false}>
              <p className="text-xs font-medium text-muted-foreground/60 uppercase tracking-widest mb-3">
                {companiesLabel}
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                {companies.map((name) => (
                  <CompanyLogo key={name} name={name} />
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right, the four values */}
          <RevealGroup
            as="ul"
            each={STAGGER.loose}
            delayChildren={0.1}
            className="grid grid-cols-2 gap-4"
          >
            {t.about.values.map((value, index) => {
              const Icon = valueIcons[index];
              return (
                <RevealItem
                  as="li"
                  key={value.title}
                  className="group p-5 rounded-2xl bg-card border border-border/50 transition-colors duration-300 hover:border-primary/30"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="type-h3 text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
};

export default About;
