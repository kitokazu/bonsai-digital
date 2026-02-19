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
    title: "Complete UI/UX Redesign",
    description:
      "Transformed the existing CG Online website from scratch — modernising the visual language, improving information hierarchy, and building a fluid, responsive layout that reflects the quality of the artist's work.",
    image: "/cg-online-academy/cg-landing.png",
  },
  {
    title: "Live 3D Model Viewer with Three.js",
    description:
      "Integrated Three.js to render the artist's actual 3D character models directly in the browser. Visitors can interact with real-time rendered models, showcasing the depth of the artist's craft in a way static images never could.",
    image: "/cg-about.jpeg",
  },
  {
    title: "Course Platform with Progress Tracking",
    description:
      "Built a full course system where students who purchase a course can access video lessons and written guides directly on the site. Progress is saved per user so they can pick up exactly where they left off.",
    image: "/cg-online-academy/cg-course.png",
  },
  {
    title: "Student Work Gallery",
    description:
      "Dedicated gallery showcasing work produced by students following the courses — acting as social proof and demonstrating the real-world results of the curriculum.",
    image: "/cg-online-academy/cg-student-work.png",
  },
];

const additionalWork = [
  "Three.js Integration",
  "Course Platform",
  "Video Streaming",
  "Progress Tracking",
];

export default function CGOnlineAcademyPage() {
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
              3D Art & Education
            </span>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">
              CG Online Academy
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mb-6">
              A full redesign of a professional 3D artist&apos;s online
              presence — complete with live Three.js model rendering and an
              integrated course platform with video lessons and progress
              tracking.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Web redesign",
                "Three.js",
                "Course platform",
                "Video streaming",
                "Progress tracking",
                "UI/UX",
              ].map((tag) => (
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
              src="/cg-about.jpeg"
              alt="CG Online Academy"
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
              CG Online Academy is the revamped digital home for a professional
              3D artist and educator. The old site lacked the visual impact
              needed to reflect the quality of the work being taught. We
              rebuilt it from the ground up with a modern UI, interactive
              Three.js model rendering that brings the artist&apos;s actual
              characters to life in the browser, and a full course platform
              where students can purchase and follow along with video lessons
              and step-by-step guides — all with progress tracking so no one
              loses their place.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Transformation */}
      <section className="px-6 pb-20">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              The Transformation
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
              The client came to us with an existing website that no longer
              represented their skill level. The old site was outdated, hard to
              navigate, and failed to convert visitors into students. We
              started by auditing what wasn&apos;t working, then rebuilt every
              page from scratch — keeping the brand identity while elevating
              the entire experience.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid md:grid-cols-2 gap-6"
          >
            <div className="space-y-3">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Before
              </span>
              <div className="rounded-2xl overflow-hidden shadow-lg border border-border/50">
                <Image
                  src="/cg-online-academy/cg-before.png"
                  alt="CG Online Academy — before redesign"
                  width={800}
                  height={500}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            <div className="space-y-3">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Before
              </span>
              <div className="rounded-2xl overflow-hidden shadow-lg border border-border/50">
                <Image
                  src="/cg-online-academy/cg-before-2.png"
                  alt="CG Online Academy — before redesign (2)"
                  width={800}
                  height={500}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
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
                  <div className="w-full md:w-3/5 flex-shrink-0">
                    <div className="rounded-2xl overflow-hidden shadow-2xl border border-border/50">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={800}
                        height={450}
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
              href="https://cg-online-academy.vercel.app/"
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
