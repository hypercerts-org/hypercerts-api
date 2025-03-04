import { Expression, ExpressionBuilder, sql, SqlBool } from "kysely";
import { SupportedDatabases } from "../../services/database/strategies/QueryStrategy.js";

export type NumericOperatorType = "eq" | "gt" | "gte" | "lt" | "lte";
export type StringOperatorType = "contains" | "startsWith" | "endsWith";
export type ArrayOperatorType = "overlaps" | "contains";
export type OperatorType =
  | NumericOperatorType
  | StringOperatorType
  | ArrayOperatorType;

export const getTablePrefix = (column: string): string => {
  switch (column) {
    case "admins":
      return "users";
    case "blueprints":
      return "blueprints_with_admins";
    case "eas_schema":
      return "supported_schemas";
    case "hypercert":
    case "hypercerts":
      return "claims";
    case "contract":
      return "contracts";
    case "fractions":
      return "fractions_view";
    default:
      return column;
  }
};

// Define more specific types for our filter values
type BaseFilterValue = string | number | bigint | boolean | undefined;
type NestedFilterValue = Record<string, BaseFilterValue>;
type ArrayFilterValue = Array<string | number | bigint>;

export type FilterValue =
  | BaseFilterValue
  | NestedFilterValue
  | ArrayFilterValue;
export type WhereFilter = Record<string, FilterValue>;

// Define valid filter operators
type FilterOperator =
  | "eq"
  | "gt"
  | "gte"
  | "lt"
  | "lte"
  | "contains"
  | "startsWith"
  | "endsWith"
  | "in"
  | "arrayContains"
  | "arrayOverlaps";

// Type guard for filter objects
export const isFilterObject = (
  obj: unknown,
): obj is Record<FilterOperator, FilterValue> => {
  if (!obj || typeof obj !== "object") return false;
  return Object.keys(obj).some((key) => key in filterBuilders);
};

// Generic filter builder function type
type FilterBuilder = (
  tableName: string,
  column: string,
  value: FilterValue,
) => Expression<SqlBool>;

// Define filter builders using Kysely's expression builders
const filterBuilders: Record<FilterOperator, FilterBuilder> = {
  eq: (tableName, column, value) =>
    sql<SqlBool>`${sql.raw(`"${tableName}"."${column}"`)} = ${sql.lit(value)}`,
  gt: (tableName, column, value) =>
    sql<SqlBool>`${sql.raw(`"${tableName}"."${column}"`)} > ${sql.lit(value)}`,
  gte: (tableName, column, value) =>
    sql<SqlBool>`${sql.raw(`"${tableName}"."${column}"`)} >= ${sql.lit(value)}`,
  lt: (tableName, column, value) =>
    sql<SqlBool>`${sql.raw(`"${tableName}"."${column}"`)} < ${sql.lit(value)}`,
  lte: (tableName, column, value) =>
    sql<SqlBool>`${sql.raw(`"${tableName}"."${column}"`)} <= ${sql.lit(value)}`,
  contains: (tableName, column, value) =>
    sql<SqlBool>`lower(${sql.raw(`"${tableName}"."${column}"`)}) like lower(${sql.lit("%" + String(value) + "%")})`,
  startsWith: (tableName, column, value) =>
    sql<SqlBool>`lower(${sql.raw(`"${tableName}"."${column}"`)}) like lower(${sql.lit(String(value) + "%")})`,
  endsWith: (tableName, column, value) =>
    sql<SqlBool>`lower(${sql.raw(`"${tableName}"."${column}"`)}) like lower(${sql.lit("%" + String(value))})`,
  in: (tableName, column, value) => {
    // Ensure value is an array and filter out any null/undefined values
    const values = (Array.isArray(value) ? value : [value]).filter(
      (v) => v != null,
    );

    // If no valid values, return null or a false condition
    if (values.length === 0) {
      return sql<SqlBool>`1 = 0`;
    }

    return sql<SqlBool>`${sql.raw(`"${tableName}"."${column}"`)} IN (${sql.join(
      values.map((v) => sql.lit(v)),
      sql`, `,
    )})`;
  },
  arrayContains: (tableName, column, value) =>
    sql<SqlBool>`${sql.raw(`"${tableName}"."${column}"`)} @> ARRAY[${sql.join(Array.isArray(value) ? value : [value], sql`, `)}]`,
  arrayOverlaps: (tableName, column, value) =>
    sql<SqlBool>`${sql.raw(`"${tableName}"."${column}"`)} && ARRAY[${sql.join(Array.isArray(value) ? value : [value], sql`, `)}]`,
};

const isNestedFilter = (value: FilterValue): value is NestedFilterValue =>
  typeof value === "object" && !Array.isArray(value) && value !== null;

export function buildWhereCondition<
  DB extends SupportedDatabases,
  T extends keyof DB,
>(
  tableName: T,
  where: WhereFilter,
  eb: ExpressionBuilder<DB, T>,
): Expression<SqlBool> | undefined {
  const conditions: Expression<SqlBool>[] = [];

  Object.entries(where).forEach((entry) => {
    const [key, value] = entry;

    if (!key || value === undefined) return;

    if (isFilterObject(value)) {
      Object.entries(value).forEach(([operator, operandValue]) => {
        if (operator in filterBuilders && operandValue !== undefined) {
          conditions.push(
            filterBuilders[operator as FilterOperator](
              tableName as string,
              key,
              operandValue,
            ),
          );
        }
      });
    } else if (isNestedFilter(value)) {
      // Nested table filter (e.g., contract.chain_id)
      const relatedTable = getTablePrefix(key);
      const nestedConditions = buildWhereCondition(
        relatedTable as T,
        value,
        eb,
      );

      if (nestedConditions) {
        //TODO: remove exception after DB updates: create metadata view with claims_id column
        if (tableName === "metadata" && relatedTable === "claims") {
          conditions.push(
            sql<SqlBool>`exists (
              select from ${sql.raw(`"claims"`)}
              where ${sql.raw(`metadata.uri = claims.uri`)}
              and ${nestedConditions}
            )`,
          );
        } else if (tableName === "claims" && relatedTable === "metadata") {
          conditions.push(
            sql<SqlBool>`exists (
              select from ${sql.raw(`"metadata"`)}
              where ${sql.raw(`claims.uri = metadata.uri`)}
              and ${nestedConditions}
            )`,
          );
        } else if (
          tableName === "claims" &&
          relatedTable === "fractions_view"
        ) {
          conditions.push(
            sql<SqlBool>`exists (
              select from ${sql.raw(`"fractions_view"`)}
              where ${sql.raw(`claims.hypercert_id = fractions_view.hypercert_id`)}
              and ${nestedConditions}
            )`,
          );
        } else if (tableName === "collections" && relatedTable === "users") {
          conditions.push(
            sql<SqlBool>`exists (
              select from ${sql.raw(`"users"`)}
              where ${sql.raw(`"users".id = "collection_admins".user_id`)}
              where ${sql.raw(`"collections".id = "collection_admins".collection_id`)}
              and ${nestedConditions}
            )`,
          );
        } else if (tableName === "sales" && relatedTable === "claims") {
          conditions.push(
            sql<SqlBool>`exists (
              select from ${sql.raw(`"claims"`)}
              where ${sql.raw(`"claims".hypercert_id = "sales".hypercert_id`)}
              and ${nestedConditions}
            )`,
          );
        } else {
          conditions.push(
            sql<SqlBool>`exists (
            select from ${sql.raw(`"${relatedTable}"`)}
            where ${sql.raw(`"${relatedTable}".id = "${tableName.toString()}".${relatedTable}_id`)}
              and ${nestedConditions}
            )`,
          );
        }
      }
    }
  });

  // if conditions length is 0, return undefined
  if (conditions.length === 0) return undefined;

  // if conditions length is 1, return the first condition
  if (conditions.length === 1) return conditions[0];

  // if conditions length is greater than 1, return the and of the conditions
  return eb.and(conditions);
}
