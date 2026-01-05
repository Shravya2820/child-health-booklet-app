import { useState } from "react";
import Layout from "../components/Layout";

export default function NewChild() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    weight: "",
    height: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
  const existing = JSON.parse(localStorage.getItem("records")) || [];

  const record = {
    ...form,
    synced: false,
    createdAt: new Date().toISOString(),
  };

  existing.push(record);
  localStorage.setItem("records", JSON.stringify(existing));

  alert("Record saved offline");
};


  return (
    <Layout>
      <h2 style={{ marginBottom: "1rem" }}>New Child Record</h2>

      <div className="card" style={{ maxWidth: "600px" }}>
        <label>Child Name</label>
        <input name="name" value={form.name} onChange={handleChange} />

        <label>Age</label>
        <input name="age" value={form.age} onChange={handleChange} />

        <label>Weight (kg)</label>
        <input name="weight" value={form.weight} onChange={handleChange} />

        <label>Height (cm)</label>
        <input name="height" value={form.height} onChange={handleChange} />

        <label>Notes</label>
        <input name="notes" value={form.notes} onChange={handleChange} />

        <div style={{ marginTop: "1.5rem" }}>
          <button className="btn" onClick={handleSave}>
            Save Offline
          </button>
        </div>
      </div>
    </Layout>
  );
}
