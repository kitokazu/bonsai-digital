"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    title: "DefineX",
    category: "Sports & Education",
    description:
      "Platform that empowers Japanese athletes with English learning resources",
    image: "/define-x-about.png",
    color: "from-blue-400/20 to-white-300/20",
    href: "/work/definex",
    tags: ["Web design", "Web development", "Payment integration", "Email systems"],
  },
  {
    title: "CashFlowAI",
    category: "Finance & AI",
    description:
      "Internal technical dashboard with AI chatbots, automated reporting, and data visualization",
    image: "/cashflowAI/cashflowAI.png",
    color: "from-indigo-400/20 to-blue-300/20",
    href: "/work/cashflowai",
    tags: ["RAG pipeline", "AI chatbots", "SQL automation", "Dashboard development"],
  },
  {
    title: "CG Online Academy",
    category: "3D Art & Education",
    description:
      "Full redesign of a 3D artist's website with live Three.js model rendering and an integrated course platform with progress tracking",
    image: "/cg-about.jpeg",
    color: "from-amber-400/20 to-orange-300/20",
    href: "/work/cg-online-academy",
    tags: ["Web redesign", "Three.js", "Course platform", "Progress tracking"],
  },
  {
    title: "Chnl301",
    category: "Music & Band",
    description:
      "Custom band website built around a distinctive visual theme that captures the identity and energy of the group",
    image: "/chnl301/chnl301-landing.png",
    color: "from-violet-400/20 to-purple-300/20",
    href: "/work/chnl301",
    tags: ["Web design", "Web development", "Brand identity", "Custom theme"],
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

      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <span className="text-white/80 text-sm font-medium">
          {project.category}
        </span>
        <div className="flex items-end justify-between">
          <div>
            <h3 className="text-2xl font-serif font-semibold text-white mt-1">
              {project.title}
            </h3>
            <p className="text-white/80 text-sm mt-2 max-w-xs">
              {project.description}
            </p>
          </div>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={
              isHovered ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
            }
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
          animate={
            isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
          }
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
            <div key={project.title}>
              {project.href ? (
                <Link href={project.href}>
                  <ProjectCard project={project} index={index} />
                </Link>
              ) : (
                <ProjectCard project={project} index={index} />
              )}
              {project.tags && (
                <div className="flex flex-wrap gap-2 mt-4 px-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium text-primary border border-primary/30 rounded-full px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
