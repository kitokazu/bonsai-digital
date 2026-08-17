"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Check,
  Languages,
  Laptop,
  ListChecks,
  Video,
} from "lucide-react";
import { TransitionLink } from "@/components/nav/TransitionLink";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { useTranslation } from "@/lib/i18n";
import { fadeRise, STAGGER, viewportOnce } from "@/lib/motion";
import { cn, textAlign } from "@/lib/utils";

const formatIcons = [Video, ListChecks, Laptop, Languages];

/* Placeholder visuals until real lesson screenshots are ready.
   Swap the frame contents for an <Image> of the actual class material. */

const ScreenshotFrame = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-xl overflow-hidden border border-border/60 shadow-sm">
    <div className="flex items-center gap-1.5 px-3 py-2 bg-secondary/70 border-b border-border/50">
      <span className="w-2 h-2 rounded-full bg-foreground/15" />
      <span className="w-2 h-2 rounded-full bg-foreground/15" />
      <span className="w-2 h-2 rounded-full bg-foreground/15" />
    </div>
    <div className="aspect-[16/10]">{children}</div>
  </div>
);

const ScratchPreview = () => (
  <div aria-hidden="true" className="h-full w-full bg-[#f4f6fc] p-4 flex gap-3">
    {/* Block stack */}
    <div className="flex-1 pt-1 space-y-1.5 min-w-0">
      <div className="h-5 w-[70%] max-w-[8.5rem] rounded-t-xl rounded-b bg-[#ffbf00]" />
      <div className="h-5 w-[85%] max-w-[10rem] rounded bg-[#4c97ff]" />
      <div className="h-5 w-[75%] max-w-[9rem] rounded bg-[#9966ff]" />
      <div className="w-[95%] max-w-[11rem] rounded bg-[#ffab19] p-1.5 pl-3 space-y-1.5">
        <div className="h-4 w-[70%] rounded bg-[#4c97ff]" />
        <div className="h-4 w-[55%] rounded bg-[#59c059]" />
      </div>
      <div className="h-5 w-[60%] max-w-[7rem] rounded bg-[#4c97ff]" />
    </div>
    {/* Stage */}
    <div className="w-[38%] shrink-0 rounded-lg bg-white border border-black/5 shadow-sm p-2 flex flex-col">
      <div className="flex items-center gap-1.5 mb-2">
        <span className="block w-0 h-0 border-y-[5px] border-y-transparent border-l-[9px] border-l-[#59c059]" />
        <span className="block w-2 h-2 rounded-[2px] bg-[#ec5959] rotate-45" />
      </div>
      <div className="flex-1 rounded-md bg-gradient-to-b from-sky-100 to-emerald-100 relative overflow-hidden">
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#ff8c1a]" />
      </div>
    </div>
  </div>
);

const PythonPreview = () => (
  <div
    aria-hidden="true"
    className="h-full w-full bg-[#21232e] px-4 py-3 font-mono text-[10px] sm:text-[11px] leading-[1.9] text-[#a6accd] overflow-hidden"
  >
    <pre className="whitespace-pre">
      <span className="text-[#5c6180]">1  </span>
      <span className="text-[#c792ea]">def</span>{" "}
      <span className="text-[#82aaff]">play_quiz</span>(questions):{"\n"}
      <span className="text-[#5c6180]">2  </span>
      {"    "}score = <span className="text-[#f78c6c]">0</span>{"\n"}
      <span className="text-[#5c6180]">3  </span>
      {"    "}<span className="text-[#c792ea]">for</span> q{" "}
      <span className="text-[#c792ea]">in</span> questions:{"\n"}
      <span className="text-[#5c6180]">4  </span>
      {"        "}answer = <span className="text-[#82aaff]">input</span>(q){"\n"}
      <span className="text-[#5c6180]">5  </span>
      {"        "}score = check(answer, score){"\n"}
      <span className="text-[#5c6180]">6  </span>
      {"    "}<span className="text-[#c792ea]">return</span> score{"\n"}
      <span className="text-[#5c6180]">7  </span>{"\n"}
      <span className="text-[#5c6180]">8  </span>
      <span className="text-[#82aaff]">print</span>(
      <span className="text-[#c3e88d]">&quot;Score:&quot;</span>, play_quiz(quiz))
    </pre>
  </div>
);

const WebPreview = () => (
  <div aria-hidden="true" className="h-full w-full bg-white flex flex-col">
    {/* Address bar of the site the student just put online */}
    <div className="flex items-center gap-2 px-3 py-2 border-b border-black/5">
      <span className="h-4 flex-1 rounded-full bg-black/[0.04]" />
      <span className="text-[8px] font-medium tracking-wide text-emerald-600 bg-emerald-50 rounded-full px-1.5 py-0.5">
        LIVE
      </span>
    </div>
    {/* Rendered page */}
    <div className="flex-1 p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="h-2 w-10 rounded-full bg-foreground/25" />
        <span className="flex gap-1.5">
          <span className="h-1.5 w-5 rounded-full bg-black/[0.08]" />
          <span className="h-1.5 w-5 rounded-full bg-black/[0.08]" />
        </span>
      </div>
      <div className="mt-1 space-y-1.5">
        <div className="h-3 w-[80%] rounded bg-foreground/70" />
        <div className="h-3 w-[55%] rounded bg-foreground/70" />
      </div>
      <div className="h-1.5 w-[65%] rounded-full bg-black/[0.08]" />
      <div className="h-5 w-16 rounded-md bg-primary/80" />
      <div className="mt-auto grid grid-cols-3 gap-2">
        <div className="h-7 rounded-md bg-black/[0.05]" />
        <div className="h-7 rounded-md bg-black/[0.05]" />
        <div className="h-7 rounded-md bg-black/[0.05]" />
      </div>
    </div>
  </div>
);

const trackPreviews = [ScratchPreview, PythonPreview, WebPreview];

const Education = () => {
  const { t, locale } = useTranslation();

  return (
    <>
      {/* Page header */}
      <section className="pt-32 pb-12 md:pb-16">
        <div className="container mx-auto px-6">
          <SectionHeading
            eyebrow={t.education.label}
            heading={t.education.heading}
            lede={t.education.description}
            as="h1"
            trigger="mount"
          />
        </div>
      </section>

      {/* Course cards */}
      <section className="pb-20 md:pb-28">
        <div className="container mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
            {t.education.tracks.map((track, index) => {
              const Preview = trackPreviews[index];
              return (
                <motion.article
                  key={track.name}
                  variants={fadeRise}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  transition={{ delay: index * STAGGER.loose }}
                  className="rounded-[1.75rem] p-6 md:p-8 bg-card border border-border/60 shadow-sm flex flex-col gap-6"
                >
                  <ScreenshotFrame>
                    <Preview />
                  </ScreenshotFrame>

                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-medium text-primary border border-primary/30 rounded-full px-3 py-1">
                      {track.audience}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {track.audienceNote}
                    </span>
                  </div>

                  <div>
                    <h2 className="type-h3 text-foreground">
                      {track.name}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {track.tagline}
                    </p>
                  </div>

                  <p className="text-[0.95rem] leading-relaxed text-muted-foreground flex-1">
                    {track.description}
                  </p>

                  <div className="pt-6 border-t border-border/60">
                    <p className="text-sm font-medium mb-4 text-foreground">
                      {track.learnLabel}
                    </p>
                    <ul className="space-y-3">
                      {track.learn.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                        >
                          <Check className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <p
            className={cn(
              "max-w-6xl mx-auto mt-8 text-sm text-muted-foreground/80 leading-relaxed",
              textAlign(locale)
            )}
          >
            {t.education.tracksFootnote}
          </p>
        </div>
      </section>

      {/* How lessons work */}
      <section className="section-padding bg-secondary/20">
        <div className="container mx-auto px-6">
          <SectionHeading
            eyebrow={t.education.format.label}
            heading={t.education.format.heading}
            className="mb-14"
          />

          <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {t.education.format.items.map((item, index) => {
              const Icon = formatIcons[index];
              return (
                <motion.div
                  key={item.title}
                  variants={fadeRise}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  transition={{ delay: index * STAGGER.loose }}
                  className="rounded-2xl bg-card border border-border/60 p-6 md:p-8"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trial lesson CTA */}
      <section
        className="relative overflow-hidden bg-foreground border-y border-primary/20 py-20 md:py-28"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            variants={fadeRise}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="inline-flex items-center gap-2 mb-6"
          >
            <CalendarDays className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium tracking-wider uppercase">
              {t.education.cta.eyebrow}
            </span>
          </motion.div>

          <motion.h2
            variants={fadeRise}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ delay: 0.1 }}
            className="type-h1 text-background mb-6"
          >
            {t.education.cta.heading}
          </motion.h2>

          <motion.p
            variants={fadeRise}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ delay: 0.2 }}
            className="text-background/55 text-lg leading-relaxed mb-10 max-w-xl mx-auto"
          >
            {t.education.cta.description}
          </motion.p>

          <motion.div
            variants={fadeRise}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild variant="hero" className="group">
              <TransitionLink href="/contact">
                {t.education.cta.cta}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </TransitionLink>
            </Button>
            <TransitionLink
              href="/contact"
              className="text-background/50 hover:text-background/80 text-sm font-medium transition-colors underline underline-offset-4"
            >
              {t.education.cta.ctaAlt}
            </TransitionLink>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Education;
