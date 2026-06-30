"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "next-view-transitions";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";

const showcaseImages = [
  { image: "/definex/landing.png", format: "desktop" as const },
  { image: "/definex/about.png", format: "desktop" as const },
  { image: "/definex/pricing.png", format: "desktop" as const },
  { image: "/definex/contact.png", format: "tablet" as const },
];

export default function DefineXPage() {
  const { t, locale } = useTranslation();
  const d = t.workDetail.definex;
  const workHref = locale === "en" ? "/work" : "/ja/work";

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href={workHref}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">{t.workDetail.backToWork}</span>
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
              {d.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm font-medium text-primary border border-primary/30 rounded-full px-4 py-1.5"
                >
                  {tag}
                </span>
              ))}
            </div>
            <a
              href="https://www.definex.jp/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="default" className="gap-2">
                {t.workDetail.visitWebsite}
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="px-6 pb-20">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl overflow-hidden"
            style={{ viewTransitionName: "wt-definex" }}
          >
            <Image
              src="/define-x-about.png"
              alt="DefineX platform"
              width={1200}
              height={675}
              className="w-full h-auto object-cover"
              priority
            />
          </motion.div>
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
            <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
              {d.overview}
            </p>
          </motion.div>
        </div>
      </section>

      {/* What We Did — Showcase */}
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
            {d.showcase.map((item, index) => {
              const isEven = index % 2 === 0;
              const img = showcaseImages[index];
              const isTablet = img?.format === "tablet";

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={`flex flex-col ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  } items-center gap-10 md:gap-16`}
                >
                  <div
                    className={`${
                      isTablet
                        ? "w-full max-w-xs md:max-w-sm"
                        : "w-full md:w-3/5"
                    } flex-shrink-0`}
                  >
                    <div className="rounded-2xl overflow-hidden shadow-2xl border border-border/50">
                      <Image
                        src={img?.image ?? ""}
                        alt={item.title}
                        width={isTablet ? 500 : 800}
                        height={isTablet ? 700 : 450}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-4">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="mt-24 grid sm:grid-cols-2 md:grid-cols-4 gap-6"
          >
            {d.additionalWork.map((item) => (
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
            <a
              href="https://www.definex.jp/"
              target="_blank"
              rel="noopener noreferrer"
            >
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
