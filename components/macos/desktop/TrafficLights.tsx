"use client";

// Window close / minimize / zoom buttons.
export function TrafficLights({ onClose, onMin, onMax }: { onClose: () => void; onMin: () => void; onMax: () => void }) {
  return (
    <div className="traffic">
      <span className="tl r" onClick={(e) => { e.stopPropagation(); onClose(); }}>
        <svg width="7" height="7" viewBox="0 0 8 8"><path d="M2 2l4 4M6 2l-4 4" stroke="#4d0000" strokeWidth="1.3" strokeLinecap="round" /></svg>
      </span>
      <span className="tl y" onClick={(e) => { e.stopPropagation(); onMin(); }}>
        <svg width="7" height="7" viewBox="0 0 8 8"><path d="M2 4h4" stroke="#7a4b00" strokeWidth="1.4" strokeLinecap="round" /></svg>
      </span>
      <span className="tl g" onClick={(e) => { e.stopPropagation(); onMax(); }}>
        <svg width="8" height="8" viewBox="0 0 8 8"><path d="M2.4 2.4h3.2v3.2z" fill="#005000" /><path d="M5.6 5.6H2.4V2.4z" fill="none" /></svg>
      </span>
    </div>
  );
}
