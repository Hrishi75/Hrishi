"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";

const DETAILS = [
  { label: "Location", value: "Nagpur, India" },
  { label: "Experience", value: "2+ Years" },
  { label: "Specialty", value: "React, Node.js, Web3 & Typescript" },
  { label: "Education", value: "CS, BITS" },
];

export default function About() {
  return (
    <section
      className="py-[140px] relative"
      id="about"
      style={{ background: "radial-gradient(ellipse at 20% 30%, rgba(201,168,76,0.03), transparent 50%)" }}
    >
      <SectionHeader kanji="武" title="About Me" subtitle="The warrior behind the screen" />

      <div className="grid grid-cols-[1fr_1.2fr] gap-20 max-w-[1100px] mx-auto px-[50px] items-center max-[900px]:grid-cols-1 max-[900px]:gap-10 max-[900px]:px-6">
        <ScrollReveal>
          <div className="flex items-center justify-center h-[400px] max-[900px]:h-[280px]">
            <svg
              viewBox="0 0 300 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[280px] h-[280px] max-[900px]:w-[220px] max-[900px]:h-[220px]"
            >
              {/* Enso circle — brush stroke */}
              <motion.circle
                cx="150"
                cy="150"
                r="120"
                stroke="var(--crimson)"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
                opacity="0.7"
                strokeDasharray="0 8 12 8"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 0.92, opacity: 0.7 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 2, ease: "easeOut" }}
                style={{ filter: "drop-shadow(0 0 12px rgba(185,28,28,0.3))" }}
              />
              {/* Inner subtle ring */}
              <motion.circle
                cx="150"
                cy="150"
                r="95"
                stroke="var(--gold)"
                strokeWidth="1"
                fill="none"
                opacity="0"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.15 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 2.5, delay: 0.5, ease: "easeOut" }}
              />
              {/* Center kanji — 道 (the way) */}
              <motion.text
                x="150"
                y="165"
                textAnchor="middle"
                fontFamily="var(--font-display)"
                fontSize="64"
                fill="var(--parchment)"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 1.5 }}
              >
                道
              </motion.text>
            </svg>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div>
            <h3 className="font-display text-[28px] font-normal mb-5">
              A developer who walks <span className="text-crimson">the path</span>
            </h3>
            <p className="text-[14.5px] leading-8 text-parchment/[0.55] font-light mb-4">
              I’m a Full-Stack Developer and DevSecOps enthusiast with a strong foundation in enterprise infrastructure.<br/>

Currently working as an Analyst at HCLTech, I support VMware virtualization and Windows Server environments, ensuring performance, uptime, and operational excellence across production systems.<br/>


            </p>
            <p className="text-[14.5px] leading-8 text-parchment/[0.55] font-light mb-4">
              Outside my core role, I build secure, scalable web and Web3 applications — exploring smart contracts, blockchain integrations, and modern frontend frameworks. Like a samurai honing his blade, I refine my skills daily — mastering automation, cloud, security, and decentralized technologies.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-[30px]">
              {DETAILS.map((detail) => (
                <div key={detail.label} className="py-3.5 border-b border-parchment/[0.04]">
                  <div className="text-[10px] tracking-[3px] uppercase text-gold-dim mb-1">
                    {detail.label}
                  </div>
                  <div className="text-sm text-parchment/80 font-normal">
                    {detail.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
