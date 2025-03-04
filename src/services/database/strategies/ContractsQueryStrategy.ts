import { Kysely } from "kysely";
import { CachingDatabase } from "../../../types/kyselySupabaseCaching.js";
import { QueryStrategy } from "./QueryStrategy.js";

/**
 * Strategy for querying contracts
 * Handles joins with claims table
 */
export class ContractsQueryStrategy extends QueryStrategy<
  CachingDatabase,
  "contracts"
> {
  protected readonly tableName = "contracts" as const;

  buildDataQuery(db: Kysely<CachingDatabase>) {
    return db.selectFrom(this.tableName).selectAll(this.tableName);
  }

  buildCountQuery(db: Kysely<CachingDatabase>) {
    return db.selectFrom(this.tableName).select((eb) => {
      return eb.fn.countAll().as("count");
    });
  }
}
