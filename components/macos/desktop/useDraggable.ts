"use client";

// Makes a fixed-position desktop widget draggable. Position is held in state,
// clamped to the viewport, and persisted to localStorage per key so it sticks
// across reloads. Until first drag it returns no inline position, so the
// widget keeps its CSS-anchored default spot.
import React from "react";

interface Pos { x: number; y: number }

export function useDraggable(storageKey: string) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState<Pos | null>(null);
  const [dragging, setDragging] = React.useState(false);
  const drag = React.useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null);

  // Restore saved position after mount (keeps SSR markup deterministic).
  React.useEffect(() => {
    try {
      const s = window.localStorage.getItem(storageKey);
      if (s) setPos(JSON.parse(s));
    } catch {
      /* ignore unavailable / malformed storage */
    }
  }, [storageKey]);

  const onMouseDown = React.useCallback((e: React.MouseEvent) => {
    // Let real controls (links/buttons) inside the widget work normally.
    if ((e.target as HTMLElement).closest("a,button,input,select")) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    drag.current = {
      sx: e.clientX, sy: e.clientY,
      ox: pos ? pos.x : r.left,   // current top-left in viewport coords
      oy: pos ? pos.y : r.top,
    };
    setDragging(true);
    e.preventDefault();
  }, [pos]);

  React.useEffect(() => {
    if (!dragging) return;
    const move = (e: MouseEvent) => {
      const d = drag.current;
      if (!d) return;
      const el = ref.current;
      const w = el?.offsetWidth ?? 0;
      const h = el?.offsetHeight ?? 0;
      const nx = Math.max(0, Math.min(d.ox + (e.clientX - d.sx), window.innerWidth - w));
      const ny = Math.max(28, Math.min(d.oy + (e.clientY - d.sy), window.innerHeight - h));
      setPos({ x: nx, y: ny });
    };
    const up = () => {
      setDragging(false);
      drag.current = null;
      setPos((p) => {
        if (p) {
          try { window.localStorage.setItem(storageKey, JSON.stringify(p)); } catch { /* ignore */ }
        }
        return p;
      });
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, [dragging, storageKey]);

  const style: React.CSSProperties = pos
    ? { left: pos.x, top: pos.y, right: "auto", bottom: "auto" }
    : {};

  return { ref, style, onMouseDown, dragging };
}
