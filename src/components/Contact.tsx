"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { contactFormSchema, type ContactFormData } from "@/lib/schemas/contact";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const { t, locale } = useTranslation();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
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

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="bg-card rounded-2xl p-8 border border-border/50 card-elevated"
            >
              <div className="space-y-6">
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
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
