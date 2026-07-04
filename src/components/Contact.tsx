"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, MapPin } from "lucide-react";
import ContactMethods from "@/components/ContactMethods";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t, locale } = useTranslation();

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left - Info */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6 }}
          >
            <span className={cn("text-primary text-sm font-medium tracking-wider uppercase mb-4 block", locale === "ja" && "text-base")}>
              {t.contact.label}
            </span>
            <h2 className={cn("text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 leading-tight", locale === "ja" && "md:text-[2.75rem]")}>
              {t.contact.heading}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              {t.contact.description}
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t.contact.emailLabel}</p>
                  <a
                    href="mailto:kaito@bonsaidigitalstudio.com"
                    className="text-foreground font-medium hover:text-primary transition-colors"
                  >
                    kaito@bonsaidigitalstudio.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t.contact.locationLabel}</p>
                  <p className="text-foreground font-medium">{t.contact.location}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Message or booking */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ContactMethods />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
