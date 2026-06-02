// One-time helper to mint a Spotify refresh token for the "now playing" widget.
//
// Prereqs (set in .env.local first):
//   SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET
// And in the Spotify dashboard, add this exact Redirect URI:
//   http://127.0.0.1:8888/callback
//
// Run:  node scripts/spotify-refresh-token.mjs
// It opens the auth page, captures the code, and prints SPOTIFY_REFRESH_TOKEN.
import http from "node:http";
import { exec } from "node:child_process";
import { readFileSync } from "node:fs";

const REDIRECT = "http://127.0.0.1:8888/callback";
const SCOPE = "user-read-currently-playing user-read-recently-played";

// Minimal .env.local loader (no dependency on dotenv).
try {
  const txt = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
  for (const line of txt.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
} catch {
  // no .env.local yet — fall back to process env
}

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env.local first.");
  process.exit(1);
}

const authUrl =
  "https://accounts.spotify.com/authorize?" +
  new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT,
    scope: SCOPE,
  });

const server = http.createServer(async (req, res) => {
  const u = new URL(req.url, REDIRECT);
  if (u.pathname !== "/callback") {
    res.writeHead(404);
    res.end();
    return;
  }
  const code = u.searchParams.get("code");
  if (!code) {
    res.end("No authorization code returned.");
    return;
  }
  try {
    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: "Basic " + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ grant_type: "authorization_code", code, redirect_uri: REDIRECT }),
    });
    const json = await tokenRes.json();
    if (json.refresh_token) {
      console.log("\n✅ Add this to .env.local:\n");
      console.log("SPOTIFY_REFRESH_TOKEN=" + json.refresh_token + "\n");
      res.end("Success — copy the refresh token from your terminal. You can close this tab.");
    } else {
      console.error("\n❌ No refresh token in response:\n", json, "\n");
      res.end("Failed — see terminal output.");
    }
  } catch (e) {
    console.error(e);
    res.end("Error — see terminal output.");
  } finally {
    server.close();
  }
});

server.listen(8888, () => {
  console.log("\nOpening Spotify authorization in your browser…");
  console.log("If it doesn't open, paste this URL manually:\n" + authUrl + "\n");
  const open =
    process.platform === "win32"
      ? `start "" "${authUrl}"`
      : process.platform === "darwin"
        ? `open "${authUrl}"`
        : `xdg-open "${authUrl}"`;
  exec(open, () => {});
});
