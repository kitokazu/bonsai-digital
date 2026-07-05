"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CalendarDays, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { contactFormSchema, type ContactFormData } from "@/lib/schemas/contact";

const CALENDAR_URL = process.env.NEXT_PUBLIC_CALENDAR_URL || "";
const SCHEDULING_FALLBACK = "https://cal.com";

type Mode = "message" | "booking";

const ContactMethods = ({ className }: { className?: string }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [mode, setMode] = useState<Mode>("booking");

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", company: "", message: "" },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed");

      toast({
        title: t.contact.toast.title,
        description: t.contact.toast.description,
      });
      form.reset();
    } catch {
      toast({
        title: t.contact.toast.errorTitle,
        description: t.contact.toast.errorDescription,
        variant: "destructive",
      });
    }
  };

  const getErrorMessage = (message?: string) => {
    if (!message) return undefined;
    return t.contact.validation[message as keyof typeof t.contact.validation];
  };

  const tabs: { id: Mode; label: string; Icon: typeof Mail }[] = [
    { id: "booking", label: t.contact.tabs.booking, Icon: CalendarDays },
    { id: "message", label: t.contact.tabs.message, Icon: MessageSquare },
  ];

  return (
    <div
      className={cn(
        "bg-card rounded-2xl p-6 sm:p-8 border border-border/50 card-elevated",
        className
      )}
    >
      {/* Toggle between sending a message and booking a call */}
      <div
        role="tablist"
        aria-label={t.contact.label}
        className="relative grid grid-cols-2 gap-1 rounded-xl bg-secondary/60 p-1"
      >
        {tabs.map(({ id, label, Icon }) => {
          const active = mode === id;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setMode(id)}
              className={cn(
                "relative z-10 flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {active && (
                <motion.span
                  layoutId="contact-method-pill"
                  className="absolute inset-0 -z-10 rounded-lg bg-card shadow-sm ring-1 ring-border/50"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <Icon className="w-4 h-4" />
              {label}
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        <AnimatePresence mode="wait" initial={false}>
          {mode === "message" ? (
            <motion.form
              key="message"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    {t.contact.form.name}
                  </label>
                  <Input
                    id="name"
                    placeholder={t.contact.form.namePlaceholder}
                    className="bg-background"
                    {...form.register("name")}
                  />
                  {form.formState.errors.name && (
                    <p className="text-sm text-destructive mt-1">
                      {getErrorMessage(form.formState.errors.name.message)}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    {t.contact.form.email}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t.contact.form.emailPlaceholder}
                    className="bg-background"
                    {...form.register("email")}
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-destructive mt-1">
                      {getErrorMessage(form.formState.errors.email.message)}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {t.contact.form.company}
                </label>
                <Input
                  id="company"
                  placeholder={t.contact.form.companyPlaceholder}
                  className="bg-background"
                  {...form.register("company")}
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {t.contact.form.message}
                </label>
                <Textarea
                  id="message"
                  placeholder={t.contact.form.messagePlaceholder}
                  rows={5}
                  className="bg-background resize-none"
                  {...form.register("message")}
                />
                {form.formState.errors.message && (
                  <p className="text-sm text-destructive mt-1">
                    {getErrorMessage(form.formState.errors.message.message)}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                variant="hero"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  t.contact.form.submitting
                ) : (
                  <>
                    {t.contact.form.submit}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </motion.form>
          ) : (
            <motion.div
              key="booking"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t.contact.booking.description}
              </p>

              {CALENDAR_URL ? (
                <div className="rounded-xl border border-border overflow-hidden">
                  <iframe
                    src={CALENDAR_URL}
                    className="w-full border-0 h-[640px] md:h-[720px]"
                    title={t.contact.booking.title}
                  />
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-border/60 bg-secondary/30 flex flex-col items-center justify-center gap-5 py-14 px-6 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <CalendarDays className="w-7 h-7 text-primary" />
                  </div>
                  <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
                    {t.contact.booking.placeholder}
                  </p>
                  <Button
                    variant="default"
                    className="group"
                    onClick={() =>
                      window.open(
                        SCHEDULING_FALLBACK,
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                  >
                    {t.contact.booking.cta}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ContactMethods;
