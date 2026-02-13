const API = "https://innovit-hackhers.onrender.com/";

let currentBatch = null;

async function loadBatch() {
  const batchId = document.getElementById("batchId").value.trim().toUpperCase();

  if (!batchId) {
    alert("Enter Batch ID");
    return;
  }

  try {
    const res = await fetch(`${API}/api/batch/${batchId}`);
    const data = await res.json();

    if (!res.ok) {
      alert("❌ Batch not found in backend");
      return;
    }

    currentBatch = data;

    document.getElementById("batchInfo").innerHTML = `
      <h3>Batch Loaded ✔</h3>
      <p><b>Batch ID:</b> ${data.batchId}</p>
      <p><b>Herb:</b> ${data.herb}</p>
      <p><b>Quantity:</b> ${data.quantity} kg</p>
      <p><b>Location:</b> ${data.location}</p>
      <p><b>Harvest Date:</b> ${new Date(data.harvestDate).toDateString()}</p>
    `;

    document.getElementById("processorForm").style.display = "block";

  } catch (err) {
    console.error(err);
    alert("❌ Backend server not reachable");
  }
}

document.getElementById("submitBtn").addEventListener("click", submitProcessing);

async function submitProcessing() {
  if (!currentBatch) {
    alert("❌ Load a batch first");
    return;
  }

  const method = document.getElementById("method").value.trim();
  const facility = document.getElementById("facility").value.trim();
  const operator = document.getElementById("operator").value.trim();
  const processDate = document.getElementById("processDate").value;

  if (!method || !facility || !operator || !processDate) {
    alert("❌ Fill all fields");
    return;
  }

  const payload = {
    batchId: currentBatch.batchId,
    processing: {
      method,
      facility,
      operator,
      processDate,
      timestamp: new Date().toISOString()
    }
  };

  try {
    const res = await fetch(`${API}/api/process`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok) {
      alert("❌ Backend error: " + (data.error || "Unknown"));
      return;
    }

    alert("✅ Processing saved successfully!");
    document.getElementById("processorForm").reset();

  } catch (err) {
    console.error(err);
    alert("❌ Backend server not reachable");
  }
}