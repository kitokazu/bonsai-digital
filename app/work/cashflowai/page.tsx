"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const showcaseItems = [
  {
    title: "RAG Pipeline & Chatbot Management",
    description:
      "Built an admin dashboard for managing AI chatbots powered by a Retrieval-Augmented Generation pipeline — enabling financial advisors to deploy, configure, and monitor domain-specific assistants.",
    image: "/cashflowAI/chatbot-page.png",
    format: "desktop" as const,
  },
  {
    title: "PowerBI Dashboard Viewer",
    description:
      "Developed an integrated dashboard tool that allows team members to view and interact with their PowerBI dashboards directly within the platform, with account and asset class filtering.",
    image: "/cashflowAI/dashboard-page.png",
    format: "desktop" as const,
  },
  {
    title: "Email Automations",
    description:
      "Implemented scheduled email automations that execute SQL queries against portfolio data and generate AI-powered summaries, delivering actionable reports to stakeholders on a recurring basis.",
    image: "/cashflowAI/automations.png",
    format: "desktop" as const,
  },
  {
    title: "System Architecture",
    description:
      "Designed the end-to-end RAG architecture — from document indexing into a vector database to retrieval and LLM-powered response generation — ensuring accurate, context-aware financial insights.",
    image: "/cashflowAI/architecture.png",
    format: "tablet" as const,
  },
];

const additionalWork = [
  "RAG Pipeline Development",
  "SQL Query Automation",
  "AI-Powered Summaries",
  "Role-Based Access Control",
];

export default function CashFlowAIPage() {
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
              Finance & AI
            </span>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">
              CashFlowAI
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mb-6">
              An internal technical dashboard for a financial company — featuring
              AI chatbots, automated reporting, and integrated data
              visualization.
            </p>
            <div className="flex flex-wrap gap-2">
              {["RAG pipeline", "AI chatbots", "SQL automation", "Dashboard development", "Email automations", "Role-based access control"].map((tag) => (
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
              src="/cashflowAI/chatbot-page.png"
              alt="CashFlowAI platform"
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
              CashFlowAI is an internal platform built for a financial services
              company to streamline their operations through AI. The system
              combines a RAG-powered chatbot management dashboard, embedded
              PowerBI analytics, and automated email reporting driven by SQL
              queries and AI-generated summaries. We designed and developed the
              full-stack application to serve as a central hub for the
              company&apos;s data-driven workflows.
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
