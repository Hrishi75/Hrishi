"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Loader() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          className="fixed inset-0 bg-ink z-[10000] flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <motion.div
            className="font-display text-[120px] font-light tracking-[20px]"
            style={{ WebkitTextStroke: "1px var(--crimson)" }}
            initial={{ opacity: 0, scale: 1.3, filter: "blur(10px)", color: "transparent" }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              color: "var(--parchment)",
            }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            降胔
          </motion.div>

          <motion.div
            className="w-[200px] h-[2px] bg-crimson mt-[30px]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          />

          <motion.div
            className="font-display text-sm tracking-[8px] uppercase text-gold-dim mt-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 1 }}
          >
            Entering the Path
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
