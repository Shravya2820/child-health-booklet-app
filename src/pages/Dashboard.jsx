import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <Layout>
      <h2 style={{ marginBottom: "1.5rem" }}>Dashboard</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1rem",
        }}
      >
        <div className="card">
          <h3>New Record</h3>
          <button className="btn" onClick={() => navigate("/new")}>
            Create
          </button>
        </div>

        <div className="card">
          <h3>Saved Records</h3>
          <button className="btn secondary" onClick={() => navigate("/records")}>
            View
          </button>
        </div>

        <div className="card">
          <h3>Sync Data</h3>
          <button className="btn" onClick={() => navigate("/sync")}>
            Sync
          </button>
        </div>
      </div>
    </Layout>
  );
}
