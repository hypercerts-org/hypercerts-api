import { Kysely } from "kysely";
import { DataDatabase } from "../../../types/kyselySupabaseData.js";
import { QueryStrategy } from "./QueryStrategy.js";

export class SignatureRequestsQueryStrategy extends QueryStrategy<
  DataDatabase,
  "signature_requests"
> {
  protected readonly tableName = "signature_requests" as const;

  buildDataQuery(db: Kysely<DataDatabase>) {
    return db.selectFrom(this.tableName).selectAll();
  }

  buildCountQuery(db: Kysely<DataDatabase>) {
    return db.selectFrom(this.tableName).select((eb) => {
      return eb.fn.countAll().as("count");
    });
  }
}
