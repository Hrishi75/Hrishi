// ───────────────────────────────────────────────────────────────────────────
//  SKILLS  —  edit your tech stack here. Shows up in the Tech Stack window
//  and Terminal (skills). `glyph` picks the tile icon; `tint` is its color.
//  Valid glyphs: code, server, database, cloud, wand, brain, chip, bolt, globe.
// ───────────────────────────────────────────────────────────────────────────
import type { Skill } from "./types";

export const skills: Skill[] = [
  {
    name: "Frontend",
    glyph: "code",
    tint: "#007AFF",
    description:
      "Fluid, responsive interfaces built with modern frameworks and pixel-perfect attention to detail.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion"],
  },
  {
    name: "Backend",
    glyph: "server",
    tint: "#34C759",
    description:
      "Robust APIs and microservices that scale under pressure and hold up in production.",
    tags: ["Node.js", "REST", "Express"],
  },
  {
    name: "Database",
    glyph: "database",
    tint: "#FF9500",
    description:
      "Data layers architected to be fast, reliable, and built for the long haul.",
    tags: ["MongoDB", "Redis", "Supabase"],
  },
  {
    name: "DevOps",
    glyph: "cloud",
    tint: "#5E5CE6",
    description:
      "Automated deployments and dependable uptime with modern cloud-native tooling.",
    tags: ["Docker", "Kubernetes", "AWS", "CI/CD"],
  },
  {
    name: "Design",
    glyph: "wand",
    tint: "#FF375F",
    description:
      "Turning ideas into visuals that feel intentional, cohesive, and considered.",
    tags: ["Figma", "GSAP"],
  },
  {
    name: "AI / ML",
    glyph: "brain",
    tint: "#AF52DE",
    description:
      "Intelligent features built on modern language models and ML pipelines.",
    tags: ["PyTorch", "LangChain", "OpenAI", "RAG"],
  },
];
