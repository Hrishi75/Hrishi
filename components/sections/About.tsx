"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

export default function About() {
  return (
    <section className="about" id="about">
      <div className="section-header">
        <ScrollReveal>
          <div className="section-kanji">武</div>
          <h2 className="section-title">About Me</h2>
          <div className="section-line" />
          <div className="section-sub">The warrior behind the screen</div>
        </ScrollReveal>
      </div>

      <div className="about-grid">
        <ScrollReveal>
          <div className="about-photo-stack">
            <div className="about-photo" style={{ width: "280px", height: "380px", top: 0, left: 0, zIndex: 2 }}>
              <div className="photo-placeholder">
                <div className="icon">📸</div>
                <div>Photo 1</div>
                <div style={{ fontSize: "9px", opacity: 0.5 }}>280×380</div>
              </div>
            </div>
            <div className="about-photo" style={{ width: "220px", height: "300px", top: "80px", left: "200px", zIndex: 1, opacity: 0.7 }}>
              <div className="photo-placeholder">
                <div className="icon">📸</div>
                <div>Photo 2</div>
                <div style={{ fontSize: "9px", opacity: 0.5 }}>220×300</div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="about-text">
            <h3>
              A developer who walks <span className="crimson">the path</span>
            </h3>
            <p>
              I am a full-stack developer with a passion for crafting elegant, performant
              digital experiences. Like a samurai hones their blade, I sharpen my skills
              daily — writing clean code, designing intuitive interfaces, and pushing the
              boundaries of what is possible on the web.
            </p>
            <p>
              My philosophy is simple: discipline in craft, precision in execution, and
              an unwavering commitment to quality. Every project is a new battle, and I
              enter each one fully prepared.
            </p>
            <div className="about-details">
              <div className="detail-item">
                <div className="detail-label">Location</div>
                <div className="detail-value">San Francisco, CA</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Experience</div>
                <div className="detail-value">5+ Years</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Specialty</div>
                <div className="detail-value">React & Node.js</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Education</div>
                <div className="detail-value">CS, Stanford</div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}