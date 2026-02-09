"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import { PROJECTS } from "@/lib/constants";

export default function Projects() {
  return (
    <section id="projects">
      <div className="section-header">
        <ScrollReveal>
          <div className="section-kanji">刃</div>
          <h2 className="section-title">Projects</h2>
          <div className="section-line" />
          <div className="section-sub">Battles fought and won</div>
        </ScrollReveal>
      </div>

      <div className="projects-list">
        {PROJECTS.map((project, index) => (
          <ScrollReveal key={index}>
            <div className="project-item">
              <div className="project-image">
                <div className="photo-placeholder">
                  <div className="icon">🖼️</div>
                  <div>Project Screenshot</div>
                  <div style={{ fontSize: "9px", opacity: 0.5 }}>16:10 RATIO</div>
                </div>
              </div>
              <div>
                <div className="project-number">{String(index + 1).padStart(2, "0")}</div>
                <div className="project-title">{project.title}</div>
                <div className="project-desc">{project.description}</div>
                <div className="project-tech">
                  {project.tech.map((tech, i) => (
                    <span key={i}>{tech}</span>
                  ))}
                </div>
                <a href={project.link} className="project-link">
                  View Project →
                </a>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}