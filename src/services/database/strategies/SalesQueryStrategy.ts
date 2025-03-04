import { Kysely } from "kysely";
import { CachingDatabase } from "../../../types/kyselySupabaseCaching.js";
import { QueryStrategy } from "./QueryStrategy.js";

export class SalesQueryStrategy extends QueryStrategy<
  CachingDatabase,
  "sales"
> {
  protected readonly tableName = "sales" as const;

  buildDataQuery(db: Kysely<CachingDatabase>) {
    return db.selectFrom(this.tableName).selectAll();
  }

  buildCountQuery(db: Kysely<CachingDatabase>) {
    return db.selectFrom(this.tableName).select((eb) => {
      return eb.fn.countAll().as("count");
    });
  }
}
