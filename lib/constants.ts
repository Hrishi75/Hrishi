export const SKILLS = [
  {
    icon: "⚛️",
    name: "Frontend",
    description: "Building fluid, responsive interfaces with modern frameworks and pixel-perfect attention to detail.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion"],
  },
  {
    icon: "⚡",
    name: "Backend",
    description: "Designing robust APIs and microservices that scale under pressure and handle the heat of production.",
    tags: ["Node.js", "Python", "Go", "GraphQL", "REST"],
  },
  {
    icon: "🗄️",
    name: "Database",
    description: "Architecting data layers that are fast, reliable, and designed for the long haul.",
    tags: ["PostgreSQL", "MongoDB", "Redis", "Prisma"],
  },
  {
    icon: "☁️",
    name: "DevOps",
    description: "Automating deployments and ensuring uptime with modern cloud-native tooling.",
    tags: ["Docker", "Kubernetes", "AWS", "CI/CD"],
  },
  {
    icon: "🎨",
    name: "Design",
    description: "Translating ideas into visuals that feel intentional, cohesive, and unforgettable.",
    tags: ["Figma", "After Effects", "Blender", "GSAP"],
  },
  {
    icon: "🧠",
    name: "AI / ML",
    description: "Integrating intelligent features using modern language models and ML pipelines.",
    tags: ["PyTorch", "LangChain", "OpenAI", "RAG"],
  },
];

export const PROJECTS = [
  {
    title: "ShogunCMS",
    description: "A headless content management system with real-time collaboration, optimized for speed and developer experience. Handles 10k+ concurrent users.",
    tech: ["Next.js", "TypeScript", "Prisma", "WebSocket"],
    link: "#",
  },
  {
    title: "KatanaUI",
    description: "An open-source component library with 50+ accessible, animated components. Inspired by Japanese minimalism and built for production.",
    tech: ["React", "Storybook", "Radix UI", "CSS Modules"],
    link: "#",
  },
  {
    title: "RoninAnalytics",
    description: "Real-time analytics dashboard with custom WebGL visualizations, anomaly detection, and automated reporting for SaaS products.",
    tech: ["D3.js", "Go", "ClickHouse", "gRPC"],
    link: "#",
  },
];

export const FILE_STRUCTURE = [
  { name: "samurai-portfolio/", type: "folder", depth: 0 },
  { name: "src/", type: "folder", depth: 1 },
  { name: "app/", type: "folder", depth: 2 },
  { name: "layout.tsx", type: "tsx", depth: 3, comment: "Root layout + fonts" },
  { name: "page.tsx", type: "tsx", depth: 3, comment: "Home page" },
  // ... add rest of structure from HTML
];

export const TECH_STACK = [
  {
    icon: "⛩️",
    title: "Framework",
    items: [
      { name: "Next.js 14", type: "tsx", comment: "App Router + RSC" },
      { name: "TypeScript 5.3", type: "ts", comment: "Strict mode" },
      { name: "Tailwind CSS 3.4", type: "css", comment: "JIT + custom plugins" },
    ],
  },
  // ... add rest of tech stack
];