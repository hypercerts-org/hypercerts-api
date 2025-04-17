import { Kysely } from "kysely";
import { DataDatabase } from "../../../types/kyselySupabaseData.js";
import { QueryStrategy } from "./QueryStrategy.js";

/**
 * Query strategy for signature requests.
 * Handles building queries for retrieving and counting signature requests.
 *
 * A signature request represents a request for a user to sign a message, with:
 * - Safe address (the address that needs to sign)
 * - Message hash (hash of the message to be signed)
 * - Status (pending, executed, canceled)
 * - Purpose (e.g. update_user_data)
 */
export class SignatureRequestsQueryStrategy extends QueryStrategy<
  DataDatabase,
  "signature_requests"
> {
  protected readonly tableName = "signature_requests" as const;

  /**
   * Builds a query to select all signature request data.
   *
   * @param db - The database connection
   * @returns A query builder for selecting signature request data
   */
  buildDataQuery(db: Kysely<DataDatabase>) {
    return db.selectFrom(this.tableName).selectAll();
  }

  /**
   * Builds a query to count signature requests.
   *
   * @param db - The database connection
   * @returns A query builder for counting signature requests
   */
  buildCountQuery(db: Kysely<DataDatabase>) {
    return db.selectFrom(this.tableName).select((eb) => {
      return eb.fn.countAll().as("count");
    });
  }
}
