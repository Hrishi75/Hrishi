"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { SKILLS } from "@/lib/constants";

const cardVariants = {
  idle: {
    y: 0,
    borderColor: "rgba(245,240,232,0.04)",
    backgroundColor: "rgba(245,240,232,0.02)",
  },
  hovered: {
    y: -4,
    borderColor: "rgba(185,28,28,0.15)",
    backgroundColor: "rgba(245,240,232,0.03)",
  },
};

const lineVariants = {
  idle: { scaleX: 0 },
  hovered: { scaleX: 1 },
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-[140px] relative"
      style={{
        background:
          "radial-gradient(ellipse at 70% 50%, rgba(185,28,28,0.04), transparent 50%)",
      }}
    >
      <SectionHeader kanji="技" title="Tech Stack" subtitle="The weapons in my arsenal" />

      <div className="grid grid-cols-3 gap-6 max-w-[1000px] mx-auto px-[50px] max-[900px]:grid-cols-1 max-[900px]:px-6">
        {SKILLS.map((skill, index) => (
          <ScrollReveal key={index} delay={index * 100}>
            <motion.div
              initial="idle"
              whileHover="hovered"
              variants={cardVariants}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden border border-parchment/[0.04] p-[30px] cursor-none max-[1024px]:cursor-auto"
            >
              {/* Top crimson line on hover */}
              <motion.div
                variants={lineVariants}
                transition={{ duration: 0.6 }}
                className="absolute top-0 left-0 w-full h-[2px] origin-center"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, var(--crimson), transparent)",
                }}
              />

              <span className="text-[28px] mb-4 block">{skill.icon}</span>
              <div className="font-display text-xl font-normal mb-2">
                {skill.name}
              </div>
              <div className="text-[12.5px] leading-[1.7] text-parchment/[0.35] font-light">
                {skill.description}
              </div>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {skill.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2.5 py-1 border border-parchment/[0.06] text-parchment/40 font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
