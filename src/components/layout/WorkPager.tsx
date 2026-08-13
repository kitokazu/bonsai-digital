"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";

import { Reveal } from "@/components/motion/Reveal";
import { TransitionLink } from "@/components/nav/TransitionLink";
import { useTranslation } from "@/lib/i18n";
import { workProjects } from "@/lib/work";

/**
 * Previous / next navigation at the foot of a case study.
 *
 * Every detail page used to dead-end at "back to work", which sent people to
 * the index to pick the next one. This keeps them moving through the portfolio
 * instead. The current project comes from the path, so a page only has to drop
 * the component in.
 */
export function WorkPager() {
  const pathname = usePathname() ?? "";
  const { t } = useTranslation();

  const slug = pathname.split("/").filter(Boolean).pop();
  const pages = workProjects.filter((project) => project.slug);
  const index = pages.findIndex((project) => project.slug === slug);
  if (index === -1) return null;

  const titleOf = (position: number) => {
    const project = pages[position];
    if (!project) return null;
    return {
      href: `/work/${project.slug}`,
      title: t.work.projects[project.id].title,
    };
  };

  // The list wraps, so the last case study leads back round to the first
  // rather than showing a lone link.
  const previous = titleOf((index - 1 + pages.length) % pages.length);
  const next = titleOf((index + 1) % pages.length);

  return (
    <Reveal blur={false} as="section" className="border-t border-border/60">
      <nav
        className="container mx-auto grid max-w-5xl gap-px px-6 py-10 sm:grid-cols-2"
        aria-label={t.work.heading}
      >
        {previous && (
          <TransitionLink
            href={previous.href}
            className="group flex flex-col gap-1 py-4 pr-6"
          >
            <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
              {t.workDetail.previousProject}
            </span>
            <span className="type-h3 text-foreground transition-colors group-hover:text-primary">
              {previous.title}
            </span>
          </TransitionLink>
        )}

        {next && (
          <TransitionLink
            href={next.href}
            className="group flex flex-col gap-1 py-4 sm:items-end sm:text-right"
          >
            <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {t.workDetail.nextProject}
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="type-h3 text-foreground transition-colors group-hover:text-primary">
              {next.title}
            </span>
          </TransitionLink>
        )}
      </nav>
    </Reveal>
  );
}
