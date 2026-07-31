"use client";

import {
  motion,
  useInView,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, useState } from "react";
import {
  MessagesSquare,
  MonitorSmartphone,
  PenLine,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import ProcessBonsai from "@/components/ProcessBonsai";

// Real client work, in step order: the site a client came to us with, the
// working demo from the first meeting, the pages we refined together, and a
// product that is live today.
const stepImages = [
  "/cg-online-academy/cg-before.png",
  "/cg-online-academy/cg-landing.png",
  "/cg-online-academy/cg-course-module.png",
  "/uncharted/dashboard.png",
];

const stepIcons: LucideIcon[] = [
  MessagesSquare,
  MonitorSmartphone,
  PenLine,
  Rocket,
];

// As the deck scrolls, the base surface drifts through tones derived from the
// brand tokens: cream, warm sand, a sage wash, and soft clay. Everything stays
// light so the cards keep the focus.
const bgStops = [0, 0.35, 0.7, 1];
const bgColors = [
  "hsla(40, 30%, 97%, 1)",
  "hsla(36, 32%, 88%, 1)",
  "hsla(150, 22%, 85%, 1)",
  "hsla(28, 32%, 86%, 1)",
];

// Washi-style grain, tiled at very low opacity over the whole section.
const grainTexture = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`;

type Step = {
  label: string;
  title: string;
  description: string;
  caption?: string;
};

const StepImage = ({
  index,
  title,
  caption,
}: {
  index: number;
  title: string;
  caption?: string;
}) => {
  const [failed, setFailed] = useState(false);
  const { locale } = useTranslation();
  const Icon = stepIcons[index % stepIcons.length];

  if (failed) {
    return (
      <div className="w-full aspect-[4/3] rounded-2xl border border-dashed border-border/70 bg-secondary/40 flex items-center justify-center">
        <Icon className="w-10 h-10 text-muted-foreground/50" />
      </div>
    );
  }

  return (
    <figure className="w-full">
      <div className="rounded-2xl border border-border/60 bg-secondary/40 overflow-hidden shadow-lg">
        {/* Slim browser bar so the screenshots read as real, live pages */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-secondary/80 border-b border-border/50">
          <span className="w-2 h-2 rounded-full bg-foreground/15" />
          <span className="w-2 h-2 rounded-full bg-foreground/15" />
          <span className="w-2 h-2 rounded-full bg-foreground/15" />
        </div>
        <div className="aspect-video overflow-hidden">
          <img
            src={stepImages[index % stepImages.length]}
            alt={title}
            className="w-full h-full object-cover object-top"
            onError={() => setFailed(true)}
          />
        </div>
      </div>
      {caption && (
        <figcaption
          className={cn(
            "mt-3 text-sm text-muted-foreground",
            locale === "ja" ? "text-left" : "text-center"
          )}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

const StepCard = ({
  step,
  index,
  total,
  progress,
}: {
  step: Step;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) => {
  // Cards already covered by later ones ease back slightly, so the deck
  // reads as layers rather than a hard swap.
  const targetScale = 1 - (total - 1 - index) * 0.05;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  const StepIcon = stepIcons[index % stepIcons.length];

  return (
    <div className="sticky" style={{ top: `calc(6rem + ${index * 1.5}rem)` }}>
      <motion.div
        style={{ scale }}
        className={cn(
          "origin-top rounded-[1.75rem] p-8 md:p-14 min-h-[420px] md:min-h-[560px]",
          "grid md:grid-cols-2 gap-8 md:gap-12 items-center",
          "bg-card text-foreground border border-border/50 shadow-[var(--card-shadow-hover)]"
        )}
      >
        {/* Text */}
        <div className="flex flex-col justify-start gap-8 h-full">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <StepIcon className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm font-medium uppercase tracking-widest text-primary">
              {step.label}
            </span>
          </div>

          <div>
            <h3 className="font-serif text-2xl md:text-4xl font-bold mb-4">
              {step.title}
            </h3>
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
              {step.description}
            </p>
          </div>
        </div>

        {/* Screenshot */}
        <StepImage index={index} title={step.title} caption={step.caption} />
      </motion.div>
    </div>
  );
};

const Process = () => {
  const headerRef = useRef(null);
  const stackRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });
  const { t, locale } = useTranslation();
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });
  const backgroundColor = useTransform(scrollYProgress, bgStops, bgColors);

  // Two soft ink-wash fields drift beneath the cards and trade prominence as
  // the deck progresses: sage carries the early steps, terracotta the later
  // ones. Both come straight from the brand tokens.
  const sageY = useTransform(scrollYProgress, [0, 1], ["-12%", "50%"]);
  const sageOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 0.5, 0.1]);
  const clayY = useTransform(scrollYProgress, [0, 1], ["55%", "-8%"]);
  const clayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.4, 0.65]);

  return (
    <motion.section
      id="process"
      className="section-padding relative"
      style={{ backgroundColor }}
    >
      {/* Atmosphere layer. Kept as a clipped sibling of the content so the
          sticky cards are unaffected by its overflow-hidden. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <motion.div
          style={{
            y: sageY,
            opacity: sageOpacity,
            background:
              "radial-gradient(closest-side, hsl(150 25% 35% / 0.5), transparent 70%)",
          }}
          className="absolute -left-[18%] top-0 w-[70vw] max-w-[900px] aspect-square rounded-full will-change-transform"
        />
        <motion.div
          style={{
            y: clayY,
            opacity: clayOpacity,
            background:
              "radial-gradient(closest-side, hsl(22 42% 48% / 0.4), transparent 70%)",
          }}
          className="absolute -right-[20%] bottom-0 w-[75vw] max-w-[960px] aspect-square rounded-full will-change-transform"
        />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: grainTexture }}
        />
      </div>

      {/* A bonsai sketches itself in across the whole background as the
          deck progresses. Sticky, so it grows in place while the cards
          scroll past and slip in front of it. Sibling of the clipped layer
          above: sticky breaks under overflow-hidden ancestors. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden min-[1360px]:block"
      >
        <div className="sticky top-0 h-screen">
          <ProcessBonsai progress={scrollYProgress} />
        </div>
      </div>

      <div className="container mx-auto px-6 relative">
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
            {t.process.label}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            {t.process.heading}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {t.process.description}
          </p>
        </motion.div>

        {/* Stacked step cards */}
        <div ref={stackRef} className="max-w-6xl mx-auto space-y-10 pb-8">
          {t.process.steps.map((step, index) => (
            <StepCard
              key={step.title}
              step={step}
              index={index}
              total={t.process.steps.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Process;
