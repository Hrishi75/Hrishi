"use client";

// Squircle wrapper — generic tinted icon used in content cards.
import React from "react";

export interface SquircleProps {
  size?: number;
  children?: React.ReactNode;
  bg?: string;
  shadow?: boolean;
}

export function Squircle({ size = 52, children, bg, shadow = true }: SquircleProps) {
  return (
    <div
      className="app-squircle"
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.2237,
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: shadow
          ? "inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.12), 0 2px 5px rgba(0,0,0,0.22)"
          : "none",
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {children}
      <span
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          pointerEvents: "none",
          background: "linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.1) 30%, rgba(255,255,255,0) 50%)",
        }}
      />
    </div>
  );
}
