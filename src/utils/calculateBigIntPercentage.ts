export const calculateBigIntPercentage = (
  numerator: bigint | string | null | undefined,
  denominator: bigint | string | null | undefined,
) => {
  if (!numerator || !denominator) {
    return undefined;
  }
  const numeratorBigInt = BigInt(numerator);
  const denominatorBigInt = BigInt(denominator);
  const precision = 10 ** 18;
  const unCorrected = Number(
    (numeratorBigInt * BigInt(100) * BigInt(precision)) / denominatorBigInt,
  );
  return unCorrected / precision;
};
