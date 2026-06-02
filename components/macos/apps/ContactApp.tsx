"use client";

// Mail-compose-style contact window.
import { DATA } from "../data";
import { Glyph, Squircle } from "../icons";

export function ContactApp() {
  const c = DATA.contact;
  return (
    <div className="win-scroll" style={{ padding: 0 }}>
      <div style={{ padding: "28px 32px 8px" }}>
        <div className="disp" style={{ fontSize: 24 }}>Let&apos;s build something.</div>
        <p className="muted" style={{ fontSize: 14, lineHeight: 1.6, marginTop: 8 }}>
          Have a project in mind, want to collaborate, or just want to say hello? My inbox is always open.
        </p>
      </div>
      <div style={{ padding: "10px 18px" }}>
        {c.links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 14px", borderRadius: 10, textDecoration: "none" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.04)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <Squircle size={38} bg="linear-gradient(180deg,#f4f5f7,#e3e6ec)" shadow={false}>
              <Glyph name={l.glyph === "github" || l.glyph === "linkedin" || l.glyph === "x" ? "external" : l.glyph} size={18} color="var(--ink-2)" stroke={1.8} />
            </Squircle>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{l.label}</div>
              <div className="muted" style={{ fontSize: 12.5 }}>{l.value}</div>
            </div>
            <Glyph name="arrow" size={16} color="var(--ink-4)" stroke={1.8} />
          </a>
        ))}
      </div>
      <div style={{ padding: "8px 22px 26px" }}>
        <a className="btn-accent" href={`mailto:${c.email}`} style={{ textDecoration: "none", width: "100%", justifyContent: "center", padding: "11px" }}>
          <Glyph name="mail" size={16} color="#fff" stroke={2} /> Compose an email
        </a>
      </div>
    </div>
  );
}
