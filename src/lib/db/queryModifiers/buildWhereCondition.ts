import { Expression, ExpressionBuilder, sql, SqlBool } from "kysely";
import { SupportedDatabases } from "../../../services/database/strategies/QueryStrategy.js";
import { getRelation, hasRelation } from "./tableRelations.js";

// Define more specific types for our filter values
type BaseFilterValue = string | number | bigint | boolean | undefined;
type ArrayFilterValue = Array<string | number | bigint>;

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

type OperatorFilterValue = Partial<
  Record<FilterOperator, BaseFilterValue | ArrayFilterValue>
>;
type NestedFilterValue = Record<string, BaseFilterValue | OperatorFilterValue>;

// Generic filter builder function type
type FilterBuilder = (
  tableName: string,
  column: string,
  value: BaseFilterValue | ArrayFilterValue,
) => Expression<SqlBool>;

/**
 * The type for the filter value.
 *
 * @example
 * ```typescript
 * const value: FilterValue = { eq: "123" };
 * const value: FilterValue = { id: { eq: "123" } };
 * const value: FilterValue = { id: { eq: "123" }, name: { contains: "John" } };
 * ```
 */
export type FilterValue =
  | BaseFilterValue
  | NestedFilterValue
  | ArrayFilterValue
  | OperatorFilterValue;

/**
 * The type for the where filter.
 *
 * @example
 * ```typescript
 * const where: WhereFilter = { id: { eq: "123" } };
 * ```
 */
export type WhereFilter = Record<string, FilterValue>;

/**
 * Get the table prefix for a given column. We use this to handle nested relations where the displayed column is not the actual table name.
 *
 * @param column - The column name to get the prefix for
 * @returns The table prefix for the given column
 */
const getTablePrefix = (column: string): string => {
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

// Type guard for filter objects
const isFilterObject = (obj: unknown): obj is OperatorFilterValue => {
  if (!obj || typeof obj !== "object") return false;
  return Object.keys(obj).some((key) => key in filterBuilders);
};

// Type guard for nested filters
const isNestedFilter = (value: FilterValue): value is NestedFilterValue =>
  typeof value === "object" &&
  !Array.isArray(value) &&
  value !== null &&
  !isFilterObject(value);

/**
 * Filter builders for different operators
 *
 * @type {Record<FilterOperator, FilterBuilder>}
 */
// TODO: add support for negated filters
const filterBuilders: Record<FilterOperator, FilterBuilder> = {
  eq: (tableName, column, value) =>
    sql<SqlBool>`${sql.raw(`"${tableName}"."${column}"`)} = ${value}`,
  gt: (tableName, column, value) =>
    sql<SqlBool>`${sql.raw(`"${tableName}"."${column}"`)} > ${value}`,
  gte: (tableName, column, value) =>
    sql<SqlBool>`${sql.raw(`"${tableName}"."${column}"`)} >= ${value}`,
  lt: (tableName, column, value) =>
    sql<SqlBool>`${sql.raw(`"${tableName}"."${column}"`)} < ${value}`,
  lte: (tableName, column, value) =>
    sql<SqlBool>`${sql.raw(`"${tableName}"."${column}"`)} <= ${value}`,
  contains: (tableName, column, value) =>
    sql<SqlBool>`lower(${sql.raw(`"${tableName}"."${column}"`)}) like lower(${"%" + String(value) + "%"})`,
  startsWith: (tableName, column, value) =>
    sql<SqlBool>`lower(${sql.raw(`"${tableName}"."${column}"`)}) like lower(${String(value) + "%"})`,
  endsWith: (tableName, column, value) =>
    sql<SqlBool>`lower(${sql.raw(`"${tableName}"."${column}"`)}) like lower(${"%" + String(value)})`,
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
      values.map((v) => sql`${v}`),
      sql`, `,
    )})`;
  },
  arrayContains: (tableName, column, value) => {
    const values = Array.isArray(value) ? value : [value];
    return sql<SqlBool>`${sql.raw(`"${tableName}"."${column}"`)} @> ARRAY[${sql.join(
      values.map((v) => sql`${v}`),
      sql`, `,
    )}]`;
  },
  arrayOverlaps: (tableName, column, value) => {
    const values = Array.isArray(value) ? value : [value];
    return sql<SqlBool>`${sql.raw(`"${tableName}"."${column}"`)} && ARRAY[${sql.join(
      values.map((v) => sql`${v}`),
      sql`, `,
    )}]`;
  },
};

/**
 * Builds a SQL WHERE condition for filtering database queries based on provided criteria.
 * Supports basic comparisons, string operations, array operations, and nested relations.
 *
 * @template DB - The database type extending SupportedDatabases
 * @template T - The table name type (must be a key of DB)
 *
 * @param tableName - The name of the base table to query
 * @param where - Filter conditions to apply. Can include:
 *   - Direct field comparisons (e.g., { id: { eq: 123 } })
 *   - String operations (e.g., { name: { contains: "John" } })
 *   - Array operations (e.g., { roles: { arrayContains: ["admin"] } })
 *   - Nested relations (e.g., { company: { name: { eq: "Acme" } } })
 * @param eb - Kysely expression builder for the current query
 *
 * @returns An Expression<SqlBool> that can be used in a WHERE clause, or undefined if no conditions
 *
 * @example
 * ```typescript
 * // Basic field comparison
 * const condition = buildWhereCondition("users", { age: { gt: 18 } }, eb);
 *
 * // String operation
 * const condition = buildWhereCondition("users", { name: { contains: "John" } }, eb);
 *
 * // Nested relation using default foreign key
 * const condition = buildWhereCondition("users", {
 *   company: { name: { eq: "Acme" } }
 * }, eb);
 *
 * // Nested relation using custom TABLE_RELATIONS join
 * const condition = buildWhereCondition("claims", {
 *   fractions_view: { amount: { gt: 100 } }
 * }, eb);
 * ```
 *
 * @remarks
 * - For nested relations, it first checks TABLE_RELATIONS for custom join conditions
 * - If no custom relation exists, falls back to default foreign key pattern (table_id)
 * - Multiple conditions within the same level are combined with AND
 * - Undefined values in filter conditions are ignored
 */
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
              operandValue as BaseFilterValue | ArrayFilterValue,
            ),
          );
        }
      });
    } else if (isNestedFilter(value)) {
      // Nested table filter (e.g., contract.chain_id)
      const relatedTable = getTablePrefix(key);
      const nestedConditions = buildWhereCondition(
        relatedTable as T,
        value as WhereFilter,
        eb,
      );

      if (nestedConditions) {
        if (hasRelation(tableName as string, relatedTable)) {
          const relation = getRelation(tableName as string, relatedTable);
          conditions.push(
            sql<SqlBool>`exists (
              select from ${sql.raw(`"${relatedTable}"`)}
              where ${sql.raw(relation.joinCondition)}
              and ${nestedConditions}
            )`,
          );
        } else if (tableName === "collections" && relatedTable === "users") {
          // TODO: This is a hack to support the collections.users relation
          // TODO: This should be removed once we have a proper relation in TABLE_RELATIONS or a view in the database
          conditions.push(
            sql<SqlBool>`exists (
              select 1 from "users"
              inner join "collection_admins" on "users".id = "collection_admins".user_id
              inner join "collections" on "collections".id = "collection_admins".collection_id
              and ${nestedConditions}
            )`,
          );
        } else if (
          tableName === "collections" &&
          relatedTable === "blueprints_with_admins"
        ) {
          // TODO: This is a hack to support the collections.blueprints relation
          // TODO: This should be removed once we have a proper relation in TABLE_RELATIONS or a view in the database
          conditions.push(
            sql<SqlBool>`exists (
              select from "blueprints_with_admins"
              inner join "collection_blueprints" on "blueprints_with_admins".id = "collection_blueprints".blueprint_id
              inner join "collections" on "collections".id = "collection_blueprints".collection_id
              and ${nestedConditions}
            )`,
          );
        } else {
          // Fall back to default foreign key pattern for standard relationships
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
