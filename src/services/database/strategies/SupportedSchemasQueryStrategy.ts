import { Kysely } from "kysely";
import { CachingDatabase } from "../../../types/kyselySupabaseCaching.js";
import { QueryStrategy } from "./QueryStrategy.js";

/**
 * Strategy for querying supported schemas
 * Handles joins with attestations and eas_schema tables
 */
export class SupportedSchemasQueryStrategy extends QueryStrategy<
  CachingDatabase,
  "supported_schemas"
> {
  protected readonly tableName = "supported_schemas" as const;

  buildDataQuery(db: Kysely<CachingDatabase>) {
    return db.selectFrom(this.tableName).selectAll();
  }

  buildCountQuery(db: Kysely<CachingDatabase>) {
    return db.selectFrom(this.tableName).select((eb) => {
      return eb.fn.countAll().as("count");
    });
  }
}
