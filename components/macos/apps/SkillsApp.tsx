"use client";

// Tech Stack window — skill cards grouped by domain.
import { DATA } from "../data";
import { Glyph, Squircle } from "../icons";

export function SkillsApp() {
  const skills = DATA.skills;
  return (
    <div className="win-scroll" style={{ padding: "26px 28px 32px" }}>
      <div className="disp" style={{ fontSize: 22, marginBottom: 4 }}>Tech Stack</div>
      <div className="muted" style={{ fontSize: 13.5, marginBottom: 22 }}>The tools I reach for, grouped by domain.</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {skills.map((s) => (
          <div key={s.name} className="card" style={{ padding: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
              <Squircle size={38} bg={`linear-gradient(180deg,${s.tint}, ${s.tint}cc)`}>
                <Glyph name={s.glyph} size={20} color="#fff" stroke={2} />
              </Squircle>
              <div style={{ fontSize: 15.5, fontWeight: 650 }}>{s.name}</div>
            </div>
            <p className="muted" style={{ fontSize: 12.8, lineHeight: 1.55, marginTop: 12 }}>{s.description}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 13 }}>
              {s.tags.map((t) => <span key={t} className="chip chip-mono">{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
