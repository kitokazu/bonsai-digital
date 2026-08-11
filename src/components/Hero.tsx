"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/lib/i18n";
import { localizedPath } from "@/lib/locale-path";
import { cn } from "@/lib/utils";

const projectImages = [
  { key: "influencerAgency", image: "/uncharted/dashboard.png" },
  { key: "enpadel", image: "/enpadel/scroll-poster.jpg" },
  { key: "ecommerceOps", image: "/apex-autowerks/dashboard.png" },
  { key: "milleGrass", image: "/mille-grass/hero.jpg" },
  { key: "employeeManagement", image: "/rolemap/matrix.png" },
  { key: "nicolita", image: "/nicolita/hero.jpg" },
];

function ShowcaseCard({
  title,
  category,
  image,
}: {
  title: string;
  category: string;
  image: string;
}) {
  return (
    <div className="group/card relative w-[340px] md:w-[420px] lg:w-[480px] aspect-[3/2] flex-shrink-0 rounded-xl overflow-hidden border border-border/50 shadow-lg cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] hover:border-primary/30">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover object-top transition-transform duration-500 group-hover/card:scale-105"
        sizes="(min-width: 1024px) 480px, (min-width: 768px) 420px, 340px"
      />
      <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover/card:bg-black/55" />
      <div className="absolute top-0 left-0 right-0 p-4 -translate-y-2 opacity-0 transition-all duration-300 group-hover/card:translate-y-0 group-hover/card:opacity-100">
        <span className="inline-block px-2.5 py-0.5 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium mb-1.5">
          {category}
        </span>
        <p className="text-white font-medium text-sm drop-shadow-md">{title}</p>
      </div>
    </div>
  );
}

const Hero = () => {
  const { t, locale } = useTranslation();
  const router = useRouter();

  const projects = projectImages.map((p) => {
    const proj = t.hero.projects[p.key as keyof typeof t.hero.projects];
    return { title: proj.title, category: proj.category, image: p.image };
  });

  const scrollToSection = (href: string) => {
    if (!href.startsWith("#")) {
      router.push(localizedPath(href, locale));
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-background">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-12">
        <div className={cn("max-w-4xl mx-auto", locale === "ja" ? "text-left" : "text-center")}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={cn("inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8", locale === "ja" && "flex w-fit mx-auto")}
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            {t.hero.badge}
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={cn("text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-foreground leading-[1.1] mb-6", locale === "ja" && "text-[clamp(1.6rem,8.2vw,2.25rem)] sm:text-4xl md:text-6xl lg:text-7xl text-left mx-auto w-fit")}
          >
            {t.hero.headline1}
            <br />
            <span className="text-gradient">{t.hero.headline2}</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {t.hero.subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              variant="hero"
              onClick={() => scrollToSection("/contact")}
              className="group"
            >
              {t.hero.cta1}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="heroOutline"
              onClick={() => scrollToSection("/work")}
            >
              {t.hero.cta2}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Project Showcase Marquee — full viewport width */}
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 1,
          delay: 0.5,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="relative mt-8 md:mt-12 w-full"
      >
        {/* Marquee track */}
        <div
          className="flex gap-5 animate-marquee motion-reduce:[animation-play-state:paused]"
          style={{ width: "max-content" }}
        >
          {/* Render twice for seamless loop */}
          {[...projects, ...projects].map((project, i) => (
            <ShowcaseCard key={`${project.title}-${i}`} {...project} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
