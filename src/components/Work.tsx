"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Sakura Wellness",
    category: "Health & Wellness",
    description: "A modern booking platform for a wellness spa chain",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
    color: "from-rose-400/20 to-amber-300/20",
  },
  {
    title: "Nori Restaurant",
    category: "Food & Beverage",
    description: "E-commerce and reservation system for a restaurant group",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80",
    color: "from-emerald-400/20 to-teal-300/20",
  },
  {
    title: "Kaizen Tech",
    category: "Technology",
    description: "Corporate website for a leading software consultancy",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    color: "from-blue-400/20 to-indigo-300/20",
  },
  {
    title: "Mono Studio",
    category: "Creative Agency",
    description: "Portfolio and project management platform",
    image: "https://images.unsplash.com/photo-1493421419110-74f4e85ba126?w=800&q=80",
    color: "from-violet-400/20 to-purple-300/20",
  },
];

const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative overflow-hidden rounded-2xl cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Overlay */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-t ${project.color} to-transparent`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0.3 }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-foreground/70 text-sm font-medium">
            {project.category}
          </span>
        </motion.div>
        <div className="flex items-end justify-between">
          <div>
            <h3 className="text-2xl font-serif font-semibold text-foreground mt-1">
              {project.title}
            </h3>
            <motion.p
              className="text-foreground/70 text-sm mt-2 max-w-xs"
              initial={{ y: 20, opacity: 0 }}
              animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              {project.description}
            </motion.p>
          </div>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isHovered ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center"
          >
            <ExternalLink className="w-4 h-4 text-primary-foreground" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const Work = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="work" className="section-padding">
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
            Our Work
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Projects We're Proud Of
          </h2>
          <p className="text-muted-foreground text-lg">
            Each project is carefully crafted to meet unique business needs and
            exceed expectations.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
