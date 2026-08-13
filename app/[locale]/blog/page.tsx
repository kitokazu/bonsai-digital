"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { TransitionLink } from "@/components/nav/TransitionLink";
import { blogPosts } from "@/lib/blog";
import { useTranslation } from "@/lib/i18n";
import { fadeRise, stagger, STAGGER } from "@/lib/motion";
import { formatBlogDate } from "@/lib/blog-format";

export default function BlogPage() {
  const { t, locale } = useTranslation();

  return (
    <div className="min-h-screen">
      <section className="pt-36 pb-12 px-6">
        <div className="container mx-auto max-w-3xl">
          <SectionHeading
            eyebrow={t.blog.label}
            heading={t.blog.heading}
            lede={t.blog.description}
            as="h1"
            trigger="mount"
          />
        </div>
      </section>

      <section className="pb-24 px-6">
        <motion.div
          variants={stagger(STAGGER.loose, 0.3)}
          initial="hidden"
          animate="visible"
          className="container mx-auto max-w-3xl space-y-6"
        >
          {blogPosts.map((post) => (
            <motion.article key={post.slug} variants={fadeRise}>
              <TransitionLink
                href={`/blog/${post.slug}`}
                className="group block bg-card rounded-2xl border border-border/50 card-elevated p-8 md:p-10 transition-shadow"
              >
                <p className="text-sm text-muted-foreground mb-3">
                  {formatBlogDate(post.date, locale)}
                </p>
                <h2 className="type-h3 text-foreground mb-3 transition-colors group-hover:text-primary">
                  {post.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                  {t.blog.readPost}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </TransitionLink>
            </motion.article>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
