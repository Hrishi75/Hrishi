"use client";

import { useEffect } from "react";

export default function CherryBlossoms() {
  useEffect(() => {
    const createPetals = () => {
      const count = 15;
      const container = document.body;

      for (let i = 0; i < count; i++) {
        const petal = document.createElement("div");
        petal.className = "petal";
        petal.style.left = Math.random() * 100 + "vw";
        petal.style.setProperty("--duration", 8 + Math.random() * 12 + "s");
        petal.style.setProperty("--drift", Math.random() * 100 - 50 + "px");
        petal.style.animationDelay = Math.random() * 15 + "s";
        petal.style.width = 5 + Math.random() * 6 + "px";
        petal.style.height = 5 + Math.random() * 6 + "px";
        container.appendChild(petal);
      }
    };

    createPetals();

    return () => {
      document.querySelectorAll(".petal").forEach((el) => el.remove());
    };
  }, []);

  return null;
}