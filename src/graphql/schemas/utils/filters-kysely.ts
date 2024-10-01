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

export const buildSearchCondition = (
  column: string,
  value:
    | StringSearchOptions
    | NumberSearchOptions
    | StringArraySearchOptions
    | NumberArraySearchOptions,
  tableName: string,
): SqlBool => {
  const conditions: SqlBool[] = [];

  if (value instanceof StringSearchOptions) {
    if (value.contains) {
      conditions.push(
        sql`${sql.raw(`"${tableName}"."${column}"`)} ILIKE
        ${"%" + value.contains + "%"}`,
      );
    }
    if (value.startsWith) {
      conditions.push(
        sql`${sql.raw(`"${tableName}"."${column}"`)} ILIKE
        ${value.startsWith + "%"}`,
      );
    }
    if (value.endsWith) {
      conditions.push(
        sql`${sql.raw(`"${tableName}"."${column}"`)} ILIKE
        ${"%" + value.endsWith}`,
      );
    }
    if (value.eq) {
      conditions.push(
        sql`${sql.raw(`"${tableName}"."${column}"`)} =
        ${value.eq}`,
      );
    }
  } else if (value instanceof NumberSearchOptions) {
    if (value.eq !== undefined) {
      conditions.push(
        sql`${sql.raw(`"${tableName}"."${column}"`)} =
        ${value.eq}`,
      );
    }
    if (value.gt !== undefined) {
      conditions.push(
        sql`${sql.raw(`"${tableName}"."${column}"`)} >
        ${value.gt}`,
      );
    }
    if (value.gte !== undefined) {
      conditions.push(
        sql`${sql.raw(`"${tableName}"."${column}"`)} >=
        ${value.gte}`,
      );
    }
    if (value.lt !== undefined) {
      conditions.push(
        sql`${sql.raw(`"${tableName}"."${column}"`)} <
        ${value.lt}`,
      );
    }
    if (value.lte !== undefined) {
      conditions.push(
        sql`${sql.raw(`"${tableName}"."${column}"`)} <=
        ${value.lte}`,
      );
    }
  } else if (value instanceof StringArraySearchOptions) {
    if (value.contains && value.contains.length > 0) {
      conditions.push(
        sql`${sql.raw(`"${tableName}"."${column}"`)} @>
        ${sql.raw(`ARRAY[${value.contains.map((v) => `'${v}'`).join(", ")}]`)}`,
      );
    }
    if (value.overlaps && value.overlaps.length > 0) {
      conditions.push(
        sql`${sql.raw(`"${tableName}"."${column}"`)} &&
        ${sql.raw(`ARRAY[${value.overlaps.map((v) => `'${v}'`).join(", ")}]`)}`,
      );
    }
  } else if (value instanceof NumberArraySearchOptions) {
    if (value.contains && value.contains.length > 0) {
      conditions.push(
        sql`${sql.raw(`"${tableName}"."${column}"`)} @>
        ${sql.raw(`ARRAY[${value.contains.join(", ")}]`)}`,
      );
    }
    if (value.overlaps && value.overlaps.length > 0) {
      conditions.push(
        sql`${sql.raw(`"${tableName}"."${column}"`)} &&
        ${sql.raw(`ARRAY[${value.overlaps.join(", ")}]`)}`,
      );
    }
  }

  return sql.join(conditions, sql` AND `);
};
export const buildFilterCondition = (
  column: string,
  filter: never,
  tableName: string,
): SqlBool => {
  const conditions: SqlBool[] = [];

  if ("eq" in filter) {
    conditions.push(
      sql`${sql.raw(`"${tableName}"."${column}"`)} =
      ${filter.eq}`,
    );
  }
  if ("gt" in filter) {
    conditions.push(
      sql`${sql.raw(`"${tableName}"."${column}"`)} >
      ${filter.gt}`,
    );
  }
  if ("gte" in filter) {
    conditions.push(
      sql`${sql.raw(`"${tableName}"."${column}"`)} >=
      ${filter.gte}`,
    );
  }
  if ("lt" in filter) {
    conditions.push(
      sql`${sql.raw(`"${tableName}"."${column}"`)} <
      ${filter.lt}`,
    );
  }
  if ("lte" in filter) {
    conditions.push(
      sql`${sql.raw(`"${tableName}"."${column}"`)} <=
      ${filter.lte}`,
    );
  }
  if ("contains" in filter && typeof filter.contains === "string") {
    conditions.push(
      sql`${sql.raw(`"${tableName}"."${column}"`)} ILIKE
      ${"%" + filter.contains + "%"}`,
    );
  }
  if ("startsWith" in filter) {
    conditions.push(
      sql`${sql.raw(`"${tableName}"."${column}"`)} ILIKE
      ${filter.startsWith + "%"}`,
    );
  }
  if ("endsWith" in filter) {
    conditions.push(
      sql`${sql.raw(`"${tableName}"."${column}"`)} ILIKE
      ${"%" + filter.endsWith}`,
    );
  }

  return sql.join(conditions, sql` AND `);
};

export const buildWhereCondition = <T extends string>(
  column: string,
  value: never,
  tableName: T,
  eb: never,
): SqlBool | null => {
  if (!column || value === undefined) return null;
  console.log(
    "Building where condition for field",
    column,
    "in table",
    tableName,
  );

  if (
    value instanceof StringSearchOptions ||
    value instanceof NumberSearchOptions ||
    value instanceof StringArraySearchOptions ||
    value instanceof NumberArraySearchOptions
  ) {
    console.log("Found search condition for column: ", column);
    return buildSearchCondition(column, value, tableName);
  }

  if (typeof value === "object" && value !== null) {
    if (isFilterObject(value)) {
      console.log("Found filter condition for column: ", column);
      if (
        ("contains" in value && Array.isArray(value.contains)) ||
        "overlaps" in value
      ) {
        // This is an array operation, use buildSearchCondition
        return buildSearchCondition(column, value, tableName);
      } else {
        // This is a non-array operation, use buildFilterCondition
        return buildFilterCondition(column, value, tableName);
      }
    }

    const relatedTable = getTablePrefix(column);
    const nestedConditions: SqlBool[] = [];

    for (const [nestedColumn, nestedValue] of Object.entries(value)) {
      if (!nestedColumn || nestedValue === undefined) continue;
      console.log("Nested column", nestedColumn);
      console.log("Nested value", nestedValue);
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

  console.log("Simple equality condition for column: ", column);
  return sql`${sql.raw(`"${tableName}"."${column}"`)} =
  ${value}`;
};
