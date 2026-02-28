"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { BLOG_POSTS } from "@/lib/constants";

const cardVariants = {
  idle: {
    y: 0,
    borderColor: "rgba(245,240,232,0.04)",
    backgroundColor: "rgba(10,10,8,0.6)",
  },
  hovered: {
    y: -4,
    borderColor: "rgba(185,28,28,0.15)",
    backgroundColor: "rgba(10,10,8,0.7)",
  },
};

const lineVariants = {
  idle: { scaleX: 0 },
  hovered: { scaleX: 1 },
};

const arrowVariants = {
  idle: { x: 0 },
  hovered: { x: 4 },
};

export default function Blogs() {
  return (
    <section
      id="blogs"
      className="py-[140px] relative"
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, rgba(42,42,37,0.5), transparent 60%)",
      }}
    >
      <SectionHeader
        kanji="筆"
        title="Blog"
        subtitle="Thoughts from the path"
      />

      <div className="grid grid-cols-2 gap-6 max-w-[1000px] mx-auto px-[50px] max-[900px]:grid-cols-1 max-[900px]:px-6">
        {BLOG_POSTS.map((post, index) => (
          <ScrollReveal key={index} delay={index * 100}>
            <motion.a
              href={post.link}
              initial="idle"
              whileHover="hovered"
              variants={cardVariants}
              transition={{ duration: 0.5 }}
              className="relative block overflow-hidden border border-parchment/[0.04] p-8 no-underline cursor-none max-[1024px]:cursor-auto"
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

              {/* Date + read time */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[11px] tracking-[2px] uppercase text-gold-dim font-mono">
                  {post.date}
                </span>
                <span className="text-parchment/[0.15]">|</span>
                <span className="text-[11px] tracking-[1px] text-parchment/30 font-mono">
                  {post.readTime}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display text-xl font-normal mb-3 text-parchment">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-[12.5px] leading-[1.8] text-parchment/[0.4] font-light mb-5">
                {post.excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {post.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2.5 py-1 border border-parchment/[0.06] text-parchment/40 font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Read more */}
              <div className="flex items-center gap-2 text-[11px] tracking-[3px] uppercase text-crimson">
                <span>Read More</span>
                <motion.span variants={arrowVariants} transition={{ duration: 0.3 }}>
                  &rarr;
                </motion.span>
              </div>
            </motion.a>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
