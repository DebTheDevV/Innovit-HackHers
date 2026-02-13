# 🌿 VanaspatiSetu — Blockchain Traceability for Medicinal Plants

VanaspatiSetu is a supply chain transparency platform that records medicinal plant harvests and verifies authenticity using blockchain.  
It empowers farmers, processors, labs, and consumers with tamper-proof traceability from farm to final product.

---

## 🚀 Problem Statement

Medicinal plant supply chains often face:

- Adulteration of raw materials  
- Lack of origin traceability  
- Middlemen manipulation  
- Fake quality certifications  
- Low trust between stakeholders  

VanaspatiSetu solves this by recording harvest metadata and anchoring it to blockchain for public verification.

---

## 💡 Solution Overview

The platform allows:

- 👨‍🌾 Farmers → Record harvest data + GPS  
- 🏭 Processors → Verify incoming batches  
- 🧪 Labs → Upload test certification  
- 🛒 Consumers → Scan QR to verify authenticity  

Each batch gets a unique ID + QR code + blockchain record.

---

## 🧩 System Architecture

Frontend → Harvest entry + QR generation  
Backend → Validation + database storage  
Blockchain → Immutable batch registration  

### Tech flow:

```
Farmer submits harvest
↓
Backend validates season + zone + GPS
↓
Batch stored in database
↓
Blockchain transaction anchors batch
↓
QR generated for verification
```

## 🛠️ Tech Stack

### Frontend
- HTML5, CSS3, JavaScript  
- QR Code generation (qrcode.js)  
- Role-based UI pages  

### Backend
- Node.js runtime  
- Express API server  
- JSON database (prototype storage)  

### Blockchain Layer
- Smart contract for batch registration  
- Wallet-based transaction confirmation  
- On-chain verification hash  

### Deployment 
- Frontend → Vercel  
- Backend → Render 
- Blockchain (In Progress)

---

## 📂 Project Structure


```
VanaspatiSetu/
│
├── frontend/
│   ├── index.html        → Consumer verification page
│   ├── farmer.html       → Harvest submission portal
│   ├── processor.html    → Batch processing portal
│   ├── lab.html          → Lab certification portal
│   ├── blockchain.js     → Blockchain interaction module
│   └── styles/
│
├── backend/
│   ├── server.js         → Express API
│   ├── routes/
│   └── data/
│
├── smart-contract/
│   └── BatchRegistry.sol
│
└── README.md
```

## ⚙️ Features

### ✅ Harvest Validation
- Season-based herb validation  
- Allowed zone verification  
- GPS capture  
- Farmer identity binding  

### ✅ QR Code Traceability
- Auto-generated batch ID  
- Public verification link  
- Downloadable QR  

### ✅ Blockchain Anchoring
- Wallet-confirmed transaction  
- Immutable batch registration  
- On-chain verification proof  

### ✅ Multi-Role Portal
- Farmer dashboard  
- Processor verification  
- Lab certification upload  
- Consumer scan interface  

---

## 🔐 Data Stored per Batch

- Batch ID  
- Herb type  
- Quantity  
- Location + GPS  
- Harvest date  
- Farmer identity  
- Blockchain transaction hash  

---

## ▶️ How to Run Locally

### 1️⃣ Start Backend

```bash
cd backend
npm install
node server.js
```

Backend runs at:

```
http://localhost:3001
```

### 2️⃣ Open Frontend

Open in browser:

```
frontend/farmer.html
```

(No build step required)

---

## 🌐 API Endpoints

### Create Harvest
```
POST /api/harvest
```

### Fetch Batch
```
GET /batch/:batchId
```

---

## 🔗 Blockchain Flow

- Harvest submitted  
- Backend stores batch  
- Frontend calls blockchain module  
- Wallet confirms transaction  
- Batch anchored on-chain  

---

## 📸 Demo Flow 

1️⃣ Farmer records harvest  
2️⃣ QR generated instantly  
3️⃣ Blockchain confirmation shown  
4️⃣ Processor scans QR  
5️⃣ Consumer verifies authenticity  

---

## 🎯 Impact

- ✔ Prevents adulteration  
- ✔ Builds farmer trust  
- ✔ Ensures supply transparency  
- ✔ Enables regulatory compliance  
- ✔ Adds export credibility  

---

## 🔮 Future Scope

- QR Scan and Auto Verification
- IPFS storage for batch metadata  
- Mobile farmer app  
- AI adulteration prediction  
- Government certification integration  
- Payment smart contracts  

---

## 👥 Team

- Debadrita Pal
- Anvi Jain
- Siddhi Gupta


## 📜 License

MIT License — Free for academic and research use.
