import { Kysely } from "kysely";
import { container } from "tsyringe";
import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import { DataKyselyService } from "../../../../src/client/kysely.js";
import { GetCollectionsArgs } from "../../../../src/graphql/schemas/args/collectionArgs.js";
import { BlueprintsService } from "../../../../src/services/database/entities/BlueprintsEntityService.js";
import { CollectionService } from "../../../../src/services/database/entities/CollectionEntityService.js";
import { HypercertsService } from "../../../../src/services/database/entities/HypercertsEntityService.js";
import { UsersService } from "../../../../src/services/database/entities/UsersEntityService.js";
import type { DataDatabase } from "../../../../src/types/kyselySupabaseData.js";
import {
  createTestDataDatabase,
  generateMockCollection,
} from "../../../utils/testUtils.js";

const mockDb = vi.fn();

vi.mock("../../../../src/client/kysely.js", () => ({
  get DataKyselyService() {
    return class MockDataKyselyService {
      getConnection() {
        return mockDb();
      }
      get db() {
        return mockDb();
      }
    };
  },
  get kyselyData() {
    return mockDb();
  },
}));

describe("CollectionService", () => {
  let collectionService: CollectionService;
  let db: Kysely<DataDatabase>;
  let mockHypercertsService: HypercertsService;
  let mockBlueprintsService: BlueprintsService;
  let mockUsersService: UsersService;

  beforeEach(async () => {
    vi.clearAllMocks();

    ({ db } = await createTestDataDatabase());

    mockDb.mockReturnValue(db);

    // Create mock services
    mockHypercertsService = {
      getHypercerts: vi.fn(),
      getHypercert: vi.fn(),
      entityService: {},
      dataKyselyService: container.resolve(DataKyselyService),
    } as unknown as HypercertsService;

    mockBlueprintsService = {
      getBlueprints: vi.fn(),
      getBlueprint: vi.fn(),
      entityService: {},
      dataKyselyService: container.resolve(DataKyselyService),
    } as unknown as BlueprintsService;

    const getOrCreateUser = vi.fn();
    mockUsersService = {
      getOrCreateUser,
      entityService: {},
      dataKyselyService: container.resolve(DataKyselyService),
    } as unknown as UsersService;

    collectionService = new CollectionService(
      mockHypercertsService,
      container.resolve(DataKyselyService),
      mockBlueprintsService,
      mockUsersService,
    );
  });

  describe("getCollections", () => {
    it("should return collections with correct data", async () => {
      // Arrange
      const mockCollection = generateMockCollection();
      const [collection] = await db
        .insertInto("collections")
        .values({
          name: mockCollection.name,
          description: mockCollection.description,
          chain_ids: mockCollection.chain_ids.map(Number),
          hidden: mockCollection.hidden,
          created_at: mockCollection.created_at,
        })
        .returning("id")
        .execute();

      // Insert mock admin
      const admin = mockCollection.admins[0];
      await db
        .insertInto("users")
        .values({
          id: admin.id,
          address: admin.address,
          chain_id: admin.chain_id,
        })
        .execute();

      await db
        .insertInto("collection_admins")
        .values({
          collection_id: collection.id,
          user_id: admin.id,
        })
        .execute();

      // Insert mock blueprint
      const blueprint = mockCollection.blueprints[0];
      await db
        .insertInto("blueprints")
        .values({
          id: blueprint.id,
          form_values: blueprint.form_values,
          minter_address: blueprint.minter_address,
          minted: blueprint.minted,
          hypercert_ids: blueprint.hypercert_ids,
        })
        .execute();

      await db
        .insertInto("collection_blueprints")
        .values({
          collection_id: collection.id,
          blueprint_id: blueprint.id,
        })
        .execute();

      const args: GetCollectionsArgs = {
        where: {
          id: { eq: collection.id },
        },
      };

      // Act
      const result = await collectionService.getCollections(args);

      // Assert
      expect(result.count).toBe(1);
      expect(result.data).toHaveLength(1);
      expect(result.data[0].id).toBe(collection.id);
      expect(result.data[0].name).toBe(mockCollection.name);
      expect(result.data[0].description).toBe(mockCollection.description);
      expect(result.data[0].chain_ids).toEqual(
        mockCollection.chain_ids.map(Number),
      );
      expect(result.data[0].hidden).toBe(mockCollection.hidden);
    });

    it("should handle empty result set", async () => {
      // Arrange
      const args: GetCollectionsArgs = {};

      // Act
      const result = await collectionService.getCollections(args);

      // Assert
      expect(result.count).toBe(0);
      expect(result.data).toHaveLength(0);
    });

    it("should handle errors from entityService.getMany", async () => {
      // Arrange
      // Mock the database to throw an error
      vi.spyOn(db, "selectFrom").mockImplementation(() => {
        throw new Error("Database error");
      });

      // Act & Assert
      await expect(collectionService.getCollections({})).rejects.toThrow(
        "Database error",
      );
    });

    it("should filter collections by admin address", async () => {
      // Arrange
      const mockCollection = generateMockCollection();
      const [collection] = await db
        .insertInto("collections")
        .values({
          name: mockCollection.name,
          description: mockCollection.description,
          chain_ids: mockCollection.chain_ids.map(Number),
          hidden: mockCollection.hidden,
          created_at: mockCollection.created_at,
        })
        .returning("id")
        .execute();

      const admin = mockCollection.admins[0];
      await db
        .insertInto("users")
        .values({
          id: admin.id,
          address: admin.address,
          chain_id: admin.chain_id,
        })
        .execute();

      await db
        .insertInto("collection_admins")
        .values({
          collection_id: collection.id,
          user_id: admin.id,
        })
        .execute();

      const args: GetCollectionsArgs = {
        where: {
          admins: { address: { eq: admin.address } },
        },
      };

      // Act
      const result = await collectionService.getCollections(args);

      // Assert
      expect(result.count).toBe(1);
      expect(result.data).toHaveLength(1);
      expect(result.data[0].id).toBe(collection.id);
    });

    it("should filter collections by blueprint id", async () => {
      // Arrange
      const mockCollection = generateMockCollection();
      const [collection] = await db
        .insertInto("collections")
        .values({
          name: mockCollection.name,
          description: mockCollection.description,
          chain_ids: mockCollection.chain_ids.map(Number),
          hidden: mockCollection.hidden,
          created_at: mockCollection.created_at,
        })
        .returning("id")
        .execute();

      const blueprint = mockCollection.blueprints[0];
      await db
        .insertInto("blueprints")
        .values({
          id: blueprint.id,
          form_values: blueprint.form_values,
          minter_address: blueprint.minter_address,
          minted: blueprint.minted,
          hypercert_ids: blueprint.hypercert_ids,
        })
        .execute();

      await db
        .insertInto("collection_blueprints")
        .values({
          collection_id: collection.id,
          blueprint_id: blueprint.id,
        })
        .execute();

      const args: GetCollectionsArgs = {
        where: {
          blueprints: { id: { eq: blueprint.id } },
        },
      };

      // Act
      const result = await collectionService.getCollections(args);

      // Assert
      expect(result.count).toBe(1);
      expect(result.data).toHaveLength(1);
      expect(result.data[0].id).toBe(collection.id);
    });
  });

  describe("upsertCollections", () => {
    it("should upsert collections with correct values", async () => {
      // Arrange
      const mockCollection = generateMockCollection();
      const collections = [
        {
          name: mockCollection.name,
          description: mockCollection.description,
          chain_ids: mockCollection.chain_ids.map(Number),
          hidden: mockCollection.hidden,
          created_at: mockCollection.created_at,
        },
      ];

      // Act
      const result = await collectionService.upsertCollections(collections);

      // Assert
      expect(result).toHaveLength(1);
      const insertedCollection = result[0];
      expect(insertedCollection).toMatchObject({
        name: mockCollection.name,
        description: mockCollection.description,
        chain_ids: mockCollection.chain_ids.map(Number),
        hidden: mockCollection.hidden,
      });
    });

    it("should handle errors during collection upsert", async () => {
      // Arrange
      vi.spyOn(db, "insertInto").mockImplementation(() => {
        throw new Error("Database error");
      });

      // Act & Assert
      await expect(collectionService.upsertCollections([])).rejects.toThrow(
        "Database error",
      );
    });
  });

  describe("getCollectionAdmins", () => {
    it("should return admins for a collection", async () => {
      // Arrange
      const mockCollection = generateMockCollection();
      const [collection] = await db
        .insertInto("collections")
        .values({
          name: mockCollection.name,
          description: mockCollection.description,
          chain_ids: mockCollection.chain_ids.map(Number),
          hidden: mockCollection.hidden,
          created_at: mockCollection.created_at,
        })
        .returning("id")
        .execute();

      const admin = mockCollection.admins[0];
      await db
        .insertInto("users")
        .values({
          id: admin.id,
          address: admin.address,
          chain_id: admin.chain_id,
        })
        .execute();

      await db
        .insertInto("collection_admins")
        .values({
          collection_id: collection.id,
          user_id: admin.id,
        })
        .execute();

      // Act
      const result = await collectionService.getCollectionAdmins(collection.id);

      // Assert
      expect(result).toHaveLength(1);
      expect(result[0].address).toBe(admin.address);
      expect(result[0].chain_id).toBe(admin.chain_id);
    });
  });

  describe("addBlueprintsToCollection", () => {
    it("should add blueprints to a collection", async () => {
      // Arrange
      const mockCollection = generateMockCollection();
      const [collection] = await db
        .insertInto("collections")
        .values({
          name: mockCollection.name,
          description: mockCollection.description,
          chain_ids: mockCollection.chain_ids.map(Number),
          hidden: mockCollection.hidden,
          created_at: mockCollection.created_at,
        })
        .returning("id")
        .execute();

      const blueprint = mockCollection.blueprints[0];
      await db
        .insertInto("blueprints")
        .values({
          id: blueprint.id,
          form_values: blueprint.form_values,
          minter_address: blueprint.minter_address,
          minted: blueprint.minted,
          hypercert_ids: blueprint.hypercert_ids,
        })
        .execute();

      // Act
      await collectionService.addBlueprintsToCollection([
        {
          collection_id: collection.id,
          blueprint_id: blueprint.id,
        },
      ]);

      // Assert
      const blueprintResult = await db
        .selectFrom("collection_blueprints")
        .where("collection_id", "=", collection.id)
        .selectAll()
        .execute();
      expect(blueprintResult).toHaveLength(1);
      expect(blueprintResult[0].blueprint_id).toBe(blueprint.id);
    });

    it("should handle errors when adding blueprints", async () => {
      // Arrange
      vi.spyOn(db, "insertInto").mockImplementation(() => {
        throw new Error("Database error");
      });

      // Act & Assert
      await expect(
        collectionService.addBlueprintsToCollection([
          {
            collection_id: "test-id",
            blueprint_id: 1,
          },
        ]),
      ).rejects.toThrow("Database error");
    });
  });

  describe("getCollectionBlueprints", () => {
    it("should return blueprints for a collection", async () => {
      // Arrange
      const mockCollection = generateMockCollection();
      const [collection] = await db
        .insertInto("collections")
        .values({
          name: mockCollection.name,
          description: mockCollection.description,
          chain_ids: mockCollection.chain_ids.map(Number),
          hidden: mockCollection.hidden,
          created_at: mockCollection.created_at,
        })
        .returning("id")
        .execute();

      const blueprint = mockCollection.blueprints[0];
      await db
        .insertInto("blueprints")
        .values({
          id: blueprint.id,
          form_values: blueprint.form_values,
          minter_address: blueprint.minter_address,
          minted: blueprint.minted,
          hypercert_ids: blueprint.hypercert_ids,
        })
        .execute();

      await db
        .insertInto("collection_blueprints")
        .values({
          collection_id: collection.id,
          blueprint_id: blueprint.id,
        })
        .execute();

      (mockBlueprintsService.getBlueprints as Mock).mockResolvedValue({
        data: [blueprint],
        count: 1,
      });

      // Act
      const result = await collectionService.getCollectionBlueprints(
        collection.id,
      );

      // Assert
      expect(result.data).toHaveLength(1);
      expect(result.data[0]).toBe(blueprint);
      expect(mockBlueprintsService.getBlueprints).toHaveBeenCalledWith({
        where: { id: { in: [blueprint.id] } },
      });
    });
  });

  describe("getCollectionHypercerts", () => {
    it("should return hypercerts for a collection", async () => {
      // Arrange
      const mockCollection = generateMockCollection();
      const [collection] = await db
        .insertInto("collections")
        .values({
          name: mockCollection.name,
          description: mockCollection.description,
          chain_ids: mockCollection.chain_ids.map(Number),
          hidden: mockCollection.hidden,
          created_at: mockCollection.created_at,
        })
        .returning("id")
        .execute();

      (mockHypercertsService.getHypercerts as Mock).mockResolvedValue({
        data: [],
        count: 0,
      });

      // Act
      const result = await collectionService.getCollectionHypercerts(
        collection.id,
      );

      // Assert
      expect(result.data).toHaveLength(0);
      expect(mockHypercertsService.getHypercerts).toHaveBeenCalled();
    });
  });
});
