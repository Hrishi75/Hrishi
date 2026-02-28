"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { slashNav } from "@/lib/utils";

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLLIElement[]>([]);
  const hoverBgRef = useRef<HTMLDivElement>(null);
  const navLinksWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!navRef.current) return;

    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 2.8, ease: "power3.out" }
    );

    gsap.fromTo(
      itemsRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 3.1, ease: "power2.out" }
    );
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.currentTarget;
    const icon = target.querySelector(".nav-icon");
    const text = target.querySelector(".nav-text");
    const hoverBg = hoverBgRef.current;
    const wrapper = navLinksWrapperRef.current;

    if (!hoverBg || !wrapper) return;

    const rect = target.getBoundingClientRect();
    const wrapperRect = wrapper.getBoundingClientRect();

    gsap.to(hoverBg, {
      left: rect.left - wrapperRect.left,
      width: rect.width,
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    });

    gsap.to(icon, {
      y: -8,
      scale: 1.2,
      rotation: 360,
      duration: 0.5,
      ease: "back.out(2)",
    });

    gsap.to(text, {
      color: "var(--gold)",
      duration: 0.3,
    });

    createParticles(target);
    createRipple(target);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.currentTarget;
    const icon = target.querySelector(".nav-icon");
    const text = target.querySelector(".nav-text");

    gsap.to(icon, {
      y: 0,
      scale: 1,
      rotation: 0,
      duration: 0.4,
      ease: "power2.inOut",
    });

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
        x,
        y,
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
      { width: 0, height: 0, opacity: 0.6 },
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

  const navItems = [
    { href: "#about", icon: "武", text: "About" },
    { href: "#skills", icon: "技", text: "Skills" },
    { href: "#projects", icon: "刃", text: "Projects" },
    { href: "#blogs", icon: "筆", text: "Blogs" },
    { href: "#contact", icon: "道", text: "Contact" },
  ];

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 h-17.5 z-1000 border-b border-parchment/5 flex items-center justify-center px-12.5 max-[900px]:px-6"
      style={{
        background: "linear-gradient(180deg, rgba(10,10,8,0.4) 0%, rgba(10,10,8,0.3) 100%)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
      }}
    >
      <Link
        href="/"
        className="absolute left-12.5 max-[900px]:left-6 font-display text-2xl font-light tracking-[4px] text-parchment flex items-center gap-3 no-underline shrink-0 transition-all duration-300 hover:scale-105"
      >
        <span className="text-crimson text-[28px] transition-all duration-300"
          style={{ textShadow: "0 0 10px rgba(185,28,28,0.3)" }}
        >
          降胔
        </span>
        <span className="max-[900px]:hidden">Hrishikesh</span>
      </Link>

      <div
        ref={navLinksWrapperRef}
        className="relative flex items-center h-full"
        onMouseLeave={handleNavMouseLeave}
      >
        <div
          ref={hoverBgRef}
          className="absolute h-12.5 top-1/2 -translate-y-1/2 rounded-[30px] opacity-0 pointer-events-none z-0"
          style={{
            background: "linear-gradient(135deg, rgba(185,28,28,0.15) 0%, rgba(201,168,76,0.1) 100%)",
            boxShadow: "0 0 30px rgba(185,28,28,0.3)",
            left: 0,
            width: 0,
          }}
        />

        <ul className="flex gap-2 list-none m-0 p-0 relative z-1 max-[900px]:gap-1 max-[600px]:gap-0.5">
          {navItems.map((item) => (
            <li
              key={item.href}
              ref={addToRefs}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative nav-li"
            >
              <Link
                href={item.href}
                onClick={(e) => slashNav(e, item.href)}
                className="flex flex-col items-center px-5 py-3 rounded-[25px] no-underline gap-1 max-[900px]:px-4 max-[900px]:py-2.5 max-[600px]:px-3 max-[600px]:py-2.5"
              >
                <span className="nav-icon font-display text-xl text-parchment opacity-50 transition-all duration-500 max-[900px]:text-lg max-[600px]:text-xl">
                  {item.icon}
                </span>
                <span className="nav-text text-[10px] tracking-[2px] uppercase text-parchment/50 transition-all duration-300 max-[900px]:text-[9px] max-[600px]:hidden">
                  {item.text}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
