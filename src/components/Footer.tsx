"use client";

import Image from "next/image";

import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { TransitionLink } from "@/components/nav/TransitionLink";
import { useTranslation } from "@/lib/i18n";
import { STAGGER } from "@/lib/motion";

const Footer = () => {
  const { t } = useTranslation();

  const footerLinks = [
    { name: t.navbar.whatWeDo, href: "#services" },
    { name: t.navbar.work, href: "/work" },
    { name: t.navbar.about, href: "#about" },
    { name: t.navbar.book, href: "/contact" },
  ];

  return (
    <footer className="bg-foreground py-16 text-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <Reveal blur={false}>
            <TransitionLink href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt=""
                width={40}
                height={40}
                className="h-10 w-10"
              />
              <span className="font-serif text-2xl font-semibold">
                Bonsai Digital
              </span>
            </TransitionLink>
          </Reveal>

          <RevealGroup
            as="ul"
            each={STAGGER.tight}
            className="flex flex-wrap items-center justify-center gap-8"
          >
            {footerLinks.map((link) => (
              <RevealItem as="li" key={link.name}>
                <TransitionLink
                  href={link.href}
                  className="text-sm text-background/70 transition-colors hover:text-background"
                >
                  {link.name}
                </TransitionLink>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <div className="my-10 h-px bg-background/10" />

        <Reveal
          blur={false}
          delay={0.1}
          className="flex flex-col items-center justify-between gap-4 text-sm text-background/70 md:flex-row"
        >
          <p>
            {t.footer.copyright.replace(
              "{year}",
              new Date().getFullYear().toString(),
            )}
          </p>
          <p>{t.footer.tagline}</p>
        </Reveal>
      </div>
    </footer>
  );
};

export default Footer;
