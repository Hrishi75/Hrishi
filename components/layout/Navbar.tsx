"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <div className="nav-logo">
        <span className="kanji">侍</span>
        <span>PORTFOLIO</span>
      </div>

      <ul className="nav-links">
        <li><Link href="#about">About</Link></li>
        <li><Link href="#skills">Skills</Link></li>
        <li><Link href="#projects">Projects</Link></li>
        <li><Link href="#architecture">Architecture</Link></li>
        <li><Link href="#contact">Contact</Link></li>
      </ul>
    </nav>
  );
}
