"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "next-view-transitions";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const DEMO_URL = "https://ecom-management.vercel.app/";

const showcaseImages = [
  "/apex-autowerks/preorders.png",
  "/apex-autowerks/inventory.png",
  "/apex-autowerks/analytics.png",
  "/apex-autowerks/dashboard-ja.png",
  "/apex-autowerks/shopify.png",
];

export default function EcommerceOpsPage() {
  const { t, locale } = useTranslation();
  const d = t.workDetail.ecommerceOps;
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

          <a href={DEMO_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="default" className="gap-2">
              {t.workDetail.viewDemo}
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
            style={{ viewTransitionName: "wt-ecommerceOps" }}
          >
            <Image
              src="/apex-autowerks/dashboard.png"
              alt={d.title}
              width={1440}
              height={1000}
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

      {/* The problem */}
      <section className="px-6 pb-20">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              {d.problem.heading}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mb-12">
              {d.problem.body}
            </p>

            {/* The workbook the console replaced */}
            <figure className="mb-12">
              <div className="rounded-xl overflow-x-auto border border-border shadow-lg bg-muted/30">
                <Image
                  src="/apex-autowerks/before-spreadsheet.png"
                  alt={d.problem.artifactAlt}
                  width={1400}
                  height={649}
                  className="h-auto w-full min-w-[760px] max-w-none"
                />
              </div>
              <figcaption className="mt-3 text-sm text-muted-foreground/80 leading-relaxed max-w-3xl">
                {d.problem.artifactCaption}
              </figcaption>
            </figure>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="rounded-2xl border border-accent/25 bg-accent/[0.05] p-6 md:p-8">
                <p className="text-xs font-medium tracking-wider uppercase text-accent mb-5">
                  {d.problem.beforeLabel}
                </p>
                <ul className="space-y-3">
                  {d.problem.before.map((item: string) => (
                    <li
                      key={item}
                      className="flex gap-3 text-muted-foreground leading-relaxed"
                    >
                      <span
                        className="mt-2.5 h-px w-4 flex-shrink-0 bg-accent/50"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-primary/25 bg-primary/[0.05] p-6 md:p-8">
                <p className="text-xs font-medium tracking-wider uppercase text-primary mb-5">
                  {d.problem.afterLabel}
                </p>
                <ul className="space-y-3">
                  {d.problem.after.map((item: string) => (
                    <li
                      key={item}
                      className="flex gap-3 text-foreground/80 leading-relaxed"
                    >
                      <span
                        className="mt-2.5 h-px w-4 flex-shrink-0 bg-primary/50"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
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
                        <Image
                          src={showcaseImages[index]}
                          alt={item.title}
                          width={1440}
                          height={1000}
                          className="w-full h-auto object-cover"
                        />
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
            <a href={DEMO_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="default" className="gap-2">
                {t.workDetail.viewDemo}
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
