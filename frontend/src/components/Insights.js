import React, { useState } from "react";

export default function Insights({ userId }) {
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchInsights() {
    setLoading(true);
    try {
      const res = await fetch("/api/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      setInsight(data.insight);
    } catch (err) {
      setInsight("Error fetching insights");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="insights-container">
      <button onClick={fetchInsights} disabled={loading}>
        {loading ? "Generating..." : "Get AI Insights"}
      </button>

      {insight && (
        <div className="insight-card">
          <h3>AI Insight</h3>
          <p>{insight}</p>
        </div>
      )}
    </div>
  );
}
