"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { PROJECTS } from "@/lib/constants";

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-[140px] relative"
    >
      <SectionHeader kanji="刃" title="Projects" subtitle="Battles fought and won" />

      <div className="flex flex-col gap-20 max-w-[1100px] mx-auto px-[50px] max-[900px]:px-6">
        {PROJECTS.map((project, index) => {
          const isEven = index % 2 === 1;
          return (
            <ScrollReveal key={index}>
              <div
                className={`grid grid-cols-[1.3fr_1fr] gap-[60px] items-center max-[900px]:grid-cols-1 max-[900px]:gap-[30px] ${
                  isEven ? "direction-rtl" : ""
                }`}
                style={isEven ? { direction: "rtl" } : undefined}
              >
                {/* Project image */}
                <motion.div
                  className="w-full aspect-[16/10] border border-parchment/[0.06] overflow-hidden relative group cursor-pointer"
                  style={isEven ? { direction: "ltr" } : undefined}
                  whileHover={{ scale: 1.03, y: -6 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-all duration-600 ease-out group-hover:scale-110 group-hover:brightness-110"
                    sizes="(max-width: 900px) 100vw, 60vw"
                  />
                  {/* Crimson overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-crimson/0 to-transparent opacity-0 group-hover:from-crimson/15 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
                  {/* Bottom gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  {/* Glow border */}
                  <div className="absolute inset-0 border border-crimson/0 group-hover:border-crimson/30 group-hover:shadow-[inset_0_0_30px_rgba(185,28,28,0.08)] transition-all duration-500 pointer-events-none" />
                </motion.div>

                {/* Project details */}
                <div style={isEven ? { direction: "ltr" } : undefined}>
                  <div className="font-display text-[72px] font-light text-crimson/10 leading-none -mb-2.5">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="font-display text-[30px] font-normal mb-3">
                    {project.title}
                  </div>
                  <div className="text-[13.5px] leading-[1.9] text-parchment/40 font-light mb-5">
                    {project.description}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-3 py-[5px] border border-gold/15 text-gold-dim font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <motion.a
                    href={project.link}
                    className="text-xs tracking-[3px] uppercase text-crimson no-underline inline-block"
                    whileHover={{ letterSpacing: "5px" }}
                    transition={{ duration: 0.3 }}
                  >
                    View Project →
                  </motion.a>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
