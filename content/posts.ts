// ───────────────────────────────────────────────────────────────────────────
//  NOTES / BLOG  —  edit your writing entries here. Shows up in the Notes window.
// ───────────────────────────────────────────────────────────────────────────
import type { Post } from "./types";

export const posts: Post[] = [
  {
    title: "Clean Architecture in Practice",
    excerpt:
      "Structuring scalable codebases with layered architecture, separation of concerns, and the art of modular design.",
    date: "Jan 15, 2025",
    readTime: "5 min",
    tags: ["Architecture", "React"],
  },
  {
    title: "Production Animations with Framer Motion",
    excerpt:
      "A deep dive into building fluid, production-ready animations in React — from simple fades to orchestrated scroll-driven sequences.",
    date: "Feb 8, 2025",
    readTime: "7 min",
    tags: ["Animation", "Framer Motion"],
  },
  {
    title: "Mastering TypeScript Generics",
    excerpt:
      "Practical patterns for utility types, conditional types, and inference that scale — writing code that's genuinely reusable.",
    date: "Mar 22, 2025",
    readTime: "6 min",
    tags: ["TypeScript", "Patterns"],
  },
  {
    title: "Server Components: The Silent Revolution",
    excerpt:
      "How React Server Components change the way we think about data fetching, bundle size, and the client/server boundary.",
    date: "Apr 10, 2025",
    readTime: "8 min",
    tags: ["Next.js", "RSC"],
  },
];
