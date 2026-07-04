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

// Drop screenshots into public/process/ with these names and they render
// automatically. A missing file falls back to the icon placeholder.
const stepImages = [
  "/process/meeting.jpeg",
  "/process/mvp.png",
  "/process/iterate.png",
  "/process/deployed.jpeg",
];

const stepIcons: LucideIcon[] = [
  MessagesSquare,
  MonitorSmartphone,
  PenLine,
  Rocket,
];

// The section background sweeps through the brand palette as the deck
// scrolls: page cream, warm sand, sage, terracotta, dark slate.
const bgStops = [0, 0.3, 0.55, 0.8, 1];
const bgColors = [
  "hsla(40, 30%, 97%, 1)",
  "hsla(35, 24%, 88%, 1)",
  "hsla(150, 18%, 80%, 1)",
  "hsla(15, 32%, 82%, 1)",
  "hsla(200, 15%, 20%, 1)",
];

type Step = { label: string; title: string; description: string };

const StepImage = ({ index, title }: { index: number; title: string }) => {
  const [failed, setFailed] = useState(false);
  const Icon = stepIcons[index % stepIcons.length];

  if (failed) {
    return (
      <div className="w-full aspect-[4/3] rounded-2xl border border-dashed border-border/70 bg-secondary/40 flex items-center justify-center">
        <Icon className="w-10 h-10 text-muted-foreground/50" />
      </div>
    );
  }

  return (
    <div className="w-full aspect-[4/3] rounded-2xl border border-border/50 bg-secondary/40 overflow-hidden shadow-lg">
      <img
        src={stepImages[index % stepImages.length]}
        alt={title}
        className="w-full h-full object-cover object-center"
        onError={() => setFailed(true)}
      />
    </div>
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
        <StepImage index={index} title={step.title} />
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

  return (
    <motion.section
      id="process"
      className="section-padding"
      style={{ backgroundColor }}
    >
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
