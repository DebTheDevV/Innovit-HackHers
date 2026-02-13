import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@6.10.0/+esm";

const CONTRACT_ADDRESS = "0x930E237f2E1F2b8B3b29263dBceB2882e0413AD9";

const ABI = [
  "function storeBatchHash(string calldata batchId, bytes32 hash) external",
];

let provider, signer, contract;

export async function connectWallet() {
  if (!window.ethereum) {
    alert("MetaMask not installed");
    return;
  }

  provider = new ethers.BrowserProvider(window.ethereum);
  signer = await provider.getSigner();

  contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

  return await signer.getAddress();
}

export async function registerBatchOnChain(batchId, batchData) {
  if (!contract) await connectWallet();

  const json = JSON.stringify(batchData);
  const hash = ethers.keccak256(ethers.toUtf8Bytes(json));

  console.log("📦 Batch JSON:", json);
  console.log("🔐 Hash:", hash);

  const tx = await contract.storeBatchHash(batchId, hash);
  await tx.wait();

  return { hash, txHash: tx.hash };
}