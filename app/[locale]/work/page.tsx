"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ProjectCard, projectData } from "@/components/Work";
import { useTranslation } from "@/lib/i18n";

export default function AllWorksPage() {
  const { t, locale } = useTranslation();
  const homeHref = locale === "en" ? "/" : "/ja";

  const projects = t.work.projects.map((proj, i) => ({
    ...proj,
    ...projectData[i],
  }));

  const getWorkHref = (slug: string) => {
    return locale === "en" ? `/work/${slug}` : `/ja/work/${slug}`;
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href={homeHref}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">{t.workDetail.backToWork}</span>
            </Link>

            <span className="text-primary text-sm font-medium tracking-wider uppercase block mb-4">
              {t.work.label}
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              {t.work.allWorksHeading}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              {t.work.allWorksDescription}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
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
                  <div className="flex flex-wrap gap-2 mt-4 px-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium text-primary border border-primary/30 rounded-full px-3 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
