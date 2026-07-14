"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  Languages,
  Laptop,
  ListChecks,
  Video,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";

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

const coursePreviews = [ScratchPreview, PythonPreview];

const Education = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });
  const ctaRef = useRef(null);
  const isCtaInView = useInView(ctaRef, { once: true, margin: "-80px" });
  const { t, locale } = useTranslation();
  const contactHref = locale === "en" ? "/contact" : "/ja/contact";

  return (
    <>
      {/* Page header */}
      <section className="pt-32 pb-12 md:pb-16">
        <div className="container mx-auto px-6">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={
              isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.6 }}
            className={cn(
              "max-w-2xl mx-auto",
              locale === "ja" ? "text-left" : "text-center"
            )}
          >
            <span
              className={cn(
                "text-primary text-sm font-medium tracking-wider uppercase mb-4 block",
                locale === "ja" && "text-base"
              )}
            >
              {t.education.label}
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6">
              {t.education.heading}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t.education.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Course cards */}
      <section className="pb-20 md:pb-28">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto items-stretch">
            {t.education.courses.map((course, index) => {
              const Preview = coursePreviews[index];
              return (
                <motion.article
                  key={course.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: index * 0.12 }}
                  className="rounded-[1.75rem] p-6 md:p-8 bg-card border border-border/60 shadow-sm flex flex-col gap-6"
                >
                  <ScreenshotFrame>
                    <Preview />
                  </ScreenshotFrame>

                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-medium text-primary border border-primary/30 rounded-full px-3 py-1">
                      {course.ages}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {course.agesNote}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-2xl md:text-3xl font-serif font-bold leading-tight text-foreground">
                      {course.name}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {course.tagline}
                    </p>
                  </div>

                  <p className="text-[0.95rem] leading-relaxed text-muted-foreground flex-1">
                    {course.description}
                  </p>

                  <div className="pt-6 border-t border-border/60">
                    <p className="text-sm font-medium mb-4 text-foreground">
                      {course.learnLabel}
                    </p>
                    <ul className="space-y-3">
                      {course.learn.map((item) => (
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
              "max-w-5xl mx-auto mt-8 text-sm text-muted-foreground/80 leading-relaxed",
              locale === "ja" ? "text-left" : "text-center"
            )}
          >
            {t.education.agesFootnote}
          </p>
        </div>
      </section>

      {/* How lessons work */}
      <section className="section-padding bg-secondary/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className={cn(
              "max-w-2xl mx-auto mb-14",
              locale === "ja" ? "text-left" : "text-center"
            )}
          >
            <span
              className={cn(
                "text-primary text-sm font-medium tracking-wider uppercase mb-4 block",
                locale === "ja" && "text-base"
              )}
            >
              {t.education.format.label}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
              {t.education.format.heading}
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {t.education.format.items.map((item, index) => {
              const Icon = formatIcons[index];
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
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
        ref={ctaRef}
        className="relative overflow-hidden bg-foreground border-y border-primary/20 py-20 md:py-28"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <CalendarDays className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium tracking-wider uppercase">
              {t.education.cta.eyebrow}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-background leading-[1.1] mb-6"
          >
            {t.education.cta.heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-background/55 text-lg leading-relaxed mb-10 max-w-xl mx-auto"
          >
            {t.education.cta.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild variant="hero" className="group">
              <Link href={contactHref}>
                {t.education.cta.cta}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Link
              href={contactHref}
              className="text-background/50 hover:text-background/80 text-sm font-medium transition-colors underline underline-offset-4"
            >
              {t.education.cta.ctaAlt}
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Education;
