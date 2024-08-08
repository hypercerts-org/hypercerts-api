import { Maker } from "@hypercerts-org/marketplace-sdk";
import { decodeAbiParameters, parseAbiParameters } from "viem";

export const getUnitsForSaleInOrder = (
  order: Pick<Maker, "additionalParameters">,
  unitsInFraction: bigint,
) => {
  const decodedParams = decodeAbiParameters(
    parseAbiParameters(
      "uint256 minUnitAmount, uint256 maxUnitAmount, uint256 minUnitsToKeep, bool sellLeftOverFraction",
    ),
    order.additionalParameters as `0x{string}`,
  );
  const minUnitAmount = decodedParams[0];
  const unitsToKeep = decodedParams[2];
  const sellLeftOverFraction = decodedParams[3];

  const unitsForSale = unitsInFraction - unitsToKeep;

  if (unitsForSale < minUnitAmount && !sellLeftOverFraction) {
    return BigInt(0);
  }

  return unitsForSale;
};

export const getMaxUnitsForSaleInOrders = (
  orders: Pick<Maker, "additionalParameters">[],
  unitsInFraction: bigint,
) => {
  const unitsPerOrder = orders.map((order) =>
    getUnitsForSaleInOrder(order, unitsInFraction),
  );

  // Find max units per order
  return unitsPerOrder.reduce((acc, val) => {
    return val > acc ? val : acc;
  }, BigInt(0));
};
