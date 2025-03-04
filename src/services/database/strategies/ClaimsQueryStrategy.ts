import { Kysely } from "kysely";
import { GetHypercertsArgs } from "../../../graphql/schemas/args/hypercertsArgs.js";
import { isWhereEmpty } from "../../../lib/strategies/isWhereEmpty.js";
import { CachingDatabase } from "../../../types/kyselySupabaseCaching.js";
import { QueryStrategy } from "./QueryStrategy.js";

/**
 * Strategy for querying claims
 * Handles joins with metadata, attestations, fractions, and contracts tables
 */
export class ClaimsQueryStrategy extends QueryStrategy<
  CachingDatabase,
  "claims",
  GetHypercertsArgs
> {
  protected readonly tableName = "claims" as const;

  buildDataQuery(db: Kysely<CachingDatabase>, args?: GetHypercertsArgs) {
    if (!args) {
      return db.selectFrom(this.tableName).selectAll();
    }

    return db
      .selectFrom(this.tableName)
      .$if(!isWhereEmpty(args.where?.contract), (qb) => {
        return qb.where(({ exists, selectFrom }) =>
          exists(
            selectFrom("contracts").whereRef(
              "contracts.id",
              "=",
              "claims.contracts_id",
            ),
          ),
        );
      })
      .$if(!isWhereEmpty(args.where?.fractions), (qb) => {
        return qb.where(({ exists, selectFrom }) =>
          exists(
            selectFrom("fractions_view").whereRef(
              "fractions_view.claims_id",
              "=",
              "claims.id",
            ),
          ),
        );
      })
      .$if(!isWhereEmpty(args.where?.metadata), (qb) => {
        return qb.where(({ exists, selectFrom }) =>
          exists(
            selectFrom("metadata").whereRef("metadata.uri", "=", "claims.uri"),
          ),
        );
      })
      .$if(!isWhereEmpty(args.where?.attestations), (qb) => {
        return qb.where(({ exists, selectFrom }) =>
          exists(
            selectFrom("attestations").whereRef(
              "attestations.claims_id",
              "=",
              "claims.id",
            ),
          ),
        );
      })
      .selectAll("claims");
  }

  buildCountQuery(db: Kysely<CachingDatabase>, args?: GetHypercertsArgs) {
    if (!args) {
      return db.selectFrom(this.tableName).select((eb) => {
        return eb.fn.countAll().as("count");
      });
    }

    return db
      .selectFrom(this.tableName)
      .$if(!isWhereEmpty(args.where?.contract), (qb) =>
        qb.where(({ exists, selectFrom }) =>
          exists(
            selectFrom("contracts").whereRef(
              "contracts.id",
              "=",
              "claims.contracts_id",
            ),
          ),
        ),
      )
      .$if(!isWhereEmpty(args.where?.fractions), (qb) =>
        qb.where(({ exists, selectFrom }) =>
          exists(
            selectFrom("fractions_view").whereRef(
              "fractions_view.claims_id",
              "=",
              "claims.id",
            ),
          ),
        ),
      )
      .$if(!isWhereEmpty(args.where?.metadata), (qb) =>
        qb.where(({ exists, selectFrom }) =>
          exists(
            selectFrom("metadata").whereRef("metadata.uri", "=", "claims.uri"),
          ),
        ),
      )
      .$if(!isWhereEmpty(args.where?.attestations), (qb) =>
        qb.where(({ exists, selectFrom }) =>
          exists(
            selectFrom("attestations").whereRef(
              "attestations.claims_id",
              "=",
              "claims.id",
            ),
          ),
        ),
      )
      .select((eb) => {
        return eb.fn.countAll().as("count");
      });
  }
}
