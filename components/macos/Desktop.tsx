"use client";

// Window manager + desktop shell: owns window state, dragging, boot splash,
// and assembles the menu bar, dock, clock widget, and Tweaks panel.
import React from "react";
import { Glyph, Squircle } from "./icons";
import { Window } from "./desktop/Window";
import { MenuBar } from "./desktop/MenuBar";
import { ClockWidget } from "./desktop/ClockWidget";
import { Dock } from "./desktop/Dock";
import { APP_REGISTRY } from "./config/appRegistry";
import { TWEAK_DEFAULTS, WALLS } from "./config/tweakDefaults";
import {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakColor,
  TweakSelect,
  TweakToggle,
} from "./tweaks";
import type { TweakValues, WinState } from "./types";

const { useState, useEffect, useRef, useCallback } = React;

export default function Desktop() {
  const [t, setTweak] = useTweaks<TweakValues>(TWEAK_DEFAULTS);
  const [wins, setWins] = useState<Record<string, WinState>>({});
  const [order, setOrder] = useState<string[]>([]); // open ids, paint order
  const zc = useRef(20);
  const cascade = useRef(0);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [tweaksOpen, setTweaksOpen] = useState(false);
  const [booted, setBooted] = useState(false);
  const [launch, setLaunch] = useState<{ id: string; n: number } | null>(null);
  const openIds = useRef<Set<string>>(new Set()); // mirrors `order` without stale closures

  const focus = useCallback((id: string) => {
    setFocusedId(id);
    setWins((w) => (w[id] ? { ...w, [id]: { ...w[id], z: ++zc.current } } : w));
  }, []);

  const openApp = useCallback((id: string) => {
    const cfg = APP_REGISTRY[id];
    if (!openIds.current.has(id)) {
      openIds.current.add(id);
      setLaunch({ id, n: Date.now() }); // fresh launch → bounce the dock icon
    }
    setWins((w) => {
      if (w[id]) {
        return { ...w, [id]: { ...w[id], min: false, z: ++zc.current } };
      }
      const n = cascade.current++;
      const baseX = Math.max(40, (window.innerWidth - cfg.w) / 2 - 120 + (n % 5) * 34);
      const baseY = Math.max(48, (window.innerHeight - cfg.h) / 2 - 60 + (n % 5) * 30);
      return { ...w, [id]: { x: baseX, y: baseY, w: cfg.w, h: cfg.h, z: ++zc.current, min: false, max: false } };
    });
    setOrder((o) => (o.includes(id) ? o : [...o, id]));
    setFocusedId(id);
  }, []);

  const closeApp = useCallback((id: string) => {
    openIds.current.delete(id);
    setWins((w) => (w[id] ? { ...w, [id]: { ...w[id], closing: true } } : w));
    setTimeout(() => {
      setWins((w) => { const n = { ...w }; delete n[id]; return n; });
      setOrder((o) => o.filter((x) => x !== id));
    }, 170);
  }, []);

  const minApp = useCallback((id: string) => {
    setWins((w) => (w[id] ? { ...w, [id]: { ...w[id], min: "anim" } } : w));
    setTimeout(() => setWins((w) => (w[id] ? { ...w, [id]: { ...w[id], min: true } } : w)), 320);
  }, []);

  const maxApp = useCallback((id: string) => {
    setWins((w) => {
      if (!w[id]) return w;
      const cur = w[id];
      if (cur.max) return { ...w, [id]: { ...cur, x: cur.px!, y: cur.py!, w: cur.pw!, h: cur.ph!, max: false, z: ++zc.current } };
      return {
        ...w,
        [id]: {
          ...cur, px: cur.x, py: cur.y, pw: cur.w, ph: cur.h,
          x: 12, y: 34, w: window.innerWidth - 24, h: window.innerHeight - 110, max: true, z: ++zc.current,
        },
      };
    });
  }, []);

  // dragging — moved on the compositor (transform) with no per-frame React
  // render; final position commits to state on release.
  const winRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const drag = useRef<{
    id: string; sx: number; sy: number; baseX: number; baseY: number; lastX: number; lastY: number;
  } | null>(null);
  const rafId = useRef(0);
  const pending = useRef<{ x: number; y: number } | null>(null);

  const onDragStart = (e: React.MouseEvent, id: string) => {
    if ((e.target as HTMLElement).closest(".tl")) return;
    const st = wins[id];
    if (!st || st.max) return;
    drag.current = { id, sx: e.clientX, sy: e.clientY, baseX: st.x, baseY: st.y, lastX: st.x, lastY: st.y };
    winRefs.current[id]?.classList.add("dragging");
    focus(id);
    e.preventDefault();
  };

  useEffect(() => {
    const flush = () => {
      rafId.current = 0;
      const d = drag.current;
      const pt = pending.current;
      if (!d || !pt) return;
      const node = winRefs.current[d.id];
      let dy = pt.y - d.sy;
      if (d.baseY + dy < 28) dy = 28 - d.baseY; // keep titlebar below menu bar
      const dx = pt.x - d.sx;
      d.lastX = d.baseX + dx;
      d.lastY = d.baseY + dy;
      if (node) node.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    };
    const move = (e: MouseEvent) => {
      if (!drag.current) return;
      pending.current = { x: e.clientX, y: e.clientY };
      if (!rafId.current) rafId.current = requestAnimationFrame(flush);
    };
    const up = () => {
      const d = drag.current;
      if (!d) return;
      drag.current = null;
      if (rafId.current) { cancelAnimationFrame(rafId.current); rafId.current = 0; }
      pending.current = null;
      const node = winRefs.current[d.id];
      if (node) {
        // Commit to the DOM directly first so there's no one-frame jump back to
        // the drag-start position before React re-renders the new left/top.
        node.style.left = d.lastX + "px";
        node.style.top = d.lastY + "px";
        node.style.transform = "";
        node.classList.remove("dragging");
      }
      setWins((w) => (w[d.id] ? { ...w, [d.id]: { ...w[d.id], x: d.lastX, y: d.lastY } } : w));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", up); };
  }, []);

  // boot: open welcome + dismiss splash
  useEffect(() => {
    openApp("welcome");
    const t1 = setTimeout(() => setBooted(true), 900);
    return () => clearTimeout(t1);
  }, [openApp]);

  const runningIds = order;
  const activeMenu = focusedId && APP_REGISTRY[focusedId] ? APP_REGISTRY[focusedId].menu : "Finder";

  return (
    <div className="mac-root" style={{ "--accent": t.accent } as React.CSSProperties}>
      <div id="desktop" className={t.wallpaper} />

      {t.clockWidget && <ClockWidget />}

      <MenuBar activeMenu={activeMenu} onOpenTweaks={() => setTweaksOpen((v) => !v)} />

      {/* desktop file icon */}
      <div className="desk-icon" style={{ top: 44, right: 26 }} onDoubleClick={() => openApp("welcome")}>
        <Squircle size={50} bg="linear-gradient(180deg,#fdfdfd,#e7e9ee)" shadow={false}>
          <Glyph name="doc" size={24} color="#7a808c" stroke={1.7} />
        </Squircle>
        <div className="di-label">README.md</div>
      </div>

      {order.map((id) => {
        const st = wins[id];
        if (!st || st.min === true) return null;
        return (
          <Window
            key={id} id={id} st={st} cfg={APP_REGISTRY[id]} focused={focusedId === id} open={openApp}
            innerRef={(el) => { winRefs.current[id] = el; }}
            onFocus={focus} onClose={closeApp} onMin={minApp} onMax={maxApp} onDragStart={onDragStart}
          />
        );
      })}

      <Dock runningIds={runningIds} dockGlass={t.dockGlass} launch={launch} onOpen={openApp} />

      <TweaksPanel title="Tweaks" open={tweaksOpen} onClose={() => setTweaksOpen(false)}>
        <TweakSection label="Appearance" />
        <TweakColor
          label="Accent"
          value={t.accent}
          options={["#007AFF", "#34C759", "#AF52DE", "#FF375F", "#FF9500", "#5E5CE6"]}
          onChange={(v) => setTweak("accent", v)}
        />
        <TweakSelect
          label="Wallpaper"
          value={t.wallpaper}
          options={Object.keys(WALLS).map((k) => ({ value: k, label: WALLS[k] }))}
          onChange={(v) => setTweak("wallpaper", v)}
        />
        <TweakToggle label="Frosted dock" value={t.dockGlass} onChange={(v) => setTweak("dockGlass", v)} />
        <TweakToggle label="Clock widget" value={t.clockWidget} onChange={(v) => setTweak("clockWidget", v)} />
      </TweaksPanel>

      <div id="boot" className={booted ? "gone" : ""}>
        <svg width="58" height="66" viewBox="0 0 14 16" fill="#fff"><path d="M11.3 8.5c0-1.6 1.3-2.4 1.4-2.4-.8-1.1-2-1.3-2.4-1.3-1-.1-2 .6-2.5.6s-1.3-.6-2.1-.6c-1.1 0-2.1.6-2.7 1.6-1.1 2-.3 4.9.8 6.5.5.8 1.2 1.7 2 1.6.8 0 1.1-.5 2.1-.5s1.2.5 2.1.5 1.4-.8 1.9-1.6c.6-.9.9-1.8.9-1.8s-1.6-.6-1.6-2.6zM9.6 3.7c.4-.5.7-1.3.6-2-.6 0-1.4.4-1.8.9-.4.4-.7 1.2-.6 1.9.7.1 1.4-.3 1.8-.8z" /></svg>
      </div>
    </div>
  );
}
