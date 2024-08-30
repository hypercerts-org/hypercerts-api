import {
  IdSearchOptions,
  NumberArraySearchOptions,
  NumberSearchOptions,
  StringArraySearchOptions,
  StringSearchOptions
} from "../inputs/searchOptions.js";

type OperandType = string | number | bigint | string[] | bigint[];
type OperatorType = "eq" | "gt" | "gte" | "lt" | "lte" | "ilike" | "contains" | "startsWith" | "endsWith"

export const generateFilterValues = (column: string, operator: OperatorType, operand: OperandType) => {
  console.log("generateFilterValues", column, operator, operand);

  switch (operator) {
    case "eq":
      return [column, "=", operand];
    case "gt":
      return [column, ">", operand];
    case "gte":
      return [column, ">=", operand];
    case "lt":
      return [column, "<", operand];
    case "lte":
      return [column, "<=", operand];
    case "contains":
      return [column, "like", `%${operand}%`];
    case "startsWith":
      return [column, "like", `${operand}%`];
    case "endsWith":
      return [column, "like", `%${operand}`];
  }

  return [];
};



const generateArrayFilters = (value: NumberArraySearchOptions | StringArraySearchOptions, column: string) => {
  const filters: [OperatorType, string, OperandType][] = [];
  for (const [operator, operand] of Object.entries(value)) {
    if (!operand) continue;

    // Assert operand is an array of numbers
    if (!Array.isArray(operand)) {
      throw new Error(`Expected operand to be an array, but got ${typeof operand}`);
    }

    switch (operator) {
      case "contains":
        filters.push(["contains", column, operand]);
        break;
    }
  }
  return filters;
};

function isStringSearchOptions(value: unknown): value is StringSearchOptions {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const possibleStringSearchOptions = value as Partial<StringSearchOptions>;

  // Check for properties unique to StringSearchOptions
  const keys = ["eq", "contains", "startsWith", "endsWith"];
  return keys.some(key => key in possibleStringSearchOptions);
}

function isNumberSearchOptions(value: unknown): value is NumberSearchOptions {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const possibleNumberSearchOptions = value as Partial<NumberSearchOptions>;

  // Check for properties unique to NumberSearchOptions
  const keys = ["eq", "gt", "gte", "lt", "lte"];
  return keys.some(key => key in possibleNumberSearchOptions);
}

function isIdSearchOptions(value: unknown): value is IdSearchOptions {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const possibleIdSearchOptions = value as Partial<NumberSearchOptions>;

  // Check for properties unique to IdSearchOptions
  const keys = ["eq", "contains", "startsWith", "endsWith"];
  return keys.some(key => key in possibleIdSearchOptions);

}

function isStringArraySearchOptions(value: unknown): value is StringArraySearchOptions {
  if (!Array.isArray(value) || value === null) {
    return false;
  }

  const possibleStringArraySearchOptions = value as Partial<StringArraySearchOptions>;

  // Check for properties unique to StringArraySearchOptions
  const keys = ["contains"];
  return keys.some(key => key in possibleStringArraySearchOptions);
}

function isNumberArraySearchOptions(value: unknown): value is NumberArraySearchOptions {
  if (!Array.isArray(value) || value === null) {
    return false;
  }

  const possibleNumberArraySearchOptions = value as Partial<NumberArraySearchOptions>;

  // Check for properties unique to NumberArraySearchOptions
  const keys = ["contains"];
  return keys.some(key => key in possibleNumberArraySearchOptions);
}

const buildFilters = (value: unknown, column: string) => {

  if (isStringArraySearchOptions(value) || isNumberArraySearchOptions(value)) {
    return generateArrayFilters(value, column);
  }

  return [];
};


