// Spotify "now playing" endpoint. Exchanges a long-lived refresh token for a
// short-lived access token, then reads the current (or most recent) track.
// All Spotify secrets stay server-side; the client only ever sees this JSON.
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // never cache — it is "now" playing

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_URL = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENT_URL = "https://api.spotify.com/v1/me/player/recently-played?limit=1";

interface SpotifyArtist { name: string }
interface SpotifyImage { url: string; width: number; height: number }
interface SpotifyTrack {
  name: string;
  artists: SpotifyArtist[];
  album: { name: string; images: SpotifyImage[] };
  external_urls: { spotify?: string };
  duration_ms: number;
}

export interface NowPlaying {
  configured: boolean;
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumArt?: string | null;
  url?: string | null;
  progressMs?: number;
  durationMs?: number;
}

async function getAccessToken(): Promise<string | null> {
  const id = process.env.SPOTIFY_CLIENT_ID;
  const secret = process.env.SPOTIFY_CLIENT_SECRET;
  const refresh = process.env.SPOTIFY_REFRESH_TOKEN;
  if (!id || !secret || !refresh) return null;

  const basic = Buffer.from(`${id}:${secret}`).toString("base64");
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: refresh }),
    cache: "no-store",
  });
  if (!res.ok) return null;
  const json = (await res.json()) as { access_token?: string };
  return json.access_token ?? null;
}

function shape(track: SpotifyTrack, isPlaying: boolean, progressMs: number): NowPlaying {
  return {
    configured: true,
    isPlaying,
    title: track.name,
    artist: track.artists.map((a) => a.name).join(", "),
    album: track.album.name,
    albumArt: track.album.images?.[0]?.url ?? null,
    url: track.external_urls?.spotify ?? null,
    progressMs,
    durationMs: track.duration_ms ?? 0,
  };
}

export async function GET() {
  const token = await getAccessToken();
  // No env vars set yet → tell the client to show the setup hint instead.
  if (!token) return NextResponse.json<NowPlaying>({ configured: false, isPlaying: false });

  const auth = { Authorization: `Bearer ${token}` };

  // 1) Currently playing. 200 = something is on; 204 = player idle.
  const now = await fetch(NOW_PLAYING_URL, { headers: auth, cache: "no-store" });
  if (now.status === 200) {
    const data = (await now.json()) as { item?: SpotifyTrack; is_playing?: boolean; progress_ms?: number };
    if (data?.item) return NextResponse.json(shape(data.item, !!data.is_playing, data.progress_ms ?? 0));
  }

  // 2) Nothing live → fall back to the last played track.
  const recent = await fetch(RECENT_URL, { headers: auth, cache: "no-store" });
  if (recent.ok) {
    const data = (await recent.json()) as { items?: { track: SpotifyTrack }[] };
    const track = data.items?.[0]?.track;
    if (track) return NextResponse.json(shape(track, false, 0));
  }

  return NextResponse.json<NowPlaying>({ configured: true, isPlaying: false });
}
