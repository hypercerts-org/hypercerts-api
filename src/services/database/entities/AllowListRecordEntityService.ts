import { Insertable, Selectable, Updateable } from "kysely";
import { injectable } from "tsyringe";
import { kyselyCaching } from "../../../client/kysely.js";
import { GetAllowlistRecordsArgs } from "../../../graphql/schemas/args/allowlistRecordArgs.js";
import { CachingDatabase } from "../../../types/kyselySupabaseCaching.js";
import {
  createEntityService,
  type EntityService,
} from "./EntityServiceFactory.js";

export type AllowlistRecordSelect = Selectable<
  CachingDatabase["claimable_fractions_with_proofs"]
>;
export type AllowlistRecordInsert = Insertable<
  CachingDatabase["claimable_fractions_with_proofs"]
>;
export type AllowlistRecordUpdate = Updateable<
  CachingDatabase["claimable_fractions_with_proofs"]
>;

@injectable()
export class AllowlistRecordService {
  private entityService: EntityService<
    CachingDatabase["claimable_fractions_with_proofs"],
    GetAllowlistRecordsArgs
  >;

  constructor() {
    this.entityService = createEntityService<
      CachingDatabase,
      "claimable_fractions_with_proofs",
      GetAllowlistRecordsArgs
    >(
      "claimable_fractions_with_proofs",
      "AllowlistRecordEntityService",
      kyselyCaching,
    );
  }

  async getAllowlistRecords(args: GetAllowlistRecordsArgs) {
    return this.entityService.getMany(args);
  }

  async getAllowlistRecord(args: GetAllowlistRecordsArgs) {
    return this.entityService.getSingle(args);
  }
}
