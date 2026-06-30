"use client";

import { motion } from "framer-motion";
import { CalendarDays, ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const CALENDAR_URL = process.env.NEXT_PUBLIC_CALENDAR_URL || "";

export default function ContactPage() {
  const { locale } = useTranslation();

  const copy = {
    en: {
      eyebrow: "Free consultation",
      heading: "Let's talk",
      subheading:
        "Book a free 30-minute call. No sales pitch, no obligation. We figure out together whether we are a good fit and what the right next step looks like.",
      calendarHeading: "Pick a time",
      calendarPlaceholder: "Calendar booking will appear here once configured.",
      calendarCta: "Open scheduling link",
      emailHeading: "Prefer email?",
      emailDescription:
        "Send us a message and we will get back to you within 24 hours.",
      emailCta: "Send an email",
    },
    ja: {
      eyebrow: "無料相談",
      heading: "まず話しましょう",
      subheading:
        "30分の無料相談をご予約ください。セールスなし、義務なし。お互いに合うかどうかを確認し、次のステップを一緒に考えます。",
      calendarHeading: "日程を選ぶ",
      calendarPlaceholder: "カレンダー予約は設定後にここに表示されます。",
      calendarCta: "予約リンクを開く",
      emailHeading: "メールの方がよければ",
      emailDescription:
        "メッセージをお送りいただければ、24時間以内にご返信いたします。",
      emailCta: "メールを送る",
    },
  };

  const c = locale === "ja" ? copy.ja : copy.en;

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-36 pb-16 px-6">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={cn(locale === "ja" ? "text-left" : "text-center")}
          >
            <span
              className={cn(
                "inline-flex items-center gap-2 text-primary text-sm font-medium tracking-wider uppercase mb-6",
                locale === "ja" ? "" : "mx-auto"
              )}
            >
              <CalendarDays className="w-4 h-4" />
              {c.eyebrow}
            </span>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
              {c.heading}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
              {c.subheading}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calendar */}
      <section className="pb-16 px-6">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <p
              className={cn(
                "text-sm font-medium text-foreground mb-4",
                locale === "ja" ? "text-left" : "text-center"
              )}
            >
              {c.calendarHeading}
            </p>

            {CALENDAR_URL ? (
              <div className="rounded-2xl border border-border overflow-hidden">
                <iframe
                  src={CALENDAR_URL}
                  className="w-full"
                  style={{ height: "660px", border: "none" }}
                  title="Book a call"
                />
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-border/60 bg-secondary/30 flex flex-col items-center justify-center gap-6 py-20 px-8 text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <CalendarDays className="w-7 h-7 text-primary" />
                </div>
                <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
                  {c.calendarPlaceholder}
                </p>
                <Button
                  variant="default"
                  className="group"
                  onClick={() =>
                    window.open(
                      "https://cal.com",
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                >
                  {c.calendarCta}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Email fallback */}
      <section className="pb-24 px-6">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className={cn(
              "flex flex-col sm:flex-row items-start gap-4 p-6 rounded-2xl bg-secondary/40 border border-border/50",
              locale === "ja" ? "" : "sm:items-center"
            )}
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground text-sm mb-0.5">
                {c.emailHeading}
              </p>
              <p className="text-muted-foreground text-sm">
                {c.emailDescription}
              </p>
            </div>
            <a href="mailto:kaitokazu.dev@gmail.com">
              <Button
                variant="outline"
                size="sm"
                className="flex-shrink-0 whitespace-nowrap"
              >
                {c.emailCta}
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
