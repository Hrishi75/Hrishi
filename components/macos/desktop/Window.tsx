"use client";

// A single draggable app window: titlebar + traffic lights + rendered body.
import React from "react";
import type { AppConfig, OpenFn, WinState } from "../types";
import { TrafficLights } from "./TrafficLights";

export function Window({
  id, st, cfg, focused, open, innerRef, onFocus, onClose, onMin, onMax, onDragStart,
}: {
  id: string;
  st: WinState;
  cfg: AppConfig;
  focused: boolean;
  open: OpenFn;
  innerRef: (el: HTMLDivElement | null) => void;
  onFocus: (id: string) => void;
  onClose: (id: string) => void;
  onMin: (id: string) => void;
  onMax: (id: string) => void;
  onDragStart: (e: React.MouseEvent, id: string) => void;
}) {
  const style: React.CSSProperties = {
    left: st.x, top: st.y, width: st.w, height: st.h, zIndex: st.z,
    boxShadow: focused
      ? "var(--win-shadow)"
      : "0 18px 50px rgba(0,0,0,0.20), 0 0 0 0.5px rgba(0,0,0,0.12)",
  };
  return (
    <div
      ref={innerRef}
      className={"window" + (st.closing ? " closing" : "") + (st.min === "anim" ? " minimizing" : "")}
      style={style}
      onMouseDown={() => onFocus(id)}
    >
      <div
        className={"titlebar" + (cfg.sidebar ? " with-sidebar" : "")}
        style={cfg.dark ? { background: "#15161c", borderBottom: "0.5px solid rgba(255,255,255,0.08)" } : undefined}
        onMouseDown={(e) => onDragStart(e, id)}
        onDoubleClick={() => onMax(id)}
      >
        <TrafficLights onClose={() => onClose(id)} onMin={() => onMin(id)} onMax={() => onMax(id)} />
        <span className="win-title" style={cfg.dark ? { color: "rgba(255,255,255,0.6)" } : undefined}>{cfg.title}</span>
      </div>
      <div className="win-body" style={{ flexDirection: "column" }}>
        {cfg.render(open)}
      </div>
    </div>
  );
}
