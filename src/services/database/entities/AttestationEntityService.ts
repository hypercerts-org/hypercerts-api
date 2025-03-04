import { Selectable } from "kysely";
import { injectable } from "tsyringe";
import { kyselyCaching } from "../../../client/kysely.js";
import { GetAttestationsArgs } from "../../../graphql/schemas/args/attestationArgs.js";
import { CachingDatabase } from "../../../types/kyselySupabaseCaching.js";
import { Json } from "../../../types/supabaseCaching.js";
import {
  createEntityService,
  type EntityService,
} from "./EntityServiceFactory.js";

export type AttestationSelect = Selectable<CachingDatabase["attestations"]>;

@injectable()
export class AttestationService {
  private entityService: EntityService<
    CachingDatabase["attestations"],
    GetAttestationsArgs
  >;

  constructor() {
    this.entityService = createEntityService<
      CachingDatabase,
      "attestations",
      GetAttestationsArgs
    >("attestations", "AttestationEntityService", kyselyCaching);
  }

  async getAttestations(args: GetAttestationsArgs) {
    const respone = await this.entityService.getMany(args);
    return {
      ...respone,
      data: respone.data.map(({ data, ...rest }) => ({
        ...rest,
        data: this.parseAttestation(data),
      })),
    };
  }

  async getAttestation(args: GetAttestationsArgs) {
    const attestation = await this.entityService.getSingle(args);
    if (!attestation) {
      throw new Error("Attestation not found");
    }
    return attestation;
  }

  // Parses the attestation.data field to ensure bigints are converted to strings
  parseAttestation(data: Json) {
    // TODO cleaner handling of bigints in created attestations
    if (
      typeof data === "object" &&
      data !== null &&
      "token_id" in data &&
      data.token_id
    ) {
      const tokenId =
        typeof data.token_id === "string"
          ? data.token_id
          : String(data.token_id);
      return { ...data, token_id: BigInt(tokenId).toString() };
    }
    return data;
  }
}
