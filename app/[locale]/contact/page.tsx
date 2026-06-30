"use client";

import { motion } from "framer-motion";
import { CalendarDays, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const CALENDAR_URL = process.env.NEXT_PUBLIC_CALENDAR_URL || "";

export default function ContactPage() {
  const { t, locale } = useTranslation();

  const handleBookCall = () => {
    if (CALENDAR_URL) {
      window.open(CALENDAR_URL, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Book a call card — only shown when calendar URL is configured */}
      {CALENDAR_URL && (
        <section className="pb-4 px-6">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={cn(
                "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-7 rounded-2xl bg-primary/8 border border-primary/20",
                locale === "ja" ? "text-left" : ""
              )}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CalendarDays className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-serif font-semibold text-foreground text-lg mb-1">
                    {locale === "en" ? "Prefer to talk first?" : "まず話したい場合は"}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {locale === "en"
                      ? "Book a free 30-minute call and we will figure out the best path forward together."
                      : "30分の無料相談をご予約ください。一緒に最善の進め方を考えます。"}
                  </p>
                </div>
              </div>
              <Button
                variant="default"
                onClick={handleBookCall}
                className="group flex-shrink-0"
              >
                {t.bookACall.cta}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </div>
        </section>
      )}

      <Contact />
      <Footer />
    </div>
  );
}
