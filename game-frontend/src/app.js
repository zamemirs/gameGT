import React, { useEffect, useRef, useState } from "react";
import { fetchLeaderboard, submitScore } from "./api";

export default function App() {
  const [phase, setPhase] = useState("idle"); // idle -> waiting -> go -> result
  const [leaderboard, setLeaderboard] = useState([]);
  const [name, setName] = useState("");
  const [reaction, setReaction] = useState(null);
  const [error, setError] = useState("");

  const timeoutRef = useRef(null);
  const startRef = useRef(0);

  async function loadLB() {
    try {
      const data = await fetchLeaderboard();
      setLeaderboard(data.leaderboard || []);
    } catch (e) {
      setError("Failed to load leaderboard");
    }
  }

  useEffect(() => {
    loadLB();
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const startGame = () => {
    setError("");
    setReaction(null);
    setPhase("waiting");
    const wait = 800 + Math.random() * 2200; // 0.8s - 3s
    timeoutRef.current = setTimeout(() => {
      setPhase("go");
      startRef.current = performance.now();
    }, wait);
  };

  const handleClick = async () => {
    if (phase === "idle") {
      startGame();
    } else if (phase === "waiting") {
      setError("Too soon! Wait for green.");
      clearTimeout(timeoutRef.current);
      setPhase("idle");
    } else if (phase === "go") {
      const ms = Math.round(performance.now() - startRef.current);
      setReaction(ms);
      setPhase("result");
    } else if (phase === "result") {
      startGame();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || reaction == null) return;
    try {
      await submitScore(name.trim(), reaction);
      await loadLB();
      setName("");
    } catch (e) {
      setError("Failed to submit score");
    }
  };

  // Simple styling
  const boxStyle = {
    height: 220,
    borderRadius: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    userSelect: "none",
    cursor: "pointer",
    fontFamily: "Inter, system-ui, Arial",
    fontSize: 22,
    transition: "background 0.2s",
    background:
      phase === "go" ? "#13a749ff" : phase === "waiting" ? "#f59e0b" : "#3b82f6",
    color: "white",
    boxShadow: "0 10px 20px rgba(0,0,0,0.12)"
  };

  return (
    <div style={{ maxWidth: 920, margin: "24px auto", padding: "0 16px", fontFamily: "Inter, system-ui, Arial" }}>
      <h1 style={{ marginBottom: 8 }}>⚡ Reaction Time</h1>
      <p style={{ marginTop: 0, color: "#555" }}>
        Click the box when it turns <b>green</b>. Lower time is better!
      </p>

      <div style={boxStyle} onClick={handleClick}>
        {phase === "idle" && <span>Click to start</span>}
        {phase === "waiting" && <span>Wait for green…</span>}
        {phase === "go" && <span>CLICK!</span>}
        {phase === "result" && (
          <span>Your reaction: <b>{reaction} ms</b> (click to retry)</span>
        )}
      </div>

      {error && <p style={{ color: "#b91c1c", marginTop: 12 }}>{error}</p>}

      <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div>
          <h3>🏆 Leaderboard (Top 10)</h3>
          <ol style={{ lineHeight: "1.9" }}>
            {leaderboard.length === 0 && <p>No scores yet — be the first!</p>}
            {leaderboard.map((r, i) => (
              <li key={`${r.name}-${r.ts}-${i}`}>
                <b>{r.name}</b> — {r.score} ms
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h3>Submit your score</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 8 }}>
              <label style={{ display: "block", marginBottom: 6 }}>Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
              />
            </div>
            <div style={{ marginBottom: 8 }}>
              <label style={{ display: "block", marginBottom: 6 }}>Your last reaction (ms)</label>
              <input
                value={reaction ?? ""}
                readOnly
                placeholder="Play once to get a score"
                style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ddd", background: "#f9fafb" }}
              />
            </div>
            <button
              type="submit"
              disabled={reaction == null || !name.trim()}
              style={{
                padding: "10px 16px",
                borderRadius: 8,
                border: "none",
                background: reaction == null || !name.trim() ? "#9ca3af" : "#111827",
                color: "white",
                cursor: reaction == null || !name.trim() ? "not-allowed" : "pointer"
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      <p style={{ marginTop: 24, color: "#777", fontSize: 12 }}>
        * Leaderboard is in-memory for demo purposes (resets on backend restart).
      </p>
    </div>
  );
}