import { CachingDatabase } from "../../types/kyselySupabaseCaching.js";
import { DataDatabase } from "../../types/kyselySupabaseData.js";
import {
  AllowlistQueryStrategy,
  AttestationsQueryStrategy,
  BlueprintsWithAdminsQueryStrategy,
  ClaimsQueryStrategy,
  ContractsQueryStrategy,
  FractionsQueryStrategy,
  HyperboardsQueryStrategy,
  MarketplaceOrdersStrategy,
  MetadataQueryStrategy,
  QueryStrategy,
  SalesQueryStrategy,
  SchemasQueryStrategy,
  SignatureRequestsQueryStrategy,
  UsersQueryStrategy,
} from "./QueryStrategies.js";

type StrategyMapping = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in keyof (CachingDatabase & DataDatabase)]?: QueryStrategy<any, any>;
} & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: QueryStrategy<any, any> | undefined; // allows for overriding mappings
};

// Factory that handles both database types
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class QueryStrategyFactory {
  private static strategies: StrategyMapping = {
    // Caching database strategies
    attestations: new AttestationsQueryStrategy(),
    claims: new ClaimsQueryStrategy(),
    supported_schemas: new SchemasQueryStrategy(),
    eas_schema: new SchemasQueryStrategy(),
    metadata: new MetadataQueryStrategy(),
    sales: new SalesQueryStrategy(),
    contracts: new ContractsQueryStrategy(),
    fractions_view: new FractionsQueryStrategy(),
    fractions: new FractionsQueryStrategy(),
    claimable_fractions_with_proofs: new AllowlistQueryStrategy(),
    allow_list_data: new AllowlistQueryStrategy(),

    // Data database strategies
    orders: new MarketplaceOrdersStrategy(),
    marketplace_orders: new MarketplaceOrdersStrategy(),
    users: new UsersQueryStrategy(),
    blueprints: new BlueprintsWithAdminsQueryStrategy(),
    blueprints_with_admins: new BlueprintsWithAdminsQueryStrategy(),
    signature_requests: new SignatureRequestsQueryStrategy(),
    hyperboards: new HyperboardsQueryStrategy(),
  };

  static getStrategy<
    T extends keyof DB,
    DB extends CachingDatabase | DataDatabase,
  >(tableName: T): QueryStrategy<DB, T> {
    const strategy = this.strategies[tableName as keyof StrategyMapping];
    if (!strategy)
      throw new Error(`No strategy found for table ${String(tableName)}`);
    return strategy as QueryStrategy<DB, T>;
  }
}
