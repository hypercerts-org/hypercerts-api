import { Selectable } from "kysely";
import { injectable } from "tsyringe";
import { kyselyCaching } from "../../../client/kysely.js";
import type { GetSalesArgs } from "../../../graphql/schemas/args/salesArgs.js";
import type { CachingDatabase } from "../../../types/kyselySupabaseCaching.js";
import type { EntityService } from "./EntityServiceFactory.js";
import { createEntityService } from "./EntityServiceFactory.js";

export type SaleSelect = Selectable<CachingDatabase["sales"]>;
@injectable()
export class SalesService {
  private entityService: EntityService<CachingDatabase["sales"], GetSalesArgs>;

  constructor() {
    this.entityService = createEntityService<
      CachingDatabase,
      "sales",
      GetSalesArgs
    >("sales", "SalesEntityService", kyselyCaching);
  }

  async getSales(args: GetSalesArgs) {
    return this.entityService.getMany(args);
  }

  async getSale(args: GetSalesArgs) {
    return this.entityService.getSingle(args);
  }
}
