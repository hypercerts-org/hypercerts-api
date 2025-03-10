import { Kysely } from "kysely";
import { GetHypercertsArgs } from "../../../graphql/schemas/args/hypercertsArgs.js";
import { isWhereEmpty } from "../../../lib/strategies/isWhereEmpty.js";
import { CachingDatabase } from "../../../types/kyselySupabaseCaching.js";
import { QueryStrategy } from "./QueryStrategy.js";

/**
 * Strategy for building database queries for claims.
 * Implements query logic for claim retrieval and counting.
 *
 * This strategy extends the base QueryStrategy to provide claim-specific query building.
 * It handles:
 * - Basic data retrieval from the claims table
 * - Filtering based on relationships with:
 *   - contracts
 *   - fractions
 *   - metadata
 *   - attestations
 * - Counting operations with appropriate joins
 *
 * @template CachingDatabase - The database type containing the claims table
 */
export class ClaimsQueryStrategy extends QueryStrategy<
  CachingDatabase,
  "claims",
  GetHypercertsArgs
> {
  protected readonly tableName = "claims" as const;

  /**
   * Builds a query to retrieve claim data.
   * Handles optional filtering through joins with related tables.
   *
   * @param db - Kysely database instance
   * @param args - Optional query arguments for filtering
   * @returns A query builder for retrieving claim data
   *
   * @example
   * ```typescript
   * // Basic query without filters
   * buildDataQuery(db);
   * // SELECT * FROM claims
   *
   * // Query with contract filtering
   * buildDataQuery(db, { where: { contract: { ... } } });
   * // SELECT * FROM claims
   * // WHERE EXISTS (
   * //   SELECT * FROM contracts
   * //   WHERE contracts.id = claims.contracts_id
   * // )
   * ```
   */
  buildDataQuery(db: Kysely<CachingDatabase>, args?: GetHypercertsArgs) {
    if (!args) {
      return db.selectFrom(this.tableName).selectAll();
    }

    return db
      .selectFrom(this.tableName)
      .$if(!isWhereEmpty(args.where?.contract), (qb) => {
        return qb.where(({ exists, selectFrom }) =>
          exists(
            selectFrom("contracts").whereRef(
              "contracts.id",
              "=",
              "claims.contracts_id",
            ),
          ),
        );
      })
      .$if(!isWhereEmpty(args.where?.fractions), (qb) => {
        return qb.where(({ exists, selectFrom }) =>
          exists(
            selectFrom("fractions_view").whereRef(
              "fractions_view.claims_id",
              "=",
              "claims.id",
            ),
          ),
        );
      })
      .$if(!isWhereEmpty(args.where?.metadata), (qb) => {
        return qb.where(({ exists, selectFrom }) =>
          exists(
            selectFrom("metadata").whereRef("metadata.uri", "=", "claims.uri"),
          ),
        );
      })
      .$if(!isWhereEmpty(args.where?.attestations), (qb) => {
        return qb.where(({ exists, selectFrom }) =>
          exists(
            selectFrom("attestations").whereRef(
              "attestations.claims_id",
              "=",
              "claims.id",
            ),
          ),
        );
      })
      .selectAll(this.tableName);
  }

  /**
   * Builds a query to count claims.
   * Handles optional filtering through joins with related tables.
   *
   * @param db - Kysely database instance
   * @param args - Optional query arguments for filtering
   * @returns A query builder for counting claims
   *
   * @example
   * ```typescript
   * // Count all claims
   * buildCountQuery(db);
   * // SELECT COUNT(*) as count FROM claims
   *
   * // Count with metadata filtering
   * buildCountQuery(db, { where: { metadata: { ... } } });
   * // SELECT COUNT(*) as count FROM claims
   * // WHERE EXISTS (
   * //   SELECT * FROM metadata
   * //   WHERE metadata.uri = claims.uri
   * // )
   * ```
   */
  buildCountQuery(db: Kysely<CachingDatabase>, args?: GetHypercertsArgs) {
    if (!args) {
      return db.selectFrom(this.tableName).select((eb) => {
        return eb.fn.countAll().as("count");
      });
    }

    return db
      .selectFrom(this.tableName)
      .$if(!isWhereEmpty(args.where?.contract), (qb) =>
        qb.where(({ exists, selectFrom }) =>
          exists(
            selectFrom("contracts").whereRef(
              "contracts.id",
              "=",
              "claims.contracts_id",
            ),
          ),
        ),
      )
      .$if(!isWhereEmpty(args.where?.fractions), (qb) =>
        qb.where(({ exists, selectFrom }) =>
          exists(
            selectFrom("fractions_view").whereRef(
              "fractions_view.claims_id",
              "=",
              "claims.id",
            ),
          ),
        ),
      )
      .$if(!isWhereEmpty(args.where?.metadata), (qb) =>
        qb.where(({ exists, selectFrom }) =>
          exists(
            selectFrom("metadata").whereRef("metadata.uri", "=", "claims.uri"),
          ),
        ),
      )
      .$if(!isWhereEmpty(args.where?.attestations), (qb) =>
        qb.where(({ exists, selectFrom }) =>
          exists(
            selectFrom("attestations").whereRef(
              "attestations.claims_id",
              "=",
              "claims.id",
            ),
          ),
        ),
      )
      .select((eb) => {
        return eb.fn.countAll().as("count");
      });
  }
}
