import { Kysely } from "kysely";
import { beforeEach, describe, expect, it } from "vitest";
import { GetHypercertsArgs } from "../../../../src/graphql/schemas/args/hypercertsArgs.js";
import { ClaimsQueryStrategy } from "../../../../src/services/database/strategies/ClaimsQueryStrategy.js";
import { CachingDatabase } from "../../../../src/types/kyselySupabaseCaching.js";
import {
  createTestCachingDatabase,
  generateHypercertId,
} from "../../../utils/testUtils.js";

describe("ClaimsQueryStrategy", () => {
  let strategy: ClaimsQueryStrategy;
  let db: Kysely<CachingDatabase>;

  beforeEach(async () => {
    strategy = new ClaimsQueryStrategy();
    ({ db } = await createTestCachingDatabase());
  });

  describe("buildDataQuery", () => {
    it("should build basic query without args", () => {
      // Act
      const query = strategy.buildDataQuery(db);
      const { sql } = query.compile();

      // Assert
      expect(sql).toBe('select * from "claims_view"');
    });

    it("should build query with contract filter", () => {
      // Arrange
      const args: GetHypercertsArgs = {
        where: {
          contract: {
            chain_id: { eq: 1 },
          },
        },
      };

      // Act
      const query = strategy.buildDataQuery(db, args);
      const { sql } = query.compile();
      // Assert
      expect(sql).toContain(
        'from "contracts" where "contracts"."id" = "claims_view"."contracts_id"',
      );
    });

    it("should build query with fractions filter", () => {
      // Arrange
      const args: GetHypercertsArgs = {
        where: {
          fractions: {
            fraction_id: { eq: generateHypercertId() },
          },
        },
      };

      // Act
      const query = strategy.buildDataQuery(db, args);
      const { sql } = query.compile();

      // Assert
      expect(sql).toContain(
        'from "fractions_view" where "fractions_view"."claims_id" = "claims_view"."id"',
      );
    });

    it("should build query with metadata filter", () => {
      // Arrange
      const args: GetHypercertsArgs = {
        where: {
          metadata: {
            name: { eq: "Test Claim" },
          },
        },
      };

      // Act
      const query = strategy.buildDataQuery(db, args);
      const { sql } = query.compile();
      // Assert
      expect(sql).toContain(
        'from "metadata" where "metadata"."uri" = "claims_view"."uri"',
      );
    });

    it("should build query with attestations filter", () => {
      // Arrange
      const args: GetHypercertsArgs = {
        where: {
          attestations: {
            id: { eq: "test-id" },
          },
        },
      };

      // Act
      const query = strategy.buildDataQuery(db, args);
      const { sql } = query.compile();
      // Assert
      expect(sql).toContain(
        'from "attestations" where "attestations"."claims_id" = "claims_view"."id"',
      );
    });

    it("should build query with multiple filters", () => {
      // Arrange
      const args: GetHypercertsArgs = {
        where: {
          contract: { chain_id: { eq: 1 } },
          metadata: { name: { eq: "Test Claim" } },
        },
      };

      // Act
      const query = strategy.buildDataQuery(db, args);
      const { sql } = query.compile();
      // Assert
      expect(sql).toContain(
        'from "contracts" where "contracts"."id" = "claims_view"."contracts_id"',
      );
      expect(sql).toContain(
        'from "metadata" where "metadata"."uri" = "claims_view"."uri"',
      );
    });
  });

  describe("buildCountQuery", () => {
    it("should build basic count query without args", () => {
      // Act
      const query = strategy.buildCountQuery(db);
      const { sql } = query.compile();
      // Assert
      expect(sql).toBe('select count(*) as "count" from "claims_view"');
    });

    it("should build count query with contract filter", () => {
      // Arrange
      const args: GetHypercertsArgs = {
        where: {
          contract: {
            chain_id: { eq: 1 },
          },
        },
      };

      // Act
      const query = strategy.buildCountQuery(db, args);
      const { sql } = query.compile();
      // Assert
      expect(sql).toContain(
        'from "contracts" where "contracts"."id" = "claims_view"."contracts_id"',
      );
      expect(sql).toContain('count(*) as "count"');
    });

    it("should build count query with multiple filters", () => {
      // Arrange
      const args: GetHypercertsArgs = {
        where: {
          contract: { chain_id: { eq: 1 } },
          metadata: { name: { eq: "Test Claim" } },
        },
      };

      // Act
      const query = strategy.buildCountQuery(db, args);
      const { sql } = query.compile();
      // Assert
      expect(sql).toContain(
        'from "contracts" where "contracts"."id" = "claims_view"."contracts_id"',
      );
      expect(sql).toContain(
        'from "metadata" where "metadata"."uri" = "claims_view"."uri"',
      );
      expect(sql).toContain('count(*) as "count"');
    });
  });
});
