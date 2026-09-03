"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { useTranslation } from "@/lib/i18n";
import { fadeRise, viewportOnce } from "@/lib/motion";
import {
  headshots,
  testimonialForPath,
  type TestimonialItem,
} from "@/lib/testimonials";
import { cn } from "@/lib/utils";

/**
 * The client's own words, at the foot of the case study they belong to.
 *
 * The home page shows a condensed quote and hides the rest behind a dialog,
 * because the section has to stay short. Here there is room, so the full
 * write-up runs in the open: the reader has just been through the work, and
 * the client's account of it is the last thing they should see.
 *
 * Which testimonial to show comes from the path, the same way WorkPager finds
 * its project, so a page only has to drop the component in and a new
 * testimonial appears on its case study as soon as it is written.
 */
export function ProjectTestimonial() {
  const pathname = usePathname() ?? "";
  const { t, locale } = useTranslation();

  const items = t.testimonials.items as TestimonialItem[];
  const item = testimonialForPath(items, pathname);
  if (!item) return null;

  /* Whatever the client gave us: the labelled write-up when there is one,
     otherwise the quote on its own. */
  const passages = item.sections.length
    ? item.sections
    : [{ label: "", text: item.quote }];

  return (
    <section className="px-6 pb-20">
      <div className="container mx-auto max-w-5xl">
        <motion.h2
          variants={fadeRise}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="type-h2 mb-10 text-foreground"
        >
          {t.workDetail.clientWords}
        </motion.h2>

        <motion.figure
          variants={fadeRise}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          /* Flush left in both locales, unlike the home page section. The
             rest of a case study runs left, and these are long passages:
             centring a four-paragraph write-up gives every line a different
             starting point to find. */
          className="rounded-[1.75rem] border border-border/60 bg-card p-8 text-left md:p-12"
        >
          <div className="flex flex-col gap-8">
            {passages.map((passage, index) => (
              <div key={passage.label || index}>
                {passage.label && (
                  <p className="mb-2 text-xs font-medium tracking-[0.04em] text-primary">
                    {passage.label}
                  </p>
                )}
                <blockquote
                  className={cn(
                    "font-serif text-foreground [text-wrap:pretty]",
                    locale === "ja"
                      ? "text-[1.0625rem] leading-[1.9]"
                      : "text-lg leading-[1.6]",
                  )}
                >
                  {passage.text}
                </blockquote>
              </div>
            ))}
          </div>

          <figcaption className="mt-10 flex items-center gap-4 border-t border-border/60 pt-6">
            <span className="block h-12 w-12 shrink-0 overflow-hidden rounded-full bg-muted">
              <Image
                src={headshots[item.id]}
                alt=""
                aria-hidden
                width={96}
                height={96}
                className="h-full w-full object-cover"
              />
            </span>
            <span className="text-left">
              <span className="block text-[1.0625rem] font-semibold text-foreground">
                {item.name}
              </span>
              <span className="mt-0.5 block text-sm tracking-[0.03em] text-muted-foreground">
                {[item.role, item.company]
                  .filter(Boolean)
                  .join(locale === "ja" ? "、" : ", ")}
              </span>
            </span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
