import { Selectable } from "kysely";
import { injectable } from "tsyringe";
import { kyselyCaching } from "../../../client/kysely.js";
import { GetContractsArgs } from "../../../graphql/schemas/args/contractArgs.js";
import { CachingDatabase } from "../../../types/kyselySupabaseCaching.js";
import {
  createEntityService,
  type EntityService,
} from "./EntityServiceFactory.js";

/** Type representing a selected contract record from the database */
export type ContractSelect = Selectable<CachingDatabase["contracts"]>;

/**
 * Service class for managing contract entities in the database.
 * Handles CRUD operations for contracts deployed on various chains.
 *
 * This service provides methods to:
 * - Retrieve multiple contracts with filtering and pagination
 * - Retrieve a single contract by its criteria
 *
 * Each contract represents a smart contract deployed on a blockchain,
 * containing information such as:
 * - Chain ID
 * - Contract address
 * - Deployment block number
 *
 * @injectable Marks the class as injectable for dependency injection with tsyringe
 */
@injectable()
export class ContractService {
  private entityService: EntityService<
    CachingDatabase["contracts"],
    GetContractsArgs
  >;

  /**
   * Creates a new instance of ContractService.
   * Initializes the underlying entity service for database operations.
   */
  constructor() {
    this.entityService = createEntityService<
      CachingDatabase,
      "contracts",
      GetContractsArgs
    >("contracts", "ContractEntityService", kyselyCaching);
  }

  /**
   * Retrieves multiple contracts based on provided arguments.
   *
   * @param args - Query arguments for filtering and pagination
   * @returns A promise that resolves to an object containing:
   *          - data: Array of contracts matching the query
   *          - count: Total number of matching contracts
   * @throws {Error} If the database query fails
   *
   * @example
   * ```typescript
   * const result = await service.getContracts({
   *   where: {
   *     chain_id: { eq: "1" },
   *     contract_address: { eq: "0x..." }
   *   }
   * });
   * console.log(result.data); // Array of matching contracts
   * console.log(result.count); // Total count
   * ```
   */
  async getContracts(args: GetContractsArgs) {
    return this.entityService.getMany(args);
  }

  /**
   * Retrieves a single contract based on provided arguments.
   *
   * @param args - Query arguments for filtering
   * @returns A promise that resolves to:
   *          - The matching contract if found
   *          - undefined if no contract matches the criteria
   * @throws {Error} If the database query fails
   *
   * @example
   * ```typescript
   * const contract = await service.getContract({
   *   where: {
   *     chain_id: { eq: "1" },
   *     contract_address: { eq: "0x..." }
   *   }
   * });
   * if (contract) {
   *   console.log("Found contract:", contract);
   * }
   * ```
   */
  async getContract(args: GetContractsArgs) {
    return this.entityService.getSingle(args);
  }
}
