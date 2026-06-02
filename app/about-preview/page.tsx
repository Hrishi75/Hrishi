"use client";

import { AboutApp, WelcomeApp } from "@/components/macos/apps";

export default function Preview() {
  return (
    <div style={{ padding: 40, background: "#6b7a99", minHeight: "100vh", display: "flex", gap: 40, alignItems: "flex-start" }} className="mac-root">
      <div className="window" style={{ position: "relative", left: 0, top: 0, width: 560, height: 580, boxShadow: "var(--win-shadow)" }}>
        <div className="titlebar">
          <div className="traffic"><span className="tl r" /><span className="tl y" /><span className="tl g" /></div>
          <span className="win-title">About Me</span>
        </div>
        <div className="win-body" style={{ flexDirection: "column" }}>
          <AboutApp />
        </div>
      </div>
      <div className="window" style={{ position: "relative", left: 0, top: 0, width: 470, height: 560, boxShadow: "var(--win-shadow)" }}>
        <div className="titlebar">
          <div className="traffic"><span className="tl r" /><span className="tl y" /><span className="tl g" /></div>
          <span className="win-title">Hrishikesh Borkar</span>
        </div>
        <div className="win-body" style={{ flexDirection: "column" }}>
          <WelcomeApp open={() => {}} />
        </div>
      </div>
    </div>
  );
}
