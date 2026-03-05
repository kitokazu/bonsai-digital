"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, LayoutDashboard, Sparkles } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const icons = [Globe, LayoutDashboard, Sparkles];

const ServiceCard = ({
  service,
  index,
  icon: Icon,
}: {
  service: { title: string; description: string; features: string[] };
  index: number;
  icon: typeof Globe;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group p-8 rounded-2xl bg-card card-elevated border border-border/50"
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-xl font-serif font-semibold text-foreground mb-3">
        {service.title}
      </h3>
      <p className="text-muted-foreground leading-relaxed mb-6">
        {service.description}
      </p>
      <ul className="space-y-2">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-center text-sm text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mr-3" />
            {feature}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const Services = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const { t, locale } = useTranslation();

  return (
    <section id="services" className="section-padding bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className={cn("max-w-2xl mx-auto mb-16", locale === "ja" ? "text-left" : "text-center")}
        >
          <span className={cn("text-primary text-sm font-medium tracking-wider uppercase mb-4 block", locale === "ja" && "text-center text-base")}>
            {t.services.label}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            {t.services.heading}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t.services.description}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.services.items.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
              icon={icons[index]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
