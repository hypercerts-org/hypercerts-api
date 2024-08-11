import { describe, it } from "vitest";
import { expect } from "chai";
import { getCheapestOrder } from "../../src/utils/getCheapestOrder.js";

describe("Get cheapest order", async () => {
  type OrderArg = Parameters<typeof getCheapestOrder>[0][number];

  it("Returns the cheapest order", () => {
    const order1: OrderArg = {
      price: "1",
      currency: "a",
      pricePerPercentInUSD: "1",
    };

    const order2: OrderArg = {
      price: "2",
      currency: "b",
      pricePerPercentInUSD: "2",
    };
    const result = getCheapestOrder([order1, order2]);

    expect(result).to.eq(order1);
  });

  it("Returns the cheapest order with different decimals", () => {
    const order1: OrderArg = {
      price: "1",
      currency: "a",
      pricePerPercentInUSD: "1.01",
    };

    const order2: OrderArg = {
      price: "2",
      currency: "c",
      pricePerPercentInUSD: "12.1",
    };
    const result = getCheapestOrder([order1, order2]);

    expect(result).to.eq(order1);
  });

  it("Does not overflow", () => {
    const order1: OrderArg = {
      price: (BigInt(10 ** 18) ** BigInt(18)).toString(),
      currency: "a",
      pricePerPercentInUSD: "1.02",
    };

    const order2: OrderArg = {
      price: BigInt(10 ** 18).toString(),
      currency: "a",
      pricePerPercentInUSD: "1.01",
    };
    const result = getCheapestOrder([order1, order2]);

    expect(result).to.eq(order2);
  });

  it("Returns the cheapest order for usd price with decimals", () => {
    const order1: OrderArg = {
      price: 1,
      currency: "d",
      pricePerPercentInUSD: "1.02",
    };

    const order2: OrderArg = {
      price: 1,
      currency: "a",
      pricePerPercentInUSD: "1.03",
    };
    const result = getCheapestOrder([order1, order2]);

    expect(result).to.eq(order1);
  });
});
