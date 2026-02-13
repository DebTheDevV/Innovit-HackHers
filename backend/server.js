const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let batches = {};

// Farmer submits harvest
app.post("/api/harvest", (req, res) => {
  const data = req.body;

  if (!data.batchId) {
    return res.status(400).json({ error: "Batch ID missing" });
  }

  batches[data.batchId] = data;

  console.log("Saved batch:", data.batchId);

  res.json({
    success: true,
    message: "Harvest stored",
    batchId: data.batchId,
  });
});

// Consumer verifies batch
app.get("/api/batch/:id", (req, res) => {
  const batch = batches[req.params.id];

  if (!batch) {
    return res.status(404).json({ error: "Batch not found" });
  }

  res.json(batch);
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("🚀 VanaspatiSetu Backend Running Successfully");
});

// Processor submits processing
app.post("/api/process", (req, res) => {
  const { batchId, processing } = req.body;

  if (!batchId || !processing) {
    return res.status(400).json({ error: "Missing processing data" });
  }

  if (!batches[batchId]) {
    return res.status(404).json({ error: "Batch not found" });
  }

  batches[batchId].processing = processing;
  batches[batchId].status = "processed";

  console.log("Processing saved for batch:", batchId);

  res.json({ success: true, message: "Processing saved" });
});

// Lab submits test report
app.post("/api/lab", (req, res) => {
  const { batchId, lab } = req.body;

  if (!batchId || !lab) {
    return res.status(400).json({ error: "Missing lab data" });
  }

  if (!batches[batchId]) {
    return res.status(404).json({ error: "Batch not found" });
  }

  batches[batchId].lab = lab;
  batches[batchId].status = "lab_verified";

  console.log("Lab report saved for batch:", batchId);

  res.json({ success: true, message: "Lab report saved" });
});










// ---------------------------------------
