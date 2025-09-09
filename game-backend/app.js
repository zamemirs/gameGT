const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// In-memory leaderboard [{ name, score, ts }]
let leaderboard = [];

// Health check
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// Submit score: { name: string, score: number } (lower is better)
app.post("/api/score", (req, res) => {
  const { name, score } = req.body || {};
  if (!name || typeof score !== "number") {
    return res.status(400).json({ error: "name and numeric score required" });
  }

  leaderboard.push({ name: String(name).slice(0, 32), score, ts: Date.now() });
  // keep top 10 best (lowest scores)
  leaderboard = leaderboard.sort((a, b) => a.score - b.score).slice(0, 10);

  res.json({ ok: true, leaderboard });
});

// Get leaderboard
app.get("/api/leaderboard", (_req, res) => {
  res.json({ leaderboard });
});

app.listen(PORT, () => {
  console.log(`Backend listening on http://0.0.0.0:${PORT}`);
});
