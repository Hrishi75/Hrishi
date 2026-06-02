// Dock layout. Social links are derived from content/contact.ts (single
// source of truth) so the dock never drifts from the Contact window.
import { DATA } from "../data";
import type { DockEntry } from "../types";

export const DOCK: DockEntry[] = [
  { type: "app", id: "welcome", icon: "finder", label: "Finder" },
  { type: "app", id: "safari", icon: "safari", label: "Safari" },
  { type: "app", id: "about", icon: "about", label: "About Me" },
  { type: "app", id: "skills", icon: "skills", label: "Tech Stack" },
  { type: "app", id: "projects", icon: "projects", label: "Projects" },
  { type: "app", id: "blog", icon: "blog", label: "Notes" },
  { type: "app", id: "contact", icon: "contact", label: "Mail" },
  { type: "app", id: "terminal", icon: "terminal", label: "Terminal" },
  { type: "sep" },
  ...DATA.contact.links
    .filter((l) => l.glyph !== "mail")
    .map((l) => ({ type: "link" as const, icon: l.glyph, label: l.label, href: l.href })),
  { type: "sep" },
  { type: "trash", icon: "trash", label: "Trash" },
];
