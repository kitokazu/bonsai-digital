"use client";

import { motion } from "framer-motion";
import { CalendarDays, Mail, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactMethods from "@/components/ContactMethods";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default function ContactPage() {
  const { t, locale } = useTranslation();

  const copy = {
    en: {
      eyebrow: "Free consultation",
      heading: "Let's talk",
      subheading:
        "Send us a message or book a free 30-minute call. No sales pitch, no obligation. We figure out together whether we are a good fit and what the right next step looks like.",
    },
    ja: {
      eyebrow: "無料相談",
      heading: "まずはお話ししましょう",
      subheading:
        "メッセージをお送りいただくか、30分の無料相談をご予約ください。無理な営業は一切しません。お互いに合うかどうかを確かめながら、次の一歩を一緒に考えます。",
    },
  };

  const c = locale === "ja" ? copy.ja : copy.en;

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-36 pb-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left - intro and contact details */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={cn(
                "lg:sticky lg:top-32",
                locale === "ja" ? "text-left" : "text-center lg:text-left"
              )}
            >
              <span className="inline-flex items-center gap-2 text-primary text-sm font-medium tracking-wider uppercase mb-6">
                <CalendarDays className="w-4 h-4" />
                {c.eyebrow}
              </span>
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
                {c.heading}
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
                {c.subheading}
              </p>

              <div
                className={cn(
                  "space-y-6",
                  locale !== "ja" && "max-w-xs mx-auto lg:mx-0 lg:max-w-none"
                )}
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t.contact.emailLabel}
                    </p>
                    <a
                      href="mailto:kaito@bonsaidigitalstudio.com"
                      className="text-foreground font-medium hover:text-primary transition-colors"
                    >
                      kaito@bonsaidigitalstudio.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-left">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t.contact.locationLabel}
                    </p>
                    <p className="text-foreground font-medium">
                      {t.contact.location}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right - message or booking */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <ContactMethods />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
