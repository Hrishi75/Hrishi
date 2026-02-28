"use client";

import { useEffect, useRef } from "react";

const TRAIL_COUNT = 8;

export default function CursorTrail() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouse = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const positions = Array.from({ length: TRAIL_COUNT }, () => ({
      x: -100,
      y: -100,
    }));

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const onLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = "0";
      trailRefs.current.forEach((el) => {
        if (el) el.style.opacity = "0";
      });
    };

    const onEnter = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = "1";
    };

    // Hover scale on interactive elements
    const scaleUp = () => {
      if (cursorRef.current)
        cursorRef.current.style.transform =
          "translate(-50%, -50%) scale(1.5)";
    };
    const scaleDown = () => {
      if (cursorRef.current)
        cursorRef.current.style.transform =
          "translate(-50%, -50%) scale(1)";
    };

    const interactives = document.querySelectorAll(
      "a, button, .skill-card, .project-item, .contact-link"
    );
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", scaleUp);
      el.addEventListener("mouseleave", scaleDown);
    });

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    let rafId: number;

    const animate = () => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${mouse.current.x}px`;
        cursorRef.current.style.top = `${mouse.current.y}px`;
      }

      positions.forEach((pos, i) => {
        const target = i === 0 ? mouse.current : positions[i - 1];
        const ease = 0.25 - i * 0.018;
        pos.x += (target.x - pos.x) * ease;
        pos.y += (target.y - pos.y) * ease;

        const el = trailRefs.current[i];
        if (el) {
          el.style.left = `${pos.x}px`;
          el.style.top = `${pos.y}px`;
          el.style.opacity = String(0.7 - i * 0.08);
          el.style.transform = `translate(-50%, -50%) scale(${1 - i * 0.1})`;
        }
      });

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafId);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", scaleUp);
        el.removeEventListener("mouseleave", scaleDown);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="main-cursor"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            trailRefs.current[i] = el;
          }}
          className="cursor-trail"
          style={{ zIndex: 99998 - i }}
        />
      ))}
    </>
  );
}
