// ───────────────────────────────────────────────────────────────────────────
//  PROJECTS  —  edit / add / reorder your projects here.
//  Shows up in: Projects window (gallery) and Safari favorites.
//
//  To add a project, copy a { ... } block. For the image, drop a PNG into
//  public/projects/ and set image to "/projects/<file>.png".
// ───────────────────────────────────────────────────────────────────────────
import type { Project } from "./types";

export const projects: Project[] = [
  {
    title: "Defimart",
    kind: "Web3 · Marketplace",
    description:
      "A social marketplace with a feed for sharing and trading merchandise from blockchain conferences and community events.",
    tech: ["Next.js", "TypeScript", "Supabase", "Escrow"],
    link: "https://defimart.vercel.app/",
    image: "/projects/defimart.png",
  },
  {
    title: "Netflix Clone — DevSecOps",
    kind: "DevSecOps · Pipeline",
    description:
      "A secure CI/CD pipeline using Jenkins to deploy a Dockerized Netflix-clone app onto a Kubernetes cluster, with full observability.",
    tech: ["Docker", "Kubernetes", "Jenkins", "SonarQube", "Trivy", "Helm", "ArgoCD", "Prometheus", "Grafana"],
    link: "https://github.com/Hrishi75/Netflix-Clone-Devsecops-Project",
    image: "/projects/netflix-clone.png",
  },
  {
    title: "Chefify",
    kind: "AI · Web App",
    description:
      "An AI cooking chat app on the Gemini API that generates detailed recipes with customizable preferences — servings, difficulty, cuisine, diet — plus multi-language transliteration, theming, and a fully responsive UI.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Gemini API"],
    link: "https://chefify1.vercel.app/",
    image: "/projects/chefify.png",
  },
];
