import { Kysely } from "kysely";
import { GetAllowlistRecordsArgs } from "../../../graphql/schemas/args/allowlistRecordArgs.js";
import { isWhereEmpty } from "../../../lib/strategies/isWhereEmpty.js";
import { CachingDatabase } from "../../../types/kyselySupabaseCaching.js";
import { QueryStrategy } from "./QueryStrategy.js";

/**
 * Strategy class for querying allowlist records from the claimable_fractions_with_proofs view table.
 * This class extends the base QueryStrategy to provide specific implementation for allowlist-related queries.
 */
export class AllowlistQueryStrategy extends QueryStrategy<
  CachingDatabase,
  "claimable_fractions_with_proofs",
  GetAllowlistRecordsArgs
> {
  /** The name of the table this strategy queries against */
  protected readonly tableName = "claimable_fractions_with_proofs" as const;

  /**
   * Builds a query to fetch allowlist records from the database.
   */
  buildDataQuery(db: Kysely<CachingDatabase>, args?: GetAllowlistRecordsArgs) {
    if (!args) {
      return db.selectFrom(this.tableName).selectAll();
    }

    return db
      .selectFrom(this.tableName)
      .$if(!isWhereEmpty(args.where?.hypercert), (qb) =>
        qb.where(({ exists, selectFrom }) =>
          exists(
            selectFrom("claims").whereRef(
              "claims.hypercert_id",
              "=",
              "claimable_fractions_with_proofs.hypercert_id",
            ),
          ),
        ),
      )
      .selectAll(this.tableName);
  }

  /**
   * Builds a query to count the total number of allowlist records.
   */
  buildCountQuery(db: Kysely<CachingDatabase>, args?: GetAllowlistRecordsArgs) {
    if (!args) {
      return db.selectFrom(this.tableName).select((eb) => {
        return eb.fn.countAll().as("count");
      });
    }
    return db
      .selectFrom(this.tableName)
      .$if(!isWhereEmpty(args.where?.hypercert), (qb) =>
        qb.where(({ exists, selectFrom }) =>
          exists(
            selectFrom("claims").whereRef(
              "claims.hypercert_id",
              "=",
              "claimable_fractions_with_proofs.hypercert_id",
            ),
          ),
        ),
      )
      .select((eb) => {
        return eb.fn.countAll().as("count");
      });
  }
}
