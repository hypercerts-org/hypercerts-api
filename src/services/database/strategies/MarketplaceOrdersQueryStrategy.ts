import { Kysely } from "kysely";
import { DataDatabase } from "../../../types/kyselySupabaseData.js";
import { QueryStrategy } from "./QueryStrategy.js";

export class MarketplaceOrdersQueryStrategy extends QueryStrategy<
  DataDatabase,
  "marketplace_orders"
> {
  protected readonly tableName = "marketplace_orders" as const;

  buildDataQuery(db: Kysely<DataDatabase>) {
    return db.selectFrom(this.tableName).selectAll();
  }

  buildCountQuery(db: Kysely<DataDatabase>) {
    return db.selectFrom(this.tableName).select((eb) => {
      return eb.fn.countAll().as("count");
    });
  }
}
