"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

import { Magnetic } from "@/components/motion/Magnetic";
import { MaskHeading } from "@/components/motion/MaskHeading";
import { TransitionLink } from "@/components/nav/TransitionLink";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";
import { blurFadeRise, DURATION, EASE, stagger, STAGGER } from "@/lib/motion";
import { cn, textAlign } from "@/lib/utils";
import { workProjects } from "@/lib/work";

/* The six most recent projects, in the order they should ride past. Images are
   chosen for how they read at card size, so they do not always match the still
   used on the work index. */
const showcase = [
  { key: "influencerAgency", image: "/uncharted/dashboard.png" },
  { key: "enpadel", image: "/enpadel/scroll-poster.jpg" },
  { key: "ecommerceOps", image: "/apex-autowerks/dashboard.png" },
  { key: "milleGrass", image: "/mille-grass/hero.jpg" },
  { key: "employeeManagement", image: "/rolemap/matrix.png" },
  { key: "nicolita", image: "/nicolita/hero.jpg" },
] as const;

interface ShowcaseItem {
  title: string;
  category: string;
  image: string;
  slug?: string;
}

function ShowcaseCard({
  project,
  duplicate,
}: {
  project: ShowcaseItem;
  duplicate: boolean;
}) {
  const card = (
    <>
      <Image
        src={project.image}
        alt={duplicate ? "" : project.title}
        fill
        className="object-cover object-top transition-transform duration-700 group-hover/card:scale-[1.04]"
        sizes="(min-width: 1024px) 480px, (min-width: 768px) 420px, 340px"
      />

      {/* Caption panel rises out of the bottom edge on hover, rather than the
          old full-card black wash. */}
      <div className="absolute inset-x-0 bottom-0 translate-y-full opacity-0 transition-all duration-500 ease-expo group-hover/card:translate-y-0 group-hover/card:opacity-100">
        <div className="bg-gradient-to-t from-black/85 to-transparent px-5 pb-4 pt-10">
          <span className="text-xs font-medium uppercase tracking-widest text-white/70">
            {project.category}
          </span>
          <p className="mt-1 font-serif text-lg text-white">{project.title}</p>
        </div>
      </div>
    </>
  );

  const className =
    "group/card relative w-[340px] md:w-[420px] lg:w-[480px] aspect-[3/2] flex-shrink-0 overflow-hidden rounded-xl border border-border/50 shadow-lg transition-[transform,box-shadow,opacity,filter] duration-500 hover:shadow-2xl hover:!opacity-100 hover:!blur-0 group-hover/track:opacity-40 group-hover/track:blur-[1px]";

  if (!project.slug) {
    return <div className={className}>{card}</div>;
  }

  /* The second pass of the track is what makes the loop seamless, so it stays
     clickable, but it is hidden from assistive tech and taken out of the tab
     order: the same six projects should only be announced once. */
  return (
    <TransitionLink
      href={`/work/${project.slug}`}
      className={className}
      aria-hidden={duplicate || undefined}
      tabIndex={duplicate ? -1 : undefined}
    >
      {card}
    </TransitionLink>
  );
}

const Hero = () => {
  const { t, locale } = useTranslation();
  const ref = useRef<HTMLElement>(null);

  const projects: ShowcaseItem[] = showcase.map((entry) => {
    const copy = t.hero.projects[entry.key as keyof typeof t.hero.projects];
    return {
      title: copy.title,
      category: copy.category,
      image: entry.image,
      slug: workProjects.find((project) => project.id === entry.key)?.slug,
    };
  });

  /* The copy drifts up and dissolves as the section leaves, so the marquee
     takes over the frame instead of the whole block sliding away together. */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-background"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

      <motion.div
        style={{ y: copyY, opacity: copyOpacity }}
        className="relative z-10 container mx-auto px-6 pb-12 pt-32"
      >
        <div className={cn("mx-auto max-w-4xl", textAlign(locale))}>
          <motion.div
            variants={stagger(STAGGER.base, 0.1)}
            initial="hidden"
            animate="visible"
          >
            {/* inline-flex, so the wrapper's text-align places it: centred in
                English, flush left in Japanese. */}
            <motion.span
              variants={blurFadeRise}
              className="mb-8 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
            >
              <span className="h-2 w-2 rounded-full bg-primary motion-safe:animate-pulse" />
              {t.hero.badge}
            </motion.span>
          </motion.div>

          {/*
            Transform-only reveal, on purpose. This heading is the LCP element,
            and Chrome skips `opacity: 0` nodes when picking its candidate, so
            fading it in would add the whole delay plus duration to the score.
          */}
          <MaskHeading
            as="h1"
            trigger="mount"
            delay={0.18}
            each={STAGGER.tight}
            text={`${t.hero.headline1}\n${t.hero.headline2}`}
            accent={[t.hero.headline2]}
            // Two masks, one per line. Splitting the first line per word would
            // stagger "Cultivating" ahead of "Your" and pull the eye sideways
            // before the gradient line lands.
            split="lines"
            className="type-display mb-6 text-foreground"
          />

          <motion.div
            variants={stagger(STAGGER.base, 0.5)}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              variants={blurFadeRise}
              className={cn(
                "type-lede mb-10 max-w-2xl",
                locale === "ja" ? "" : "mx-auto",
              )}
            >
              {t.hero.subheadline}
            </motion.p>

            <motion.div
              variants={blurFadeRise}
              className={cn(
                "flex flex-col gap-4 sm:flex-row",
                locale === "ja" ? "items-start" : "items-center justify-center",
              )}
            >
              <Magnetic>
                <Button asChild variant="hero" className="group">
                  <TransitionLink href="/contact">
                    {t.hero.cta1}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </TransitionLink>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button asChild variant="heroOutline">
                  <TransitionLink href="/work">{t.hero.cta2}</TransitionLink>
                </Button>
              </Magnetic>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Project showcase, full viewport width */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION.long + 0.2, delay: 0.6, ease: EASE.expoOut }}
        className="relative mt-8 w-full md:mt-12"
      >
        {/* Feathered edges, so cards leave the frame instead of being sliced
            off by the viewport. */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent md:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent md:w-28" />

        {/* Hovering the track dims every card except the one under the cursor
            and holds the scroll, so a project can actually be read. */}
        <div
          className="group/track flex w-max gap-5 animate-marquee hover:[animation-play-state:paused] motion-reduce:[animation-play-state:paused]"
          style={{ ["--marquee-duration" as string]: "72s" }}
        >
          {[...projects, ...projects].map((project, index) => (
            <ShowcaseCard
              key={`${project.title}-${index}`}
              project={project}
              duplicate={index >= projects.length}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
