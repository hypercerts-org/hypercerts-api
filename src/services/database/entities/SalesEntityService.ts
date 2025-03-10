import { Selectable } from "kysely";
import { injectable } from "tsyringe";
import { kyselyCaching } from "../../../client/kysely.js";
import type { GetSalesArgs } from "../../../graphql/schemas/args/salesArgs.js";
import type { CachingDatabase } from "../../../types/kyselySupabaseCaching.js";
import type { EntityService } from "./EntityServiceFactory.js";
import { createEntityService } from "./EntityServiceFactory.js";

export type SaleSelect = Selectable<CachingDatabase["sales"]>;

/**
 * Service for handling sales-related database operations.
 * This service provides functionality to:
 * 1. Query multiple sales with filtering and pagination
 * 2. Query a single sale by ID
 */
@injectable()
export class SalesService {
  private entityService: EntityService<CachingDatabase["sales"], GetSalesArgs>;

  constructor() {
    this.entityService = createEntityService<
      CachingDatabase,
      "sales",
      GetSalesArgs
    >("sales", "SalesEntityService", kyselyCaching);
  }

  /**
   * Retrieves multiple sales based on the provided query arguments.
   *
   * @param args - Query arguments including where conditions, sorting, and pagination
   * @returns A promise resolving to an object containing:
   *          - data: Array of sales matching the query criteria
   *          - count: Total number of matching sales
   * @throws {Error} If the database query fails
   */
  async getSales(args: GetSalesArgs) {
    return this.entityService.getMany(args);
  }

  /**
   * Retrieves a single sale based on the provided query arguments.
   *
   * @param args - Query arguments including where conditions to identify the sale
   * @returns A promise resolving to the matching sale
   * @throws {Error} If the database query fails
   */
  async getSale(args: GetSalesArgs) {
    return this.entityService.getSingle(args);
  }
}
