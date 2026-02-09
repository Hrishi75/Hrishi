"use client";

import { useEffect, useState } from "react";

export default function Loader() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      id="loading-screen"
      className={`fixed inset-0 bg-[var(--ink)] z-[10000] flex flex-col items-center justify-center transition-all duration-1000 ${
        isLoaded ? "opacity-0 invisible" : "opacity-100"
      }`}
    >
      <div className="loading-kanji">降胔</div>
      <div className="loading-slash" />
      <div className="loading-text">Entering the Path</div>
    </div>
  );
}