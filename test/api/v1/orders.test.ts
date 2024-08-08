import { describe, it } from "vitest";
import { expect } from "chai";

import { getCheapestOrder } from "../../../src/utils/getCheapestOrder.js";

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
    const results = getCheapestOrder([order1, order2], tokenPricesForChain);

    expect(results).to.eq(order1);
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
    const results = getCheapestOrder([order1, order2], tokenPricesForChain);

    expect(results).to.eq(order1);
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
    const results = getCheapestOrder([order1, order2], tokenPricesForChain);

    console.log(results);
    expect(results).to.eq(order2);
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
    const results = getCheapestOrder([order1, order2], tokenPricesForChain);

    expect(results).to.eq(order1);
  });
});
