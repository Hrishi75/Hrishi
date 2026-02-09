"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="section-header">
        <ScrollReveal>
          <div className="section-kanji">道</div>
          <h2 className="section-title">Contact</h2>
          <div className="section-line" />
          <div className="section-sub">Walk the path together</div>
        </ScrollReveal>
      </div>

      <ScrollReveal>
        <div className="contact-content">
          <div className="contact-large">
            Let's build<br />
            something <span className="crimson">legendary</span>
          </div>
          <div className="contact-desc">
            Whether you have a project in mind, want to collaborate, or just want to say hello —
            my inbox is always open. The best battles are fought together.
          </div>
          <div className="contact-links">
            <a href="mailto:hello@samurai.dev" className="contact-link">
              <span>✉ Email</span>
            </a>
            <a href="#" className="contact-link">
              <span>🐙 GitHub</span>
            </a>
            <a href="#" className="contact-link">
              <span>💼 LinkedIn</span>
            </a>
            <a href="#" className="contact-link">
              <span>𝕏 Twitter</span>
            </a>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}