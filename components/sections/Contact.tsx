"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";

const CONTACT_LINKS = [
  { label: "✉ Email", href: "mailto:hello@samurai.dev" },
  { label: "🐙 GitHub", href: "#" },
  { label: "💼 LinkedIn", href: "#" },
  { label: "𝕏 Twitter", href: "#" },
];

export default function Contact() {
  return (
    <section className="text-center pt-[140px] pb-[60px] relative" id="contact">
      <SectionHeader kanji="道" title="Contact" subtitle="Walk the path together" />

      <ScrollReveal>
        <div className="max-w-[550px] mx-auto px-[50px] max-[900px]:px-6">
          <div className="font-display text-[52px] font-light leading-[1.2] mb-5">
            Let&apos;s build<br />
            something <span className="text-crimson italic">legendary</span>
          </div>
          <div className="text-sm leading-[1.9] text-parchment/40 font-light mb-10">
            Whether you have a project in mind, want to collaborate, or just want to say hello —
            my inbox is always open. The best battles are fought together.
          </div>
          <div className="flex justify-center gap-4 flex-wrap">
            {CONTACT_LINKS.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="relative py-3.5 px-8 border border-parchment/[0.08] text-parchment/70 no-underline text-xs tracking-[3px] uppercase overflow-hidden inline-flex"
                initial="idle"
                whileHover="hovered"
                transition={{ duration: 0.4 }}
              >
                <motion.span
                  className="absolute inset-0 bg-crimson origin-bottom"
                  variants={{
                    idle: { scaleY: 0 },
                    hovered: { scaleY: 1 },
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
                <span className="relative z-[1]">{link.label}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
