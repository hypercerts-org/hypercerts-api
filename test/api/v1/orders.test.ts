import { describe, it } from "vitest";
import { expect } from "chai";

import { getCheapestOrder } from "../../../src/utils/getCheapestOrder.js";
import { encodeAbiParameters, parseAbiParameters } from "viem";
import {
  getMaxUnitsForSaleInOrders,
  getUnitsForSaleInOrder,
} from "../../../src/utils/getMaxUnitsForSaleInOrders.js";

const encodeAdditionalParams = ({
  minUnitsToKeep,
  sellLeftOverFraction = false,
  minUnitAmount = BigInt(0),
  maxUnitAmount = BigInt(0),
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
describe("Get cheapest order", async () => {
  type TokenForChain = Parameters<typeof getCheapestOrder>[1];
  type OrderArg = Parameters<typeof getCheapestOrder>[0][number];
  const tokenPricesForChain: TokenForChain = {
    a: {
      tokenPriceInUSD: 1,
      address: "0x123",
      symbol: "A",
      decimals: 18,
    },
    b: {
      tokenPriceInUSD: 2,
      address: "0x456",
      symbol: "B",
      decimals: 18,
    },
    c: {
      tokenPriceInUSD: 3,
      address: "0x789",
      symbol: "C",
      decimals: 6,
    },
    d: {
      tokenPriceInUSD: 1.01,
      address: "0x101",
      symbol: "D",
      decimals: 18,
    },
  };

  it("Returns the cheapest order", () => {
    const order1: OrderArg = {
      price: 1,
      currency: "a",
    };

    const order2: OrderArg = {
      price: 2,
      currency: "b",
    };
    const result = getCheapestOrder([order1, order2], tokenPricesForChain);

    expect(result).to.eq(order1);
  });

  it("Returns the cheapest order with different decimals", () => {
    const order1: OrderArg = {
      price: "1",
      currency: "a",
    };

    const order2: OrderArg = {
      price: "2",
      currency: "c",
    };
    const result = getCheapestOrder([order1, order2], tokenPricesForChain);

    expect(result).to.eq(order1);
  });

  it("Does not overflow", () => {
    const order1: OrderArg = {
      price: (BigInt(10 ** 18) ** BigInt(18)).toString(),
      currency: "a",
    };

    const order2: OrderArg = {
      price: BigInt(10 ** 18).toString(),
      currency: "a",
    };
    const result = getCheapestOrder([order1, order2], tokenPricesForChain);

    expect(result).to.eq(order2);
  });

  it("Returns the cheapest order for usd price with decimals", () => {
    const order1: OrderArg = {
      price: 1,
      currency: "d",
    };

    const order2: OrderArg = {
      price: 1,
      currency: "a",
    };
    const result = getCheapestOrder([order1, order2], tokenPricesForChain);

    expect(result).to.eq(order1);
  });
});

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
});
