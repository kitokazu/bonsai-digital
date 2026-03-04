"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n";
import Image from "next/image";

const Footer = () => {
  const { t } = useTranslation();

  const footerLinks = [
    { name: t.navbar.services, href: "#services" },
    { name: t.navbar.work, href: "#work" },
    { name: t.navbar.about, href: "#about" },
    { name: t.navbar.pricing, href: "#pricing" },
    { name: t.navbar.contact, href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <Image
              src="/logo.png"
              alt="Bonsai Digital"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="font-serif text-2xl font-semibold">Bonsai Digital</span>
          </motion.div>

          {/* Links */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-8"
          >
            {footerLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="text-background/70 hover:text-background transition-colors text-sm"
              >
                {link.name}
              </button>
            ))}
          </motion.nav>
        </div>

        {/* Divider */}
        <div className="h-px bg-background/10 my-10" />

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-background/70"
        >
          <p>{t.footer.copyright.replace("{year}", new Date().getFullYear().toString())}</p>
          <p>{t.footer.tagline}</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
