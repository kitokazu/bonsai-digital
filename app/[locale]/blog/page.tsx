"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/lib/blog";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { formatBlogDate } from "@/lib/blog-format";

export default function BlogPage() {
  const { t, locale } = useTranslation();
  const base = locale === "en" ? "" : "/ja";

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Header */}
      <section className="pt-36 pb-12 px-6">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={cn(locale === "ja" ? "text-left" : "text-center")}
          >
            <span
              className={cn(
                "text-primary text-sm font-medium tracking-wider uppercase mb-4 block",
                locale === "ja" && "text-base"
              )}
            >
              {t.blog.label}
            </span>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
              {t.blog.heading}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
              {t.blog.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Posts */}
      <section className="pb-24 px-6">
        <div className="container mx-auto max-w-3xl space-y-6">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
            >
              <Link
                href={`${base}/blog/${post.slug}`}
                className="group block bg-card rounded-2xl border border-border/50 card-elevated p-8 md:p-10 transition-shadow"
              >
                <p className="text-sm text-muted-foreground mb-3">
                  {formatBlogDate(post.date, locale)}
                  <span className="mx-2">·</span>
                  {locale === "ja"
                    ? `約${post.readingMinutes}分`
                    : `${post.readingMinutes} min read`}
                </p>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                  {t.blog.readPost}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
