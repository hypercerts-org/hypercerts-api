import { sql, SqlBool } from "kysely";
import {
  NumberSearchOptions,
  StringSearchOptions,
  StringArraySearchOptions,
  NumberArraySearchOptions,
} from "../inputs/searchOptions.js";

export type OperandType = string | number | bigint | string[] | bigint[];

export type NumericOperatorType = "eq" | "gt" | "gte" | "lt" | "lte";
export type StringOperatorType = "contains" | "startsWith" | "endsWith";
export type ArrayOperatorType = "overlaps" | "contains";
export type OperatorType =
  | NumericOperatorType
  | StringOperatorType
  | ArrayOperatorType;

enum OperatorSymbols {
  eq = "=",
  gt = ">",
  gte = ">=",
  lt = "<",
  lte = "<=",
  ilike = "~*",
  overlaps = "&&",
  contains = "@>",
}

// TODO: remove when data client is updated
export const generateFilterValues = (
  column: string,
  operator: OperatorType,
  operand: OperandType,
) => {
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
      return [column, OperatorSymbols.ilike, `%${operand}%`];
    case "startsWith":
      return [column, OperatorSymbols.ilike, `${operand}%`];
    case "endsWith":
      return [column, OperatorSymbols.ilike, `%${operand}`];
  }

  return [];
};

export const getTablePrefix = (column: string): string => {
  switch (column) {
    case "hypercerts":
      return "claims";
    case "contract":
      return "contracts";
    case "fractions":
      return "fractions_view";
    case "metadata":
      return "metadata";
    case "attestations":
      return "attestations";
    default:
      return column;
  }
};

export const isFilterObject = (obj: never): boolean => {
  const filterKeys = [
    "eq",
    "gt",
    "gte",
    "lt",
    "lte",
    "contains",
    "startsWith",
    "endsWith",
    "in",
    "overlaps",
    "contains",
  ];
  return Object.keys(obj).some((key) => filterKeys.includes(key));
};

// Helper functions for building conditions
const buildEqualityCondition = (
  column: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
  tableName: string,
): SqlBool => sql`${sql.raw(`"${tableName}"."${column}"`)} =
${value}`;

const buildInCondition = (
  column: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  values: any[],
  tableName: string,
): SqlBool => sql`${sql.raw(`"${tableName}"."${column}"`)} = ANY(${values})`;

const buildComparisonCondition = (
  column: string,
  operator: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
  tableName: string,
): SqlBool =>
  sql`${sql.raw(`"${tableName}"."${column}"`)}
  ${sql.raw(operator)}
  ${value}`;

const buildLikeCondition = (
  column: string,
  pattern: string,
  tableName: string,
): SqlBool => sql`${sql.raw(`"${tableName}"."${column}"`)} ILIKE
${pattern}`;

const buildArrayCondition = (
  column: string,
  operator: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  values: any[],
  tableName: string,
): SqlBool =>
  sql`${sql.raw(`"${tableName}"."${column}"`)}
  ${sql.raw(operator)}
  ${sql.raw(`ARRAY[${values.map((v) => `'${v}'`).join(", ")}]`)}`;

const conditionBuilders = {
  eq: buildEqualityCondition,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  in: (column: string, value: any, tableName: string) =>
    buildInCondition(column, value, tableName),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gt: (column: string, value: any, tableName: string) =>
    buildComparisonCondition(column, ">", value, tableName),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gte: (column: string, value: any, tableName: string) =>
    buildComparisonCondition(column, ">=", value, tableName),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lt: (column: string, value: any, tableName: string) =>
    buildComparisonCondition(column, "<", value, tableName),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lte: (column: string, value: any, tableName: string) =>
    buildComparisonCondition(column, "<=", value, tableName),
  contains: (column: string, value: string, tableName: string) =>
    buildLikeCondition(column, `%${value}%`, tableName),
  startsWith: (column: string, value: string, tableName: string) =>
    buildLikeCondition(column, `${value}%`, tableName),
  endsWith: (column: string, value: string, tableName: string) =>
    buildLikeCondition(column, `%${value}`, tableName),
};

export const buildCondition = (
  column: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
  tableName: string,
): SqlBool => {
  const conditions: SqlBool[] = [];

  if (
    value instanceof StringSearchOptions ||
    value instanceof NumberSearchOptions
  ) {
    Object.entries(value).forEach(([key, val]) => {
      if (key in conditionBuilders && val !== undefined) {
        conditions.push(conditionBuilders[key](column, val, tableName));
      }
    });
  } else if (
    value instanceof StringArraySearchOptions ||
    value instanceof NumberArraySearchOptions
  ) {
    if (value.contains && value.contains.length > 0) {
      conditions.push(
        buildArrayCondition(column, "@>", value.contains, tableName),
      );
    }
    if (value.overlaps && value.overlaps.length > 0) {
      conditions.push(
        buildArrayCondition(column, "&&", value.overlaps, tableName),
      );
    }
  } else if (typeof value === "object" && value !== null) {
    Object.entries(value).forEach(([key, val]) => {
      if (key in conditionBuilders && val !== undefined) {
        conditions.push(conditionBuilders[key](column, val, tableName));
      } else if (key === "contains" && Array.isArray(val)) {
        conditions.push(buildArrayCondition(column, "@>", val, tableName));
      } else if (key === "overlaps" && Array.isArray(val)) {
        conditions.push(buildArrayCondition(column, "&&", val, tableName));
      }
    });
  }

  return sql.join(conditions, sql` AND `);
};

export const buildWhereCondition = <T extends string>(
  column: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
  tableName: T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  eb: any,
): SqlBool | null => {
  if (!column || value === undefined) return null;

  if (typeof value === "object" && value !== null) {
    if (isFilterObject(value)) {
      return buildCondition(column, value, tableName);
    }

    const relatedTable = getTablePrefix(column);
    const nestedConditions: SqlBool[] = [];

    for (const [nestedColumn, nestedValue] of Object.entries(value)) {
      if (!nestedColumn || nestedValue === undefined) continue;
      const nestedCondition = buildWhereCondition(
        nestedColumn,
        nestedValue,
        relatedTable,
        eb,
      );
      if (nestedCondition) {
        nestedConditions.push(nestedCondition);
      }
    }

    return nestedConditions.length > 0
      ? sql.join(nestedConditions, sql` AND `)
      : null;
  }

  return sql`${sql.raw(`"${tableName}"."${column}"`)} =
  ${value}`;
};
