// Use env var if provided (e.g., in docker-compose), else default to same-origin /api
const API = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL.replace(/\/$/, "")
  : "";

export async function fetchLeaderboard() {
  const res = await fetch(`${API}/api/leaderboard`);
  return res.json();
}

export async function submitScore(name, score) {
  const res = await fetch(`${API}/api/score`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, score })
  });
  return res.json();
}
