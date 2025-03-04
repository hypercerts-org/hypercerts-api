import { Selectable } from "kysely";
import { injectable } from "tsyringe";
import { kyselyCaching } from "../../../client/kysely.js";
import { GetMetadataArgs } from "../../../graphql/schemas/args/metadataArgs.js";
import { CachingDatabase } from "../../../types/kyselySupabaseCaching.js";
import {
  createEntityService,
  type EntityService,
} from "./EntityServiceFactory.js";

export type MetadataSelect = Selectable<CachingDatabase["metadata"]>;

@injectable()
export class MetadataService {
  private entityService: EntityService<
    CachingDatabase["metadata"],
    GetMetadataArgs
  >;

  constructor() {
    this.entityService = createEntityService<
      CachingDatabase,
      "metadata",
      GetMetadataArgs
    >("metadata", "MetadataEntityService", kyselyCaching);
  }

  async getMetadata(args: GetMetadataArgs) {
    return this.entityService.getMany(args);
  }

  async getMetadataSingle(args: GetMetadataArgs) {
    return this.entityService.getSingle(args);
  }
}
