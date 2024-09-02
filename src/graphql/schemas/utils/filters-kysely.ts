type OperandType = string | number | bigint | string[] | bigint[];
type OperatorType =
  | "eq"
  | "gt"
  | "gte"
  | "lt"
  | "lte"
  | "ilike"
  | "contains"
  | "startsWith"
  | "endsWith";

enum OperatorSymbols {
  eq = "=",
  gt = ">",
  gte = ">=",
  lt = "<",
  lte = "<=",
  ilike = "ilike",
}

export const generateFilterValues = (
  column: string,
  operator: OperatorType,
  operand: OperandType,
) => {
  console.log("generateFilterValues", column, operator, operand);

  switch (operator) {
    case "eq":
      return [column, OperatorSymbols.eq, operand];
    case "gt":
      return [column, OperatorSymbols.gt, operand];
    case "gte":
      return [column, OperatorSymbols.gte, operand];
    case "lt":
      return [column, OperatorSymbols.lt, operand];
    case "lte":
      return [column, OperatorSymbols.lte, operand];
    case "contains":
      return [column, OperatorSymbols.ilike, operand];
    case "startsWith":
      return [column, OperatorSymbols.ilike, operand];
    case "endsWith":
      return [column, OperatorSymbols.ilike, operand];
  }

  return [];
};
