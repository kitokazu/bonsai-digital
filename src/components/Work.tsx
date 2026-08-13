"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useAutoplayClip } from "@/hooks/use-autoplay-clip";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Hammer, Lock } from "lucide-react";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { TransitionLink } from "@/components/nav/TransitionLink";
import { useTranslation } from "@/lib/i18n";
import { fadeRise, STAGGER, viewportOnce } from "@/lib/motion";
import { cn, textAlign } from "@/lib/utils";
import { workProjects, type WorkBucket, type WorkProjectId } from "@/lib/work";

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
  tag: string;
  outcome: string;
}

/* A project that ships a clip plays it on the card instead of the still. The
   poster is the clip's own first frame, so it covers the gap before playback
   starts and stands in when motion is reduced. */
const CardClip = ({
  src,
  poster,
  label,
  className,
}: {
  src: string;
  poster: string;
  label: string;
  className?: string;
}) => {
  const ref = useRef<HTMLVideoElement>(null);
  useAutoplayClip(ref);

  return (
    <video
      ref={ref}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      aria-label={label}
      className={className}
    >
      <source src={`${src}.webm`} type="video/webm" />
      <source src={`${src}.mp4`} type="video/mp4" />
    </video>
  );
};

export const WorkCard = ({
  project,
  index,
  variant = "default",
  reveal = true,
}: {
  project: MergedProject;
  index: number;
  variant?: "default" | "fullbleed";
  /* The work index wraps each card in its own filter animation, so it turns
     the card's scroll entrance off rather than run two at once. */
  reveal?: boolean;
}) => {
  const { t } = useTranslation();
  const href = project.slug ? `/work/${project.slug}` : undefined;

  if (variant === "fullbleed") {
    const iconColors =
      project.bucket === "websites"
        ? "bg-primary/12 text-primary"
        : "bg-accent/12 text-accent";

    const inner = (
      <motion.article
        variants={reveal ? fadeRise : undefined}
        initial={reveal ? "hidden" : false}
        whileInView={reveal ? "visible" : undefined}
        viewport={viewportOnce}
        transition={{ delay: index * STAGGER.tight }}
        className="group flex flex-col"
      >
        {/* Framed screenshot: colored backdrop, top-left corner of the shot peeking in */}
        <div
          className={cn(
            "relative rounded-2xl overflow-hidden mb-4 bg-gradient-to-br shadow-sm",
            project.frameClass ?? project.placeholderColor ?? "from-primary/15 to-primary/5"
          )}
          style={{ aspectRatio: "4/3" }}
        >
          {project.image ? (
            <div className="absolute left-[9%] top-[10%] right-0 bottom-0 overflow-hidden rounded-tl-lg shadow-[0_12px_32px_-8px_rgba(0,0,0,0.35)]">
              {project.video ? (
                <CardClip
                  src={project.video}
                  poster={project.image}
                  label={project.title}
                  className="absolute inset-0 w-full h-full object-cover object-left-top transition-transform duration-500 group-hover:scale-[1.02]"
                />
              ) : (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-left-top transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              )}
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="font-sans text-6xl font-bold tracking-tight text-white/50 select-none"
                aria-hidden="true"
              >
                {project.tileLabel ?? project.title.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Project info */}
        <div className="flex items-center gap-3 px-1">
          {/* Logo tile */}
          <div
            className={cn(
              "w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center font-sans text-base font-bold tracking-tight shadow-sm",
              project.tileClass ?? iconColors
            )}
          >
            {project.tileLabel ?? project.title.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-semibold text-foreground text-sm leading-tight">
                {project.title}
              </p>
              {project.confidential && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground/70">
                  <Lock className="w-2.5 h-2.5" aria-hidden="true" />
                  {t.work.confidentialBadge}
                </span>
              )}
              {project.inProgress && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-accent">
                  <Hammer className="w-2.5 h-2.5" aria-hidden="true" />
                  {t.work.inProgressBadge}
                </span>
              )}
            </div>
            <p className="text-muted-foreground text-sm leading-snug mt-0.5 line-clamp-2">
              {project.outcome}
            </p>
          </div>
        </div>
      </motion.article>
    );

    if (href) {
      return (
        <TransitionLink href={href} className="block">
          {inner}
        </TransitionLink>
      );
    }
    return inner;
  }

  // Default variant (homepage cards)
  const inner = (
    <motion.article
      variants={reveal ? fadeRise : undefined}
      initial={reveal ? "hidden" : false}
      whileInView={reveal ? "visible" : undefined}
      viewport={viewportOnce}
      transition={{ delay: index * STAGGER.base }}
      className="group flex flex-col rounded-2xl overflow-hidden border border-border/50 bg-card hover:border-primary/20 transition-all duration-500 hover:shadow-lg h-full"
    >
      {/* Image or gradient placeholder */}
      <div className="aspect-[16/9] overflow-hidden flex-shrink-0">
        {project.image ? (
          project.video ? (
            <CardClip
              src={project.video}
              poster={project.image}
              label={project.title}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <Image
              src={project.image}
              alt={project.title}
              width={800}
              height={450}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
          )
        ) : (
          <div
            className={cn(
              "w-full h-full bg-gradient-to-br",
              project.placeholderColor ?? "from-primary/10 to-muted/10"
            )}
          />
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-6 md:p-8">
        {/* Tag row */}
        <div className="flex items-center gap-2 flex-wrap mb-4">
          <span className="text-xs font-medium text-primary border border-primary/30 rounded-full px-3 py-1">
            {project.tag}
          </span>
          {project.confidential && (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground border border-border rounded-full px-3 py-1">
              <Lock className="w-3 h-3" aria-hidden="true" />
              {t.work.confidentialBadge}
            </span>
          )}
          {project.inProgress && (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent border border-accent/30 rounded-full px-3 py-1">
              <Hammer className="w-3 h-3" aria-hidden="true" />
              {t.work.inProgressBadge}
            </span>
          )}
        </div>

        {/* Outcome headline */}
        <p className="text-lg md:text-xl font-serif font-medium text-foreground leading-snug mb-4 flex-1">
          {project.outcome}
        </p>

        {/* Project name */}
        <p className="text-sm font-medium text-muted-foreground">
          {project.title}
        </p>
      </div>
    </motion.article>
  );

  if (href) {
    return (
      <TransitionLink href={href} className="block h-full">
        {inner}
      </TransitionLink>
    );
  }

  return inner;
};

const Work = () => {
  const { t, locale } = useTranslation();

  const featured: MergedProject[] = workProjects.slice(0, 3).map((p) => ({
    ...p,
    ...(t.work.projects as Record<
      string,
      { title: string; tag: string; outcome: string }
    >)[p.id],
  }));

  return (
    <section id="work" className="section-padding">
      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow={t.work.label}
          heading={t.work.heading}
          lede={t.work.description}
          className="mb-12"
        />

        {/* 3-up project grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {featured.map((project, index) => (
            <WorkCard
              key={project.id}
              project={project}
              index={index}
              variant="fullbleed"
            />
          ))}
        </div>

        <motion.div
          variants={fadeRise}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className={textAlign(locale)}
        >
          <TransitionLink
            href="/work"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground/70 hover:text-foreground transition-colors"
          >
            {t.work.viewAll}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </TransitionLink>
        </motion.div>
      </div>
    </section>
  );
};

export default Work;
