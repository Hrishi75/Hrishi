// Content lives in the top-level /content folder — edit those files
// (profile.ts, skills.ts, projects.ts, posts.ts, contact.ts).
// This re-export keeps the macOS components importing from one place.
export { DATA } from "@/content";
export type {
  PortfolioData,
  Profile,
  ProfileDetail,
  Skill,
  Project,
  Post,
  Contact,
  ContactLink,
} from "@/content";
