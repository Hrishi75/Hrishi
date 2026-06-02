"use client";

// About window — banner, avatar, bio, detail rows.
import { DATA } from "../data";
import { Avatar } from "./Avatar";

export function AboutApp() {
  const p = DATA.profile;
  return (
    <div className="win-scroll">
      <div style={{ height: 96, background: "linear-gradient(120deg,#bcd9ff,#e7d6ff 60%,#ffd9c2)" }} />
      <div style={{ padding: "0 36px 36px" }}>
        {/* Avatar overlaps the banner; name sits cleanly below (no overlap). */}
        <div style={{ marginTop: -46, display: "flex" }}>
          <div style={{ padding: 4, background: "var(--win-solid)", borderRadius: 26, boxShadow: "0 4px 14px rgba(0,0,0,0.12)", flexShrink: 0 }}>
            <Avatar size={84} />
          </div>
        </div>
        <div style={{ marginTop: 14 }}>
          <div className="disp" style={{ fontSize: 24 }}>{p.name}</div>
          <div className="muted" style={{ fontSize: 13.5, marginTop: 4 }}>
            {p.handle} · {p.details.find((d) => d.label === "Location")?.value ?? ""}
          </div>
        </div>

        <p className="muted" style={{ fontSize: 14.5, lineHeight: 1.7, marginTop: 24 }}>{p.bio[0]}</p>
        <p className="muted" style={{ fontSize: 14.5, lineHeight: 1.7, marginTop: 14 }}>{p.bio[1]}</p>

        <div className="card" style={{ marginTop: 26, overflow: "hidden" }}>
          {p.details.map((d, i) => (
            <div key={d.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 16px", borderTop: i ? "0.5px solid var(--hair-soft)" : "none" }}>
              <span className="muted" style={{ fontSize: 13.5 }}>{d.label}</span>
              <span style={{ fontSize: 13.5, fontWeight: 500, color: "var(--ink)" }}>{d.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
