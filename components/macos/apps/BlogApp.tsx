"use client";

// Notes-style blog window — post list + reader.
import React from "react";
import { DATA } from "../data";

export function BlogApp() {
  const posts = DATA.posts;
  const [sel, setSel] = React.useState(0);
  const post = posts[sel];
  return (
    <div className="win-body">
      <div className="sidebar" style={{ width: 230, padding: "6px 6px" }}>
        <div className="sb-head">Writing</div>
        {posts.map((po, i) => (
          <div
            key={po.title}
            onClick={() => setSel(i)}
            style={{ padding: "9px 11px", borderRadius: 8, cursor: "pointer", marginBottom: 2, background: i === sel ? "var(--accent)" : "transparent" }}
          >
            <div style={{ fontSize: 13, fontWeight: 600, color: i === sel ? "#fff" : "var(--ink)", lineHeight: 1.3, marginBottom: 3 }}>{po.title}</div>
            <div style={{ fontSize: 11.5, color: i === sel ? "rgba(255,255,255,0.85)" : "var(--ink-4)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {po.date} · {po.excerpt}
            </div>
          </div>
        ))}
      </div>
      <div className="win-scroll" style={{ padding: "30px 36px" }}>
        <div className="muted-2" style={{ fontSize: 12, fontFamily: "var(--mono)" }}>{post.date} · {post.readTime} read</div>
        <div className="disp" style={{ fontSize: 26, marginTop: 10, lineHeight: 1.15 }}>{post.title}</div>
        <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
          {post.tags.map((t) => <span key={t} className="chip">{t}</span>)}
        </div>
        <hr className="divider" style={{ margin: "22px 0" }} />
        <p className="muted" style={{ fontSize: 15, lineHeight: 1.75 }}>{post.excerpt}</p>
        <p className="muted" style={{ fontSize: 15, lineHeight: 1.75, marginTop: 16 }}>
          A full write-up is on the way. In the meantime, the notes here capture the core ideas —
          reach out if you&apos;d like to go deeper on any of them.
        </p>
        <div style={{ marginTop: 22 }}>
          <span className="chip" style={{ color: "var(--ink-4)" }}>Draft · coming soon</span>
        </div>
      </div>
    </div>
  );
}
