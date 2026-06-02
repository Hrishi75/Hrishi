"use client";

// Real squircle silhouette tile: vertical gradient, gloss + edge light.
// Shared base for the high-fidelity app icons in AppIcons.
import React from "react";

// True Apple superellipse (continuous-curvature squircle), normalized to 100.
const squirclePath = (size = 100, n = 5, steps = 80): string => {
  const r = size / 2;
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const th = (i / steps) * Math.PI * 2;
    const c = Math.cos(th);
    const s = Math.sin(th);
    const x = r + r * Math.sign(c) * Math.pow(Math.abs(c), 2 / n);
    const y = r + r * Math.sign(s) * Math.pow(Math.abs(s), 2 / n);
    d += `${i ? "L" : "M"}${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  return d + "Z";
};
export const SQUIRCLE = squirclePath();

export function IconTile({
  size = 52,
  from,
  to,
  children,
}: {
  size?: number;
  from: string;
  to: string;
  children?: React.ReactNode;
}) {
  const uid = React.useId().replace(/:/g, "");
  const g = `g${uid}`, gl = `gl${uid}`, cp = `cp${uid}`;
  return (
    <div style={{ width: size, height: size, flexShrink: 0, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.24))" }}>
      <svg viewBox="0 0 100 100" width={size} height={size} style={{ display: "block" }}>
        <defs>
          <linearGradient id={g} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={from} />
            <stop offset="1" stopColor={to} />
          </linearGradient>
          <linearGradient id={gl} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
            <stop offset="0.45" stopColor="#fff" stopOpacity="0.05" />
            <stop offset="0.52" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <clipPath id={cp}><path d={SQUIRCLE} /></clipPath>
        </defs>
        <g clipPath={`url(#${cp})`}>
          <path d={SQUIRCLE} fill={`url(#${g})`} />
          {children}
          <path d={SQUIRCLE} fill={`url(#${gl})`} />
        </g>
        <path d={SQUIRCLE} fill="none" stroke="#fff" strokeOpacity="0.4" strokeWidth="0.8" />
        <path d={SQUIRCLE} fill="none" stroke="#000" strokeOpacity="0.08" strokeWidth="1" />
      </svg>
    </div>
  );
}

// Center + scale a 24×24 brand path inside the 100 box.
export function brand(d: string, fill = "#fff", scale = 2.6) {
  const t = (100 - 24 * scale) / 2;
  return (
    <g transform={`translate(${t} ${t}) scale(${scale})`}>
      <path d={d} fill={fill} />
    </g>
  );
}
