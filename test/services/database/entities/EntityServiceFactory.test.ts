import { Kysely } from "kysely";
import { IMemoryDb, newDb } from "pg-mem";
import { beforeEach, describe, expect, it } from "vitest";
import { GetUsersArgs } from "../../../../src/graphql/schemas/args/userArgs.js";
import {
  createEntityService,
  EntityService,
} from "../../../../src/services/database/entities/EntityServiceFactory.js";
import { DataDatabase } from "../../../../src/types/kyselySupabaseData.js";

type TestDatabase = DataDatabase;

describe("EntityServiceFactory", () => {
  let db: Kysely<TestDatabase>;
  let mem: IMemoryDb;
  let entityService: EntityService<DataDatabase["users"], GetUsersArgs>;

  beforeEach(() => {
    mem = newDb();
    db = mem.adapters.createKysely();

    // Create test table
    mem.public.none(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        display_name TEXT NOT NULL,
        avatar TEXT NOT NULL
      );
    `);

    // Insert some test data
    mem.public.none(`
      INSERT INTO users (display_name, avatar) VALUES
      ('Alice', 'https://example.com/alice.jpg'),
      ('Bob', 'https://example.com/bob.jpg'),
      ('Charlie', 'https://example.com/charlie.jpg');
    `);

    entityService = createEntityService("users", "TestEntityService", db);
  });

  describe("Basic Functionality", () => {
    it("should retrieve a single entity", async () => {
      const result = await entityService.getSingle({
        where: { id: { eq: "1" } },
      });
      expect(result).toBeDefined();
      expect(result?.id).toBe(1);
      expect(result?.display_name).toBe("Alice");
      expect(result?.avatar).toBe("https://example.com/alice.jpg");
    });

    it("should retrieve multiple entities", async () => {
      const result = await entityService.getMany({});
      expect(result).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.count).toBe(3); // Alice, Bob, and Charlie
    });
  });

  describe("Error Handling", () => {
    it("should return undefined for non-existent entity", async () => {
      const result = await entityService.getSingle({
        where: { id: { eq: "999" } },
      });
      expect(result).toBeUndefined();
    });
  });

  describe("Instance Uniqueness", () => {
    it("should return unique instances for each service", () => {
      const service1 = createEntityService("users", "TestEntityService1", db);
      const service2 = createEntityService("users", "TestEntityService2", db);
      expect(service1).not.toBe(service2); // Should be different instances
    });
  });
});
