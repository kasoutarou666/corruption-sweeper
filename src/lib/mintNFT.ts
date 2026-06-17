import { writeContract, waitForTransactionReceipt } from "@wagmi/core";
import { config } from "../wagmi";

export const CONTRACT_ADDRESS = "0x5E6576E8EA4582ec975FefED72654C97bD57ba7E" as const;

export const CONTRACT_ABI = [
  {
    name: "mint",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "politicianId", type: "uint8" },
      { name: "clearTime", type: "uint32" },
      { name: "tokenURI", type: "string" },
    ],
    outputs: [],
  },
] as const;

export async function mintCorruptionNFT(
  politicianId: number,
  clearTime: number,
) {
  const tokenURI = `https://corruption-sweeper.vercel.app/api/metadata/${politicianId}`;
  
  const hash = await writeContract(config, {
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "mint",
    args: [politicianId, clearTime, tokenURI],
  });

  const receipt = await waitForTransactionReceipt(config, { hash });
  return receipt;
}
