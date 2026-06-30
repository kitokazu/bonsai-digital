"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WorkCard } from "@/components/Work";
import { useTranslation } from "@/lib/i18n";
import { workProjects, type WorkBucket, type WorkProjectId } from "@/lib/work";
import { cn } from "@/lib/utils";

type FilterValue = "all" | WorkBucket;

interface MergedProject {
  id: WorkProjectId;
  bucket: WorkBucket;
  image?: string;
  confidential?: boolean;
  slug?: string;
  placeholderColor?: string;
  title: string;
  tag: string;
  outcome: string;
}

export default function AllWorksPage() {
  const { t, locale } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");

  const filters: { value: FilterValue; label: string }[] = [
    { value: "all", label: t.work.filters.all },
    { value: "websites", label: t.work.filters.websites },
    { value: "software", label: t.work.filters.software },
  ];

  const projects: MergedProject[] = workProjects
    .filter((p) => activeFilter === "all" || p.bucket === activeFilter)
    .map((p) => ({
      ...p,
      ...(t.work.projects as Record<string, { title: string; tag: string; outcome: string }>)[p.id],
    }));

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-10 px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={cn(locale === "ja" ? "text-left" : "text-center")}
        >
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-4">
            {t.work.allWorksHeading}
          </h1>
          <p className={cn("text-muted-foreground text-lg max-w-xl", locale === "ja" ? "" : "mx-auto")}>
            {t.work.allWorksDescription}
          </p>
        </motion.div>
      </section>

      {/* Filter chips */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className={cn("flex gap-2 pb-8 px-6 md:px-10 flex-wrap", locale === "ja" ? "" : "justify-center")}
        role="group"
        aria-label="Filter projects"
      >
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            aria-pressed={activeFilter === filter.value}
            className={cn(
              "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              activeFilter === filter.value
                ? "bg-foreground text-background"
                : "border border-border text-foreground/70 hover:border-foreground/50 hover:text-foreground bg-transparent"
            )}
          >
            {filter.label}
          </button>
        ))}
      </motion.div>

      {/* Project grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 px-6 md:px-10 pb-16">
        {projects.map((project, index) => (
          <WorkCard
            key={project.id}
            project={project}
            index={index}
            variant="fullbleed"
          />
        ))}
      </div>

      <Footer />
    </div>
  );
}
