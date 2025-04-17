import { describe, expect, it } from "vitest";
import { AllowlistQueryStrategy } from "../../../../src/services/database/strategies/AllowlistQueryStrategy.js";
import { AttestationsQueryStrategy } from "../../../../src/services/database/strategies/AttestationQueryStrategy.js";
import { BlueprintsQueryStrategy } from "../../../../src/services/database/strategies/BlueprintsQueryStrategy.js";
import { ClaimsQueryStrategy } from "../../../../src/services/database/strategies/ClaimsQueryStrategy.js";
import { CollectionsQueryStrategy } from "../../../../src/services/database/strategies/CollectionsQueryStrategy.js";
import { ContractsQueryStrategy } from "../../../../src/services/database/strategies/ContractsQueryStrategy.js";
import { FractionsQueryStrategy } from "../../../../src/services/database/strategies/FractionsQueryStrategy.js";
import { HyperboardsQueryStrategy } from "../../../../src/services/database/strategies/HyperboardsQueryStrategy.js";
import { MarketplaceOrdersQueryStrategy } from "../../../../src/services/database/strategies/MarketplaceOrdersQueryStrategy.js";
import { MetadataQueryStrategy } from "../../../../src/services/database/strategies/MetadataQueryStrategy.js";
import { SupportedDatabase } from "../../../../src/services/database/strategies/QueryStrategy.js";
import { QueryStrategyFactory } from "../../../../src/services/database/strategies/QueryStrategyFactory.js";
import { SalesQueryStrategy } from "../../../../src/services/database/strategies/SalesQueryStrategy.js";
import { SignatureRequestsQueryStrategy } from "../../../../src/services/database/strategies/SignatureRequestsQueryStrategy.js";
import { SupportedSchemasQueryStrategy } from "../../../../src/services/database/strategies/SupportedSchemasQueryStrategy.js";
import { UsersQueryStrategy } from "../../../../src/services/database/strategies/UsersQueryStrategy.js";

type TableName = keyof SupportedDatabase;

describe("QueryStrategyFactory", () => {
  describe("Basic Strategy Resolution", () => {
    // This matches the strategyRegistry in QueryStrategyFactory. While it alerts on regressions in the configuration, it does not catch when a new table is added.

    const supportedStrategies = {
      attestations: AttestationsQueryStrategy,
      claims: ClaimsQueryStrategy,
      hypercerts: ClaimsQueryStrategy,
      attestation_schema: SupportedSchemasQueryStrategy,
      eas_schema: SupportedSchemasQueryStrategy,
      supported_schemas: SupportedSchemasQueryStrategy,
      metadata: MetadataQueryStrategy,
      sales: SalesQueryStrategy,
      contracts: ContractsQueryStrategy,
      fractions: FractionsQueryStrategy,
      fractions_view: FractionsQueryStrategy,
      allowlist_records: AllowlistQueryStrategy,
      claimable_fractions_with_proofs: AllowlistQueryStrategy,
      orders: MarketplaceOrdersQueryStrategy,
      marketplace_orders: MarketplaceOrdersQueryStrategy,
      users: UsersQueryStrategy,
      blueprints: BlueprintsQueryStrategy,
      blueprints_with_admins: BlueprintsQueryStrategy,
      signature_requests: SignatureRequestsQueryStrategy,
      hyperboards: HyperboardsQueryStrategy,
      collections: CollectionsQueryStrategy,
    } as const;

    it.each(Object.keys(supportedStrategies))(
      "should return correct strategy for %s table",
      (table) => {
        const strategy = QueryStrategyFactory.getStrategy(table as TableName);
        expect(strategy).toBeInstanceOf(
          supportedStrategies[table as keyof typeof supportedStrategies],
        );
      },
    );

    it("should return unique instances for each table", () => {
      const instances = new Set();
      Object.keys(supportedStrategies).forEach((table) => {
        const strategy = QueryStrategyFactory.getStrategy(table as TableName);
        instances.add(strategy);
      });

      // Each table should have its own instance
      expect(instances.size).toBe(Object.keys(supportedStrategies).length);
    });
  });

  describe("Strategy Caching", () => {
    it("should return same strategy instance for same table", () => {
      const strategy1 = QueryStrategyFactory.getStrategy("claims" as TableName);
      const strategy2 = QueryStrategyFactory.getStrategy("claims" as TableName);

      expect(strategy1).toBeInstanceOf(ClaimsQueryStrategy);
      expect(strategy2).toBeInstanceOf(ClaimsQueryStrategy);
      expect(strategy1).toBe(strategy2); // Should be the exact same instance
    });
  });

  describe("Error Handling", () => {
    it("should throw error for unknown table", () => {
      expect(() => {
        QueryStrategyFactory.getStrategy("non_existent_table" as TableName);
      }).toThrow("No strategy registered for table");
    });

    it("should throw error for invalid table name", () => {
      expect(() => {
        // @ts-expect-error Testing runtime behavior with invalid input
        QueryStrategyFactory.getStrategy("invalid_table");
      }).toThrow();
    });
  });
});
