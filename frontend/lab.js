const API = "http://localhost:3001";
let currentBatch = null;

/* ----------- Load Batch ----------- */
async function loadBatch() {
  let batchId = document.getElementById("batchId").value.trim().toUpperCase();

  if (!batchId) {
    alert("❌ Enter batch ID");
    return;
  }

  try {
    const res = await fetch(`${API}/api/batch/${batchId}`);
    const data = await res.json();

    if (!res.ok) {
      alert("❌ Batch not found");
      return;
    }

    if (!data.processing) {
      alert("❌ Batch not processed yet");
      return;
    }

    currentBatch = data;

    document.getElementById("batchInfo").innerHTML = `
      <h3>Batch Loaded ✔</h3>
      <p><b>Batch ID:</b> ${data.batchId}</p>
      <p><b>Herb:</b> ${data.herb}</p>
      <p><b>Quantity:</b> ${data.quantity} kg</p>
      <p><b>Processing Method:</b> ${data.processing.method}</p>
      <p><b>Facility:</b> ${data.processing.facility}</p>
      <p><b>Operator:</b> ${data.processing.operator}</p>
    `;

    document.getElementById("labForm").style.display = "block";

  } catch (err) {
    alert("❌ Backend not reachable");
    console.error(err);
  }
}

/* ----------- Submit Lab Report ----------- */
async function submitLab() {
  if (!currentBatch) {
    alert("❌ Load batch first");
    return;
  }

  const lab = {
    moisture: document.getElementById("moisture").value,
    compound: document.getElementById("compound").value,
    microbial: document.getElementById("microbial").value,
    heavyMetal: document.getElementById("heavyMetal").value,
    purity: document.getElementById("purity").value,
    labName: document.getElementById("labName").value,
    testDate: document.getElementById("testDate").value,
    timestamp: new Date().toISOString()
  };

  if (Object.values(lab).some(v => !v)) {
    alert("❌ Fill all lab fields");
    return;
  }

  try {
    const res = await fetch(`${API}/api/lab`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        batchId: currentBatch.batchId,
        lab
      })
    });

    const data = await res.json();

    if (!res.ok) {
      alert("❌ Error: " + (data.error || "Unknown"));
      return;
    }

    alert("✅ Lab Report Submitted Successfully!");
    document.getElementById("labForm").reset();

  } catch (err) {
    alert("❌ Backend not reachable");
    console.error(err);
  }
}