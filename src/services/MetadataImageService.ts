import { singleton } from "tsyringe";
import { kyselyCaching } from "../client/kysely.js";
import { CachingDatabase } from "../types/kyselySupabaseCaching.js";
import { BaseSupabaseService } from "./BaseSupabaseService.js";

@singleton()
export class MetadataImageService extends BaseSupabaseService<CachingDatabase> {
  constructor() {
    super(kyselyCaching);
  }

  // TODO: remove these when we more refactor the services to improve typing and performance
  getDataQuery() {
    throw new Error("Method not implemented - not needed for image service");
  }

  getCountQuery() {
    throw new Error("Method not implemented - not needed for image service");
  }

  async getImageByUri(uri: string): Promise<string | null> {
    const result = await this.db
      .selectFrom("metadata")
      .select(["image"])
      .where("uri", "=", uri)
      .executeTakeFirst();

    return result?.image ?? null;
  }
}
