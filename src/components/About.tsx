"use client";

import { Code2, ScanEye, Zap } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { MaskHeading } from "@/components/motion/MaskHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ClipReveal } from "@/components/motion/ScrollEffects";
import { useTranslation } from "@/lib/i18n";
import { STAGGER } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Swap this for a different file and it picks it up. If the file is missing
 * the monogram below stands in, so the layout is complete either way rather
 * than showing a broken image.
 *
 * Wants a portrait crop with the face in the upper third; `object-position`
 * below is tuned to the current file.
 */
const PORTRAIT_SRC = "/park_headshot.jpg";

const valueIcons = [Zap, Code2, ScanEye];

// Drop logo files here and they render automatically.
// Any company without a matching file falls back to a text label.
// Heights are per logo because the source images have different aspect
// ratios (square marks read smaller than wide wordmarks at equal height).
const companyLogos: Record<string, { src: string; heightClass: string }> = {
  Meta: { src: "/logos/meta.png", heightClass: "h-12" },
  Bosch: { src: "/logos/bosch.png", heightClass: "h-12" },
  Woven: { src: "/logos/woven.png", heightClass: "h-12" },
  Toyota: { src: "/logos/toyota.png", heightClass: "h-9" },
  トヨタ: { src: "/logos/toyota.png", heightClass: "h-9" },
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

  /* Full colour, not the old 60% grayscale. These four marks are the one piece
     of credibility on the page a competitor cannot copy, so they are shown
     rather than whispered.
     `mix-blend-multiply` still has to stay: the source PNGs are matted on
     white, which reads as a white rectangle against the cream section. */
  return (
    <img
      src={logo.src}
      alt={name}
      className={cn(
        "w-auto object-contain opacity-90 mix-blend-multiply transition-opacity duration-300 hover:opacity-100",
        logo.heightClass,
      )}
      onError={() => setFailed(true)}
    />
  );
};

const Portrait = ({ alt }: { alt: string }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="flex aspect-[4/5] w-full items-center justify-center rounded-2xl border border-border/60 bg-secondary/40"
        aria-hidden="true"
      >
        <span className="font-serif text-6xl text-primary/25">BD</span>
      </div>
    );
  }

  return (
    <Image
      src={PORTRAIT_SRC}
      alt={alt}
      width={800}
      height={1000}
      className="aspect-[4/5] w-full rounded-2xl border border-border/60 object-cover object-[38%_18%]"
      onError={() => setFailed(true)}
      priority={false}
    />
  );
};

interface AboutProps {
  /**
   * `section` is the condensed block on the home page. `page` adds the longer
   * story, and exists because /about used to render the home block verbatim,
   * which gave the page no reason to be a page.
   */
  variant?: "section" | "page";
}

const About = ({ variant = "section" }: AboutProps) => {
  const { t } = useTranslation();
  const isPage = variant === "page";

  return (
    <section
      id="about"
      className={cn("section-padding bg-primary/5", isPage && "pt-32")}
    >
      <div className="container mx-auto px-6">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_minmax(0,22rem)] lg:gap-16">
          {/* Left, the story */}
          <div className="order-2 lg:order-1">
            <Reveal as="span" className="type-eyebrow mb-4" blur={false}>
              {t.about.label}
            </Reveal>

            <MaskHeading
              as={isPage ? "h1" : "h2"}
              text={t.about.heading}
              className={cn(
                "mb-8 text-foreground",
                isPage ? "type-h1" : "type-h2",
              )}
            />

            <Reveal delay={0.1}>
              <p className="type-lede mb-5">{t.about.paragraph1}</p>
              <p className="type-lede">{t.about.paragraph2}</p>
            </Reveal>

            {isPage && (
              <Reveal delay={0.15} className="mt-10">
                <p className="type-eyebrow mb-3">{t.about.storyLabel}</p>
                <p className="type-lede border-l-2 border-primary/30 pl-6">
                  {t.about.story}
                </p>
              </Reveal>
            )}

            {/* Credentials, promoted out of the footnote they used to be */}
            <Reveal delay={0.2} blur={false} className="mt-12">
              <p className="type-eyebrow mb-5">{t.about.companiesLabel}</p>
              <RevealGroup
                as="ul"
                each={STAGGER.tight}
                className="flex flex-wrap items-center gap-x-9 gap-y-5"
              >
                {t.about.companies.map((name) => (
                  <RevealItem as="li" key={name}>
                    <CompanyLogo name={name} />
                  </RevealItem>
                ))}
              </RevealGroup>
            </Reveal>
          </div>

          {/* Right, the person */}
          <Reveal
            as="figure"
            blur={false}
            delay={0.1}
            className="order-1 lg:sticky lg:top-28 lg:order-2"
          >
            <ClipReveal from={6} radius={16}>
              <Portrait alt={t.about.portraitAlt} />
            </ClipReveal>
            <figcaption className="mt-4">
              <p className="font-serif text-xl text-foreground">
                {t.about.name}
              </p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {t.about.role}
              </p>
            </figcaption>
          </Reveal>
        </div>

        {/*
          Three, not the previous four. "Long-term partnership" said the same
          thing as paragraph3 above, and "Quality" plus "User experience" were
          two ways of claiming care, so they are folded into one claim that
          names who it is actually for. Each of these three is checkable,
          which is the difference between a differentiator and a virtue.
        */}
        <div className="mt-20 border-t border-border/60 pt-12">
          <Reveal as="p" blur={false} className="type-eyebrow mb-8">
            {t.about.valuesLabel}
          </Reveal>

          <RevealGroup
            as="ul"
            each={STAGGER.loose}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {t.about.values.map((value, index) => {
              const Icon = valueIcons[index];
              return (
                <RevealItem
                  as="li"
                  key={value.title}
                  className="group rounded-2xl border border-border/50 bg-card p-6 transition-colors duration-300 hover:border-primary/30"
                >
                  <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="type-h3 mb-2 text-foreground">{value.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
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
