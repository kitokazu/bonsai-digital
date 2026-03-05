"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const PricingCard = ({
  plan,
  index,
}: {
  plan: {
    name: string;
    subtitle: string;
    price: string;
    priceSubtext?: string;
    features: { text: string; included: boolean }[];
    cta: string;
    ctaHref: string;
    highlighted?: boolean;
    badge?: string;
  };
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative p-8 rounded-2xl border ${
        plan.highlighted
          ? "bg-foreground text-background border-primary lg:scale-105 order-first lg:order-none"
          : "bg-card card-elevated border-border/50"
      }`}
    >
      {plan.badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-medium px-4 py-1 rounded-full">
          {plan.badge}
        </span>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-serif font-semibold mb-1">{plan.name}</h3>
        <p className={plan.highlighted ? "text-background/70" : "text-muted-foreground"}>
          {plan.subtitle}
        </p>
      </div>

      <div className="mb-8">
        <span className="text-4xl font-serif font-bold">{plan.price}</span>
        {plan.priceSubtext && (
          <span className={`text-sm ml-2 ${plan.highlighted ? "text-background/70" : "text-muted-foreground"}`}>
            {plan.priceSubtext}
          </span>
        )}
      </div>

      <ul className="space-y-3 mb-8">
        {plan.features.map((feature) => (
          <li key={feature.text} className="flex items-start gap-3 text-sm">
            {feature.included ? (
              <Check className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlighted ? "text-green-400" : "text-green-600"}`} />
            ) : (
              <Circle className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlighted ? "text-background/30" : "text-muted-foreground/40"}`} />
            )}
            <span className={
              feature.included
                ? ""
                : `line-through ${plan.highlighted ? "text-background/40" : "text-muted-foreground/50"}`
            }>
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      <Button
        variant={plan.highlighted ? "hero" : "outline"}
        className="w-full"
        onClick={() => scrollToSection(plan.ctaHref)}
      >
        {plan.cta}
      </Button>
    </motion.div>
  );
};

const Pricing = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const { t, locale } = useTranslation();

  return (
    <section id="pricing" className="section-padding bg-secondary/30">
      <div className="container mx-auto px-6">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className={cn("max-w-2xl mx-auto mb-16", locale === "ja" ? "text-left" : "text-center")}
        >
          <span className={cn("text-primary text-sm font-medium tracking-wider uppercase mb-4 block", locale === "ja" && "text-center text-base")}>
            {t.pricing.label}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            {t.pricing.heading}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t.pricing.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {t.pricing.plans.map((plan, index) => (
            <PricingCard key={plan.name} plan={plan} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
