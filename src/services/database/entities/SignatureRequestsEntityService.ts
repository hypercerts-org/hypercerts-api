import { Insertable, Selectable, Updateable } from "kysely";
import { inject, injectable } from "tsyringe";
import { DataKyselyService, kyselyData } from "../../../client/kysely.js";
import type { GetSignatureRequestsArgs } from "../../../graphql/schemas/args/signatureRequestArgs.js";
import type { DataDatabase } from "../../../types/kyselySupabaseData.js";
import type { EntityService } from "./EntityServiceFactory.js";
import { createEntityService } from "./EntityServiceFactory.js";

export type SignatureRequestSelect = Selectable<
  DataDatabase["signature_requests"]
>;
export type SignatureRequestInsert = Insertable<
  DataDatabase["signature_requests"]
>;
export type SignatureRequestUpdate = Updateable<
  DataDatabase["signature_requests"]
>;

@injectable()
export class SignatureRequestsService {
  private entityService: EntityService<
    DataDatabase["signature_requests"],
    GetSignatureRequestsArgs
  >;

  constructor(@inject(DataKyselyService) private dbService: DataKyselyService) {
    this.entityService = createEntityService<
      DataDatabase,
      "signature_requests",
      GetSignatureRequestsArgs
    >("signature_requests", "SignatureRequestsEntityService", kyselyData);
  }

  async getSignatureRequests(args: GetSignatureRequestsArgs) {
    return this.entityService.getMany(args);
  }

  async getSignatureRequest(args: GetSignatureRequestsArgs) {
    return this.entityService.getSingle(args);
  }

  // Mutations

  async addSignatureRequest(signatureRequest: SignatureRequestInsert) {
    return this.dbService
      .getConnection()
      .insertInto("signature_requests")
      .values(signatureRequest)
      .returning(["safe_address", "message_hash"])
      .executeTakeFirst();
  }

  async updateSignatureRequestStatus(
    safe_address: string,
    message_hash: string,
    status: SignatureRequestUpdate["status"],
  ) {
    return this.dbService
      .getConnection()
      .updateTable("signature_requests")
      .set({ status })
      .where("safe_address", "=", safe_address)
      .where("message_hash", "=", message_hash)
      .execute();
  }
}
