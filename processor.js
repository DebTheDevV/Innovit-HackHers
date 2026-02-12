let currentBatch = null;

function normalizeBatchId(id) {
  const map = {
    ASHWAGANDHA: "ASHW",
    TULSI: "TULSI",
    BRAHMI: "BRAHMI",
    NEEM: "NEEM"
  };

  const parts = id.split("_");
  if (map[parts[0]]) parts[0] = map[parts[0]];

  return parts.join("_");
}

function loadBatch() {
  let batchId = document.getElementById("batchId").value.trim().toUpperCase();

  console.log("Searching:", batchId);

  let raw = localStorage.getItem(batchId);

  // Try inside "batches" object
  if (!raw) {
    const batches = JSON.parse(localStorage.getItem("batches") || "{}");
    raw = batches[batchId];
  }

  // Try normalized ID
  if (!raw) {
    const normalized = normalizeBatchId(batchId);
    console.log("Trying normalized:", normalized);

    raw = localStorage.getItem(normalized);

    if (!raw) {
      const batches = JSON.parse(localStorage.getItem("batches") || "{}");
      raw = batches[normalized];
    }

    batchId = normalized;
  }

  if (!raw) {
    alert("❌ Batch not found anywhere: " + batchId);
    return;
  }

  const batch = typeof raw === "string" ? JSON.parse(raw) : raw;

  // ✅ CRITICAL FIX
  currentBatch = batch;

  document.getElementById("batchInfo").innerHTML = `
    <h3>Batch Loaded ✔</h3>
    <p><b>Batch ID:</b> ${batch.batchId || batchId}</p>
    <p><b>Herb:</b> ${batch.herb}</p>
    <p><b>Quantity:</b> ${batch.quantity} kg</p>
    <p><b>Location:</b> ${batch.location}</p>
  `;

  document.getElementById("processorForm").style.display = "block";
}

document.getElementById("submitBtn").addEventListener("click", submitProcessing);

function submitProcessing() {
  if (!currentBatch) {
    alert("❌ Please load a batch first.");
    return;
  }

  const method = document.getElementById("method").value.trim();
  const facility = document.getElementById("facility").value.trim();
  const operator = document.getElementById("operator").value.trim();
  const processDate = document.getElementById("processDate").value;

  if (!method || !facility || !operator || !processDate) {
    alert("❌ Please fill all processing fields.");
    return;
  }

  const batches = JSON.parse(localStorage.getItem("batches")) || {};

  currentBatch.processing = {
    method,
    facility,
    operator,
    processDate,
    timestamp: new Date().toISOString()
  };

  currentBatch.status = "processed";

  batches[currentBatch.batchId] = currentBatch;
  localStorage.setItem("batches", JSON.stringify(batches));

  alert("✅ Processing details saved successfully!");

  document.getElementById("processorForm").reset?.();
}















document.getElementById("submitBtn").addEventListener("click", submitProcessing);

function submitProcessing() {
  if (!currentBatch) {
    alert("❌ Please load a batch first.");
    return;
  }

  const method = document.getElementById("method").value.trim();
  const facility = document.getElementById("facility").value.trim();
  const operator = document.getElementById("operator").value.trim();
  const processDate = document.getElementById("processDate").value;

  if (!method || !facility || !operator || !processDate) {
    alert("❌ Please fill all processing fields.");
    return;
  }

  const batches = JSON.parse(localStorage.getItem("batches")) || {};

  currentBatch.processing = {
    method,
    facility,
    operator,
    processDate,
    timestamp: new Date().toISOString()
  };

  currentBatch.status = "processed";

  batches[currentBatch.batchId] = currentBatch;
  localStorage.setItem("batches", JSON.stringify(batches));

  alert("✅ Processing details saved successfully!");

  document.getElementById("processorForm").reset?.();
}