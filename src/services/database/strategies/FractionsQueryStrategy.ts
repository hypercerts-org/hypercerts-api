import { Kysely } from "kysely";
import { GetFractionsArgs } from "../../../graphql/schemas/args/fractionArgs.js";
import { CachingDatabase } from "../../../types/kyselySupabaseCaching.js";
import { QueryStrategy } from "./QueryStrategy.js";
import { isWhereEmpty } from "../../../lib/strategies/isWhereEmpty.js";

export class FractionsQueryStrategy extends QueryStrategy<
  CachingDatabase,
  "fractions_view",
  GetFractionsArgs
> {
  protected readonly tableName = "fractions_view" as const;

  buildDataQuery(db: Kysely<CachingDatabase>, args?: GetFractionsArgs) {
    if (!args) {
      return db.selectFrom(this.tableName).selectAll();
    }

    return db
      .selectFrom(this.tableName)
      .$if(!isWhereEmpty(args.where?.metadata), (qb) => {
        return qb.where(({ exists, selectFrom }) =>
          exists(
            selectFrom("claims")
              .whereRef("claims.id", "=", "fractions_view.claims_id")
              .leftJoin("metadata", "metadata.id", "fractions_view.claims_id"),
          ),
        );
      })
      .selectAll(this.tableName);
  }

  buildCountQuery(db: Kysely<CachingDatabase>, args?: GetFractionsArgs) {
    if (!args) {
      return db.selectFrom(this.tableName).select((eb) => {
        return eb.fn.countAll().as("count");
      });
    }

    return db
      .selectFrom(this.tableName)
      .$if(!isWhereEmpty(args.where?.metadata), (qb) => {
        return qb.where(({ exists, selectFrom }) =>
          exists(
            selectFrom("claims")
              .whereRef("claims.id", "=", "fractions_view.claims_id")
              .leftJoin("metadata", "metadata.id", "fractions_view.claims_id"),
          ),
        );
      })
      .select((eb) => {
        return eb.fn.countAll().as("count");
      });
  }
}
