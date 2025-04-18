import {
  HypercertExchangeClient,
  utils,
} from "@hypercerts-org/marketplace-sdk";
import { verifyTypedData } from "ethers";

import { EvmClientFactory } from "../../client/evmClient.js";
import { DataResponse } from "../../types/api.js";
import { getFractionsById } from "../../utils/getFractionsById.js";
import { getHypercertTokenId } from "../../utils/tokenIds.js";

import { MarketplaceStrategy } from "./MarketplaceStrategy.js";
import { EOACreateOrderRequest } from "./schemas.js";
import * as Errors from "./errors.js";

export default class EOACreateOrderStrategy extends MarketplaceStrategy {
  constructor(private readonly request: Omit<EOACreateOrderRequest, "type">) {
    super();
  }

  // TODO: Clean up this long ass method. I copied it 1:1 from the controller.
  async executeCreate(): Promise<DataResponse<unknown>> {
    const { signature, chainId, ...makerOrder } = this.request;

    const hec = new HypercertExchangeClient(
      chainId,
      // @ts-expect-error Typing issue with provider
      EvmClientFactory.createEthersClient(chainId),
    );
    const typedData = hec.getTypedDataDomain();

    const recoveredAddress = verifyTypedData(
      typedData,
      utils.makerTypes,
      makerOrder,
      signature,
    );

    if (!(recoveredAddress.toLowerCase() === makerOrder.signer.toLowerCase())) {
      throw new Errors.SignerMismatch();
    }

    const [validationResult] = await hec.checkOrdersValidity([
      { ...makerOrder, signature, chainId, id: "temporary" },
    ]);
    if (!validationResult.valid) {
      throw new Errors.InvalidOrder(validationResult);
    }

    const tokenIds = makerOrder.itemIds.map(
      (id) => `${chainId}-${makerOrder.collection}-${id}`,
    );

    const fractions = await Promise.all(
      tokenIds.map((fractionId) => getFractionsById(fractionId)),
    );

    // Check if all fractions exist
    if (fractions.some((fraction) => !fraction)) {
      throw new Errors.MissingFractions();
    }

    const allFractions = fractions.flatMap((fraction) => fraction || []);
    // Check if all fractions are owned by signer
    if (
      !allFractions.every(
        (claimToken) =>
          claimToken?.owner_address?.toLowerCase() ===
          recoveredAddress.toLowerCase(),
      )
    ) {
      throw new Errors.FractionOwnershipMismatch();
    }

    const tokenId = makerOrder.itemIds[0];
    const hypercertTokenId = getHypercertTokenId(BigInt(tokenId));
    const formattedHypercertId = `${chainId}-${makerOrder.collection}-${hypercertTokenId.toString()}`;
    // Add to database
    const insertEntity = {
      ...makerOrder,
      chainId,
      signature,
      hypercert_id: formattedHypercertId,
    };
    console.log("[marketplace-api] Inserting order entity", insertEntity);

    const result = await this.dataService.storeOrder(insertEntity);

    return this.returnSuccess(
      "Added order to database",
      result.data
        ? {
            ...result.data,
            itemIds: result.data.itemIds as string[],
            amounts: result.data.amounts as number[],
            status: "VALID",
            hash: "0x",
          }
        : null,
    );
  }
}
