"use client";

import { useEffect } from "react";

export default function CherryBlossoms() {
  useEffect(() => {
    const count = 15;

    for (let i = 0; i < count; i++) {
      const petal = document.createElement("div");
      petal.className = "petal";
      petal.style.left = Math.random() * 100 + "vw";
      document.body.appendChild(petal);
    }
  }, []);

  return null;
}
