"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Magnetic } from "@/components/motion/Magnetic";
import { TransitionLink } from "@/components/nav/TransitionLink";
import { Button } from "@/components/ui/button";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { useTranslation } from "@/lib/i18n";
import { DURATION, EASE, maskRise, stagger, STAGGER } from "@/lib/motion";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const { t } = useTranslation();
  const pathname = usePathname() ?? "/";

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const navLinks = [
    { name: t.navbar.about, href: "#about" },
    { name: t.navbar.work, href: "/work" },
    { name: t.navbar.whatWeDo, href: "#services" },
    { name: t.navbar.education, href: "/education" },
  ];

  /* Driven off the scroll motion value rather than a scroll listener, so the
     reads stay batched into the frame instead of firing setState per event. */
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setIsScrolled(y > 20);
  });

  // Close the panel on navigation, and hand focus back to the button that
  // opened it.
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useScrollLock(isMenuOpen);

  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  return (
    <>
      {/* Stays put while scrolling: it only slides in once on mount and
          swaps to a frosted surface once the page is under it. */}
      <motion.header
        initial={{ y: "-100%" }}
        animate={{ y: "0%" }}
        transition={{ duration: DURATION.short, ease: EASE.expoOut }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow,border-color] duration-300",
          isScrolled || isMenuOpen
            ? "bg-background/85 backdrop-blur-xl border-b border-border/60"
            : "bg-transparent border-b border-transparent",
        )}
      >
        <div className="container mx-auto px-6">
          <div className="relative flex items-center justify-between h-20">
            <TransitionLink
              href="/"
              className="flex items-center gap-3 text-foreground transition-opacity hover:opacity-70"
            >
              <Image
                src="/logo.png"
                alt=""
                width={32}
                height={32}
                className="w-8 h-8"
                priority
              />
              <span className="font-serif text-xl font-bold">
                Bonsai Digital
              </span>
            </TransitionLink>

            {/* Desktop navigation, optically centred in the bar */}
            <nav
              className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2"
              aria-label={t.chrome.menu}
            >
              {navLinks.map((link) => (
                <TransitionLink
                  key={link.name}
                  href={link.href}
                  className="link-underline text-sm font-semibold text-foreground/70 hover:text-foreground transition-colors aria-[current=page]:text-foreground"
                >
                  {link.name}
                </TransitionLink>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <LanguageSwitcher />
              <Magnetic>
                <Button asChild>
                  <TransitionLink href="/contact">{t.navbar.cta}</TransitionLink>
                </Button>
              </Magnetic>
            </div>

            <button
              ref={menuButtonRef}
              type="button"
              className="md:hidden -mr-2 p-2 text-foreground"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? t.chrome.closeMenu : t.chrome.openMenu}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: DURATION.base, ease: EASE.inOutQuint }}
            className="fixed inset-0 z-40 bg-background pt-24 md:hidden"
          >
            <motion.nav
              variants={stagger(STAGGER.loose, 0.15)}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-2 px-8"
              aria-label={t.chrome.menu}
            >
              {navLinks.map((link) => (
                <span className="mask-line" key={link.name}>
                  <motion.span variants={maskRise} className="block">
                    <TransitionLink
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-3 font-serif text-4xl text-foreground"
                    >
                      {link.name}
                    </TransitionLink>
                  </motion.span>
                </span>
              ))}
            </motion.nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: DURATION.base }}
              className="mt-10 flex flex-col items-start gap-5 px-8"
            >
              <Button asChild variant="hero" className="w-full">
                <TransitionLink
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t.navbar.cta}
                </TransitionLink>
              </Button>
              <LanguageSwitcher />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
