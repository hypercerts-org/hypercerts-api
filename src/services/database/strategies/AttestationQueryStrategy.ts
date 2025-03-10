import { Kysely } from "kysely";
import { GetAttestationsArgs } from "../../../graphql/schemas/args/attestationArgs.js";
import { CachingDatabase } from "../../../types/kyselySupabaseCaching.js";
import { QueryStrategy } from "./QueryStrategy.js";
import { isWhereEmpty } from "../../../lib/strategies/isWhereEmpty.js";

/**
 * Strategy for building database queries for attestations.
 * Implements complex query logic for attestation retrieval, including:
 * - Joins with related tables (claims, supported_schemas)
 * - Filtering based on related entities
 * - Count queries for total matching records
 *
 * This strategy extends the base QueryStrategy to provide attestation-specific query building.
 */
export class AttestationsQueryStrategy extends QueryStrategy<
  CachingDatabase,
  "attestations",
  GetAttestationsArgs
> {
  protected readonly tableName = "attestations" as const;

  /**
   * Builds a query to retrieve attestation data with optional filtering.
   * Handles complex joins and relationships with other tables.
   *
   * @param db - Kysely database instance
   * @param args - Optional query arguments for filtering
   * @returns A query builder for retrieving attestation data
   *
   * Key features:
   * - Joins with supported_schemas when eas_schema filter is present
   * - Joins with claims when hypercert filter is present
   * - Returns all columns from the attestations table
   *
   * @example
   * ```typescript
   * // Basic query without filters
   * buildDataQuery(db);
   * // SELECT * FROM attestations
   *
   * // Query with schema filter
   * buildDataQuery(db, { where: { eas_schema: { id: { eq: 'schema-id' } } } });
   * // SELECT * FROM attestations WHERE EXISTS (SELECT * FROM supported_schemas ...)
   * ```
   */
  buildDataQuery(db: Kysely<CachingDatabase>, args?: GetAttestationsArgs) {
    if (!args) {
      return db.selectFrom(this.tableName).selectAll();
    }
    return db
      .selectFrom(this.tableName)
      .$if(!isWhereEmpty(args?.where?.eas_schema), (qb) => {
        return qb.where(({ exists, selectFrom }) =>
          exists(
            selectFrom("supported_schemas").whereRef(
              "supported_schemas.id",
              "=",
              "attestations.supported_schemas_id",
            ),
          ),
        );
      })
      .$if(!isWhereEmpty(args.where?.hypercert), (qb) => {
        return qb.where(({ exists, selectFrom }) =>
          exists(
            selectFrom("claims").whereRef(
              "claims.id",
              "=",
              "attestations.claims_id",
            ),
          ),
        );
      })
      .selectAll();
  }

  /**
   * Builds a query to count attestations with optional filtering.
   * Uses the same filtering logic as buildDataQuery but returns a count.
   *
   * @param db - Kysely database instance
   * @param args - Optional query arguments for filtering
   * @returns A query builder for counting attestations
   *
   * Key features:
   * - Applies the same joins and filters as buildDataQuery
   * - Returns a count of matching attestations
   * - Optimized for counting by selecting only the count
   */
  buildCountQuery(db: Kysely<CachingDatabase>, args?: GetAttestationsArgs) {
    if (!args) {
      return db.selectFrom(this.tableName).select((eb) => {
        return eb.fn.countAll().as("count");
      });
    }

    return db
      .selectFrom(this.tableName)
      .$if(!isWhereEmpty(args?.where?.eas_schema), (qb) => {
        return qb.where(({ exists, selectFrom }) =>
          exists(
            selectFrom("supported_schemas").whereRef(
              "supported_schemas.id",
              "=",
              "attestations.supported_schemas_id",
            ),
          ),
        );
      })
      .$if(!isWhereEmpty(args.where?.hypercert), (qb) => {
        return qb.where(({ exists, selectFrom }) =>
          exists(
            selectFrom("claims").whereRef(
              "claims.id",
              "=",
              "attestations.claims_id",
            ),
          ),
        );
      })
      .select((eb) => {
        return eb.fn.countAll().as("count");
      });
  }
}
