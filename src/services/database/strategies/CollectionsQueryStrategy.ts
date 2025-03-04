import { Kysely } from "kysely";
import { GetCollectionsArgs } from "../../../graphql/schemas/args/collectionArgs.js";
import { GetContractsArgs } from "../../../graphql/schemas/args/contractArgs.js";
import { DataDatabase } from "../../../types/kyselySupabaseData.js";
import { QueryStrategy } from "./QueryStrategy.js";
import { isWhereEmpty } from "../../../lib/strategies/isWhereEmpty.js";

/**
 * Strategy for querying collections
 */
export class CollectionsQueryStrategy extends QueryStrategy<
  DataDatabase,
  "collections",
  GetCollectionsArgs
> {
  protected readonly tableName = "collections" as const;

  buildDataQuery(db: Kysely<DataDatabase>, args?: GetContractsArgs) {
    if (!args) {
      return db.selectFrom(this.tableName).selectAll();
    }
    return db
      .selectFrom(this.tableName)
      .$if(!isWhereEmpty(args.where?.admins), (qb) => {
        return qb.where(({ exists, selectFrom }) =>
          exists(
            selectFrom("collection_admins")
              .whereRef(
                "collection_admins.collection_id",
                "=",
                "collections.id",
              )
              .innerJoin("users", "collection_admins.user_id", "users.id"),
          ),
        );
      })
      .$if(!isWhereEmpty(args.where?.blueprints), (qb) => {
        return qb.where(({ exists, selectFrom }) =>
          exists(
            selectFrom("collection_blueprints as cb")
              .innerJoin("blueprints as b", "b.id", "cb.blueprint_id")
              .whereRef("cb.collection_id", "=", "collections.id"),
          ),
        );
      })
      .selectAll(this.tableName);
  }

  buildCountQuery(db: Kysely<DataDatabase>, args?: GetContractsArgs) {
    if (!args) {
      return db.selectFrom(this.tableName).select((eb) => {
        return eb.fn.countAll().as("count");
      });
    }

    return db
      .selectFrom(this.tableName)
      .$if(!isWhereEmpty(args.where?.admins), (qb) => {
        return qb.where(({ exists, selectFrom }) =>
          exists(
            selectFrom("collection_admins")
              .whereRef(
                "collection_admins.collection_id",
                "=",
                "collections.id",
              )
              .innerJoin("users", "collection_admins.user_id", "users.id"),
          ),
        );
      })
      .$if(!isWhereEmpty(args.where?.blueprints), (qb) => {
        return qb.where(({ exists, selectFrom }) =>
          exists(
            selectFrom("collection_blueprints as cb")
              .innerJoin("blueprints as b", "b.id", "cb.blueprint_id")
              .whereRef("cb.collection_id", "=", "collections.id"),
          ),
        );
      })
      .select((eb) => {
        return eb.fn.countAll().as("count");
      });
  }
}
