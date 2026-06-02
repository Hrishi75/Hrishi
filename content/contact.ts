// ───────────────────────────────────────────────────────────────────────────
//  CONTACT  —  edit your email and social links here.
//  Shows up in: Mail window, Safari favorites, Terminal (contact/social), dock links.
//  `glyph` must be one of: mail | github | linkedin | x
// ───────────────────────────────────────────────────────────────────────────
import type { Contact } from "./types";

export const contact: Contact = {
  email: "hrishikeshborkar94@gmail.com",
  links: [
    { label: "Email", value: "hrishikeshborkar94@gmail.com", href: "mailto:hrishikeshborkar94@gmail.com", glyph: "mail" },
    { label: "GitHub", value: "github.com/Hrishi75", href: "https://github.com/Hrishi75", glyph: "github" },
    { label: "LinkedIn", value: "in/hrishikesh-borkar", href: "https://www.linkedin.com/in/hrishikesh-borkar-61726b210/", glyph: "linkedin" },
    { label: "X / Twitter", value: "@HrishiC7", href: "https://x.com/HrishiC7", glyph: "x" },
  ],
};
