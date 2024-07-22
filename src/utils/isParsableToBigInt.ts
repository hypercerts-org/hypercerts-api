export const isParsableToBigInt = (
  value: unknown,
): value is number | bigint => {
  if (
    typeof value === "string" ||
    typeof value === "bigint" ||
    typeof value === "number"
  ) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const parsedValue = BigInt(value);
      return true; // if it was able to parse, return true
    } catch (e) {
      return false; // if an error was thrown, it's not a valid BigInt string
    }
  }

  return false;
};
