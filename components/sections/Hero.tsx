"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { slashNav } from "@/lib/utils";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const ctaVariants = {
  idle: {},
  hovered: {},
};

const ctaBgVariants = {
  idle: { x: "-101%" },
  hovered: { x: "0%" },
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger parallax
  useGSAP(
    () => {
      if (!photoRef.current || !contentRef.current) return;

      gsap.to(photoRef.current, {
        y: -60,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(contentRef.current, {
        y: -30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="h-screen flex items-center relative overflow-hidden"
    >
      {/* Background gradients */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 80% 50%, rgba(185,28,28,0.08), transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(201,168,76,0.04), transparent 50%)",
        }}
      />

      {/* Ink wash texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "repeating-conic-gradient(rgba(245,240,232,0.01) 0% 25%, transparent 0% 50%) 0 0 / 60px 60px, linear-gradient(180deg, transparent 0%, rgba(10,10,8,0.4) 100%)",
        }}
      />

      {/* Vertical text */}
      <div className="absolute left-[30px] top-1/2 -translate-y-1/2 writing-mode-vertical font-display text-[13px] tracking-[8px] text-parchment/[0.06] uppercase max-[900px]:hidden"
        style={{ writingMode: "vertical-rl" }}
      >
        武士道 · THE WAY OF THE WARRIOR · 武士道
      </div>
      <div className="absolute right-[30px] top-1/2 -translate-y-1/2 font-display text-[13px] tracking-[8px] text-parchment/[0.06] uppercase max-[900px]:hidden"
        style={{ writingMode: "vertical-rl" }}
      >
        CODE · DESIGN · CREATE · REPEAT
      </div>

      {/* Hero content */}
      <div
        ref={contentRef}
        className="pl-[12%] max-w-[700px] relative z-2 max-[900px]:pl-[6%]"
      >
        <motion.div
          {...fadeUp(2.8)}
          className="text-[11px] tracking-[6px] uppercase text-gold-dim mb-5"
        >
          DevSecOps, Full-Stack Developer, Data Development &amp; Devops.
        </motion.div>

        <motion.h1
          {...fadeUp(3.0)}
          className="font-display text-[clamp(52px,7vw,96px)] font-light leading-[1.05] mb-6"
        >
          Engineering  with
          <span className="text-crimson italic relative">
             Precision
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 3.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-[5px] left-0 right-0 h-[2px] bg-crimson origin-left"
            />
          </span>
        </motion.h1>

        <motion.p
          {...fadeUp(3.3)}
          className="text-base leading-[1.8] text-parchment/[0.45] font-light max-w-[480px]"
        >
          Enterprise reliability. Web3 innovation. DevSecOps mindset.
Crafting scalable digital experiences while mastering the infrastructure beneath the
        </motion.p>

        <motion.a
          {...fadeUp(3.6)}
          href="#projects"
          onClick={(e) => slashNav(e, "#projects")}
          initial="idle"
          whileHover="hovered"
          variants={ctaVariants}
          className="inline-flex items-center gap-3 mt-10 px-9 py-3.5 border border-crimson text-parchment no-underline text-xs tracking-[4px] uppercase relative overflow-hidden"
        >
          <motion.span
            variants={ctaBgVariants}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-crimson"
          />
          <span className="relative z-[1]">View My Work →</span>
        </motion.a>
      </div>

      {/* Large decorative kanji */}
      <motion.div
        ref={photoRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 3.4, ease: [0.22, 1, 0.36, 1] as const }}
        className="absolute right-[8%] top-1/2 -translate-y-1/2 flex flex-col items-center max-[900px]:hidden select-none"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <span
            className="font-display text-[280px] leading-none text-crimson/[0.12]"
            style={{ textShadow: "0 0 60px rgba(185,28,28,0.15), 0 0 120px rgba(185,28,28,0.08)" }}
          >
            侍
          </span>
          <span className="text-[10px] tracking-[6px] uppercase text-parchment/[0.12] mt-4 font-mono">
            侍 — Samurai
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
