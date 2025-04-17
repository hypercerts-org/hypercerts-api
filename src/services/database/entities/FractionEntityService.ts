import { Selectable } from "kysely";
import { injectable } from "tsyringe";
import { kyselyCaching } from "../../../client/kysely.js";
import { GetFractionsArgs } from "../../../graphql/schemas/args/fractionArgs.js";
import { CachingDatabase } from "../../../types/kyselySupabaseCaching.js";
import {
  createEntityService,
  type EntityService,
} from "./EntityServiceFactory.js";

/** Type representing a selected fraction record from the database */
export type FractionSelect = Selectable<CachingDatabase["fractions_view"]>;

/**
 * Service class for managing fraction entities in the database.
 * Handles CRUD operations for hypercert fractions, which represent ownership units of hypercerts.
 *
 * This service provides methods to:
 * - Query multiple fractions with filtering and pagination
 * - Retrieve single fraction records by various criteria
 *
 * @injectable
 */
@injectable()
export class FractionService {
  /** The underlying entity service instance for database operations */
  private entityService: EntityService<
    CachingDatabase["fractions_view"],
    GetFractionsArgs
  >;

  /**
   * Initializes a new instance of the FractionService.
   * Creates an EntityService instance for the fractions_view table.
   */
  constructor() {
    this.entityService = createEntityService<
      CachingDatabase,
      "fractions_view",
      GetFractionsArgs
    >("fractions_view", "FractionEntityService", kyselyCaching);
  }

  /**
   * Retrieves multiple fractions based on the provided arguments.
   *
   * @param args - Query arguments for filtering fractions
   * @returns Promise resolving to an object containing:
   *          - data: Array of fraction records
   *          - count: Total number of matching records
   * @throws {Error} If the database query fails
   *
   * @example
   * ```typescript
   * // Get all fractions owned by a specific address
   * const result = await fractionService.getFractions({
   *   where: { owner_address: { eq: "0x..." } }
   * });
   * ```
   */
  async getFractions(args: GetFractionsArgs) {
    return this.entityService.getMany(args);
  }

  /**
   * Retrieves a single fraction based on the provided arguments.
   *
   * @param args - Query arguments for filtering the fraction
   * @returns Promise resolving to a single fraction record or undefined if not found
   * @throws {Error} If the database query fails
   *
   * @example
   * ```typescript
   * // Get a specific fraction by ID
   * const fraction = await fractionService.getFraction({
   *   where: { units: { eq: 100n } }
   * });
   * ```
   */
  async getFraction(args: GetFractionsArgs) {
    return this.entityService.getSingle(args);
  }
}
