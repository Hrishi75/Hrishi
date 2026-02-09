"use client";
import { useEffect, useState } from "react";

export default function Loader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDone(true);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="loading-screen" className={done ? "done" : ""}>
      <div className="loading-kanji">侍</div>
      <div className="loading-slash" />
      <div className="loading-text">Entering the Path</div>
    </div>
  );
}
