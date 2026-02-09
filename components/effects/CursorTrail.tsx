"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CursorTrail() {
  const trailsRef = useRef<HTMLDivElement[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create main cursor
    const mainCursor = document.createElement("div");
    mainCursor.className = "main-cursor";
    document.body.appendChild(mainCursor);
    cursorRef.current = mainCursor;

    // Create trail dots
    const trails: HTMLDivElement[] = [];
    for (let i = 0; i < 8; i++) {
      const dot = document.createElement("div");
      dot.className = "cursor-trail";
      dot.style.zIndex = String(9999 - i);
      document.body.appendChild(dot);
      trails.push(dot);
    }
    trailsRef.current = trails;

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Update main cursor immediately
      gsap.to(mainCursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out",
      });
    };

    // Handle hover effects
    const handleMouseEnter = () => {
      gsap.to(mainCursor, {
        scale: 1.5,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(mainCursor, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, .skill-card, .project-item, .contact-link'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    document.addEventListener("mousemove", handleMouseMove);

    // Animate trails with GSAP
    let animationId: number;
    const animateTrails = () => {
      let x = mousePos.current.x;
      let y = mousePos.current.y;

      trails.forEach((trail, i) => {
        const delay = (i + 1) * 0.03;
        
        gsap.to(trail, {
          x: x,
          y: y,
          duration: 0.5 + i * 0.1,
          ease: "power2.out",
          overwrite: true,
        });

        // Update opacity and scale
        const opacity = 0.7 - i * 0.08;
        const scale = 1 - i * 0.1;
        
        gsap.to(trail, {
          opacity: opacity,
          scale: scale,
          duration: 0.3,
        });
      });

      animationId = requestAnimationFrame(animateTrails);
    };
    animateTrails();

    // Hide cursor when leaving window
    const handleMouseLeaveWindow = () => {
      gsap.to([mainCursor, ...trails], {
        opacity: 0,
        duration: 0.3,
      });
    };

    const handleMouseEnterWindow = () => {
      gsap.to([mainCursor, ...trails], {
        opacity: 1,
        duration: 0.3,
      });
    };

    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      cancelAnimationFrame(animationId);
      
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });

      mainCursor.remove();
      trails.forEach((trail) => trail.remove());
    };
  }, []);

  return null;
}