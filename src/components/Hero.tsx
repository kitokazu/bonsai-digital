"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-background">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-12 flex-1 flex flex-col">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Digital Agency Based in Japan
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-foreground leading-[1.1] mb-6"
          >
            Cultivating Your
            <br />
            <span className="text-gradient">Digital Growth</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            We bridge businesses to the digital world with precision and care.
            Crafting websites and applications that nurture your online presence.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              variant="hero"
              onClick={() => scrollToSection("#contact")}
              className="group"
            >
              Get a Free Quote
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="heroOutline"
              onClick={() => scrollToSection("#work")}
            >
              View Our Work
            </Button>
          </motion.div>
        </div>

        {/* Product Mockup - Animated from bottom */}
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 1, 
            delay: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="relative mt-16 md:mt-20 mx-auto w-full max-w-6xl"
        >
          {/* Glow effect behind the mockup */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-primary/5 to-transparent blur-3xl -z-10 scale-110" />
          
          {/* Shadow and perspective container */}
          <div className="relative">
            {/* Decorative shadow */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-8 bg-foreground/10 blur-2xl rounded-full" />
            
            {/* Main mockup image */}
            <Image
              src="/product-mockup.png"
              alt="Website dashboard mockup showcasing modern web design"
              width={1200}
              height={800}
              className="w-full h-auto rounded-t-xl md:rounded-t-2xl shadow-2xl border border-border/50"
              priority
            />
            
            {/* Fade out gradient at the bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
