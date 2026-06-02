"use client";

// Live desktop clock widget (Sonoma-style).
import React from "react";

const { useState, useEffect } = React;

const FULL_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const FULL_MONS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function ClockWidget() {
  const [now, setNow] = useState<Date | null>(null); // null until mount → no SSR mismatch
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  if (!now) return null;
  const pad = (n: number) => String(n).padStart(2, "0");
  let h = now.getHours();
  const ap = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return (
    <div className="clock-widget" aria-label="Current date and time">
      <div className="clock-time">
        {h}:{pad(now.getMinutes())}:{pad(now.getSeconds())}<span className="clock-ap">{ap}</span>
      </div>
      <div className="clock-date">{FULL_DAYS[now.getDay()]}, {FULL_MONS[now.getMonth()]} {now.getDate()}</div>
    </div>
  );
}
