let currentBatch = null;

/* ----------- Batch ID Normalizer ----------- */
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

/* ----------- Load Batch ----------- */
function loadBatch() {
  let batchId = document.getElementById("batchId").value.trim().toUpperCase();

  console.log("🔍 Searching:", batchId);

  let raw = localStorage.getItem(batchId);

  if (!raw) {
    const batches = JSON.parse(localStorage.getItem("batches") || "{}");
    raw = batches[batchId];
  }

  if (!raw) {
    const normalized = normalizeBatchId(batchId);
    console.log("🔁 Trying normalized:", normalized);

    raw = localStorage.getItem(normalized);

    if (!raw) {
      const batches = JSON.parse(localStorage.getItem("batches") || "{}");
      raw = batches[normalized];
    }

    batchId = normalized;
  }

  if (!raw) {
    alert("❌ Batch not found: " + batchId);
    return;
  }

  currentBatch = typeof raw === "string" ? JSON.parse(raw) : raw;

  if (!currentBatch.processing) {
    alert("❌ Batch not processed yet");
    return;
  }

  document.getElementById("batchInfo").innerHTML = `
    <h3>Batch Loaded ✔</h3>
    <p><b>Batch ID:</b> ${currentBatch.batchId || batchId}</p>
    <p><b>Herb:</b> ${currentBatch.herb}</p>
    <p><b>Quantity:</b> ${currentBatch.quantity} kg</p>
    <p><b>Processing Method:</b> ${currentBatch.processing.method}</p>
    <p><b>Facility:</b> ${currentBatch.processing.facility}</p>
    <p><b>Operator:</b> ${currentBatch.processing.operator}</p>
  `;

  document.getElementById("labForm").style.display = "block";
}

/* ----------- Submit Lab Report ----------- */
function submitLab() {
  if (!currentBatch) {
    alert("❌ Load batch first");
    return;
  }

  const moisture = document.getElementById("moisture").value;
  const compound = document.getElementById("compound").value;
  const microbial = document.getElementById("microbial").value;
  const heavyMetal = document.getElementById("heavyMetal").value;
  const purity = document.getElementById("purity").value;
  const labName = document.getElementById("labName").value;
  const testDate = document.getElementById("testDate").value;

  if (!moisture || !compound || !microbial || !heavyMetal || !purity || !labName || !testDate) {
    alert("❌ Fill all lab fields");
    return;
  }

  currentBatch.lab = {
    moisture,
    compound,
    microbial,
    heavyMetal,
    purity,
    labName,
    testDate,
    timestamp: new Date().toISOString()
  };

  currentBatch.status = "lab_verified";

  const batches = JSON.parse(localStorage.getItem("batches") || "{}");
  batches[currentBatch.batchId] = currentBatch;
  localStorage.setItem("batches", JSON.stringify(batches));

  alert("✅ Lab Report Saved Successfully");

  document.getElementById("labForm").reset?.();
}