"use client";

// Initials avatar — shared by the Welcome and About windows.
export function Avatar({ size = 96, radius }: { size?: number; radius?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: radius != null ? radius : size * 0.26,
        background: "linear-gradient(150deg,#5aa9ff 0%,#3a7bd5 55%,#6a5cff 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        boxShadow: "inset 0 1px 2px rgba(255,255,255,0.4), 0 6px 18px rgba(58,123,213,0.35)",
        color: "#fff",
        fontWeight: 700,
        letterSpacing: "-0.02em",
        fontSize: size * 0.36,
      }}
    >
      HB
    </div>
  );
}
