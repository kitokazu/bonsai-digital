"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const FAQ = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { t, locale } = useTranslation();
  const faq = (t as any).faq;

  return (
    <section id="faq" className="section-padding">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <span
            className={cn(
              "text-primary text-sm font-medium tracking-wider uppercase mb-4 block",
              locale === "ja" && "text-base"
            )}
          >
            {faq.label}
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-12 text-left">
            {faq.heading}
          </h2>

          <AccordionPrimitive.Root type="single" collapsible>
            {faq.items.map(
              (item: { question: string; answer: string }, i: number) => (
                <AccordionPrimitive.Item
                  key={i}
                  value={`item-${i}`}
                  className={cn(
                    "border-b border-border/60",
                    i === 0 && "border-t border-border/60"
                  )}
                >
                  <AccordionPrimitive.Header className="flex">
                    <AccordionPrimitive.Trigger
                      className={cn(
                        "group flex flex-1 items-center justify-between py-5 font-medium text-foreground text-left transition-colors hover:text-primary [&[data-state=open]>svg]:rotate-180",
                        locale === "ja" ? "text-[15px]" : "text-base"
                      )}
                    >
                      {item.question}
                      <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ml-4" />
                    </AccordionPrimitive.Trigger>
                  </AccordionPrimitive.Header>
                  <AccordionPrimitive.Content className="overflow-hidden text-muted-foreground data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <p
                      className={cn(
                        "pb-5 leading-relaxed",
                        locale === "ja" ? "text-[14px]" : "text-sm"
                      )}
                    >
                      {item.answer}
                    </p>
                  </AccordionPrimitive.Content>
                </AccordionPrimitive.Item>
              )
            )}
          </AccordionPrimitive.Root>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
