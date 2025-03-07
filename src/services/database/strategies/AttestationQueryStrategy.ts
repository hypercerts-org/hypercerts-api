import { Kysely } from "kysely";
import { GetAttestationsArgs } from "../../../graphql/schemas/args/attestationArgs.js";
import { CachingDatabase } from "../../../types/kyselySupabaseCaching.js";
import { QueryStrategy } from "./QueryStrategy.js";
import { isWhereEmpty } from "../../../lib/strategies/isWhereEmpty.js";

/**
 * Strategy for querying attestations
 * Handles joins with claims, metadata, and supported schemas tables
 */
export class AttestationsQueryStrategy extends QueryStrategy<
  CachingDatabase,
  "attestations",
  GetAttestationsArgs
> {
  protected readonly tableName = "attestations" as const;

  buildDataQuery(db: Kysely<CachingDatabase>, args?: GetAttestationsArgs) {
    if (!args) {
      return db.selectFrom(this.tableName).selectAll();
    }
    return db
      .selectFrom(this.tableName)
      .$if(!isWhereEmpty(args?.where?.eas_schema), (qb) => {
        return qb.where(({ exists, selectFrom }) =>
          exists(
            selectFrom("supported_schemas").whereRef(
              "supported_schemas.id",
              "=",
              "attestations.supported_schemas_id",
            ),
          ),
        );
      })
      .$if(!isWhereEmpty(args.where?.hypercert), (qb) => {
        return qb.where(({ exists, selectFrom }) =>
          exists(
            selectFrom("claims").whereRef(
              "claims.id",
              "=",
              "attestations.claims_id",
            ),
          ),
        );
      })
      .selectAll();
  }

  buildCountQuery(db: Kysely<CachingDatabase>, args?: GetAttestationsArgs) {
    if (!args) {
      return db.selectFrom(this.tableName).select((eb) => {
        return eb.fn.countAll().as("count");
      });
    }

    return db
      .selectFrom(this.tableName)
      .$if(!isWhereEmpty(args?.where?.eas_schema), (qb) => {
        return qb.where(({ exists, selectFrom }) =>
          exists(
            selectFrom("supported_schemas").whereRef(
              "supported_schemas.id",
              "=",
              "attestations.supported_schemas_id",
            ),
          ),
        );
      })
      .$if(!isWhereEmpty(args.where?.hypercert), (qb) => {
        return qb.where(({ exists, selectFrom }) =>
          exists(
            selectFrom("claims").whereRef(
              "claims.id",
              "=",
              "attestations.claims_id",
            ),
          ),
        );
      })
      .select((eb) => {
        return eb.fn.countAll().as("count");
      });
  }
}
