"use client";

// Single source of truth for tweak values. Hydrates from localStorage after
// mount (kept out of the initial render so SSR markup stays deterministic).
import React from "react";

const STORAGE_KEY = "hb-mac-tweaks";

export function useTweaks<T extends Record<string, unknown>>(
  defaults: T
): [T, <K extends keyof T>(key: K, value: T[K]) => void] {
  const [values, setValues] = React.useState<T>(defaults);

  React.useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setValues((prev) => ({ ...prev, ...JSON.parse(saved) }));
    } catch {
      /* ignore unavailable / malformed storage */
    }
  }, []);

  const setTweak = React.useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setValues((prev) => {
      const next = { ...prev, [key]: value };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  return [values, setTweak];
}
