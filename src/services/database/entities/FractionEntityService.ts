import { Selectable } from "kysely";
import { injectable } from "tsyringe";
import { kyselyCaching } from "../../../client/kysely.js";
import { GetFractionsArgs } from "../../../graphql/schemas/args/fractionArgs.js";
import { CachingDatabase } from "../../../types/kyselySupabaseCaching.js";
import {
  createEntityService,
  type EntityService,
} from "./EntityServiceFactory.js";

export type FractionSelect = Selectable<CachingDatabase["fractions_view"]>;

@injectable()
export class FractionService {
  private entityService: EntityService<
    CachingDatabase["fractions_view"],
    GetFractionsArgs
  >;

  constructor() {
    this.entityService = createEntityService<
      CachingDatabase,
      "fractions_view",
      GetFractionsArgs
    >("fractions_view", "FractionEntityService", kyselyCaching);
  }

  async getFractions(args: GetFractionsArgs) {
    return this.entityService.getMany(args);
  }

  async getFraction(args: GetFractionsArgs) {
    return this.entityService.getSingle(args);
  }
}
