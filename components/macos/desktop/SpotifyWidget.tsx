"use client";

// Desktop "now playing" widget — frosted, display-only card pinned lower-left.
// Polls /api/now-playing and shows what's playing; it never navigates away.
// In production it stays hidden until a real track exists (no dead card for
// visitors); in dev it shows a placeholder so it can be seen/positioned.
import React from "react";
import type { NowPlaying } from "@/app/api/now-playing/route";
import { useDraggable } from "./useDraggable";

const POLL_MS = 20000; // re-fetch from Spotify every 20s
const IS_DEV = process.env.NODE_ENV !== "production";

// Small Spotify glyph for the label row.
function SpotifyMark({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="12" fill="#1ed760" />
      <g fill="none" stroke="#0a0a0a" strokeWidth="1.7" strokeLinecap="round">
        <path d="M6 9.4 Q12 7.4 18 10" />
        <path d="M7 12.8 Q12 11.3 17 13.4" />
        <path d="M8 16 Q12 15 16 16.6" />
      </g>
    </svg>
  );
}

export function SpotifyWidget() {
  const { ref, style, onMouseDown, dragging } = useDraggable("hb-spotify-pos");
  const [data, setData] = React.useState<NowPlaying | null>(null);
  const [progress, setProgress] = React.useState(0);

  // Poll the API.
  React.useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch("/api/now-playing", { cache: "no-store" });
        const json = (await res.json()) as NowPlaying;
        if (!alive) return;
        setData(json);
        setProgress(json.progressMs ?? 0);
      } catch {
        // keep last known state on a transient failure
      }
    };
    load();
    const id = setInterval(load, POLL_MS);
    return () => { alive = false; clearInterval(id); };
  }, []);

  // Advance the progress bar locally between polls while playing.
  React.useEffect(() => {
    if (!data?.isPlaying) return;
    const id = setInterval(() => {
      setProgress((p) => Math.min(p + 1000, data.durationMs ?? p));
    }, 1000);
    return () => clearInterval(id);
  }, [data?.isPlaying, data?.durationMs]);

  if (!data) return null; // still loading first fetch

  const notReady = data.configured === false || !data.title;

  // No track: hide in prod; placeholder in dev so the widget is visible.
  if (notReady) {
    if (!IS_DEV) return null;
    const hint =
      data.configured === false ? "Add Spotify keys to .env.local" : "Play something on Spotify";
    return (
      <div
        ref={ref}
        className={"spotify-widget" + (dragging ? " dragging" : "")}
        style={style}
        onMouseDown={onMouseDown}
        aria-label="Spotify widget (not connected)"
      >
        <div className="spw-art-wrap"><div className="spw-art spw-art-empty">♫</div></div>
        <div className="spw-info">
          <div className="spw-label"><SpotifyMark /> Spotify</div>
          <div className="spw-title">Not connected</div>
          <div className="spw-artist">{hint}</div>
        </div>
      </div>
    );
  }

  const pct = data.durationMs ? Math.min(100, (progress / data.durationMs) * 100) : 0;

  return (
    <div
      ref={ref}
      className={"spotify-widget" + (dragging ? " dragging" : "")}
      style={style}
      onMouseDown={onMouseDown}
      aria-label={`Spotify — ${data.title} by ${data.artist}`}
    >
      <div className="spw-art-wrap">
        {data.albumArt ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="spw-art" src={data.albumArt} alt="" draggable={false} />
        ) : (
          <div className="spw-art spw-art-empty">♫</div>
        )}
      </div>

      <div className="spw-info">
        <div className="spw-label">
          <SpotifyMark />
          {data.isPlaying ? "Now Playing" : "Last Played"}
          {data.isPlaying && (
            <span className="spw-eq" aria-hidden><span /><span /><span /><span /></span>
          )}
        </div>
        <div className="spw-title">{data.title}</div>
        <div className="spw-artist">{data.artist}</div>
        {data.isPlaying && (
          <div className="spw-bar"><i style={{ width: `${pct}%` }} /></div>
        )}
      </div>
    </div>
  );
}
