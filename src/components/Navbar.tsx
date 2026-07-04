"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, locale } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/" || pathname === "/en" || pathname === "/ja";

  const navLinks = [
    { name: t.navbar.about, href: "#about" },
    { name: t.navbar.work, href: "/work" },
    { name: t.navbar.whatWeDo, href: "#services" },
    { name: t.navbar.blog, href: "/blog" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    if (!href.startsWith("#")) {
      const path = locale === "en" ? href : `/ja${href}`;
      router.push(path);
    } else if (isHome) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      const base = locale === "en" ? "/" : "/ja";
      router.push(`${base}${href}`);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-lg shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="relative flex items-center justify-between h-20">
            {/* Logo */}
            <a
              href="#"
              className="flex items-center gap-3 text-foreground hover:opacity-80 transition-opacity"
              onClick={(e) => {
                e.preventDefault();
                if (isHome) {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                } else {
                  const base = locale === "en" ? "/" : "/ja";
                  router.push(base);
                }
              }}
            >
              <Image
                src="/logo.png"
                alt="Bonsai Digital"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="font-serif text-xl font-bold">
                Bonsai Digital
              </span>
            </a>

            {/* Desktop Navigation — absolutely centered */}
            <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-foreground/70 hover:text-foreground transition-colors link-underline text-sm font-semibold"
                >
                  {link.name}
                </button>
              ))}
              <Button
                variant="default"
                onClick={() => scrollToSection("/contact")}
              >
                {t.navbar.cta}
              </Button>
            </div>

            {/* Language Switcher */}
            <div className="hidden md:flex items-center">
              <LanguageSwitcher />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background pt-20 md:hidden"
          >
            <div className="flex flex-col items-center gap-8 p-8">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(link.href)}
                  className="text-2xl font-serif text-foreground"
                >
                  {link.name}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col items-center gap-4"
              >
                <LanguageSwitcher />
                <Button
                  variant="hero"
                  onClick={() => scrollToSection("/contact")}
                >
                  {t.navbar.cta}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
