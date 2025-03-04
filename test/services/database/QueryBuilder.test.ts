import { describe, expect, it } from "vitest";
import { AttestationsQueryStrategy } from "../../../src/services/database/strategies/AttestationQueryStrategy.js";
import { BlueprintsQueryStrategy } from "../../../src/services/database/strategies/BlueprintsQueryStrategy.js";
import { ClaimsQueryStrategy } from "../../../src/services/database/strategies/ClaimsQueryStrategy.js";
import { QueryStrategyFactory } from "../../../src/services/database/strategies/QueryBuilder.js";
import { UsersQueryStrategy } from "../../../src/services/database/strategies/UsersQueryStrategy.js";
import { SupportedDatabases } from "../../../src/services/database/strategies/QueryStrategy.js";

type TableName = keyof SupportedDatabases;

describe("QueryStrategyFactory", () => {
  describe("getStrategy", () => {
    it("should return correct strategy for attestations table", () => {
      const strategy = QueryStrategyFactory.getStrategy(
        "attestations" as TableName,
      );
      expect(strategy).toBeInstanceOf(AttestationsQueryStrategy);
    });

    it("should return ClaimsQueryStrategy for both claims and hypercerts tables", () => {
      const claimsStrategy = QueryStrategyFactory.getStrategy(
        "claims" as TableName,
      );
      const hypercertsStrategy = QueryStrategyFactory.getStrategy(
        "hypercerts" as TableName,
      );

      expect(claimsStrategy).toBeInstanceOf(ClaimsQueryStrategy);
      expect(hypercertsStrategy).toBeInstanceOf(ClaimsQueryStrategy);
    });

    it("should return same strategy instance for same table", () => {
      const strategy1 = QueryStrategyFactory.getStrategy("users" as TableName);
      const strategy2 = QueryStrategyFactory.getStrategy("users" as TableName);

      expect(strategy1).toBeInstanceOf(UsersQueryStrategy);
      expect(strategy1).toBe(strategy2); // Should return cached instance
    });

    it("should return correct strategy for tables with multiple mappings", () => {
      const blueprints = QueryStrategyFactory.getStrategy(
        "blueprints" as TableName,
      );
      const blueprintsWithAdmins = QueryStrategyFactory.getStrategy(
        "blueprints_with_admins" as TableName,
      );

      expect(blueprints).toBeInstanceOf(BlueprintsQueryStrategy);
      expect(blueprintsWithAdmins).toBeInstanceOf(BlueprintsQueryStrategy);
    });

    it("should throw error for unknown table", () => {
      expect(() => {
        QueryStrategyFactory.getStrategy("non_existent_table" as TableName);
      }).toThrow("No strategy found for table non_existent_table");
    });

    it("should handle all supported tables", () => {
      const supportedTables = [
        "attestations",
        "claims",
        "hypercerts",
        "attestation_schema",
        "eas_schema",
        "supported_schemas",
        "metadata",
        "sales",
        "contracts",
        "fractions",
        "fractions_view",
        "allowlist_records",
        "claimable_fractions_with_proofs",
        "orders",
        "marketplace_orders",
        "users",
        "blueprints",
        "blueprints_with_admins",
        "signature_requests",
        "hyperboards",
        "collections",
      ];

      supportedTables.forEach((table) => {
        expect(() =>
          QueryStrategyFactory.getStrategy(table as TableName),
        ).not.toThrow();
      });
    });
  });
});
