import express from "express";
import cors from "cors";
import Database from "better-sqlite3";
import PDFDocument from "pdfkit";

const app = express();
const PORT = 4000;

/* -------------------- MIDDLEWARE -------------------- */
app.use(cors());
app.use(express.json());

/* -------------------- DATABASE -------------------- */
// This will create/use records.db automatically
const db = new Database("records.db");

// Create table if it doesn't exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    healthId TEXT UNIQUE,
    name TEXT,
    age TEXT,
    createdAt TEXT
  )
`).run();

/* -------------------- ROUTES -------------------- */

// Health check
app.get("/", (req, res) => {
  res.send("Child Health Booklet Backend is running");
});

// Get all records
app.get("/records", (req, res) => {
  const records = db
    .prepare("SELECT * FROM records ORDER BY id DESC")
    .all();

  res.json(records);
});

// Save a new record
app.post("/records", (req, res) => {
  const { healthId, name, age, createdAt } = req.body;

  if (!healthId || !name || !age) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const stmt = db.prepare(`
    INSERT OR REPLACE INTO records (healthId, name, age, createdAt)
    VALUES (?, ?, ?, ?)
  `);

  stmt.run(
    healthId,
    name,
    age,
    createdAt || new Date().toISOString()
  );

  res.json({ success: true });
});

/* -------------------- PDF GENERATION -------------------- */
app.get("/records/:healthId/pdf", (req, res) => {
  const { healthId } = req.params;

  const record = db
    .prepare("SELECT * FROM records WHERE healthId = ?")
    .get(healthId);

  if (!record) {
    return res.status(404).send("Record not found");
  }

  const doc = new PDFDocument();

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${healthId}.pdf`
  );

  doc.pipe(res);

  doc.fontSize(20).text("Child Health Record Booklet", { align: "center" });
  doc.moveDown();

  doc.fontSize(12);
  doc.text(`Health ID: ${record.healthId}`);
  doc.text(`Name: ${record.name}`);
  doc.text(`Age: ${record.age}`);
  doc.text(`Created At: ${record.createdAt}`);

  doc.end();
});

/* -------------------- START SERVER -------------------- */
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
