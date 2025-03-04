import { Selectable } from "kysely";
import { injectable } from "tsyringe";
import { kyselyCaching } from "../../../client/kysely.js";
import { GetContractsArgs } from "../../../graphql/schemas/args/contractArgs.js";
import { CachingDatabase } from "../../../types/kyselySupabaseCaching.js";
import {
  createEntityService,
  type EntityService,
} from "./EntityServiceFactory.js";

export type ContractSelect = Selectable<CachingDatabase["contracts"]>;

@injectable()
export class ContractService {
  private entityService: EntityService<
    CachingDatabase["contracts"],
    GetContractsArgs
  >;

  constructor() {
    this.entityService = createEntityService<
      CachingDatabase,
      "contracts",
      GetContractsArgs
    >("contracts", "ContractEntityService", kyselyCaching);
  }

  async getContracts(args: GetContractsArgs) {
    return this.entityService.getMany(args);
  }

  async getContract(args: GetContractsArgs) {
    return this.entityService.getSingle(args);
  }
}
