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

/**
 * Service for handling signature request operations in the system.
 * Provides methods for retrieving, creating and updating signature requests.
 *
 * A signature request represents a request for a user to sign a message, with:
 * - Safe address (the address that needs to sign)
 * - Message hash (hash of the message to be signed)
 * - Status (pending, executed, canceled)
 * - Purpose (e.g. update_user_data)
 *
 * This service uses an EntityService for database operations, providing:
 * - Consistent error handling
 * - Type safety through Kysely
 * - Standard query interface
 */
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

  /**
   * Retrieves multiple signature requests based on provided arguments.
   *
   * @param args - Query arguments for filtering signature requests
   * @returns A promise resolving to:
   *          - data: Array of signature requests matching the criteria
   *          - count: Total number of matching records
   *
   * @example
   * ```typescript
   * const result = await signatureRequestsService.getSignatureRequests({
   *   where: {
   *     safe_address: { eq: "0x1234...5678" }
   *   }
   * });
   * ```
   */
  async getSignatureRequests(args: GetSignatureRequestsArgs) {
    return this.entityService.getMany(args);
  }

  /**
   * Retrieves a single signature request based on provided arguments.
   *
   * @param args - Query arguments for filtering signature requests
   * @returns A promise resolving to:
   *          - The matching signature request if found
   *          - null if no matching record exists
   *
   * @example
   * ```typescript
   * const request = await signatureRequestsService.getSignatureRequest({
   *   where: {
   *     safe_address: { eq: "0x1234...5678" },
   *     message_hash: { eq: "0xabcd...ef12" }
   *   }
   * });
   * ```
   */
  async getSignatureRequest(args: GetSignatureRequestsArgs) {
    return this.entityService.getSingle(args);
  }

  // Mutations

  /**
   * Creates a new signature request.
   *
   * @param signatureRequest - The signature request data to insert
   * @returns A promise resolving to the created signature request's safe_address and message_hash
   *
   * @example
   * ```typescript
   * const result = await signatureRequestsService.addSignatureRequest({
   *   safe_address: "0x1234...5678",
   *   message_hash: "0xabcd...ef12",
   *   status: "pending",
   *   purpose: "update_user_data"
   * });
   * ```
   */
  async addSignatureRequest(signatureRequest: SignatureRequestInsert) {
    return this.dbService
      .getConnection()
      .insertInto("signature_requests")
      .values(signatureRequest)
      .returning(["safe_address", "message_hash"])
      .executeTakeFirst();
  }

  /**
   * Updates the status of an existing signature request.
   *
   * @param safe_address - The safe address associated with the request
   * @param message_hash - The message hash of the request
   * @param status - The new status to set
   * @returns A promise resolving to the number of affected rows
   *
   * @example
   * ```typescript
   * await signatureRequestsService.updateSignatureRequestStatus(
   *   "0x1234...5678",
   *   "0xabcd...ef12",
   *   "executed"
   * );
   * ```
   */
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
