"use client";

// Top menu bar — apple logo, active app menus, status icons, live clock.
import React from "react";
import { Glyph } from "../icons";

const { useState, useEffect } = React;

function clockStr(): string {
  const d = new Date();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const mons = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let h = d.getHours();
  const m = d.getMinutes();
  const ap = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${days[d.getDay()]} ${mons[d.getMonth()]} ${d.getDate()}  ${h}:${String(m).padStart(2, "0")} ${ap}`;
}

export function MenuBar({ activeMenu, onOpenTweaks }: { activeMenu: string; onOpenTweaks: () => void }) {
  // Empty until mount so SSR markup matches the first client render.
  const [clock, setClock] = useState("");
  useEffect(() => {
    setClock(clockStr());
    const t = setInterval(() => setClock(clockStr()), 1000); // real-time, flips on the minute
    return () => clearInterval(t);
  }, []);
  const menus = activeMenu === "Finder"
    ? ["File", "Edit", "View", "Go", "Window", "Help"]
    : ["File", "Edit", "View", "Window", "Help"];
  return (
    <div id="menubar">
      <div className="mb-left">
        <span className="mb-apple">
          <svg width="14" height="16" viewBox="0 0 14 16" fill="#1d1d1f"><path d="M11.3 8.5c0-1.6 1.3-2.4 1.4-2.4-.8-1.1-2-1.3-2.4-1.3-1-.1-2 .6-2.5.6s-1.3-.6-2.1-.6c-1.1 0-2.1.6-2.7 1.6-1.1 2-.3 4.9.8 6.5.5.8 1.2 1.7 2 1.6.8 0 1.1-.5 2.1-.5s1.2.5 2.1.5 1.4-.8 1.9-1.6c.6-.9.9-1.8.9-1.8s-1.6-.6-1.6-2.6zM9.6 3.7c.4-.5.7-1.3.6-2-.6 0-1.4.4-1.8.9-.4.4-.7 1.2-.6 1.9.7.1 1.4-.3 1.8-.8z" /></svg>
        </span>
        <span className="mb-item bold">{activeMenu}</span>
        {menus.map((m) => <span key={m} className="mb-item">{m}</span>)}
      </div>
      <div className="mb-right">
        <span className="mb-status">
          <svg width="22" height="13" viewBox="0 0 26 13"><rect x="1" y="1.5" width="21" height="10" rx="2.6" fill="none" stroke="#1d1d1f" strokeOpacity="0.5" /><rect x="2.6" y="3" width="14" height="7" rx="1.4" fill="#1d1d1f" /><rect x="23" y="4.5" width="1.8" height="4" rx="0.9" fill="#1d1d1f" fillOpacity="0.5" /></svg>
        </span>
        <span className="mb-status">
          <svg width="17" height="13" viewBox="0 0 18 14" fill="none" stroke="#1d1d1f" strokeWidth="1.4" strokeLinecap="round"><path d="M2 5.2a10 10 0 0 1 14 0M4.4 7.8a6.5 6.5 0 0 1 9.2 0M6.8 10.3a3 3 0 0 1 4.4 0" /><circle cx="9" cy="12" r="0.7" fill="#1d1d1f" stroke="none" /></svg>
        </span>
        <span className="mb-status"><Glyph name="search" size={14} color="#1d1d1f" stroke={1.7} /></span>
        <span className="mb-status" onClick={onOpenTweaks} title="Tweaks" style={{ cursor: "pointer" }}>
          <svg width="16" height="14" viewBox="0 0 16 14" fill="none" stroke="#1d1d1f" strokeWidth="1.3"><rect x="1.5" y="2" width="13" height="4.4" rx="2.2" /><circle cx="5" cy="4.2" r="1.3" fill="#1d1d1f" /><rect x="1.5" y="7.6" width="13" height="4.4" rx="2.2" /><circle cx="11" cy="9.8" r="1.3" fill="#1d1d1f" /></svg>
        </span>
        <span className="mb-status mb-clock">{clock}</span>
      </div>
    </div>
  );
}
