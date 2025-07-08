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
import type { EOACreateOrderRequest } from "./schemas.js";
import * as Errors from "./errors.js";
import { inject, injectable } from "tsyringe";
import { MarketplaceOrdersService } from "../../services/database/entities/MarketplaceOrdersEntityService.js";

@injectable()
export default class EOACreateOrderStrategy extends MarketplaceStrategy {
  private request!: Omit<EOACreateOrderRequest, "type">;

  constructor(
    @inject(MarketplaceOrdersService)
    private readonly marketplaceOrdersService: MarketplaceOrdersService,
  ) {
    super();
  }

  initialize(request: Omit<EOACreateOrderRequest, "type">): this {
    this.request = request;
    return this;
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
      {
        ...makerOrder,
        signature,
        chainId,
        id: "temporary",
      },
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

    const result = await this.marketplaceOrdersService.storeOrder(insertEntity);

    return this.returnSuccess(
      "Added order to database",
      result
        ? {
            ...result,
            itemIds: result.itemIds as string[],
            amounts: result.amounts as number[],
            status: "VALID",
            hash: "0x",
          }
        : null,
    );
  }
}
