"use client";

import { useEffect } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { FILE_STRUCTURE, TECH_STACK } from "@/lib/constants";

const iconMap: Record<string, string> = {
  folder: "📁",
  tsx: "⚛️",
  ts: "🔷",
  css: "🎨",
  json: "📋",
  md: "📝",
  img: "🖼️",
  config: "⚙️",
};

export default function Architecture() {
  useEffect(() => {
    const panel = document.getElementById("file-tree-panel");
    if (!panel) return;

    FILE_STRUCTURE.forEach((f) => {
      const line = document.createElement("div");
      line.className = "tree-line";
      line.style.setProperty("--indent", String(f.depth));
      line.innerHTML = `
        <span class="tree-icon">${iconMap[f.type] || "📄"}</span>
        <span class="tree-name ${f.type}">${f.name}</span>
        ${f.comment ? `<span class="tree-comment">${f.comment}</span>` : ""}
      `;
      panel.appendChild(line);
    });
  }, []);

  return (
    <section className="architecture" id="architecture">
      <div className="section-header">
        <ScrollReveal>
          <div className="section-kanji">構</div>
          <h2 className="section-title">Architecture</h2>
          <div className="section-line" />
          <div className="section-sub">The structure behind the craft</div>
        </ScrollReveal>
      </div>

      <div className="arch-container">
        <ScrollReveal>
          <div className="arch-panel">
            <div className="arch-panel-header">
              <div className="arch-dots">
                <div className="arch-dot r" />
                <div className="arch-dot y" />
                <div className="arch-dot g" />
              </div>
              <span className="arch-panel-title">~/portfolio — File Tree</span>
            </div>
            <div className="arch-body" id="file-tree-panel" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="arch-panel">
            <div className="arch-panel-header">
              <div className="arch-dots">
                <div className="arch-dot r" />
                <div className="arch-dot y" />
                <div className="arch-dot g" />
              </div>
              <span className="arch-panel-title">stack.config — Tech Breakdown</span>
            </div>
            <div className="arch-body">
              <div style={{ color: "rgba(245,240,232,0.25)", marginBottom: "12px" }}>
                samurai-portfolio tech stack
              </div>
              {TECH_STACK.map((category, index) => (
                <div key={index} style={{ marginBottom: "16px" }}>
                  <div style={{ color: "var(--gold)", marginBottom: "6px" }}>
                    {category.icon} {category.title}
                  </div>
                  {category.items.map((item, i) => (
                    <div key={i} className="tree-line" style={{ "--indent": 1 } as any}>
                      <span className={`tree-name ${item.type}`}>{item.name}</span>
                      <span className="tree-comment">{item.comment}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}