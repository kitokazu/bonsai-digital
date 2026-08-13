"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { SectionHeading } from "@/components/layout/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { useTranslation } from "@/lib/i18n";
import { STAGGER } from "@/lib/motion";
import { cn } from "@/lib/utils";

const FAQ = () => {
  const { t, locale } = useTranslation();
  const faq = t.faq;

  return (
    <section id="faq" className="section-padding">
      <div className="container mx-auto px-6 max-w-3xl">
        <SectionHeading
          eyebrow={faq.label}
          heading={faq.heading}
          align="start"
          className="max-w-none mb-12"
        />

        <RevealGroup as="div" each={STAGGER.tight}>
          <AccordionPrimitive.Root type="single" collapsible>
            {faq.items.map((item, i) => (
                <RevealItem key={i}>
                  <AccordionPrimitive.Item
                    value={`item-${i}`}
                    className={cn(
                      "border-b border-border/60",
                      i === 0 && "border-t border-border/60"
                    )}
                  >
                    <AccordionPrimitive.Header className="flex">
                      <AccordionPrimitive.Trigger
                        className={cn(
                          "group flex flex-1 items-center justify-between gap-4 py-5 text-left font-medium text-foreground transition-colors hover:text-primary [&[data-state=open]>svg]:rotate-180",
                          locale === "ja" ? "text-[15px]" : "text-base"
                        )}
                      >
                        {item.question}
                        <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300" />
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
                </RevealItem>
              )
            )}
          </AccordionPrimitive.Root>
        </RevealGroup>
      </div>
    </section>
  );
};

export default FAQ;
