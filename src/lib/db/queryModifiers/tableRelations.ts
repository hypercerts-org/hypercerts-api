/**
 * Type representing a table relation configuration
 */
export interface TableRelation {
  /** SQL condition for joining the tables */
  joinCondition: string;
  /** Optional foreign key override if not following standard naming */
  foreignKey?: string;
}

/**
 * Type representing all possible relations for a table
 */
export type TableRelations = {
  [tableName: string]: {
    [relatedTable: string]: TableRelation;
  };
};

/**
 * Database table relationship configurations
 * Defines how tables are related to each other for nested queries
 */
export const TABLE_RELATIONS: TableRelations = {
  metadata: {
    claims: {
      joinCondition: "metadata.uri = claims.uri",
    },
  },
  claims: {
    metadata: {
      joinCondition: "claims.uri = metadata.uri",
    },
    fractions_view: {
      joinCondition: "claims.hypercert_id = fractions_view.hypercert_id",
    },
  },
  sales: {
    claims: {
      joinCondition: "claims.hypercert_id = sales.hypercert_id",
    },
  },
} as const;

/**
 * Type guard to check if a relation exists between tables
 */
export function hasRelation(
  tableName: string,
  relatedTable: string,
): relatedTable is Extract<
  keyof (typeof TABLE_RELATIONS)[typeof tableName],
  string
> {
  return (
    tableName in TABLE_RELATIONS &&
    relatedTable in (TABLE_RELATIONS[tableName] ?? {})
  );
}

/**
 * Get the relation configuration between two tables
 * @throws {Error} If relation doesn't exist
 */
export function getRelation(
  tableName: string,
  relatedTable: string,
): TableRelation {
  if (!hasRelation(tableName, relatedTable)) {
    throw new Error(
      `No relation defined between ${tableName} and ${relatedTable}`,
    );
  }
  return TABLE_RELATIONS[tableName][relatedTable];
}

/**
 * Default foreign key pattern if not specified in relation
 */
export function getDefaultForeignKey(relatedTable: string): string {
  return `${relatedTable}_id`;
}
