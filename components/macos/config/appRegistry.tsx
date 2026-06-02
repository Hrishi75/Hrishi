"use client";

// Registry of every launchable app window: geometry, menu name, icon, render.
import {
  WelcomeApp,
  AboutApp,
  SkillsApp,
  ProjectsApp,
  BlogApp,
  ContactApp,
  TerminalApp,
  BrowserApp,
} from "../apps";
import type { AppConfig } from "../types";

export const APP_REGISTRY: Record<string, AppConfig> = {
  welcome:  { title: "Hrishikesh Borkar", menu: "Finder",   icon: "finder",   w: 470, h: 560, sidebar: false, render: (open) => <WelcomeApp open={open} /> },
  safari:   { title: "Safari",            menu: "Safari",   icon: "safari",   w: 940, h: 620, sidebar: false, render: () => <BrowserApp /> },
  about:    { title: "About Me",          menu: "About",    icon: "about",    w: 560, h: 580, sidebar: false, render: () => <AboutApp /> },
  skills:   { title: "Tech Stack",        menu: "Skills",   icon: "skills",   w: 640, h: 560, sidebar: false, render: () => <SkillsApp /> },
  projects: { title: "Projects",          menu: "Projects", icon: "projects", w: 800, h: 580, sidebar: true,  render: () => <ProjectsApp /> },
  blog:     { title: "Notes — Writing",   menu: "Notes",    icon: "blog",     w: 760, h: 560, sidebar: true,  render: () => <BlogApp /> },
  contact:  { title: "Mail",              menu: "Mail",     icon: "contact",  w: 470, h: 540, sidebar: false, render: () => <ContactApp /> },
  terminal: { title: "hrishi — zsh",      menu: "Terminal", icon: "terminal", w: 600, h: 420, sidebar: false, dark: true, render: (open) => <TerminalApp open={open} /> },
};
