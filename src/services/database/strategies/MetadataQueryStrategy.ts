import { Kysely } from "kysely";
import { GetMetadataArgs } from "../../../graphql/schemas/args/metadataArgs.js";
import { isWhereEmpty } from "../../../lib/strategies/isWhereEmpty.js";
import { CachingDatabase } from "../../../types/kyselySupabaseCaching.js";
import { MetadataSelect } from "../entities/MetadataEntityService.js";
import { QueryStrategy } from "./QueryStrategy.js";

const supportedColumns = [
  "metadata.id",
  "metadata.name",
  "metadata.description",
  "metadata.external_url",
  "metadata.work_scope",
  "metadata.work_timeframe_from",
  "metadata.work_timeframe_to",
  "metadata.impact_scope",
  "metadata.impact_timeframe_from",
  "metadata.impact_timeframe_to",
  "metadata.contributors",
  "metadata.rights",
  "metadata.uri",
  "metadata.properties",
  "metadata.allow_list_uri",
  "metadata.parsed",
] as const;

type MetadataSelection = Omit<MetadataSelect, "image">;

/**
 * Strategy for querying metadata
 * Handles joins with claims table and selects all columns except for the image column
 */
export class MetadataQueryStrategy extends QueryStrategy<
  CachingDatabase,
  "metadata",
  GetMetadataArgs,
  MetadataSelection
> {
  protected readonly tableName = "metadata" as const;

  buildDataQuery(db: Kysely<CachingDatabase>, args?: GetMetadataArgs) {
    if (!args) {
      return db.selectFrom(this.tableName).select(supportedColumns);
    }

    return db
      .selectFrom(this.tableName)
      .$if(!isWhereEmpty(args.where?.claims), (qb) =>
        qb.innerJoin("claims", "claims.uri", "metadata.uri"),
      )
      .select(supportedColumns);
  }

  buildCountQuery(db: Kysely<CachingDatabase>, args?: GetMetadataArgs) {
    if (!args) {
      return db.selectFrom(this.tableName).select((eb) => {
        return eb.fn.countAll().as("count");
      });
    }

    return db
      .selectFrom(this.tableName)
      .$if(!isWhereEmpty(args.where?.claims), (qb) =>
        qb.innerJoin("claims", "claims.uri", "metadata.uri"),
      )
      .select((eb) => {
        return eb.fn.countAll().as("count");
      });
  }
}
