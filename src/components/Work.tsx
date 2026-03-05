"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const projectData = [
  {
    image: "/define-x-about.png",
    color: "from-blue-400/20 to-white-300/20",
    slug: "definex",
  },
  {
    image: "/cashflowAI/cashflowAI.png",
    color: "from-indigo-400/20 to-blue-300/20",
    slug: "cashflowai",
  },
  {
    image: "/cg-landing.png",
    color: "from-amber-400/20 to-orange-300/20",
    slug: "cg-online-academy",
  },
  {
    image: "/chnl301/chnl301-landing.png",
    color: "from-violet-400/20 to-purple-300/20",
    slug: "chnl301",
  },
  {
    image: "/home-hair-coffee/home-hair-landing.png",
    color: "from-stone-400/20 to-amber-300/20",
    slug: "home-hair-coffee",
  },
];

export const ProjectCard = ({
  project,
  index,
}: {
  project: {
    title: string;
    category: string;
    description: string;
    image: string;
  };
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative overflow-hidden rounded-2xl cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end pointer-events-none">
        <span className="text-white/80 text-sm font-medium">
          {project.category}
        </span>
        <div className="flex items-end justify-between">
          <div>
            <h3 className="text-2xl font-serif font-semibold text-white mt-1">
              {project.title}
            </h3>
            <p className="text-white/80 text-sm mt-2 max-w-xs">
              {project.description}
            </p>
          </div>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={
              isHovered ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
            }
            transition={{ duration: 0.3 }}
            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center"
          >
            <ExternalLink className="w-4 h-4 text-primary-foreground" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const Work = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const { t, locale } = useTranslation();

  const projects = t.work.projects.slice(0, 4).map((proj, i) => ({
    ...proj,
    ...projectData[i],
  }));

  const getWorkHref = (slug: string) => {
    return locale === "en" ? `/work/${slug}` : `/ja/work/${slug}`;
  };

  const allWorksHref = locale === "en" ? "/work" : "/ja/work";

  return (
    <section id="work" className="section-padding">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={
            isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
          }
          transition={{ duration: 0.6 }}
          className={cn("max-w-2xl mx-auto mb-16", locale === "ja" ? "text-left" : "text-center")}
        >
          <span className={cn("text-primary text-sm font-medium tracking-wider uppercase mb-4 block", locale === "ja" && "text-center text-base")}>
            {t.work.label}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            {t.work.heading}
          </h2>
          <p className="text-muted-foreground text-lg">{t.work.description}</p>
          <Link
            href={allWorksHref}
            className="inline-flex items-center gap-1.5 text-primary text-sm font-medium hover:underline mt-4"
          >
            {t.work.viewAll}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={project.title}>
              {project.slug ? (
                <Link href={getWorkHref(project.slug)} className="block">
                  <ProjectCard
                    project={{
                      title: project.title,
                      category: project.category,
                      description: project.description,
                      image: project.image,
                    }}
                    index={index}
                  />
                </Link>
              ) : (
                <ProjectCard
                  project={{
                    title: project.title,
                    category: project.category,
                    description: project.description,
                    image: project.image,
                  }}
                  index={index}
                />
              )}
              {project.tags && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
                  className="flex flex-wrap gap-2 mt-4 px-1"
                >
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium text-primary border border-primary/30 rounded-full px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link href={allWorksHref}>
            <Button variant="outline" size="lg" className="gap-2">
              {t.work.viewAll}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Work;
