import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@6.10.0/+esm";

export const CONTRACT_ADDRESS = "0x930E237f2E1F2b8B3b29263dBceB2882e0413AD9"

export const CONTRACT_ABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "batchId",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "hash",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "anchoredBy",
          "type": "address"
        }
      ],
      "name": "BatchAnchored",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "batchId",
          "type": "string"
        },
        {
          "internalType": "bytes32",
          "name": "hash",
          "type": "bytes32"
        }
      ],
      "name": "anchorBatch",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "batchId",
          "type": "string"
        },
        {
          "internalType": "bytes32",
          "name": "hash",
          "type": "bytes32"
        }
      ],
      "name": "verifyBatch",
      "outputs": [
        {
          "internalType": "bool",
          "name": "valid",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "anchoredBy",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

export async function registerBatchOnChain(batchId, hash) {
  if (!window.ethereum) {
    alert("Please install MetaMask");
    return;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    signer
  );

  const tx = await contract.registerBatch(batchId, hash);
  await tx.wait();

  alert("✅ Batch registered on blockchain!");
}