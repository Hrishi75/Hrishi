"use client";

// Welcome / boot window.
import { DATA } from "../data";
import { Glyph } from "../icons";
import type { OpenFn } from "../types";
import { Avatar } from "./Avatar";

export function WelcomeApp({ open }: { open: OpenFn }) {
  const p = DATA.profile;
  return (
    <div className="win-scroll" style={{ padding: 0 }}>
      <div style={{ padding: "40px 48px 36px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <Avatar size={104} />
        <div className="disp" style={{ fontSize: 30, marginTop: 22 }}>{p.name}</div>
        <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--accent)", marginTop: 8, letterSpacing: "0.01em" }}>{p.role}</div>
        <div className="disp" style={{ fontSize: 23, marginTop: 26, maxWidth: 440, fontWeight: 600 }}>{p.headline}</div>
        <p className="muted" style={{ fontSize: 14.5, lineHeight: 1.6, maxWidth: 432, marginTop: 12 }}>{p.tagline}</p>
        <div style={{ display: "flex", gap: 10, marginTop: 28 }}>
          <button className="btn-accent" onClick={() => open("projects")}>
            <Glyph name="briefcase" size={15} color="#fff" stroke={2} /> View Projects
          </button>
          <button className="tb-pill" style={{ padding: "8px 16px" }} onClick={() => open("contact")}>
            <Glyph name="mail" size={15} stroke={1.8} /> Get in touch
          </button>
        </div>
      </div>
      <div style={{ display: "flex", borderTop: "0.5px solid var(--hair-soft)" }}>
        {([["6", "Skill domains"], ["3", "Featured projects"], ["2+", "Years experience"]] as const).map(([n, l], i) => (
          <div key={i} style={{ flex: 1, padding: "18px 10px", textAlign: "center", borderLeft: i ? "0.5px solid var(--hair-soft)" : "none" }}>
            <div className="disp" style={{ fontSize: 24 }}>{n}</div>
            <div className="muted-2" style={{ fontSize: 11.5, marginTop: 3 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
