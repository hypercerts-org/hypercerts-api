import { getEvmClient } from "./getRpcUrl.js";
import { generateHypercertIdFromReceipt } from "./generateHypercertIdFromReceipt.js";
import { SupabaseDataService } from "../services/SupabaseDataService.js";

export const waitForTxThenMintBlueprint = async (
  tx_hash: string,
  chain_id: number,
  blueprintId: number,
) => {
  const client = getEvmClient(chain_id);

  const receipt = await client.waitForTransactionReceipt({
    hash: tx_hash as `0x${string}`,
  });

  if (!receipt) {
    throw new Error("No receipt found");
  }

  if (receipt.status !== "success") {
    throw new Error("Transaction failed");
  }

  const hypercertId = generateHypercertIdFromReceipt(receipt, chain_id);

  if (!hypercertId) {
    throw new Error("No hypercertId found");
  }

  const dataService = new SupabaseDataService();
  await dataService.mintBlueprintAndSwapInCollections(blueprintId, hypercertId);
};
