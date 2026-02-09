"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { slashNav } from "@/lib/utils";

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLLIElement[]>([]);
  const hoverBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!navRef.current) return;

    // Initial animation on load
    gsap.fromTo(
      navRef.current,
      { 
        y: -100, 
        opacity: 0 
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 2.8,
        ease: "power3.out",
      }
    );

    // Stagger animation for nav items
    gsap.fromTo(
      itemsRef.current,
      { 
        y: -20, 
        opacity: 0 
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        delay: 3.1,
        ease: "power2.out",
      }
    );
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.currentTarget;
    const icon = target.querySelector(".nav-icon");
    const text = target.querySelector(".nav-text");
    const hoverBg = hoverBgRef.current;

    if (!hoverBg) return;

    // Move hover background
    const rect = target.getBoundingClientRect();
    const navLinksRect = target.parentElement?.getBoundingClientRect();
    
    if (navLinksRect) {
      gsap.to(hoverBg, {
        left: rect.left - navLinksRect.left,
        width: rect.width,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    }

    // Animate icon with bounce and rotation
    gsap.to(icon, {
      y: -8,
      scale: 1.2,
      rotation: 360,
      duration: 0.5,
      ease: "back.out(2)",
    });

    // Glow effect on text
    gsap.to(text, {
      color: "var(--gold)",
      duration: 0.3,
    });

    // Create particle burst effect
    createParticles(target);

    // Ripple effect
    createRipple(target);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.currentTarget;
    const icon = target.querySelector(".nav-icon");
    const text = target.querySelector(".nav-text");

    // Reset icon
    gsap.to(icon, {
      y: 0,
      scale: 1,
      rotation: 0,
      duration: 0.4,
      ease: "power2.inOut",
    });

    // Reset text
    gsap.to(text, {
      color: "rgba(245, 240, 232, 0.5)",
      duration: 0.3,
    });
  };

  const handleNavMouseLeave = () => {
    gsap.to(hoverBgRef.current, {
      opacity: 0,
      duration: 0.3,
    });
  };

  const createParticles = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 6; i++) {
      const particle = document.createElement("div");
      particle.className = "nav-particle";
      particle.style.left = centerX + "px";
      particle.style.top = centerY + "px";
      document.body.appendChild(particle);

      const angle = (Math.PI * 2 * i) / 6;
      const distance = 40 + Math.random() * 20;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      gsap.to(particle, {
        x: x,
        y: y,
        opacity: 0,
        scale: 0,
        duration: 0.6 + Math.random() * 0.3,
        ease: "power2.out",
        onComplete: () => particle.remove(),
      });
    }
  };

  const createRipple = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const ripple = document.createElement("div");
    ripple.className = "nav-ripple";
    ripple.style.left = rect.left + rect.width / 2 + "px";
    ripple.style.top = rect.top + rect.height / 2 + "px";
    document.body.appendChild(ripple);

    gsap.fromTo(
      ripple,
      {
        width: 0,
        height: 0,
        opacity: 0.6,
      },
      {
        width: 100,
        height: 100,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => ripple.remove(),
      }
    );
  };

  const addToRefs = (el: HTMLLIElement | null) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  return (
    <nav ref={navRef} className="main-nav">
      <div className="nav-logo">
        <span className="kanji">降胔</span>
        <span>PORTFOLIO</span>
      </div>

      <ul className="nav-links" onMouseLeave={handleNavMouseLeave}>
        <div ref={hoverBgRef} className="nav-hover-bg"></div>
        
        <li
          ref={addToRefs}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link href="#about" onClick={(e) => slashNav(e, "#about")}>
            <span className="nav-icon">武</span>
            <span className="nav-text">About</span>
          </Link>
        </li>
        <li
          ref={addToRefs}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link href="#skills" onClick={(e) => slashNav(e, "#skills")}>
            <span className="nav-icon">技</span>
            <span className="nav-text">Skills</span>
          </Link>
        </li>
        <li
          ref={addToRefs}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link href="#projects" onClick={(e) => slashNav(e, "#projects")}>
            <span className="nav-icon">刃</span>
            <span className="nav-text">Projects</span>
          </Link>
        </li>
        <li
          ref={addToRefs}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link href="#architecture" onClick={(e) => slashNav(e, "#architecture")}>
            <span className="nav-icon">構</span>
            <span className="nav-text">Architecture</span>
          </Link>
        </li>
        <li
          ref={addToRefs}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link href="#contact" onClick={(e) => slashNav(e, "#contact")}>
            <span className="nav-icon">道</span>
            <span className="nav-text">Contact</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}