// ───────────────────────────────────────────────────────────────────────────
//  ABOUT ME  —  edit your name, role, headline, the "About" detail rows and bio.
//  Shows up in: Finder welcome window, About window, Terminal (whoami/about).
// ───────────────────────────────────────────────────────────────────────────
import type { Profile } from "./types";

export const profile: Profile = {
  name: "Hrishikesh Borkar",
  handle: "@Hrishi75",
  role: "DevSecOps · Full-Stack Developer · DevOps",
  headline: "Building reliable, scalable software.",
  tagline:
    "Enterprise reliability. Web3 innovation. A DevSecOps mindset. I craft scalable digital experiences while mastering the infrastructure beneath them.",

  // The rows in the About window's info card. Add/remove freely.
  details: [
    { label: "Location", value: "Nagpur, India" },
    { label: "Experience", value: "2+ Years" },
    { label: "Focus", value: "React, Node.js, Web3, TypeScript" },
    { label: "Education", value: "B.E. Computer Science" },
    { label: "Currently", value: "Analyst @ HCLTech" },
    { label: "Availability", value: "Open to work" },
  ],

  // Each string is one paragraph in the About window.
  bio: [
    "I'm a Full-Stack Developer and DevSecOps enthusiast with a strong foundation in enterprise infrastructure. As an Analyst at HCLTech, I support VMware virtualization and Windows Server environments — keeping performance, uptime, and operational excellence steady across production systems.",
    "Outside that core role, I build secure, scalable web and Web3 applications — exploring smart contracts, blockchain integrations, and modern frontend frameworks. I refine my craft daily across automation, cloud, security, and decentralized tech.",
  ],
};
