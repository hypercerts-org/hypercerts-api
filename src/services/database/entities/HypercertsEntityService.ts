import { Selectable } from "kysely";
import { injectable } from "tsyringe";
import { kyselyCaching } from "../../../client/kysely.js";
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

  constructor() {
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
}
