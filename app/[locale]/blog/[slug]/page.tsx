"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ArrowLeft, ImageIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getBlogPost } from "@/lib/blog";
import { formatBlogDate } from "@/lib/blog-format";
import { useTranslation } from "@/lib/i18n";

const ArticleImage = ({ src, alt }: { src: string; alt: string }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <figure className="my-10">
        <div className="w-full aspect-[16/9] rounded-2xl border border-dashed border-border/70 bg-secondary/40 flex flex-col items-center justify-center gap-3">
          <ImageIcon className="w-8 h-8 text-muted-foreground/40" />
          <span className="text-sm text-muted-foreground/60">{alt}</span>
        </div>
      </figure>
    );
  }

  return (
    <figure className="my-10">
      <img
        src={src}
        alt={alt}
        className="w-full rounded-2xl border border-border/50 shadow-sm"
        onError={() => setFailed(true)}
      />
      <figcaption className="mt-3 text-sm text-muted-foreground text-center">
        {alt}
      </figcaption>
    </figure>
  );
};

// Inline [text](url) links inside a paragraph.
const renderInline = (text: string) => {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, index) => {
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <a
          key={index}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-medium underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors"
        >
          {linkMatch[1]}
        </a>
      );
    }
    return part;
  });
};

// Minimal markdown renderer for blog content: ## / ### headings,
// ![alt](src) images, [text](url) links, and paragraphs separated by
// blank lines.
const renderContent = (content: string) => {
  return content.split(/\n\n+/).map((block, index) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    if (trimmed.startsWith("### ")) {
      return (
        <h3
          key={index}
          className="font-serif text-xl md:text-2xl font-bold text-foreground mt-10 mb-4"
        >
          {trimmed.slice(4)}
        </h3>
      );
    }

    if (trimmed.startsWith("## ")) {
      return (
        <h2
          key={index}
          className="font-serif text-2xl md:text-3xl font-bold text-foreground mt-12 mb-5"
        >
          {trimmed.slice(3)}
        </h2>
      );
    }

    const imageMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imageMatch) {
      return <ArticleImage key={index} alt={imageMatch[1]} src={imageMatch[2]} />;
    }

    return (
      <p
        key={index}
        className="text-base md:text-lg text-foreground/80 leading-relaxed mb-6"
      >
        {renderInline(trimmed)}
      </p>
    );
  });
};

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const { t, locale } = useTranslation();
  const post = getBlogPost(params.slug);
  const base = locale === "en" ? "" : "/ja";

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <article className="pt-36 pb-24 px-6">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href={`${base}/blog`}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-10"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.blog.back}
            </Link>

            <p className="text-sm text-muted-foreground mb-4">
              {formatBlogDate(post.date, locale)}
            </p>

            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground leading-tight mb-10">
              {post.title}
            </h1>

            <div>{renderContent(post.content)}</div>
          </motion.div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
