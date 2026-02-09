"use client";

import { slashNav } from "@/lib/utils";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="ink-wash" />
      <div className="vertical-text left">武士道 · THE WAY OF THE WARRIOR · 武士道</div>
      <div className="vertical-text right">CODE · DESIGN · CREATE · REPEAT</div>

      <div className="hero-content">
        <div className="hero-pre">Full-Stack Developer & Designer</div>
        <h1 className="hero-title">
          The Way of<br />
          <span className="accent">Clean Code</span>
        </h1>
        <p className="hero-sub">
          Discipline in craft. Precision in execution. Building digital experiences
          with the focus and dedication of a samurai walking the path.
        </p>
        <a
          href="#projects"
          className="hero-cta"
          onClick={(e) => slashNav(e, "#projects")}
        >
          <span>View My Work →</span>
        </a>
      </div>

      <div className="hero-photo">
        <div className="hero-photo-frame" />
        {/* REPLACE: Add your photo here */}
        <div className="photo-placeholder">
          <div className="icon">⛩️</div>
          <div>Your Photo Here</div>
          <div style={{ fontSize: "9px", opacity: 0.5 }}>HERO — 380×520</div>
        </div>
      </div>
    </section>
  );
}