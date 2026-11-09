"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TransitionLink } from "@/components/nav/TransitionLink";
import { blogPosts } from "@/lib/blog";
import type { BlogCategory, BlogCoverTone, BlogPost } from "@/lib/blog";
import { useTranslation } from "@/lib/i18n";
import { fadeRise, stagger, STAGGER } from "@/lib/motion";
import { firstImage, formatBlogDate, readingMinutes } from "@/lib/blog-format";
import { cn } from "@/lib/utils";

type Topic = "all" | BlogCategory;

const topics: Topic[] = ["all", "systemDesign", "aiTools", "career", "security"];

// Fixed brand tones so the covers read the same in light and dark mode.
const coverTones: Record<BlogCoverTone, string> = {
  sage: "bg-[hsl(150_25%_33%)]",
  terracotta: "bg-[hsl(15_45%_58%)]",
  ink: "bg-[hsl(200_15%_15%)]",
  sand: "bg-[hsl(35_22%_87%)]",
  slate: "bg-[hsl(200_15%_24%)]",
  mist: "bg-[hsl(150_20%_86%)]",
  cream: "bg-[hsl(40_40%_91%)]",
};

// The article's first screenshot, or a solid brand color when it has none.
const CardImage = ({ post }: { post: BlogPost }) => {
  const image = firstImage(post.content);

  if (image) {
    return (
      <div className="h-52 overflow-hidden border-b border-border/50 bg-secondary/40">
        <img
          src={image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover object-left-top transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn("h-52", coverTones[post.coverTone ?? "sand"])}
    />
  );
};

export default function BlogPage() {
  const { t, locale } = useTranslation();
  const [topic, setTopic] = useState<Topic>("all");

  const countFor = (value: Topic) =>
    value === "all"
      ? blogPosts.length
      : blogPosts.filter((post) => post.category === value).length;

  const filtered =
    topic === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.category === topic);

  return (
    <div className="min-h-screen">
      <section className="pt-36 pb-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.h1
            variants={fadeRise}
            initial="hidden"
            animate="visible"
            className="text-sm font-semibold uppercase tracking-[0.16em] text-primary mb-6"
          >
            {t.blog.label}
          </motion.h1>

          <motion.nav
            variants={fadeRise}
            initial="hidden"
            animate="visible"
            aria-label={t.blog.filterLabel}
            className="flex flex-wrap gap-2.5 border-t border-border pt-7 mb-12"
          >
            {topics
              .filter((value) => countFor(value) > 0)
              .map((value) => {
                const active = value === topic;
                return (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setTopic(value)}
                    className={cn(
                      "inline-flex min-h-11 items-center gap-2 rounded-full border-[1.5px] px-5 text-[15px] font-medium transition-colors",
                      active
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-foreground hover:border-foreground"
                    )}
                  >
                    {t.blog.topics[value]}
                    <span className="text-xs opacity-70">{countFor(value)}</span>
                  </button>
                );
              })}
          </motion.nav>

          <motion.div
            key={topic}
            variants={stagger(STAGGER.loose, 0.1)}
            initial="hidden"
            animate="visible"
            className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((post) => (
              <motion.article key={post.slug} variants={fadeRise}>
                <TransitionLink
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-border/50 bg-card card-elevated transition-shadow"
                >
                  <CardImage post={post} />
                  <div className="flex flex-1 flex-col gap-3 p-7">
                    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-muted-foreground">
                      <span className="font-semibold text-[hsl(15_45%_42%)] dark:text-accent">
                        {t.blog.topics[post.category]}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{formatBlogDate(post.date, locale)}</span>
                      <span aria-hidden="true">·</span>
                      <span>
                        {t.blog.minRead.replace("{n}", String(readingMinutes(post.content)))}
                      </span>
                    </p>
                    <h2 className="font-serif text-[27px] font-semibold leading-[1.15] text-foreground transition-colors group-hover:text-primary">
                      {post.title}
                    </h2>
                    <p className="line-clamp-3 text-[15px] leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                  </div>
                </TransitionLink>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
