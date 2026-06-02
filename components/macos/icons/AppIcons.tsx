"use client";

// High-fidelity macOS (Big Sur/Sonoma) app icons — full squircle artwork.
import React from "react";
import { IconTile, brand } from "./IconTile";

export const AppIcons: Record<string, (s?: number) => React.ReactElement> = {
  // Finder — two-tone split face
  finder: (s = 52) => (
    <IconTile size={s} from="#2BA0FF" to="#0A6CE0">
      <rect x="0" y="0" width="50" height="100" fill="#CDE9FF" />
      <rect x="34" y="29" width="5.4" height="17" rx="2.7" fill="#2C6CB0" />
      <rect x="60.6" y="29" width="5.4" height="17" rx="2.7" fill="#EAF5FF" />
      <path d="M30 60 Q40 70 50 70" fill="none" stroke="#2C6CB0" strokeWidth="5" strokeLinecap="round" />
      <path d="M50 70 Q60 70 70 60" fill="none" stroke="#EAF5FF" strokeWidth="5" strokeLinecap="round" />
    </IconTile>
  ),
  // Safari — compass dial
  safari: (s = 52) => (
    <IconTile size={s} from="#43B0FF" to="#1273E6">
      <circle cx="50" cy="50" r="33" fill="#EAF4FF" />
      <circle cx="50" cy="50" r="33" fill="none" stroke="#fff" strokeWidth="3" />
      <g stroke="#9CC3E8" strokeWidth="2" strokeLinecap="round">
        <line x1="50" y1="20" x2="50" y2="25" /><line x1="50" y1="75" x2="50" y2="80" />
        <line x1="20" y1="50" x2="25" y2="50" /><line x1="75" y1="50" x2="80" y2="50" />
      </g>
      <path d="M50 50 L66 34 L54 52 Z" fill="#FF4B4B" />
      <path d="M50 50 L34 66 L46 48 Z" fill="#D7E6F5" />
      <circle cx="50" cy="50" r="3" fill="#5b6675" />
    </IconTile>
  ),
  // About — Contacts-style bust
  about: (s = 52) => (
    <IconTile size={s} from="#FBFCFE" to="#DCE1E8">
      <circle cx="50" cy="41" r="14.5" fill="#8C96A6" />
      <path d="M24 80 a26 23 0 0 1 52 0 Z" fill="#8C96A6" />
    </IconTile>
  ),
  // Skills — microchip on violet
  skills: (s = 52) => (
    <IconTile size={s} from="#9C8DFF" to="#5B3DE0">
      <g stroke="#F1EEFF" strokeWidth="3.4" strokeLinecap="round">
        <line x1="40" y1="22" x2="40" y2="34" /><line x1="50" y1="22" x2="50" y2="34" /><line x1="60" y1="22" x2="60" y2="34" />
        <line x1="40" y1="66" x2="40" y2="78" /><line x1="50" y1="66" x2="50" y2="78" /><line x1="60" y1="66" x2="60" y2="78" />
        <line x1="22" y1="40" x2="34" y2="40" /><line x1="22" y1="50" x2="34" y2="50" /><line x1="22" y1="60" x2="34" y2="60" />
        <line x1="66" y1="40" x2="78" y2="40" /><line x1="66" y1="50" x2="78" y2="50" /><line x1="66" y1="60" x2="78" y2="60" />
      </g>
      <rect x="32" y="32" width="36" height="36" rx="8" fill="#F4F2FF" />
      <rect x="41" y="41" width="18" height="18" rx="4.5" fill="#7C66E8" />
    </IconTile>
  ),
  // Projects — macOS folder (tone-on-tone blue)
  projects: (s = 52) => (
    <IconTile size={s} from="#EAF6FF" to="#CFE9FF">
      <path d="M18 30 h20 l7 7 h37 a5 5 0 0 1 5 5 v4 H13 v-16 a5 5 0 0 1 5-5 Z" fill="#3F9CEA" />
      <path d="M13 41 h74 a4 4 0 0 1 4 4 v25 a5 5 0 0 1-5 5 H14 a5 5 0 0 1-5-5 V45 a4 4 0 0 1 4-4 Z" fill="#62BCFB" />
    </IconTile>
  ),
  // Notes — paper with yellow header
  blog: (s = 52) => (
    <IconTile size={s} from="#FFFFFF" to="#ECEDEF">
      <path d="M0 0 H100 V27 H0 Z" fill="#FFCE3A" />
      <rect x="20" y="41" width="60" height="5" rx="2.5" fill="#C7CAD0" />
      <rect x="20" y="55" width="60" height="5" rx="2.5" fill="#C7CAD0" />
      <rect x="20" y="69" width="60" height="5" rx="2.5" fill="#C7CAD0" />
      <rect x="20" y="83" width="40" height="5" rx="2.5" fill="#C7CAD0" />
    </IconTile>
  ),
  // Mail — white envelope on blue
  contact: (s = 52) => (
    <IconTile size={s} from="#49B4FF" to="#1E7BFF">
      <rect x="18" y="30" width="64" height="40" rx="8" fill="#fff" />
      <path d="M21 35 L50 55 L79 35" fill="none" stroke="#2A86FF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </IconTile>
  ),
  // Terminal — dark screen with prompt
  terminal: (s = 52) => (
    <IconTile size={s} from="#41444C" to="#17181C">
      <rect x="14" y="18" width="72" height="64" rx="10" fill="#0C0D11" />
      <path d="M26 38 L37 47 L26 56" fill="none" stroke="#3DE07A" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="41" y="52" width="22" height="5" rx="2.5" fill="#E8EAF0" />
    </IconTile>
  ),
  github: (s = 52) => (
    <IconTile size={s} from="#404248" to="#1A1B1E">
      {brand(
        "M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.16.58.67.48A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10z"
      )}
    </IconTile>
  ),
  linkedin: (s = 52) => (
    <IconTile size={s} from="#3A8DD8" to="#0A66C2">
      {brand(
        "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.76-2.05C20.3 8.65 21 11 21 14.1V21h-4v-6.1c0-1.45-.03-3.32-2-3.32-2 0-2.3 1.56-2.3 3.2V21H9z"
      )}
    </IconTile>
  ),
  x: (s = 52) => (
    <IconTile size={s} from="#2A2A2C" to="#08080A">
      {brand(
        "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.656l-5.214-6.817-5.966 6.817H1.683l7.73-8.835L1.254 2.25h6.826l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
        "#fff",
        2.4
      )}
    </IconTile>
  ),
  // Trash — metal bin with slats
  trash: (s = 52) => (
    <IconTile size={s} from="#F7F8FA" to="#D6DAE1">
      <rect x="27" y="29" width="46" height="6" rx="3" fill="#878E9A" />
      <rect x="43" y="23" width="14" height="6" rx="3" fill="#878E9A" />
      <path d="M32 37 H68 L64 76 a5 5 0 0 1-5 5 H41 a5 5 0 0 1-5-5 Z" fill="#AEB5C1" />
      <g stroke="#838A96" strokeWidth="3" strokeLinecap="round">
        <line x1="44" y1="44" x2="43" y2="74" />
        <line x1="50" y1="44" x2="50" y2="74" />
        <line x1="56" y1="44" x2="57" y2="74" />
      </g>
    </IconTile>
  ),
};
