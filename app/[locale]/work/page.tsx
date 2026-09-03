"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { WorkCard } from "@/components/Work";
import { useTranslation } from "@/lib/i18n";
import { DURATION, EASE, STAGGER } from "@/lib/motion";
import { workProjects, type WorkBucket, type WorkProjectId } from "@/lib/work";
import { cn, textAlign } from "@/lib/utils";

type FilterValue = "all" | WorkBucket;

interface MergedProject {
  id: WorkProjectId;
  bucket: WorkBucket;
  image?: string;
  video?: string;
  confidential?: boolean;
  inProgress?: boolean;
  slug?: string;
  tileLabel?: string;
  placeholderColor?: string;
  frameClass?: string;
  tileClass?: string;
  title: string;
  tags: string[];
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
      ...(
        t.work.projects as Record<
          string,
          { title: string; tags: string[]; outcome: string }
        >
      )[p.id],
    }));

  return (
    <div className="min-h-screen">
      <section className="pt-32 pb-10 px-6 md:px-10">
        <SectionHeading
          heading={t.work.allWorksHeading}
          lede={t.work.allWorksDescription}
          as="h1"
          trigger="mount"
        />
      </section>

      {/* Filter chips */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: DURATION.short,
          delay: 0.25,
          ease: EASE.expoOut,
        }}
        className={cn(
          "relative flex gap-2 pb-8 px-6 md:px-10 flex-wrap",
          locale === "ja" ? "" : "justify-center",
        )}
        role="group"
        aria-label={t.work.label}
      >
        {filters.map((filter) => {
          const active = activeFilter === filter.value;
          return (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              aria-pressed={active}
              className={cn(
                "relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                active
                  ? "text-background"
                  : "border border-border text-foreground/70 hover:border-foreground/50 hover:text-foreground",
              )}
            >
              {/* The filled pill is one shared element that slides between
                  chips, rather than three that fade independently. */}
              {active && (
                <motion.span
                  layoutId="work-filter-pill"
                  className="absolute inset-0 rounded-full bg-foreground"
                  transition={{ duration: DURATION.short, ease: EASE.expoOut }}
                />
              )}
              <span className="relative">{filter.label}</span>
            </button>
          );
        })}
      </motion.div>

      {/* Project grid. `popLayout` lets the leaving cards animate out while the
          survivors slide into their new positions, instead of the whole grid
          snapping on every filter change. */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 px-6 md:px-10 pb-16">
        <AnimatePresence mode="popLayout" initial={false}>
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{
                duration: DURATION.short,
                ease: EASE.expoOut,
                delay: index * STAGGER.tight * 0.5,
              }}
            >
              <WorkCard
                project={project}
                index={0}
                variant="fullbleed"
                reveal={false}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
