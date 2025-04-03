import { z } from "zod";
import { isAddress } from "viem";
import { addressesByNetwork } from "@hypercerts-org/marketplace-sdk";
import { isParsableToBigInt } from "../../utils/isParsableToBigInt.js";

const BASE_CREATE_ORDER_SCHEMA = z.object({
  chainId: z.number(),
});

export const EOA_CREATE_ORDER_SCHEMA = BASE_CREATE_ORDER_SCHEMA.extend({
  type: z.literal("eoa"),
  signature: z.string(),
  chainId: z.number(),
  quoteType: z.number(),
  globalNonce: z.string(),
  subsetNonce: z.number(),
  orderNonce: z.string(),
  strategyId: z.number(),
  collectionType: z.number(),
  collection: z.string(),
  currency: z.string(),
  signer: z.string(),
  startTime: z.number(),
  endTime: z.number(),
  price: z.string(),
  itemIds: z.array(z.string()),
  amounts: z.array(z.number()),
  additionalParameters: z.string(),
})
  .refine(
    ({ chainId }) => isParsableToBigInt(chainId),
    `ChainId is not parseable as bigint`,
  )
  .refine(
    ({ globalNonce }) => isParsableToBigInt(globalNonce),
    `globalNonce is not parseable as bigint`,
  )
  .refine(
    ({ orderNonce }) => isParsableToBigInt(orderNonce),
    `orderNonce is not parseable as bigint`,
  )
  .refine(
    ({ price }) => isParsableToBigInt(price),
    `price is not parseable as bigint`,
  )
  .refine(({ price }) => {
    const priceBigInt = BigInt(price);
    return priceBigInt > 0n;
  }, `Price must be greater than 0`)
  .refine(({ currency }) => isAddress(currency), `Invalid currency address`)
  .refine(({ signer }) => isAddress(signer), `Invalid signer address`)
  .refine(({ itemIds }) => itemIds.length > 0, `itemIds must not be empty`)
  .refine(({ amounts }) => amounts.length > 0, `amounts must not be empty`)
  .refine(
    ({ itemIds, amounts }) => itemIds.length === amounts.length,
    "itemIds and amounts must have the same length",
  )
  .refine(
    ({ startTime, endTime }) => startTime < endTime,
    "startTime must be less than endTime",
  )
  .refine(
    ({ collection }) => isAddress(collection),
    `Invalid collection address`,
  )
  .refine(
    ({ collection, chainId }) =>
      // @ts-expect-error Typing issue with chainId
      addressesByNetwork[chainId]?.MINTER?.toLowerCase() ===
      collection.toLowerCase(),
    `Collection address does not match the minter address for chainId`,
  );

export const MULTISIG_CREATE_ORDER_SCHEMA = BASE_CREATE_ORDER_SCHEMA.extend({
  type: z.literal("multisig"),
  messageHash: z.string(),
});

export const CREATE_ORDER_REQUEST_SCHEMA = z.union([
  EOA_CREATE_ORDER_SCHEMA,
  MULTISIG_CREATE_ORDER_SCHEMA,
]);

export type EOACreateOrderRequest = z.infer<typeof EOA_CREATE_ORDER_SCHEMA>;
export type MultisigCreateOrderRequest = z.infer<
  typeof MULTISIG_CREATE_ORDER_SCHEMA
>;
export type CreateOrderRequest = z.infer<typeof CREATE_ORDER_REQUEST_SCHEMA>;

export const SAFE_CREATE_ORDER_MESSAGE_SCHEMA = z.object({
  message: z.object({
    quoteType: z.number(),
    globalNonce: z.string(),
    subsetNonce: z.number(),
    orderNonce: z.string(),
    strategyId: z.number(),
    collectionType: z.number(),
    collection: z.string(),
    currency: z.string(),
    signer: z.string(),
    startTime: z.number(),
    endTime: z.number(),
    price: z.string(),
    itemIds: z.array(z.string()),
    amounts: z.array(z.string()),
    additionalParameters: z.string(),
  }),
});

export type SafeCreateOrderMessage = z.infer<
  typeof SAFE_CREATE_ORDER_MESSAGE_SCHEMA
>;
