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
import { QueryStrategy, SupportedDatabases } from "./QueryStrategy.js";
import { SalesQueryStrategy } from "./SalesQueryStrategy.js";
import { SignatureRequestsQueryStrategy } from "./SignatureRequestsQueryStrategy.js";
import { SupportedSchemasQueryStrategy } from "./SupportedSchemasQueryStrategy.js";
import { UsersQueryStrategy } from "./UsersQueryStrategy.js";
import { EntityFields } from "../../../lib/graphql/createEntityArgs.js";
import { SortOptions } from "../../../lib/graphql/createEntitySortArgs.js";

/**
 * Mapping of table names to their corresponding query strategies
 * Used to cache strategies in a map to avoid loading the same strategy multiple times
 */
type StrategyMapping = {
  [T in keyof SupportedDatabases]?: QueryStrategy<
    SupportedDatabases,
    T,
    BaseQueryArgsType<Record<string, unknown>, SortOptions<EntityFields>>
  >;
};

/**
 * Factory class for creating query strategies for different tables
 * Uses a proxy to handle lazy loading of strategies
 */
export class QueryStrategyFactory {
  /**
   * Get a strategy for a given table name
   * @param tableName - The name of the table to get a strategy for
   * @returns A query strategy for the given table name
   */
  private static getStrategyFromTable(tableName: string) {
    switch (tableName) {
      case "attestations":
        return new AttestationsQueryStrategy();
      case "claims":
      case "hypercerts":
        return new ClaimsQueryStrategy();
      case "attestation_schema":
      case "eas_schema":
      case "supported_schemas":
        return new SupportedSchemasQueryStrategy();
      case "metadata":
        return new MetadataQueryStrategy();
      case "sales":
        return new SalesQueryStrategy();
      case "contracts":
        return new ContractsQueryStrategy();
      case "fractions":
      case "fractions_view":
        return new FractionsQueryStrategy();
      case "allowlist_records":
      case "claimable_fractions_with_proofs":
        return new AllowlistQueryStrategy();
      case "orders":
      case "marketplace_orders":
        return new MarketplaceOrdersQueryStrategy();
      case "users":
        return new UsersQueryStrategy();
      case "blueprints":
      case "blueprints_with_admins":
        return new BlueprintsQueryStrategy();
      case "signature_requests":
        return new SignatureRequestsQueryStrategy();
      case "hyperboards":
        return new HyperboardsQueryStrategy();
      case "collections":
        return new CollectionsQueryStrategy();
      default:
        throw new Error(`No strategy found for table ${tableName}`);
    }
  }

  /**
   * Proxy to handle lazy loading of strategies
   * Only loads strategies when they are accessed
   * Caches strategies in a map to avoid loading the same strategy multiple times
   */
  private static strategies: StrategyMapping = new Proxy(
    {} as StrategyMapping,
    {
      get(target, prop) {
        if (typeof prop === "string") {
          if (!(prop in target)) {
            const strategy = QueryStrategyFactory.getStrategyFromTable(prop);
            target[prop as keyof StrategyMapping] =
              strategy as StrategyMapping[keyof StrategyMapping];
          }
          return target[prop as keyof StrategyMapping];
        }
        return undefined;
      },
    },
  );

  /**
   * Get a strategy for a given table name
   * @param tableName - The name of the table to get a strategy for
   * @returns A query strategy for the given table name
   */
  static getStrategy<
    DB extends SupportedDatabases,
    T extends keyof DB & string,
    Args extends BaseQueryArgsType<
      Record<string, unknown>,
      SortOptions<EntityFields>
    > = BaseQueryArgsType<Record<string, unknown>, SortOptions<EntityFields>>,
  >(tableName: T): QueryStrategy<DB, T, Args> {
    const strategy = this.strategies[tableName as keyof StrategyMapping];
    if (!strategy) {
      throw new Error(`No strategy found for table ${String(tableName)}`);
    }
    return strategy;
  }
}
