"use client";

// Projects window — Finder-style gallery with sidebar.
import React from "react";
import { DATA } from "../data";
import { Glyph } from "../icons";

export function ProjectsApp() {
  const projects = DATA.projects;
  const [sel, setSel] = React.useState(0);
  const p = projects[sel];
  return (
    <div className="win-body">
      <div className="sidebar">
        <div className="sb-head">Portfolio</div>
        {projects.map((pr, i) => (
          <div key={pr.title} className={"sb-item" + (i === sel ? " active" : "")} onClick={() => setSel(i)}>
            <span className="si"><Glyph name="briefcase" size={15} stroke={1.8} /></span>
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{pr.title}</span>
          </div>
        ))}
        <div className="sb-head" style={{ marginTop: 10 }}>Links</div>
        <a className="sb-item" href="https://github.com/Hrishi75" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
          <span className="si"><Glyph name="external" size={14} stroke={1.8} /></span> All on GitHub
        </a>
      </div>
      <div className="win-scroll" style={{ padding: 22 }}>
        <div style={{ borderRadius: 12, overflow: "hidden", border: "0.5px solid var(--hair-soft)", boxShadow: "0 6px 22px rgba(0,0,0,0.12)", aspectRatio: "16/10", background: "#0e1116" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.image} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginTop: 20, gap: 14 }}>
          <div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--accent)", letterSpacing: "0.02em" }}>{p.kind}</div>
            <div className="disp" style={{ fontSize: 22, marginTop: 5 }}>{p.title}</div>
          </div>
          <a className="btn-accent" href={p.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", flexShrink: 0 }}>
            Open <Glyph name="external" size={14} color="#fff" stroke={2} />
          </a>
        </div>
        <p className="muted" style={{ fontSize: 14, lineHeight: 1.65, marginTop: 14 }}>{p.description}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 18 }}>
          {p.tech.map((t) => <span key={t} className="chip chip-mono">{t}</span>)}
        </div>
      </div>
    </div>
  );
}
