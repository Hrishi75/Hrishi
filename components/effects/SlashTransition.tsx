"use client";

export default function SlashTransition() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <div
        id="slash-line"
        className="absolute -top-[10%] w-[3px] h-[120%]"
        style={{
          background:
            "linear-gradient(180deg, transparent, var(--crimson), rgba(245,240,232,0.8), var(--crimson), transparent)",
          transform: "rotate(-25deg) translateX(-100vw)",
          filter: "blur(0.5px)",
          boxShadow: "0 0 20px var(--crimson), 0 0 40px rgba(185,28,28,0.3)",
        }}
      />
    </div>
  );
}
