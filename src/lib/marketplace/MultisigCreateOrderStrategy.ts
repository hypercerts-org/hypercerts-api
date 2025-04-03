import {
  HypercertExchangeClient,
  Order,
  OrderValidatorCode,
} from "@hypercerts-org/marketplace-sdk";
import SafeApiKit from "@safe-global/api-kit";

import { DataResponse } from "../../types/api.js";
import { EvmClientFactory } from "../../client/evmClient.js";
import { getFractionsById } from "../../utils/getFractionsById.js";
import { getHypercertTokenId } from "../../utils/tokenIds.js";
import { isTypedMessage } from "../../utils/signatures.js";
import { SafeApiStrategyFactory } from "../safe/SafeApiKitStrategy.js";

import { MarketplaceStrategy } from "./MarketplaceStrategy.js";
import {
  MultisigCreateOrderRequest,
  SAFE_CREATE_ORDER_MESSAGE_SCHEMA,
  SafeCreateOrderMessage,
} from "./schemas.js";
import * as Errors from "./errors.js";

type ValidatableOrder = Omit<
  Order,
  "createdAt" | "invalidated" | "validator_codes"
>;

type OrderDetails = SafeCreateOrderMessage["message"];

export default class MultisigCreateOrderStrategy extends MarketplaceStrategy {
  private readonly safeApiKit: SafeApiKit.default;

  constructor(private readonly request: MultisigCreateOrderRequest) {
    super();
    this.safeApiKit = SafeApiStrategyFactory.getStrategy(
      request.chainId,
    ).createInstance();
  }

  async executeCreate(): Promise<DataResponse<unknown>> {
    const { messageHash } = this.request;

    const { message, safe: safeAddress } =
      await this.safeApiKit.getMessage(messageHash);

    if (!isTypedMessage(message)) {
      throw new Errors.InvalidMessageFormat();
    }

    // Check if signature request already exists
    const existingRequest = await this.dataService.getSignatureRequest(
      safeAddress,
      messageHash,
    );

    if (existingRequest) {
      return this.returnSuccess("Signature request already exists", {
        status: existingRequest.status,
        signer: safeAddress,
      });
    }

    const parsedMessage = this.parseMessage(message);
    await this.validateOrder(parsedMessage.message);
    await this.createSignatureRequest(
      messageHash,
      safeAddress,
      parsedMessage.message,
    );

    return this.returnSuccess("Signature request created successfully", {
      status: "SIGNATURE_REQUEST_PENDING",
      signer: safeAddress,
      hypercert_id: this.formatHypercertId(parsedMessage.message),
    });
  }

  private parseMessage(message?: unknown): SafeCreateOrderMessage {
    try {
      return SAFE_CREATE_ORDER_MESSAGE_SCHEMA.parse(message);
    } catch (error) {
      console.error(
        "[MarketplaceMultisigStrategy] Message validation error:",
        error,
      );
      throw new Errors.InvalidMessageFormat();
    }
  }

  private async validateOrder(orderDetails: OrderDetails): Promise<void> {
    const orderToValidate: ValidatableOrder = {
      quoteType: orderDetails.quoteType,
      globalNonce: orderDetails.globalNonce.toString(),
      subsetNonce: Number(orderDetails.subsetNonce),
      orderNonce: orderDetails.orderNonce.toString(),
      strategyId: Number(orderDetails.strategyId),
      collectionType: orderDetails.collectionType,
      collection: orderDetails.collection,
      currency: orderDetails.currency,
      signer: orderDetails.signer,
      startTime: Number(orderDetails.startTime),
      endTime: Number(orderDetails.endTime),
      price: orderDetails.price.toString(),
      itemIds: orderDetails.itemIds.map((id) => id.toString()),
      amounts: orderDetails.amounts.map((amount) => Number(amount)),
      additionalParameters: orderDetails.additionalParameters,
      signature: "0x",
      chainId: this.request.chainId,
      id: "temporary",
    };

    const hec = new HypercertExchangeClient(
      this.request.chainId,
      // @ts-expect-error Typing issue with provider
      EvmClientFactory.createEthersClient(this.request.chainId),
    );

    const [validationResult] = await hec.checkOrdersValidity([orderToValidate]);

    if (!validationResult.valid) {
      const errorCodes = validationResult.validatorCodes || [];

      // Check if error codes follow the expected pattern. Everything needs to be 0 (valid),
      // except for the signature validation error. This is because when this request is
      // made, the message is missing one or more signatures.
      // The signature will be validated in the command. It's only skipped for now.
      // TODO: get the command name when ready
      const isValidErrorPattern = errorCodes.every((code, index) => {
        if (index === 3) {
          return (
            code ===
              OrderValidatorCode.MISSING_IS_VALID_SIGNATURE_FUNCTION_EIP1271 ||
            code === OrderValidatorCode.ORDER_EXPECTED_TO_BE_VALID
          );
        }
        return code === 0;
      });

      // Only proceed if it's the expected signature validation error pattern
      if (!isValidErrorPattern) {
        throw new Errors.InvalidOrder(validationResult);
      }
    }
    const tokenIds = orderDetails.itemIds.map(
      (id) => `${this.request.chainId}-${orderDetails.collection}-${id}`,
    );

    const fractions = await Promise.all(
      tokenIds.map((fractionId) => getFractionsById(fractionId)),
    );

    // Check if all fractions exist
    if (fractions.some((fraction) => !fraction)) {
      throw new Errors.MissingFractions();
    }
  }

  private formatHypercertId(orderDetails: OrderDetails): string {
    const tokenId = orderDetails.itemIds[0];
    const hypercertTokenId = getHypercertTokenId(BigInt(tokenId));
    const formattedHypercertId = `${this.request.chainId}-${orderDetails.collection}-${hypercertTokenId.toString()}`;
    return formattedHypercertId;
  }

  private async createSignatureRequest(
    messageHash: string,
    safeAddress: string,
    orderDetails: OrderDetails,
  ): Promise<void> {
    // Convert bigint values to strings for JSON serialization
    const messageForStorage = {
      ...orderDetails,
      hypercert_id: this.formatHypercertId(orderDetails),
      globalNonce: orderDetails.globalNonce.toString(),
      subsetNonce: orderDetails.subsetNonce.toString(),
      orderNonce: orderDetails.orderNonce.toString(),
      strategyId: orderDetails.strategyId.toString(),
      startTime: orderDetails.startTime.toString(),
      endTime: orderDetails.endTime.toString(),
      price: orderDetails.price.toString(),
      itemIds: orderDetails.itemIds.map((id) => id.toString()),
      amounts: orderDetails.amounts.map((amount) => amount.toString()),
    };

    await this.dataService.addSignatureRequest({
      chain_id: this.request.chainId,
      safe_address: safeAddress,
      message_hash: messageHash,
      message: messageForStorage,
      purpose: "create_marketplace_order",
      timestamp: Math.floor(Date.now() / 1000),
    });
  }
}
