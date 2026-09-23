"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { WorkPager } from "@/components/layout/WorkPager";
import { ProjectTestimonial } from "@/components/work/ProjectTestimonial";
import { TransitionLink } from "@/components/nav/TransitionLink";
import Image from "next/image";
import { useRef } from "react";
import { useAutoplayClip } from "@/hooks/use-autoplay-clip";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";
import { fadeRise, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

const SITE_URL = "https://www.caribsys.io";
const SITE_LABEL = "caribsys.io";

/* The coverage map is the reason this project is on the site, so it gets the
   first slot and it moves: the loop is the real thing, recorded off the live
   page, drawing itself in and then answering a market. Everything after it is
   a still. */
const showcaseMedia = [
  { type: "video" as const, src: "/caribsys/coverage", poster: "/caribsys/coverage-poster.jpg", width: 1060, height: 706 },
  { type: "image" as const, src: "/caribsys/industries.jpg", width: 2160, height: 1522 },
  { type: "image" as const, src: "/caribsys/about.jpg", width: 2160, height: 1228 },
  { type: "image" as const, src: "/caribsys/assessments.jpg", width: 2000, height: 1123 },
  { type: "image" as const, src: "/caribsys/contact.jpg", width: 2160, height: 1298 },
  { type: "image" as const, src: "/caribsys/cms.jpg", width: 2000, height: 1153 },
];

function MapClip({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useAutoplayClip(ref);

  return (
    <video
      ref={ref}
      poster={poster}
      width={1060}
      height={706}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      aria-label={label}
      className="w-full h-auto block"
    >
      <source src={`${src}.webm`} type="video/webm" />
      <source src={`${src}.mp4`} type="video/mp4" />
    </video>
  );
}

export default function CaribSysPage() {
  const { t, locale } = useTranslation();
  const d = t.workDetail.caribsys;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-8 px-6">
        <div className="container mx-auto max-w-5xl">
          <TransitionLink
            href="/work"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">
              {t.workDetail.backToWork}
            </span>
          </TransitionLink>

          <span className="type-eyebrow mb-4">
            {d.category}
          </span>
          <h1 className="type-h1 text-foreground mb-6">
            {d.title}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mb-6">
            {d.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {d.tags.map((tag: string) => (
              <span
                key={tag}
                className="text-sm font-medium text-primary border border-primary/30 rounded-full px-4 py-1.5"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <a href={SITE_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="default" className="gap-2">
                {t.workDetail.visitWebsite}
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
            {/* The domain spelled out beside the button. It is the client's
                address and people read it as the proof, not as navigation. */}
            <a
              href={SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium tracking-[0.02em] text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              {SITE_LABEL}
            </a>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="px-6 pb-20">
        <div className="container mx-auto max-w-5xl">
          <div className="rounded-2xl overflow-hidden border border-border/50 shadow-lg">
            <Image
              src="/caribsys/hero.jpg"
              alt={d.title}
              width={2160}
              height={1350}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="px-6 pb-20">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            variants={fadeRise}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <h2 className="type-h2 text-foreground mb-6">
              {t.workDetail.overview}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {d.overview}
            </p>
          </motion.div>
        </div>
      </section>

      {/* What we did */}
      <section className="px-6 pb-20">
        <div className="container mx-auto max-w-5xl">
          <motion.h2
            variants={fadeRise}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="type-h2 text-foreground mb-16"
          >
            {t.workDetail.whatWeDid}
          </motion.h2>

          <div className="space-y-32">
            {d.showcase.map(
              (item: { title: string; description: string }, index: number) => {
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={item.title}
                    variants={fadeRise}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className={`flex flex-col ${
                      isEven ? "md:flex-row" : "md:flex-row-reverse"
                    } items-center gap-10 md:gap-12`}
                  >
                    <div className="w-full md:w-1/2 flex-shrink-0">
                      <div className="rounded-2xl overflow-hidden shadow-2xl border border-border/50">
                        {showcaseMedia[index].type === "video" ? (
                          <MapClip
                            src={showcaseMedia[index].src}
                            poster={showcaseMedia[index].poster!}
                            label={item.title}
                          />
                        ) : (
                          /* Real intrinsic sizes, not one ratio for the set:
                             these shots are cropped to their own content, and
                             a shared width/height would have object-cover trim
                             the difference back off. */
                          <Image
                            src={showcaseMedia[index].src}
                            alt={item.title}
                            width={showcaseMedia[index].width}
                            height={showcaseMedia[index].height}
                            className="w-full h-auto"
                          />
                        )}
                      </div>
                    </div>
                    <div
                      className={cn(
                        "flex-1 max-w-xl",
                        locale === "ja" ? "text-left" : "text-center md:text-left"
                      )}
                    >
                      <h3 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-4">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-base leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              }
            )}
          </div>

          <motion.div
            variants={fadeRise}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-24 grid sm:grid-cols-2 md:grid-cols-4 gap-6"
          >
            {d.additionalWork.map((item: string) => (
              <div
                key={item}
                className="p-6 rounded-2xl bg-muted/50 border border-border text-center"
              >
                <h3 className="text-lg font-serif font-semibold text-foreground">
                  {item}
                </h3>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <ProjectTestimonial />

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            variants={fadeRise}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <a href={SITE_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="default" className="gap-2">
                {t.workDetail.visitWebsite}
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
            <TransitionLink href="/work">
              <Button variant="outline">{t.workDetail.backToWork}</Button>
            </TransitionLink>
          </motion.div>
        </div>
      </section>
      <WorkPager />
    </div>
  );
}
