import { Kysely } from "kysely";
import { DataDatabase } from "../../../types/kyselySupabaseData.js";
import { QueryStrategy } from "./QueryStrategy.js";

export class HyperboardsQueryStrategy extends QueryStrategy<
  DataDatabase,
  "hyperboards"
> {
  protected readonly tableName = "hyperboards" as const;

  buildDataQuery(db: Kysely<DataDatabase>) {
    return db.selectFrom(this.tableName).selectAll(this.tableName);
  }

  buildCountQuery(db: Kysely<DataDatabase>) {
    return db.selectFrom(this.tableName).select((eb) => {
      return eb.fn.countAll().as("count");
    });
  }
}
