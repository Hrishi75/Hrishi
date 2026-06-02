// Shapes for the portfolio content. You normally don't need to touch this file —
// edit the data files (profile.ts, skills.ts, projects.ts, posts.ts, contact.ts).

export interface ProfileDetail {
  label: string;
  value: string;
}

export interface Profile {
  name: string;
  handle: string;
  role: string;
  headline: string;
  tagline: string;
  details: ProfileDetail[];
  bio: string[];
}

export interface Skill {
  name: string;
  /** glyph key from components/macos/icons.tsx (code, server, database, cloud, wand, brain…) */
  glyph: string;
  /** accent hex for the skill tile */
  tint: string;
  description: string;
  tags: string[];
}

export interface Project {
  title: string;
  kind: string;
  description: string;
  tech: string[];
  link: string;
  /** path under /public, e.g. "/projects/defimart.png" */
  image: string;
}

export interface Post {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
}

export interface ContactLink {
  label: string;
  value: string;
  href: string;
  /** glyph key: mail | github | linkedin | x */
  glyph: string;
}

export interface Contact {
  email: string;
  links: ContactLink[];
}

export interface PortfolioData {
  profile: Profile;
  skills: Skill[];
  projects: Project[];
  posts: Post[];
  contact: Contact;
}
