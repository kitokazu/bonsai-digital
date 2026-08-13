"use client";

import Image from "next/image";
import { useState } from "react";

import { CountUp } from "@/components/motion/CountUp";
import { MaskHeading } from "@/components/motion/MaskHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ClipReveal } from "@/components/motion/ScrollEffects";
import { useTranslation } from "@/lib/i18n";
import { STAGGER } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { workProjects } from "@/lib/work";

/**
 * Drop a portrait here and it appears. Until then the monogram below stands in,
 * so the layout is complete either way rather than showing a broken image or a
 * person-shaped hole.
 *
 * Wants a squarish crop, roughly 1000px on the short edge.
 */
const PORTRAIT_SRC = "/portrait.jpg";

// Drop logo files here and they render automatically.
// Any company without a matching file falls back to a text label.
// Heights are per logo because the source images have different aspect
// ratios (square marks read smaller than wide wordmarks at equal height).
const companyLogos: Record<string, { src: string; heightClass: string }> = {
  Meta: { src: "/logos/meta.png", heightClass: "h-11" },
  Bosch: { src: "/logos/bosch.png", heightClass: "h-11" },
  Woven: { src: "/logos/woven.png", heightClass: "h-11" },
  Toyota: { src: "/logos/toyota.png", heightClass: "h-8" },
  トヨタ: { src: "/logos/toyota.png", heightClass: "h-8" },
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
        className="flex aspect-[4/5] w-full items-center justify-center border border-border/60 bg-secondary/40"
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
      className="aspect-[4/5] w-full object-cover"
      onError={() => setFailed(true)}
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

/**
 * About.
 *
 * Laid out as an editorial profile rather than a stack of cards: a narrow left
 * rail carrying the person and the countable facts, the argument at full width
 * beside it, and the three claims set in a hairline grid.
 *
 * Rounded cards with tinted icon chips are the shadcn default look, and they
 * read as a template. Rules and numerals do the same organising work while
 * looking like a decision.
 */
const About = ({ variant = "section" }: AboutProps) => {
  const { t } = useTranslation();
  const isPage = variant === "page";
  const facts = t.about.facts;

  return (
    <section
      id="about"
      className={cn("section-padding bg-primary/5", isPage && "pt-32")}
    >
      <div className="container mx-auto px-6">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,19rem)_1fr] lg:gap-20">
          {/* Left rail: the person, then what can be counted */}
          <div className="order-1">
            <Reveal blur={false} as="figure">
              <ClipReveal from={6} radius={2}>
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

            {/* Countable, not claimable. The project total comes straight from
                the work list, so it cannot drift out of date. */}
            <Reveal blur={false} delay={0.1} className="mt-10">
              <dl className="border-t border-border/60">
                <div className="flex items-baseline justify-between gap-5 border-b border-border/60 py-3.5">
                  <dt className="type-eyebrow">{facts.projectsLabel}</dt>
                  <dd className="text-sm font-medium tabular-nums text-foreground">
                    <CountUp value={workProjects.length} />
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-5 border-b border-border/60 py-3.5">
                  <dt className="type-eyebrow">{facts.languagesLabel}</dt>
                  <dd className="text-sm font-medium text-foreground">
                    {facts.languagesValue}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-5 border-b border-border/60 py-3.5">
                  <dt className="type-eyebrow">{facts.baseLabel}</dt>
                  <dd className="text-sm font-medium text-foreground">
                    {facts.baseValue}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          {/* Right: the argument */}
          <div className="order-2">
            <Reveal as="span" className="type-eyebrow mb-5" blur={false}>
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

            {/* Capped measure. The column is wide enough to run past 100
                characters a line otherwise, which is roughly double a
                comfortable read, and worse in Japanese where the glyphs are
                fixed width. The heading above is free to use the full width. */}
            <Reveal delay={0.1} className="max-w-[64ch]">
              <p className="type-lede mb-5">{t.about.paragraph1}</p>
              <p className="type-lede mb-5">{t.about.paragraph2}</p>
              <p className="type-lede">{t.about.paragraph3}</p>
            </Reveal>

            {isPage && (
              <Reveal delay={0.15} className="mt-10 max-w-[64ch]">
                <p className="type-eyebrow mb-3">{t.about.storyLabel}</p>
                <p className="type-lede border-l-2 border-primary/30 pl-6">
                  {t.about.story}
                </p>
              </Reveal>
            )}

            {/* Credentials, on a rule rather than in a footnote */}
            <Reveal
              delay={0.2}
              blur={false}
              className="mt-12 border-t border-border/60 pt-8"
            >
              <p className="type-eyebrow mb-6">{t.about.companiesLabel}</p>
              <RevealGroup
                as="ul"
                each={STAGGER.tight}
                className="flex flex-wrap items-center gap-x-10 gap-y-6"
              >
                {t.about.companies.map((name) => (
                  <RevealItem as="li" key={name}>
                    <CompanyLogo name={name} />
                  </RevealItem>
                ))}
              </RevealGroup>
            </Reveal>
          </div>
        </div>

        {/* The three claims, set as a table of rules. No cards and no icon
            chips: the numerals and the grid carry the structure, which reads
            as considered rather than assembled from a component library. */}
        <div className="mt-20">
          <Reveal as="p" blur={false} className="type-eyebrow mb-6">
            {t.about.valuesLabel}
          </Reveal>

          <RevealGroup
            as="ul"
            each={STAGGER.loose}
            className="grid border-l border-t border-border/60 sm:grid-cols-2 lg:grid-cols-3"
          >
            {t.about.values.map((value, index) => (
              <RevealItem
                as="li"
                key={value.title}
                className="border-b border-r border-border/60 p-7 transition-colors duration-300 hover:bg-card sm:min-h-[15rem]"
              >
                <b className="type-eyebrow mb-8 block font-normal tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </b>
                <h3 className="type-h3 mb-3 text-foreground">{value.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
};

export default About;
