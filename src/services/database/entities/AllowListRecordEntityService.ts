import { Insertable, Selectable, Updateable } from "kysely";
import { injectable } from "tsyringe";
import { kyselyCaching } from "../../../client/kysely.js";
import { GetAllowlistRecordsArgs } from "../../../graphql/schemas/args/allowlistRecordArgs.js";
import { CachingDatabase } from "../../../types/kyselySupabaseCaching.js";
import {
  createEntityService,
  type EntityService,
} from "./EntityServiceFactory.js";

/** The name of the allowlist records table */
type TableName = "claimable_fractions_with_proofs";
/** The type of the allowlist records table */
type Table = CachingDatabase[TableName];

/** Type representing a selectable record from the claimable_fractions_with_proofs table */
export type AllowlistRecordSelect = Selectable<Table>;

/** Type representing an insertable record for the claimable_fractions_with_proofs table */
export type AllowlistRecordInsert = Insertable<Table>;

/** Type representing an updateable record for the claimable_fractions_with_proofs table */
export type AllowlistRecordUpdate = Updateable<Table>;

/**
 * Service class for managing allowlist records in the claimable_fractions_with_proofs table.
 * This service provides methods to query and retrieve allowlist records using the EntityService pattern.
 *
 * @injectable
 */
@injectable()
export class AllowlistRecordService {
  /** The underlying entity service instance for database operations */
  private entityService: EntityService<Table, GetAllowlistRecordsArgs>;

  /**
   * Initializes a new instance of the AllowlistRecordService.
   * Creates an EntityService instance for the claimable_fractions_with_proofs table.
   */
  constructor() {
    this.entityService = createEntityService<
      CachingDatabase,
      TableName,
      GetAllowlistRecordsArgs
    >(
      "claimable_fractions_with_proofs",
      "AllowlistRecordEntityService",
      kyselyCaching,
    );
  }

  /**
   * Retrieves multiple allowlist records based on the provided arguments.
   *
   * @param args - Query arguments for filtering allowlist records
   * @returns A promise that resolves to an array of allowlist records and a count of total records
   */
  async getAllowlistRecords(args: GetAllowlistRecordsArgs) {
    return this.entityService.getMany(args);
  }

  /**
   * Retrieves a single allowlist record based on the provided arguments.
   *
   * @param args - Query arguments for filtering the allowlist record
   * @returns A promise that resolves to a single allowlist record or null if not found
   */
  async getAllowlistRecord(args: GetAllowlistRecordsArgs) {
    return this.entityService.getSingle(args);
  }
}
