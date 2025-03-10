import { inject, injectable } from "tsyringe";
import { Args, Query, Resolver } from "type-graphql";
import { GetContractsArgs } from "../../../graphql/schemas/args/contractArgs.js";
import {
  Contract,
  GetContractsResponse,
} from "../../../graphql/schemas/typeDefs/contractTypeDefs.js";
import { ContractService } from "../../database/entities/ContractEntityService.js";

/**
 * GraphQL resolver for Contract operations.
 * Handles queries for contracts deployed on various chains.
 *
 * This resolver provides:
 * - Query for fetching contracts with optional filtering
 * - Support for pagination and sorting
 *
 * Each contract represents a smart contract deployed on a blockchain,
 * containing information such as:
 * - Chain ID
 * - Contract address
 * - Deployment block number
 *
 * @injectable Marks the class as injectable for dependency injection with tsyringe
 * @resolver Marks the class as a GraphQL resolver for the Contract type
 */
@injectable()
@Resolver(() => Contract)
class ContractResolver {
  /**
   * Creates a new instance of ContractResolver.
   *
   * @param contractService - Service for handling contract operations
   */
  constructor(
    @inject(ContractService)
    private contractService: ContractService,
  ) {}

  /**
   * Queries contracts based on provided arguments.
   * Returns both the matching contracts and a total count.
   *
   * @param args - Query arguments for filtering contracts
   * @returns A promise that resolves to an object containing:
   *          - data: Array of contracts matching the query
   *          - count: Total number of matching contracts
   *
   * @example
   * Query with filtering:
   * ```graphql
   * query {
   *   contracts(
   *     where: {
   *       chain_id: { eq: "1" },
   *       contract_address: { eq: "0x..." }
   *     }
   *   ) {
   *     data {
   *       id
   *       chain_id
   *       contract_address
   *       start_block
   *     }
   *     count
   *   }
   * }
   * ```
   */
  @Query(() => GetContractsResponse)
  async contracts(@Args() args: GetContractsArgs) {
    try {
      return await this.contractService.getContracts(args);
    } catch (e) {
      console.error(
        `[ContractResolver::contracts] Error fetching contracts: ${(e as Error).message}`,
      );
      return null;
    }
  }
}

export { ContractResolver };
