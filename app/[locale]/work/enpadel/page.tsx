"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const SITE_URL = "https://www.enpadel.com";

/* The first slot is the scroll-scrubbed hero, captured off the live site and
   played back as a loop. Everything else is a still. */
const showcaseMedia = [
  { type: "video" as const, src: "/enpadel/scroll", poster: "/enpadel/scroll-poster.jpg" },
  { type: "image" as const, src: "/enpadel/padel.jpg" },
  { type: "image" as const, src: "/enpadel/event.jpg" },
  { type: "image" as const, src: "/enpadel/english.jpg" },
];

function ScrollClip({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  // The site this is taken from honours reduced motion, so the case study
  // showing it off should too: hold on the poster frame instead of looping.
  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (media.matches) {
        video.pause();
        video.currentTime = 0;
      } else {
        video.play().catch(() => {});
      }
    };

    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  return (
    <video
      ref={ref}
      poster={poster}
      width={880}
      height={550}
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

export default function EnPadelPage() {
  const { t, locale } = useTranslation();
  const d = t.workDetail.enpadel;
  const workHref = locale === "en" ? "/work" : "/ja/work";

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-8 px-6">
        <div className="container mx-auto max-w-5xl">
          <Link
            href={workHref}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">
              {t.workDetail.backToWork}
            </span>
          </Link>

          <span className="text-primary text-sm font-medium tracking-wider uppercase block mb-4">
            {d.category}
          </span>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">
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

          <a href={SITE_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="default" className="gap-2">
              {t.workDetail.visitWebsite}
              <ExternalLink className="w-4 h-4" />
            </Button>
          </a>
        </div>
      </section>

      {/* Hero Image */}
      <section className="px-6 pb-20">
        <div className="container mx-auto max-w-5xl">
          <div
            className="rounded-2xl overflow-hidden border border-border/50 shadow-lg"
          >
            <Image
              src="/enpadel/hero.jpg"
              alt={d.title}
              width={2160}
              height={1500}
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-16"
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
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className={`flex flex-col ${
                      isEven ? "md:flex-row" : "md:flex-row-reverse"
                    } items-center gap-10 md:gap-12`}
                  >
                    <div className="w-full md:w-1/2 flex-shrink-0">
                      <div className="rounded-2xl overflow-hidden shadow-2xl border border-border/50">
                        {showcaseMedia[index].type === "video" ? (
                          <ScrollClip
                            src={showcaseMedia[index].src}
                            poster={showcaseMedia[index].poster!}
                            label={item.title}
                          />
                        ) : (
                          <Image
                            src={showcaseMedia[index].src}
                            alt={item.title}
                            width={2160}
                            height={1500}
                            className="w-full h-auto object-cover"
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
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

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <a href={SITE_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="default" className="gap-2">
                {t.workDetail.visitWebsite}
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
            <Link href={workHref}>
              <Button variant="outline">{t.workDetail.backToWork}</Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
