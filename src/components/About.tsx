"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Leaf, Target, Heart } from "lucide-react";

const values = [
  {
    icon: Leaf,
    title: "Patience & Precision",
    description:
      "Like cultivating a bonsai, we take time to understand your needs and craft solutions with meticulous attention to detail.",
  },
  {
    icon: Target,
    title: "Results-Driven",
    description:
      "Every design decision and line of code serves a purpose—helping your business achieve its goals.",
  },
  {
    icon: Heart,
    title: "Long-term Partnership",
    description:
      "We don't just build and leave. We nurture lasting relationships to support your continued growth.",
  },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-primary/5">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
              About Us
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
              Bridging Businesses to the Digital World
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Based in Japan with American roots, Bonsai Digital was founded on
              the belief that every business deserves a beautiful, functional
              digital presence. We understand the challenges of going online and
              make the journey as seamless as possible.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our name reflects our philosophy: just as a bonsai requires
              patience, skill, and dedication to flourish, so does building a
              meaningful digital presence. We take the time to understand your
              vision and nurture it into reality.
            </p>
          </motion.div>

          {/* Right - Values */}
          <div className="space-y-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="flex gap-5 p-6 rounded-2xl bg-card border border-border/50 card-elevated"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
