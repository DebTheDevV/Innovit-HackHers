import { createWalletClient, custom, createPublicClient, http } from "https://esm.sh/viem";
import { sepolia } from "https://esm.sh/viem/chains";

export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
});

export let walletClient;

export async function connectWallet() {
  if (!window.ethereum) {
    alert("MetaMask not found");
    return;
  }

  walletClient = createWalletClient({
    chain: sepolia,
    transport: custom(window.ethereum),
  });

  const [address] = await walletClient.requestAddresses();

  return address;
}