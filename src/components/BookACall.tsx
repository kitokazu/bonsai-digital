"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

// Replace with your calendar booking URL (e.g. Calendly, Cal.com)
const CALENDAR_URL = process.env.NEXT_PUBLIC_CALENDAR_URL || "";

const BookACall = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { t, locale } = useTranslation();
  const router = useRouter();

  const handleBookCall = () => {
    if (CALENDAR_URL) {
      window.open(CALENDAR_URL, "_blank", "noopener,noreferrer");
    } else {
      router.push(locale === "en" ? "/contact" : "/ja/contact");
    }
  };

  const handleSendMessage = () => {
    router.push(locale === "en" ? "/contact" : "/ja/contact");
  };

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-foreground border-y border-primary/20 py-20 md:py-28"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className={cn(
            "inline-flex items-center gap-2 mb-6",
            locale === "ja" ? "flex w-fit mx-auto" : ""
          )}
        >
          <CalendarDays className="w-4 h-4 text-primary" />
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            {t.bookACall.eyebrow}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-background leading-[1.1] mb-6"
        >
          {t.bookACall.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-background/55 text-lg leading-relaxed mb-10 max-w-xl mx-auto"
        >
          {t.bookACall.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button variant="hero" onClick={handleBookCall} className="group">
            {t.bookACall.cta}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <button
            onClick={handleSendMessage}
            className="text-background/50 hover:text-background/80 text-sm font-medium transition-colors underline underline-offset-4"
          >
            {t.bookACall.ctaAlt}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default BookACall;
