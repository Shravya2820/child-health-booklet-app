import { useEffect, useState } from "react";
import Layout from "../components/Layout";

export default function Records() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("records")) || [];
    setRecords(stored);
  }, []);

  return (
    <Layout>
      <h2 style={{ marginBottom: "1.5rem" }}>Saved Records</h2>

      {records.length === 0 ? (
        <p>No records saved yet.</p>
      ) : (
        <div className="card">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left" }}>
                <th>Name</th>
                <th>Age</th>
                <th>Weight</th>
                <th>Height</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r, i) => (
                <tr key={i}>
                  <td>{r.name}</td>
                  <td>{r.age}</td>
                  <td>{r.weight}</td>
                  <td>{r.height}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
}
