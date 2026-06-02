"use client";

// Interactive zsh-style terminal window.
import React from "react";
import { DATA } from "../data";
import type { OpenFn } from "../types";

type TLine = { k: "in" | "out" | "err"; t?: string; node?: React.ReactNode };

const HELP: [string, string][] = [
  ["help", "show this list"],
  ["whoami", "name & role"],
  ["about", "short bio"],
  ["skills", "tech stack by domain"],
  ["projects", "featured projects + links"],
  ["ls [dir]", "list files / projects"],
  ["cat <file>", "print a file"],
  ["open <app|url>", "launch an app window or open a URL"],
  ["contact", "ways to reach me"],
  ["social", "github · linkedin · x"],
  ["date", "current date & time"],
  ["echo <text>", "print text"],
  ["pwd", "working directory"],
  ["neofetch", "system info"],
  ["history", "command history"],
  ["clear", "clear the screen"],
];

const APP_ALIAS: Record<string, string> = {
  about: "about", skills: "skills", projects: "projects", blog: "blog", notes: "blog",
  contact: "contact", mail: "contact", safari: "safari", browser: "safari",
  finder: "welcome", welcome: "welcome", home: "welcome", terminal: "terminal",
};

const CMD_NAMES = [
  ...HELP.map((h) => h[0].split(" ")[0]),
  "bio", "email", "sudo", "notes", "ls", "cat", "echo", "open",
];

const isUrl = (q: string) => /^https?:\/\//i.test(q) || /^[\w-]+(\.[\w-]+)+(\/.*)?$/.test(q);
const norm = (q: string) => (/^https?:\/\//i.test(q) ? q : "https://" + q);

function Prompt() {
  return (
    <span style={{ color: "#37e05b", flexShrink: 0 }}>
      hrishi@mac<span style={{ color: "#5aa9ff" }}> ~ %</span>
    </span>
  );
}

export function TerminalApp({ open }: { open: OpenFn }) {
  const p = DATA.profile;
  const [lines, setLines] = React.useState<TLine[]>(() => [
    { k: "out", t: `Last login: ${new Date().toString().slice(0, 24)} on ttys000` },
    { k: "out", node: <span>Type <b style={{ color: "#37e05b" }}>help</b> to see what I can do.</span> },
  ]);
  const [input, setInput] = React.useState("");
  const [hist, setHist] = React.useState<string[]>([]);
  const [histPos, setHistPos] = React.useState(-1);
  const bodyRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  const run = (raw: string) => {
    const echo: TLine = { k: "in", t: raw };
    const cmd = raw.trim();
    if (!cmd) { setLines((prev) => [...prev, echo]); return; }
    setHist((h) => [...h, cmd]);
    setHistPos(-1);

    const [name, ...args] = cmd.split(/\s+/);
    const arg = args.join(" ");
    const out: TLine[] = [];
    const o = (t: string) => out.push({ k: "out", t });
    const err = (t: string) => out.push({ k: "err", t });
    let clear = false;

    switch (name.toLowerCase()) {
      case "help":
        out.push({
          k: "out",
          node: (
            <div>
              {HELP.map(([c, d]) => (
                <div key={c}><span style={{ color: "#5aa9ff", display: "inline-block", minWidth: 150 }}>{c}</span><span style={{ color: "#9aa0ab" }}>{d}</span></div>
              ))}
            </div>
          ),
        });
        break;
      case "whoami": o(`${p.name} — ${p.role}`); break;
      case "about":
      case "bio": o(p.bio.join("\n\n")); break;
      case "skills": o(DATA.skills.map((s) => `${s.name.padEnd(10)}  ${s.tags.join(", ")}`).join("\n")); break;
      case "projects":
        o(DATA.projects.map((pr) => `• ${pr.title}\n    ${pr.kind} — ${pr.link}`).join("\n"));
        break;
      case "ls":
        if (/^projects\/?$/.test(arg)) o(DATA.projects.map((pr) => pr.title.split(" ")[0].toLowerCase()).join("   "));
        else if (/^blog\/?$/.test(arg)) o(DATA.posts.map((_, i) => `post-${i + 1}.md`).join("   "));
        else o("about.txt   skills.txt   contact.txt   focus.txt   resume.pdf   projects/   blog/");
        break;
      case "cat": {
        const f = arg.toLowerCase();
        if (f === "about.txt") o(p.bio.join("\n\n"));
        else if (f === "skills.txt") o(DATA.skills.map((s) => `${s.name.padEnd(10)}  ${s.tags.join(", ")}`).join("\n"));
        else if (f === "contact.txt") o(DATA.contact.links.map((l) => `${l.label.padEnd(9)} ${l.href}`).join("\n"));
        else if (f === "focus.txt") o(p.details.find((d) => d.label === "Focus")?.value ?? "");
        else if (f === "resume.pdf") err("cat: resume.pdf: binary file — try `open contact` to reach me");
        else if (!arg) err("usage: cat <file>");
        else err(`cat: ${arg}: No such file or directory`);
        break;
      }
      case "open": {
        if (!arg) { err("usage: open <app|url>"); break; }
        if (isUrl(arg)) { window.open(norm(arg), "_blank", "noopener"); o(`Opening ${arg} …`); break; }
        const id = APP_ALIAS[arg.toLowerCase()];
        if (id) { open(id); o(`Launching ${arg} …`); }
        else err(`open: cannot open '${arg}'`);
        break;
      }
      case "contact":
      case "email":
        o([`email    ${DATA.contact.email}`, ...DATA.contact.links.filter((l) => l.glyph !== "mail").map((l) => `${l.label.padEnd(8)} ${l.href}`)].join("\n"));
        break;
      case "social":
        o(DATA.contact.links.filter((l) => l.glyph !== "mail").map((l) => `${l.label.padEnd(8)} ${l.href}`).join("\n"));
        break;
      case "date": o(new Date().toString()); break;
      case "echo": o(arg); break;
      case "pwd": o("/Users/hrishi"); break;
      case "history": o(hist.map((c, i) => `${String(i + 1).padStart(4)}  ${c}`).join("\n") || "(empty)"); break;
      case "neofetch":
        out.push({
          k: "out",
          node: (
            <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
              <pre style={{ color: "#37e05b", margin: 0, lineHeight: 1.15 }}>{`     .:'\n  _ :'_\n .'\`_\`-'_\`\`.\n:________.-'\n:_______:\n :_______\`-;\n  \`._.-._.'`}</pre>
              <div>
                <div><span style={{ color: "#5aa9ff" }}>{p.name.toLowerCase().replace(/\s+/g, "")}</span>@mac</div>
                <div style={{ color: "#9aa0ab" }}>-----------------</div>
                {[["OS", "macOS Portfolio 1.0"], ["Host", "Hrishikesh Borkar"], ["Role", p.role], ["Shell", "zsh 5.9"], ["Focus", p.details.find((d) => d.label === "Focus")?.value ?? ""], ["Status", "● Open to work"]].map(([k, v]) => (
                  <div key={k}><span style={{ color: "#5aa9ff" }}>{k}</span>: {v}</div>
                ))}
              </div>
            </div>
          ),
        });
        break;
      case "sudo": err("🔒 nice try — this is a portfolio, not production."); break;
      case "clear": clear = true; break;
      default: err(`zsh: command not found: ${name}`);
    }

    setLines((prev) => (clear ? [] : [...prev, echo, ...out]));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!hist.length) return;
      const np = histPos === -1 ? hist.length - 1 : Math.max(0, histPos - 1);
      setHistPos(np);
      setInput(hist[np]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histPos === -1) return;
      const np = histPos + 1;
      if (np >= hist.length) { setHistPos(-1); setInput(""); }
      else { setHistPos(np); setInput(hist[np]); }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const tok = input.trim();
      if (tok && !tok.includes(" ")) {
        const m = [...new Set(CMD_NAMES)].filter((n) => n.startsWith(tok));
        if (m.length === 1) setInput(m[0] + " ");
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <div
      ref={bodyRef}
      className="win-scroll"
      onMouseUp={() => { if (!window.getSelection()?.toString()) inputRef.current?.focus(); }}
      style={{ background: "#0c0d12", padding: "14px 16px", fontFamily: "var(--mono)", fontSize: 13, lineHeight: 1.65, cursor: "text" }}
    >
      {lines.map((l, i) => (
        <div key={i} style={{ display: "flex", gap: 8, color: l.k === "err" ? "#ff6b6b" : l.k === "in" ? "#e8eaf0" : "#c9cdd6", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
          {l.k === "in" && <Prompt />}
          {l.node ?? <span>{l.t}</span>}
        </div>
      ))}
      <div style={{ display: "flex", gap: 8, alignItems: "baseline" }}>
        <Prompt />
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          autoFocus
          aria-label="terminal input"
          style={{ flex: 1, minWidth: 0, background: "transparent", border: "none", outline: "none", color: "#e8eaf0", font: "inherit", caretColor: "#37e05b", padding: 0 }}
        />
      </div>
    </div>
  );
}
