"use client";

// Safari-style browser. Frame-friendly sites load inline; search + blocked
// sites (Google et al. send X-Frame-Options) open in a real new tab.
import React from "react";
import { DATA } from "../data";
import { Glyph } from "../icons";

interface Fav { label: string; href: string }

const FAVS: Fav[] = [
  { label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Wiki" }, // embeds inline
  ...DATA.projects.map((p) => ({ label: p.title, href: p.link })),
  ...DATA.contact.links.filter((l) => l.glyph !== "mail").map((l) => ({ label: l.label, href: l.href })),
];

const hostOf = (url: string): string => {
  try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return url; }
};

// "looks like a URL" vs a search query
const isUrlLike = (q: string): boolean =>
  /^https?:\/\//i.test(q) || /^[\w-]+(\.[\w-]+)+(\/.*)?$/.test(q);

const normalize = (q: string): string => (/^https?:\/\//i.test(q) ? q : "https://" + q);

function Favicon({ href }: { href: string }) {
  const [err, setErr] = React.useState(false);
  const host = hostOf(href);
  const initial = host.charAt(0).toUpperCase();
  return (
    <div className="sf-fav">
      {!err ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=64`}
          alt=""
          width={28}
          height={28}
          onError={() => setErr(true)}
        />
      ) : (
        <span>{initial}</span>
      )}
    </div>
  );
}

function StartPage({ onOpen }: { onOpen: (url: string) => void }) {
  return (
    <div className="sf-start">
      <div className="disp" style={{ fontSize: 24 }}>Favorites</div>
      <div className="muted" style={{ fontSize: 13.5, marginTop: 6 }}>
        Jump into my live work, or type above to search the web.
      </div>
      <div className="sf-grid">
        {FAVS.map((f) => (
          <button key={f.href} className="sf-tile" onClick={() => onOpen(f.href)}>
            <Favicon href={f.href} />
            <span className="sf-tile-label">{f.label}</span>
            <span className="sf-tile-host">{hostOf(f.href)}</span>
          </button>
        ))}
      </div>
      <div className="sf-note">
        Tip: some sites (Google, GitHub, X…) block embedding — those open in a new tab via the ↗ button.
      </div>
    </div>
  );
}

export function BrowserApp() {
  // Single nav state keeps the history stack and cursor consistent.
  const [nav, setNav] = React.useState<{ stack: string[]; i: number }>({ stack: [""], i: 0 });
  const [addr, setAddr] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [reloadKey, setReloadKey] = React.useState(0);

  const cur = nav.stack[nav.i];
  const canBack = nav.i > 0;
  const canFwd = nav.i < nav.stack.length - 1;

  // Sync address bar + loading state whenever the active entry changes.
  React.useEffect(() => {
    setAddr(cur);
    setLoading(!!cur);
  }, [cur, reloadKey]);

  // Safety: clear the loading bar even if a blocked iframe never fires onLoad.
  React.useEffect(() => {
    if (!loading) return;
    const t = setTimeout(() => setLoading(false), 7000);
    return () => clearTimeout(t);
  }, [loading, cur, reloadKey]);

  const goTo = (target: string) => {
    setNav((n) => {
      const stack = n.stack.slice(0, n.i + 1).concat(target);
      return { stack, i: stack.length - 1 };
    });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = addr.trim();
    if (!q) { goTo(""); return; }
    if (isUrlLike(q)) {
      goTo(normalize(q));
    } else {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(q)}`, "_blank", "noopener");
      setAddr(cur); // keep current page; search went to a new tab
    }
  };

  const back = () => setNav((n) => (n.i > 0 ? { ...n, i: n.i - 1 } : n));
  const fwd = () => setNav((n) => (n.i < n.stack.length - 1 ? { ...n, i: n.i + 1 } : n));
  const reload = () => { if (cur) setReloadKey((k) => k + 1); };
  const openTab = () => window.open(cur || "https://www.google.com", "_blank", "noopener");

  return (
    <div className="sf-app">
      <div className="sf-toolbar">
        <button className="sf-nav" onClick={back} disabled={!canBack} aria-label="Back">‹</button>
        <button className="sf-nav" onClick={fwd} disabled={!canFwd} aria-label="Forward">›</button>
        <button className="sf-nav" onClick={reload} aria-label="Reload">⟳</button>
        <form className="sf-addr" onSubmit={submit}>
          <Glyph name="search" size={13} color="var(--ink-4)" stroke={1.9} />
          <input
            value={addr}
            onChange={(e) => setAddr(e.target.value)}
            placeholder="Search or enter website name"
            spellCheck={false}
            autoComplete="off"
          />
        </form>
        <button className="sf-nav" onClick={openTab} disabled={!cur} aria-label="Open in new tab">↗</button>
      </div>
      <div className="sf-loadbar" data-on={loading} />
      <div className="sf-stage">
        {cur ? (
          <iframe
            key={cur + ":" + reloadKey}
            className="sf-frame"
            src={cur}
            title="Browser"
            onLoad={() => setLoading(false)}
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <StartPage onOpen={goTo} />
        )}
      </div>
    </div>
  );
}
