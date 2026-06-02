// Assembles every section into the single DATA object the app consumes.
// To edit content, open the individual files in this folder — not this one.
import type { PortfolioData } from "./types";
import { profile } from "./profile";
import { skills } from "./skills";
import { projects } from "./projects";
import { posts } from "./posts";
import { contact } from "./contact";

export const DATA: PortfolioData = { profile, skills, projects, posts, contact };

export * from "./types";
