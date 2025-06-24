import { faker } from "@faker-js/faker";
import { Kysely } from "kysely";
import { container } from "tsyringe";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { DataKyselyService } from "../../../../src/client/kysely.js";
import { GetBlueprintsArgs } from "../../../../src/graphql/schemas/args/blueprintArgs.js";
import { BlueprintsService } from "../../../../src/services/database/entities/BlueprintsEntityService.js";
import { UsersService } from "../../../../src/services/database/entities/UsersEntityService.js";
import type { DataDatabase } from "../../../../src/types/kyselySupabaseData.js";
import {
  createTestDataDatabase,
  generateHypercertId,
  generateMockAddress,
  generateMockBlueprint,
  generateMockCollection,
  generateMockUser,
} from "../../../utils/testUtils.js";

const mockDb = vi.fn();

//TODO introduce this in-memory kysely service in the test utils and other tests
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

describe("BlueprintsService", () => {
  let blueprintsService: BlueprintsService;
  let usersService: UsersService;
  let db: Kysely<DataDatabase>;

  beforeEach(async () => {
    vi.clearAllMocks();

    ({ db } = await createTestDataDatabase());

    mockDb.mockReturnValue(db);

    usersService = new UsersService(container.resolve(DataKyselyService));

    blueprintsService = new BlueprintsService(
      container.resolve(DataKyselyService),
      usersService,
    );
  });

  describe("getBlueprints", () => {
    it.skip("should return blueprints with correct data", async () => {
      // TODO: Reenable this test when pg-mem supports views
      // Arrange
      const mockBlueprint = generateMockBlueprint();
      await db.insertInto("blueprints").values(mockBlueprint).execute();
      const args: GetBlueprintsArgs = {
        where: {
          id: { eq: mockBlueprint.id },
        },
      };

      // Act
      const result = await blueprintsService.getBlueprints(args);

      // Assert
      expect(result.count).toBe(1);
      expect(result.data).toHaveLength(1);
      expect(result.data[0].id).toBe(mockBlueprint.id);
      expect(result.data[0].form_values).toEqual(mockBlueprint.form_values);
      expect(result.data[0].minter_address).toBe(mockBlueprint.minter_address);
      expect(result.data[0].minted).toBe(mockBlueprint.minted);
      expect(result.data[0].hypercert_ids).toEqual(mockBlueprint.hypercert_ids);
    });

    it("should handle empty result set", async () => {
      // TODO: Reenable this test when pg-mem supports views
      // Arrange
      const args: GetBlueprintsArgs = {};

      // Act
      const result = await blueprintsService.getBlueprints(args);

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
      await expect(blueprintsService.getBlueprints({})).rejects.toThrow(
        "Database error",
      );
    });
  });

  describe("getBlueprint", () => {
    it.skip("should return a single blueprint", async () => {
      // TODO: Reenable this test when pg-mem supports views
      const mockBlueprint = generateMockBlueprint();

      // Insert test data into pg-mem
      await db.insertInto("blueprints").values(mockBlueprint).execute();

      // Arrange
      const args: GetBlueprintsArgs = {
        where: {
          id: { eq: mockBlueprint.id },
        },
      };

      // Act
      const result = await blueprintsService.getBlueprint(args);

      // Assert
      expect(result).toBeDefined();
      expect(result?.id).toBe(mockBlueprint.id);
      expect(result?.form_values).toEqual(mockBlueprint.form_values);
      expect(result?.minter_address).toBe(mockBlueprint.minter_address);
      expect(result?.minted).toBe(mockBlueprint.minted);
      expect(result?.hypercert_ids).toEqual(mockBlueprint.hypercert_ids);
    });

    it.skip("should return undefined when blueprint not found", async () => {
      // TODO: Reenable this test when pg-mem supports views
      // Arrange
      const args: GetBlueprintsArgs = {
        where: { id: { eq: 999 } },
      };

      // Act
      const result = await blueprintsService.getBlueprint(args);

      // Assert
      expect(result).toBeUndefined();
    });
  });

  describe("getBlueprintAdmins", () => {
    it("should return blueprint admins", async () => {
      // Arrange
      const mockBlueprint = generateMockBlueprint();
      await db.insertInto("blueprints").values(mockBlueprint).execute();

      const mockUser = generateMockUser();
      await db.insertInto("users").values(mockUser).execute();

      await db
        .insertInto("blueprint_admins")
        .values({
          blueprint_id: mockBlueprint.id,
          user_id: mockUser.id,
          created_at: new Date().toISOString(),
        })
        .execute();

      // Act
      const result = await blueprintsService.getBlueprintAdmins(
        mockBlueprint.id,
      );

      // Assert
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(mockUser.id);
      expect(result[0].display_name).toBe(mockUser.display_name);
    });
  });

  describe("deleteBlueprint", () => {
    it("should delete a blueprint", async () => {
      // Arrange
      const mockBlueprint = generateMockBlueprint();
      await db.insertInto("blueprints").values(mockBlueprint).execute();

      // Act
      await blueprintsService.deleteBlueprint(mockBlueprint.id);

      // Assert
      const deletedBlueprint = await db
        .selectFrom("blueprints")
        .where("id", "=", mockBlueprint.id)
        .executeTakeFirst();
      expect(deletedBlueprint).toBeUndefined();
    });
  });

  describe("upsertBlueprints", () => {
    it("should create or update blueprints", async () => {
      // Arrange
      const mockBlueprint = generateMockBlueprint();
      const [insertedBlueprint] = await db
        .insertInto("blueprints")
        .values(mockBlueprint)
        .returning("id")
        .execute();

      const updatedBlueprint = {
        ...mockBlueprint,
        form_values: { ...mockBlueprint.form_values, name: "Updated Name" },
      };

      // Act
      const result = await blueprintsService.upsertBlueprints([
        updatedBlueprint,
      ]);

      // Assert
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(insertedBlueprint.id);

      const updatedRecord = await db
        .selectFrom("blueprints")
        .where("id", "=", insertedBlueprint.id)
        .selectAll()
        .executeTakeFirst();
      // casting because form_values is a jsonb column
      expect((updatedRecord?.form_values as { name: string }).name).toBe(
        "Updated Name",
      );
    });
  });

  describe("addAdminToBlueprint", () => {
    it("should add an admin to a blueprint", async () => {
      // Arrange
      const mockBlueprint = generateMockBlueprint();
      await db.insertInto("blueprints").values(mockBlueprint).execute();

      const adminAddress = generateMockAddress();
      const chainId = 1;

      // Act
      const result = await blueprintsService.addAdminToBlueprint(
        mockBlueprint.id,
        adminAddress,
        chainId,
      );

      // Assert
      expect(result).toBeDefined();
      expect(result?.blueprint_id).toBe(mockBlueprint.id);

      const adminUser = await db
        .selectFrom("users")
        .where("address", "=", adminAddress)
        .selectAll()
        .executeTakeFirst();
      expect(adminUser).toBeDefined();
      expect(adminUser?.chain_id).toBe(chainId);
    });
  });

  describe("mintBlueprintAndSwapInCollections", () => {
    it("should mint blueprint and update collections", async () => {
      // Arrange
      const mockBlueprint = generateMockBlueprint();
      await db.insertInto("blueprints").values(mockBlueprint).execute();

      const mockCollection = generateMockCollection();
      await db
        .insertInto("collections")
        .values({
          id: mockCollection.id,
          name: mockCollection.name,
          description: mockCollection.description,
          chain_ids: mockCollection.chain_ids.map((id) => Number(id)),
          hidden: mockCollection.hidden,
          created_at: new Date().toISOString(),
        })
        .execute();

      const hyperboardId = faker.string.uuid();
      const displaySize = 100;
      await db
        .insertInto("hyperboard_blueprint_metadata")
        .values({
          blueprint_id: mockBlueprint.id,
          hyperboard_id: hyperboardId,
          collection_id: mockCollection.id,
          display_size: displaySize,
          created_at: new Date().toISOString(),
        })
        .execute();

      await db
        .insertInto("collection_blueprints")
        .values({
          blueprint_id: mockBlueprint.id,
          collection_id: mockCollection.id,
          created_at: new Date().toISOString(),
        })
        .execute();

      const hypercertId = generateHypercertId();

      // Act
      // Note that we intercept the array_append query in the test utils
      // All other calls actually interact with the database
      await blueprintsService.mintBlueprintAndSwapInCollections(
        mockBlueprint.id,
        hypercertId,
      );

      // Assert
      const updatedBlueprint = await db
        .selectFrom("blueprints")
        .where("id", "=", mockBlueprint.id)
        .selectAll()
        .executeTakeFirst();

      console.log(updatedBlueprint);
      expect(updatedBlueprint?.minted).toBe(true);
      // expect(updatedBlueprint?.hypercert_ids).toContain(hypercertId);

      const hypercert = await db
        .selectFrom("hypercerts")
        .where("hypercert_id", "=", hypercertId)
        .where("collection_id", "=", mockCollection.id)
        .executeTakeFirst();
      expect(hypercert).toBeDefined();

      const hypercertMetadata = await db
        .selectFrom("hyperboard_hypercert_metadata")
        .where("hypercert_id", "=", hypercertId)
        .where("collection_id", "=", mockCollection.id)
        .where("hyperboard_id", "=", hyperboardId)
        .selectAll()
        .executeTakeFirst();
      expect(hypercertMetadata).toBeDefined();
      expect(hypercertMetadata?.display_size).toBe(displaySize);

      const collectionBlueprint = await db
        .selectFrom("collection_blueprints")
        .where("blueprint_id", "=", mockBlueprint.id)
        .selectAll()
        .executeTakeFirst();
      expect(collectionBlueprint).toBeUndefined();
    });
  });
});
