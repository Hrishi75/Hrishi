// Shared types for the macOS desktop components.
import type React from "react";

export type OpenFn = (id: string) => void;

export interface AppConfig {
  title: string;
  menu: string;
  icon: string;
  w: number;
  h: number;
  sidebar: boolean;
  dark?: boolean;
  render: (open: OpenFn) => React.ReactNode;
}

export interface WinState {
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  min: boolean | "anim";
  max: boolean;
  closing?: boolean;
  px?: number;
  py?: number;
  pw?: number;
  ph?: number;
}

export type DockEntry =
  | { type: "app"; id: string; icon: string; label: string }
  | { type: "link"; icon: string; label: string; href: string }
  | { type: "trash"; icon: string; label: string }
  | { type: "sep" };

export interface TweakValues extends Record<string, unknown> {
  accent: string;
  wallpaper: string;
  dockGlass: boolean;
  clockWidget: boolean;
  spotifyWidget: boolean;
}
