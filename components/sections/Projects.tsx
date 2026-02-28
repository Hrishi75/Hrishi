"use client";

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
                <div
                  className="w-full aspect-[16/10] border border-parchment/[0.06] overflow-hidden relative"
                  style={isEven ? { direction: "ltr" } : undefined}
                >
                  <div
                    className="w-full h-full flex flex-col items-center justify-center text-parchment/[0.15] text-xs tracking-[3px] uppercase"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--smoke) 0%, rgba(42,42,37,0.5) 100%)",
                    }}
                  >
                    <div className="text-[40px] opacity-30">🖼️</div>
                    <div>Project Screenshot</div>
                    <div className="text-[9px] opacity-50">16:10 RATIO</div>
                  </div>
                </div>

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
