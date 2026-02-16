"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const showcaseItems = [
  {
    title: "Landing Page Redesign",
    description:
      "Crafted a modern, conversion-focused landing page that communicates DefineX's mission clearly to athletes and parents.",
    image: "/definex/landing.png",
    format: "desktop" as const,
  },
  {
    title: "Academy Page Development",
    description:
      "Built a comprehensive academy section showcasing courses, instructors, and learning paths for athletes at every level.",
    image: "/definex/about.png",
    format: "desktop" as const,
  },
  {
    title: "Payment Integration",
    description:
      "Implemented secure payment processing with tiered pricing plans for course enrollments and subscriptions.",
    image: "/definex/pricing.png",
    format: "desktop" as const,
  },
  {
    title: "Email Contact System",
    description:
      "Set up a reliable contact system for inquiries, free trial requests, and automated communications.",
    image: "/definex/contact.png",
    format: "tablet" as const,
  },
];

const additionalWork = [
  "Mobile Responsiveness",
  "Clean Overall Design",
  "Social Media Integration",
  "Constant Ongoing Support",
];

export default function DefineXPage() {
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
              href="/#work"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Work</span>
            </Link>

            <span className="text-primary text-sm font-medium tracking-wider uppercase block mb-4">
              Sports & Education
            </span>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">
              DefineX
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mb-6">
              A platform that teaches athletes in Japan English, providing all
              the resources necessary for them to play abroad.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Web design", "Web development", "Payment integration", "Email systems", "Mobile responsiveness", "Social media integration"].map((tag) => (
                <span
                  key={tag}
                  className="text-sm font-medium text-primary border border-primary/30 rounded-full px-4 py-1.5"
                >
                  {tag}
                </span>
              ))}
            </div>
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
              Overview
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
              DefineX is a platform dedicated to empowering Japanese athletes
              with English language skills. By providing comprehensive learning
              resources, structured courses, and ongoing support, DefineX gives
              athletes everything they need to pursue opportunities abroad. We
              partnered with DefineX to build a digital presence that matches
              their ambitious mission.
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
            What We Did
          </motion.h2>

          <div className="space-y-32">
            {showcaseItems.map((item, index) => {
              const isEven = index % 2 === 0;
              const isTablet = item.format === "tablet";

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
                  {/* Screenshot */}
                  <div
                    className={`${
                      isTablet
                        ? "w-full max-w-xs md:max-w-sm"
                        : "w-full md:w-3/5"
                    } flex-shrink-0`}
                  >
                    <div className="rounded-2xl overflow-hidden shadow-2xl border border-border/50">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={isTablet ? 500 : 800}
                        height={isTablet ? 700 : 450}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>

                  {/* Text */}
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

          {/* Additional work items */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="mt-24 grid sm:grid-cols-2 md:grid-cols-4 gap-6"
          >
            {additionalWork.map((item) => (
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
              href="https://definex.jp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="default" className="gap-2">
                Visit Website
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
            <Link href="/#work">
              <Button variant="outline">Back to Work</Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
