import { useEffect, useState } from "react";
import api from "../utils/api";

export default function Dashboard() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    api
      .get("/dashboard")
      .then((res) => setMessage(res.data.message))
      .catch(() => setMessage("Unauthorized"));
  }, []);

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <p className="subtitle">Manage your AI content system</p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <StatCard title="Posts Generated" value="0" />
        <StatCard title="Active Platforms" value="0" />
        <StatCard title="Credits Left" value="Free" />
      </div>

      {/* Main Card */}
      <div className="main-card">
        <h3>Get Started</h3>
        <p>
          You haven’t generated any content yet.  
          Start by creating your first AI post.
        </p>
<button onClick={() => window.location.href = "/create"}>
  Create Content
</button>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="stat-card">
      <p className="stat-title">{title}</p>
      <h3 className="stat-value">{value}</h3>
    </div>
  );
}
