import { Kysely } from "kysely";
import { CachingDatabase } from "../../../types/kyselySupabaseCaching.js";
import { QueryStrategy } from "./QueryStrategy.js";

/**
 * Strategy for querying allowlist records
 * Implements queries for the claimable_fractions_with_proofs view table
 */
export class AllowlistQueryStrategy extends QueryStrategy<
  CachingDatabase,
  "claimable_fractions_with_proofs"
> {
  protected readonly tableName = "claimable_fractions_with_proofs" as const;

  buildDataQuery(db: Kysely<CachingDatabase>) {
    return db.selectFrom(this.tableName).selectAll();
  }

  buildCountQuery(db: Kysely<CachingDatabase>) {
    return db.selectFrom(this.tableName).select((eb) => {
      return eb.fn.countAll().as("count");
    });
  }
}
