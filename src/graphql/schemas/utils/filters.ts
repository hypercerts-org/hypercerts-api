import {
  IdSearchOptions,
  NumberArraySearchOptions,
  BigIntSearchOptions,
  StringArraySearchOptions,
  StringSearchOptions,
} from "../inputs/searchOptions.js";
import type { WhereOptions } from "../inputs/whereOptions.js";
import type { Database as CachingDatabase } from "../../../types/supabaseCaching.js";
import { PostgrestTransformBuilder } from "@supabase/postgrest-js";

interface ApplyFilters<
  T extends object,
  QueryType extends PostgrestTransformBuilder<
    CachingDatabase["public"],
    Record<string, unknown>,
    unknown,
    unknown,
    unknown
  >,
> {
  query: QueryType;
  where?: WhereOptions<T>;
}

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

const generateFilters = (
  value: BigIntSearchOptions | StringSearchOptions,
  column: string,
) => {
  const filters: [OperatorType, string, OperandType][] = [];

  for (const [operator, operand] of Object.entries(value) as [
    OperatorType,
    string,
  ][]) {
    if (!operand) continue;

    switch (operator) {
      case "eq":
      case "gt":
      case "gte":
      case "lt":
      case "lte":
        filters.push([operator, column, operand]);
        break;
      case "contains":
        filters.push(["ilike", column, `%${operand}%`]);
        break;
      case "startsWith":
        filters.push(["ilike", column, `${operand}%`]);
        break;
      case "endsWith":
        filters.push(["ilike", column, `%${operand}`]);
        break;
    }
  }
  return filters;
};

const generateArrayFilters = (
  value: NumberArraySearchOptions | StringArraySearchOptions,
  column: string,
) => {
  const filters: [OperatorType, string, OperandType][] = [];
  for (const [operator, operand] of Object.entries(value)) {
    if (!operand) continue;

    // Assert operand is an array of numbers
    if (!Array.isArray(operand)) {
      throw new Error(
        `Expected operand to be an array, but got ${typeof operand}`,
      );
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
  return keys.some((key) => key in possibleStringSearchOptions);
}

function isNumberSearchOptions(value: unknown): value is BigIntSearchOptions {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const possibleNumberSearchOptions = value as Partial<BigIntSearchOptions>;

  // Check for properties unique to NumberSearchOptions
  const keys = ["eq", "gt", "gte", "lt", "lte"];
  return keys.some((key) => key in possibleNumberSearchOptions);
}

function isIdSearchOptions(value: unknown): value is IdSearchOptions {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const possibleIdSearchOptions = value as Partial<BigIntSearchOptions>;

  // Check for properties unique to IdSearchOptions
  const keys = ["eq", "contains", "startsWith", "endsWith"];
  return keys.some((key) => key in possibleIdSearchOptions);
}

function isStringArraySearchOptions(
  value: unknown,
): value is StringArraySearchOptions {
  if (!Array.isArray(value) || value === null) {
    return false;
  }

  const possibleStringArraySearchOptions =
    value as Partial<StringArraySearchOptions>;

  // Check for properties unique to StringArraySearchOptions
  const keys = ["contains"];
  return keys.some((key) => key in possibleStringArraySearchOptions);
}

function isNumberArraySearchOptions(
  value: unknown,
): value is NumberArraySearchOptions {
  if (!Array.isArray(value) || value === null) {
    return false;
  }

  const possibleNumberArraySearchOptions =
    value as Partial<NumberArraySearchOptions>;

  // Check for properties unique to NumberArraySearchOptions
  const keys = ["contains"];
  return keys.some((key) => key in possibleNumberArraySearchOptions);
}

const buildFilters = (value: unknown, column: string) => {
  if (
    isNumberSearchOptions(value) ||
    isStringSearchOptions(value) ||
    isIdSearchOptions(value)
  ) {
    return generateFilters(value, column);
  }

  if (isStringArraySearchOptions(value) || isNumberArraySearchOptions(value)) {
    return generateArrayFilters(value, column);
  }

  return [];
};

export const applyFilters = <
  T extends object,
  QueryType extends PostgrestTransformBuilder<
    CachingDatabase["public"],
    Record<string, unknown>,
    unknown,
    unknown,
    unknown
  >,
>({
  query,
  where,
}: ApplyFilters<T, QueryType>) => {
  if (!where) return query;

  const filters = [];
  for (const [column, value] of Object.entries(where)) {
    if (!value) continue;

    filters.push(...buildFilters(value, column));

    // If the value is an object, recursively apply filters
    if (typeof value === "object" && !Array.isArray(value)) {
      const nestedFilters = [];
      // TODO resolve better handling of column name exceptions
      for (const [_column, _value] of Object.entries(value)) {
        if (!_value) continue;
        if (column === "hypercerts" || column === "hypercert")
          nestedFilters.push(...buildFilters(_value, `claims.${_column}`));
        else if (column === "contract")
          nestedFilters.push(...buildFilters(_value, `contracts.${_column}`));
        else
          nestedFilters.push(...buildFilters(_value, `${column}.${_column}`));
      }
      filters.push(...nestedFilters);
    }
  }

  query = filters.reduce((acc, [filter, ...args]) => {
    return acc[filter](...args);
  }, query);

  return query as unknown as QueryType;
};
