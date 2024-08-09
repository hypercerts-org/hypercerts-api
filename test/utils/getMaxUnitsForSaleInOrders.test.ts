import { describe, it } from "vitest";
import {
  getMaxUnitsForSaleInOrders,
  getUnitsForSaleInOrder,
} from "../../src/utils/getMaxUnitsForSaleInOrders.js";
import { expect } from "chai";
import { encodeAbiParameters, parseAbiParameters } from "viem";

const encodeAdditionalParams = ({
  minUnitsToKeep,
  sellLeftOverFraction = false,
  minUnitAmount = BigInt(1),
  maxUnitAmount = BigInt(1),
}: {
  minUnitsToKeep: bigint;
  sellLeftOverFraction?: boolean;
  minUnitAmount?: bigint;
  maxUnitAmount?: bigint;
}) => {
  return encodeAbiParameters(
    parseAbiParameters(
      "uint256 minUnitAmount, uint256 maxUnitAmount, uint256 minUnitsToKeep, bool sellLeftOverFraction",
    ),
    [minUnitAmount, maxUnitAmount, minUnitsToKeep, sellLeftOverFraction],
  );
};

describe("Get max units for collection of orders", () => {
  it("Returns the max units for sale in all orders", () => {
    const orders = [
      {
        additionalParameters: encodeAdditionalParams({
          minUnitsToKeep: BigInt(3),
        }),
      },
      {
        additionalParameters: encodeAdditionalParams({
          minUnitsToKeep: BigInt(1),
        }),
      },
    ];

    const result = getMaxUnitsForSaleInOrders(orders, BigInt(5));

    expect(result).to.eq(BigInt(4));
  });
});

describe("Get max units for order", () => {
  it("Returns the max units for sale in orders", () => {
    const order = {
      additionalParameters: encodeAdditionalParams({
        minUnitsToKeep: BigInt(3),
      }),
    };

    const result = getUnitsForSaleInOrder(order, BigInt(5));

    expect(result).to.eq(BigInt(2));
  });

  it("Returns the max units for sale in orders with sellLeftOverFraction", () => {
    const orderWithSellLeftOver = encodeAdditionalParams({
      minUnitsToKeep: BigInt(3),
      sellLeftOverFraction: true,
      minUnitAmount: BigInt(2),
    });

    const result = getUnitsForSaleInOrder(
      { additionalParameters: orderWithSellLeftOver },
      BigInt(4),
    );

    expect(result).to.eq(BigInt(1));

    const orderWithoutSellLeftOver = encodeAdditionalParams({
      minUnitsToKeep: BigInt(3),
      sellLeftOverFraction: false,
      minUnitAmount: BigInt(2),
    });

    const result2 = getUnitsForSaleInOrder(
      { additionalParameters: orderWithoutSellLeftOver },
      BigInt(4),
    );

    expect(result2).to.eq(BigInt(0));
  });

  it("Returns 0 if max units amount is 0", () => {
    const order = {
      additionalParameters: encodeAdditionalParams({
        minUnitsToKeep: BigInt(0),
        maxUnitAmount: BigInt(0),
      }),
    };

    const result = getUnitsForSaleInOrder(order, BigInt(1));

    expect(result).to.eq(BigInt(0));
  });
});
