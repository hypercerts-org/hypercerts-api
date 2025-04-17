import { EvmClientFactory } from "../client/evmClient.js";
import { BlueprintsService } from "../services/database/entities/BlueprintsEntityService.js";
import { generateHypercertIdFromReceipt } from "./generateHypercertIdFromReceipt.js";
import { inject, injectable, container } from "tsyringe";

@injectable()
export class WaitForTxThenMintBlueprintService {
  constructor(
    @inject(BlueprintsService) private blueprintsService: BlueprintsService,
  ) {}

  async execute(tx_hash: string, chain_id: number, blueprintId: number) {
    const client = EvmClientFactory.createViemClient(chain_id);

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

    await this.blueprintsService.mintBlueprintAndSwapInCollections(
      blueprintId,
      hypercertId,
    );
  }
}

// Export a convenience function that creates and executes the service
export const waitForTxThenMintBlueprint = async (
  tx_hash: string,
  chain_id: number,
  blueprintId: number,
) => {
  const service = new WaitForTxThenMintBlueprintService(
    container.resolve(BlueprintsService),
  );
  return service.execute(tx_hash, chain_id, blueprintId);
};
