"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import { SKILLS } from "@/lib/constants";

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="section-header">
        <ScrollReveal>
          <div className="section-kanji">技</div>
          <h2 className="section-title">Tech Stack</h2>
          <div className="section-line" />
          <div className="section-sub">The weapons in my arsenal</div>
        </ScrollReveal>
      </div>

      <div className="skills-grid">
        {SKILLS.map((skill, index) => (
          <ScrollReveal key={index} delay={index * 100}>
            <div className="skill-card">
              <span className="skill-icon">{skill.icon}</span>
              <div className="skill-name">{skill.name}</div>
              <div className="skill-desc">{skill.description}</div>
              <div className="skill-tags">
                {skill.tags.map((tag, i) => (
                  <span key={i} className="skill-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}