"use client";

// macOS dock — magnification on hover, launch bounce, running dots.
import React from "react";
import { AppIcons } from "../icons";
import { DOCK } from "../config/dock";
import type { DockEntry, OpenFn } from "../types";

const { useEffect, useRef, useCallback } = React;

export function Dock({
  runningIds, dockGlass, launch, onOpen,
}: {
  runningIds: string[];
  dockGlass: boolean;
  launch: { id: string; n: number } | null;
  onOpen: OpenFn;
}) {
  const iconEls = useRef<(HTMLDivElement | null)[]>([]);
  iconEls.current = [];
  const itemEls = useRef<Record<string, HTMLDivElement | null>>({});
  const centers = useRef<number[]>([]); // cached x-centers, refreshed on enter
  const rafId = useRef(0);
  const lastX = useRef(0);

  // Classic dock launch bounce — replays the keyframe each launch signal.
  useEffect(() => {
    if (!launch) return;
    const el = itemEls.current[launch.id];
    if (!el) return;
    el.classList.remove("bouncing");
    void el.offsetWidth; // reflow so the animation restarts
    el.classList.add("bouncing");
    const t = setTimeout(() => el.classList.remove("bouncing"), 900);
    return () => clearTimeout(t);
  }, [launch]);

  const apply = useCallback(() => {
    rafId.current = 0;
    const clientX = lastX.current;
    const range = 100, maxS = 1.42;
    iconEls.current.forEach((el, i) => {
      if (!el) return;
      const d = Math.abs(clientX - centers.current[i]);
      const s = d < range ? 1 + (maxS - 1) * Math.cos((d / range) * (Math.PI / 2)) : 1;
      el.style.transform = `translateY(${-(s - 1) * 20}px) scale(${s})`;
    });
  }, []);

  const onEnter = useCallback(() => {
    // Cache centers once per hover — geometry is static while magnifying.
    centers.current = iconEls.current.map((el) => {
      if (!el) return -9999;
      const r = el.getBoundingClientRect();
      return r.left + r.width / 2;
    });
  }, []);

  const magnify = useCallback((clientX: number) => {
    lastX.current = clientX;
    if (!rafId.current) rafId.current = requestAnimationFrame(apply);
  }, [apply]);

  const reset = useCallback(() => {
    if (rafId.current) { cancelAnimationFrame(rafId.current); rafId.current = 0; }
    iconEls.current.forEach((el) => el && (el.style.transform = ""));
  }, []);

  const handle = (it: DockEntry) => {
    if (it.type === "app") onOpen(it.id);
    else if (it.type === "link") window.open(it.href, "_blank", "noopener");
  };

  const dockBg = dockGlass
    ? "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.22) 38%, rgba(255,255,255,0.14) 72%, rgba(255,255,255,0.20) 100%)"
    : "linear-gradient(180deg, rgba(250,250,252,0.97), rgba(236,238,242,0.94))";

  return (
    <div id="dock-wrap">
      <div id="dock" style={{ background: dockBg }} onMouseEnter={onEnter} onMouseMove={(e) => magnify(e.clientX)} onMouseLeave={reset}>
        {DOCK.map((it, i) => {
          if (it.type === "sep") return <div key={"s" + i} className="dock-sep" />;
          const running = it.type === "app" && runningIds.includes(it.id);
          const art = AppIcons[it.icon];
          const key = it.type === "app" ? it.id : it.label;
          return (
            <div
              key={it.label + i}
              className={"dock-item" + (running ? " running" : "")}
              ref={(el) => { itemEls.current[key] = el; }}
              onClick={() => handle(it)}
            >
              <div className="dock-tip">{it.label}</div>
              <div className="di-icon" ref={(el) => { iconEls.current.push(el); }}>{art(46)}</div>
              <div className="dock-dot" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
