import { describe, it, expect } from "vitest";
import { parseCreateOrderRequest } from "../../../src/lib/marketplace/request-parser.js";
import { ParseError } from "../../../src/lib/errors/request-parsing.js";

describe("parseCreateOrderRequest", () => {
  const mockEoaOrder = {
    type: "eoa",
    signature:
      "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    chainId: 11155111,
    quoteType: 0,
    globalNonce: "1",
    subsetNonce: 0,
    orderNonce: "1",
    strategyId: 0,
    collectionType: 0,
    collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
    currency: "0x1234567890123456789012345678901234567890",
    signer: "0x1234567890123456789012345678901234567890",
    startTime: 1620000000,
    endTime: 1630000000,
    price: "1000000000000000000",
    itemIds: ["1"],
    amounts: [1],
    additionalParameters: "0x",
  };

  const mockMultisigOrder = {
    type: "multisig",
    messageHash:
      "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    chainId: 11155111,
  };

  it("successfully parses an EOA order request", () => {
    const result = parseCreateOrderRequest(mockEoaOrder);
    expect(result).toEqual(mockEoaOrder);
  });

  it("successfully parses a multisig order request", () => {
    const result = parseCreateOrderRequest(mockMultisigOrder);
    expect(result).toEqual(mockMultisigOrder);
  });

  it("handles legacy order format by adding type", () => {
    const legacyOrder = {
      signature: mockEoaOrder.signature,
      chainId: mockEoaOrder.chainId,
      quoteType: mockEoaOrder.quoteType,
      globalNonce: mockEoaOrder.globalNonce,
      subsetNonce: mockEoaOrder.subsetNonce,
      orderNonce: mockEoaOrder.orderNonce,
      strategyId: mockEoaOrder.strategyId,
      collectionType: mockEoaOrder.collectionType,
      collection: mockEoaOrder.collection,
      currency: mockEoaOrder.currency,
      signer: mockEoaOrder.signer,
      startTime: mockEoaOrder.startTime,
      endTime: mockEoaOrder.endTime,
      price: mockEoaOrder.price,
      itemIds: mockEoaOrder.itemIds,
      amounts: mockEoaOrder.amounts,
      additionalParameters: mockEoaOrder.additionalParameters,
    };

    const result = parseCreateOrderRequest(legacyOrder);
    expect(result).toEqual({ ...legacyOrder, type: "eoa" });
  });

  it("throws ParseError for invalid order request", () => {
    const invalidOrder = {
      type: "invalid",
      signature: "0x1234567890abcdef",
    };

    expect(() => parseCreateOrderRequest(invalidOrder)).toThrow(ParseError);
  });

  it("throws ParseError for non-object input", () => {
    expect(() => parseCreateOrderRequest(null)).toThrow(ParseError);
    expect(() => parseCreateOrderRequest(undefined)).toThrow(ParseError);
    expect(() => parseCreateOrderRequest("string")).toThrow(ParseError);
    expect(() => parseCreateOrderRequest(123)).toThrow(ParseError);
    expect(() => parseCreateOrderRequest(true)).toThrow(ParseError);
  });
});
