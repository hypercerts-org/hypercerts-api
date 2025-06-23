import { BaseQueryArgsType } from "../../../lib/graphql/BaseQueryArgs.js";
import { AllowlistQueryStrategy } from "./AllowlistQueryStrategy.js";
import { AttestationsQueryStrategy } from "./AttestationQueryStrategy.js";
import { BlueprintsQueryStrategy } from "./BlueprintsQueryStrategy.js";
import { ClaimsQueryStrategy } from "./ClaimsQueryStrategy.js";
import { CollectionsQueryStrategy } from "./CollectionsQueryStrategy.js";
import { ContractsQueryStrategy } from "./ContractsQueryStrategy.js";
import { FractionsQueryStrategy } from "./FractionsQueryStrategy.js";
import { HyperboardsQueryStrategy } from "./HyperboardsQueryStrategy.js";
import { MarketplaceOrdersQueryStrategy } from "./MarketplaceOrdersQueryStrategy.js";
import { MetadataQueryStrategy } from "./MetadataQueryStrategy.js";
import { QueryStrategy, SupportedDatabase } from "./QueryStrategy.js";
import { SalesQueryStrategy } from "./SalesQueryStrategy.js";
import { SignatureRequestsQueryStrategy } from "./SignatureRequestsQueryStrategy.js";
import { SupportedSchemasQueryStrategy } from "./SupportedSchemasQueryStrategy.js";
import { UsersQueryStrategy } from "./UsersQueryStrategy.js";
import { EntityFields } from "../../../lib/graphql/createEntityArgs.js";
import { SortOptions } from "../../../lib/graphql/createEntitySortArgs.js";

/**
 * Base type for query arguments used across all strategies
 */
type QueryArgs = BaseQueryArgsType<
  Record<string, unknown>,
  SortOptions<EntityFields>
>;

/**
 * Type for strategy constructors to ensure they match the QueryStrategy interface
 */
type QueryStrategyConstructor<
  DB extends SupportedDatabase = SupportedDatabase,
  T extends keyof DB & string = keyof DB & string,
  Args extends QueryArgs = QueryArgs,
> = new () => QueryStrategy<DB, T, Args>;

/**
 * Type for the strategy registry mapping table names to their constructors
 */
type StrategyRegistry = {
  [K in keyof SupportedDatabase & string]: QueryStrategyConstructor<
    SupportedDatabase,
    K
  >;
};

/**
 * Type for the strategy cache mapping table names to their instances
 */
type StrategyCache = {
  [K in keyof SupportedDatabase & string]?: QueryStrategy<SupportedDatabase, K>;
};

/**
 * Factory class for creating query strategies for different tables
 * Uses a registry pattern for extensibility and a proxy for lazy loading
 */
export class QueryStrategyFactory {
  /**
   * Registry of strategy constructors
   * @private
   */
  private static strategyRegistry: Partial<StrategyRegistry> = {
    attestations: AttestationsQueryStrategy,
    allowlist_records: AllowlistQueryStrategy,
    claimable_fractions_with_proofs: AllowlistQueryStrategy,
    blueprints_with_admins: BlueprintsQueryStrategy,
    blueprints: BlueprintsQueryStrategy,
    claims: ClaimsQueryStrategy,
    claims_view: ClaimsQueryStrategy,
    hypercerts: ClaimsQueryStrategy,
    collections: CollectionsQueryStrategy,
    contracts: ContractsQueryStrategy,
    fractions: FractionsQueryStrategy,
    fractions_view: FractionsQueryStrategy,
    hyperboards: HyperboardsQueryStrategy,
    hyperboards_with_admins: HyperboardsQueryStrategy,
    metadata: MetadataQueryStrategy,
    orders: MarketplaceOrdersQueryStrategy,
    marketplace_orders: MarketplaceOrdersQueryStrategy,
    sales: SalesQueryStrategy,
    signature_requests: SignatureRequestsQueryStrategy,
    attestation_schema: SupportedSchemasQueryStrategy,
    eas_schema: SupportedSchemasQueryStrategy,
    supported_schemas: SupportedSchemasQueryStrategy,
    users: UsersQueryStrategy,
  };

  /**
   * Cache of strategy instances
   * @private
   */
  private static strategies = new Proxy<StrategyCache>(
    {},
    {
      get<K extends keyof SupportedDatabase & string>(
        target: StrategyCache,
        prop: K | string | symbol,
      ): QueryStrategy<SupportedDatabase, K> | undefined {
        if (typeof prop !== "string") {
          return undefined;
        }

        const key = prop as K;

        // Check if we already have a cached instance
        if (key in target && target[key]) {
          return target[key] as QueryStrategy<SupportedDatabase, K>;
        }

        // Get the constructor from the registry
        const Constructor = QueryStrategyFactory.strategyRegistry[key];
        if (!Constructor) {
          throw new Error(
            `No strategy registered for table "${String(key)}". Available tables: ${Object.keys(
              QueryStrategyFactory.strategyRegistry,
            ).join(", ")}`,
          );
        }

        // Create and cache a new instance
        const strategy = new Constructor() as QueryStrategy<
          SupportedDatabase,
          K
        >;
        (target as Record<K, QueryStrategy<SupportedDatabase, K>>)[key] =
          strategy;
        return strategy;
      },
    },
  );

  /**
   * Get a strategy instance for a given table
   * Creates and caches the instance if it doesn't exist
   *
   * @param tableName - The name of the table to get a strategy for
   * @returns A query strategy instance for the given table
   * @throws Error if no strategy is registered for the table
   */
  static getStrategy<
    DB extends SupportedDatabase,
    T extends keyof DB & string,
    Args extends QueryArgs = QueryArgs,
  >(tableName: T): QueryStrategy<DB, T, Args> {
    const strategy =
      this.strategies[tableName as keyof SupportedDatabase & string];
    if (!strategy) {
      throw new Error(
        `Failed to get strategy for table "${tableName}". This might be a type mismatch or the strategy is not properly registered.`,
      );
    }
    return strategy as QueryStrategy<DB, T, Args>;
  }
}
