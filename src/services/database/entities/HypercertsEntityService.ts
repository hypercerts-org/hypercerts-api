import { Expression, Selectable, SqlBool } from "kysely";
import { inject, injectable } from "tsyringe";
import { CachingKyselyService, kyselyCaching } from "../../../client/kysely.js";
import { GetHypercertsArgs } from "../../../graphql/schemas/args/hypercertsArgs.js";
import { CachingDatabase } from "../../../types/kyselySupabaseCaching.js";
import {
  createEntityService,
  type EntityService,
} from "./EntityServiceFactory.js";

export type HypercertSelect = Selectable<CachingDatabase["claims"]>;

@injectable()
export class HypercertsService {
  private entityService: EntityService<
    CachingDatabase["claims"],
    GetHypercertsArgs
  >;

  constructor(
    @inject(CachingKyselyService)
    private cachingKyselyService: CachingKyselyService,
  ) {
    this.entityService = createEntityService<
      CachingDatabase,
      "claims",
      GetHypercertsArgs
    >("claims", "HypercertsEntityService", kyselyCaching);
  }

  async getHypercerts(args: GetHypercertsArgs) {
    return this.entityService.getMany(args);
  }

  async getHypercert(args: GetHypercertsArgs) {
    return this.entityService.getSingle(args);
  }

  async getHypercertMetadata(args: {
    claims_id?: string;
    hypercert_id?: string;
  }) {
    const result = this.cachingKyselyService
      .getConnection()
      .selectFrom("metadata")
      .leftJoin("claims", "metadata.uri", "claims.uri")
      .selectAll("metadata")
      .where((eb) => {
        const ors: Expression<SqlBool>[] = [];

        if (args.claims_id) {
          ors.push(eb("claims.id", "=", args.claims_id));
        }

        if (args.hypercert_id) {
          ors.push(eb("claims.hypercert_id", "=", args.hypercert_id));
        }

        return eb.or(ors);
      })
      .executeTakeFirst();

    return result;
  }

  async getHypercertMetadataSets(args: {
    claims_ids?: string[];
    hypercert_ids?: string[];
  }) {
    return this.cachingKyselyService
      .getConnection()
      .selectFrom("metadata")
      .leftJoin("claims", "metadata.uri", "claims.uri")
      .selectAll("metadata")
      .where((eb) => {
        const ors: Expression<SqlBool>[] = [];

        if (args.claims_ids) {
          ors.push(eb("claims.id", "in", args.claims_ids));
        }

        if (args.hypercert_ids) {
          ors.push(eb("claims.hypercert_id", "in", args.hypercert_ids));
        }

        return eb.or(ors);
      })
      .execute();
  }
}
