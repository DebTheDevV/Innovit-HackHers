import { getContract } from "https://esm.sh/viem";
import { walletClient, publicClient } from "./wallet.js";
import { abi, contractAddress } from "./contract.js";

export async function registerBatch(batchId) {
  const [account] = await walletClient.getAddresses();

  return walletClient.writeContract({
    address: contractAddress,
    abi,
    functionName: "registerBatch",
    args: [batchId],
    account,
  });
}

export async function getBatch(batchId) {
  return publicClient.readContract({
    address: contractAddress,
    abi,
    functionName: "getBatch",
    args: [batchId],
  });
}