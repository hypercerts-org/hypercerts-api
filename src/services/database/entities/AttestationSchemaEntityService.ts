import { Selectable } from "kysely";
import { injectable } from "tsyringe";
import { kyselyCaching } from "../../../client/kysely.js";
import { GetAttestationSchemasArgs } from "../../../graphql/schemas/args/attestationSchemaArgs.js";
import { CachingDatabase } from "../../../types/kyselySupabaseCaching.js";
import {
  createEntityService,
  type EntityService,
} from "./EntityServiceFactory.js";

export type AttestationSchemaSelect = Selectable<
  CachingDatabase["supported_schemas"]
>;

@injectable()
export class AttestationSchemaService {
  private entityService: EntityService<
    CachingDatabase["supported_schemas"],
    GetAttestationSchemasArgs
  >;

  constructor() {
    this.entityService = createEntityService<
      CachingDatabase,
      "supported_schemas",
      GetAttestationSchemasArgs
    >("supported_schemas", "AttestationSchemaEntityService", kyselyCaching);
  }

  async getAttestationSchemas(args: GetAttestationSchemasArgs) {
    return this.entityService.getMany(args);
  }

  async getAttestationSchema(args: GetAttestationSchemasArgs) {
    return this.entityService.getSingle(args);
  }
}
