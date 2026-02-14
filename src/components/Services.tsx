"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, Code2, Palette, Rocket, LineChart, Shield } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Website Design",
    description:
      "Beautiful, responsive websites that capture your brand essence and convert visitors into customers.",
  },
  {
    icon: Code2,
    title: "Web Applications",
    description:
      "Custom web applications built with modern technologies to streamline your business operations.",
  },
  {
    icon: Palette,
    title: "Brand Identity",
    description:
      "Cohesive visual identities that tell your story and resonate with your target audience.",
  },
  {
    icon: Rocket,
    title: "Digital Strategy",
    description:
      "Strategic planning to establish and grow your digital presence effectively.",
  },
  {
    icon: LineChart,
    title: "SEO & Analytics",
    description:
      "Data-driven optimization to improve visibility and measure what matters.",
  },
  {
    icon: Shield,
    title: "Maintenance & Support",
    description:
      "Ongoing care to keep your digital assets secure, updated, and performing.",
  },
];

const ServiceCard = ({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group p-8 rounded-2xl bg-card card-elevated border border-border/50"
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
        <service.icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-xl font-serif font-semibold text-foreground mb-3">
        {service.title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        {service.description}
      </p>
    </motion.div>
  );
};

const Services = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="services" className="section-padding bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            Our Services
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Everything You Need to Grow Online
          </h2>
          <p className="text-muted-foreground text-lg">
            From concept to launch and beyond, we provide comprehensive digital
            solutions tailored to your business needs.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
