import { faker } from "@faker-js/faker";
import { Kysely } from "kysely";
import { container } from "tsyringe";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  CachingKyselyService,
  DataKyselyService,
} from "../../../../src/client/kysely.js";
import { GetHyperboardsArgs } from "../../../../src/graphql/schemas/args/hyperboardArgs.js";
import { BlueprintsService } from "../../../../src/services/database/entities/BlueprintsEntityService.js";
import { CollectionService } from "../../../../src/services/database/entities/CollectionEntityService.js";
import { HyperboardService } from "../../../../src/services/database/entities/HyperboardEntityService.js";
import { HypercertsService } from "../../../../src/services/database/entities/HypercertsEntityService.js";
import { UsersService } from "../../../../src/services/database/entities/UsersEntityService.js";
import { CachingDatabase } from "../../../../src/types/kyselySupabaseCaching.js";
import type { DataDatabase } from "../../../../src/types/kyselySupabaseData.js";
import {
  checkSimilarity,
  createTestCachingDatabase,
  createTestDataDatabase,
  generateMockAddress,
  generateMockCollection,
  generateMockHyperboard,
  generateMockUser,
} from "../../../utils/testUtils.js";

const mockDataDb = vi.fn();
const mockCachingDb = vi.fn();

vi.mock("../../../../src/client/kysely.js", () => ({
  get CachingKyselyService() {
    return class MockCachingKyselyService {
      getConnection() {
        return mockCachingDb();
      }
      get db() {
        return mockCachingDb();
      }
    };
  },
  get DataKyselyService() {
    return class MockDataKyselyService {
      getConnection() {
        return mockDataDb();
      }
      get db() {
        return mockDataDb();
      }
    };
  },
  get kyselyCaching() {
    return mockCachingDb();
  },
  get kyselyData() {
    return mockDataDb();
  },
}));

describe("HyperboardService", () => {
  let hyperboardService: HyperboardService;
  let dataDb: Kysely<DataDatabase>;
  let cachingDb: Kysely<CachingDatabase>;
  let blueprintsService: BlueprintsService;
  let hypercertsService: HypercertsService;
  let usersService: UsersService;
  let collectionService: CollectionService;

  beforeEach(async () => {
    vi.clearAllMocks();

    ({ db: dataDb } = await createTestDataDatabase());
    ({ db: cachingDb } = await createTestCachingDatabase());

    mockDataDb.mockReturnValue(dataDb);
    mockCachingDb.mockReturnValue(cachingDb);

    // Create mock services
    hypercertsService = new HypercertsService(
      container.resolve(CachingKyselyService),
    );
    usersService = new UsersService(container.resolve(DataKyselyService));
    blueprintsService = new BlueprintsService(
      container.resolve(DataKyselyService),
      usersService,
    );
    collectionService = new CollectionService(
      hypercertsService,
      container.resolve(DataKyselyService),
      blueprintsService,
      usersService,
    );

    hyperboardService = new HyperboardService(
      container.resolve(DataKyselyService),
      collectionService,
      usersService,
    );
  });

  describe("getHyperboards", () => {
    it.skip("should return hyperboards with correct data", async () => {
      // TODO: Reenable this test when pg-mem supports views
      // Arrange
      const mockHyperboard = generateMockHyperboard();

      const [hyperboard] = await dataDb
        .insertInto("hyperboards")
        .values({
          id: mockHyperboard.id,
          name: mockHyperboard.name,
          chain_ids: mockHyperboard.chain_ids.map((id) => Number(id)),
          background_image: mockHyperboard.background_image,
          grayscale_images: mockHyperboard.grayscale_images,
          tile_border_color: mockHyperboard.tile_border_color,
        })
        .returningAll()
        .execute();

      const args: GetHyperboardsArgs = {
        where: {
          id: { eq: hyperboard.id },
        },
      };

      // Act
      const result = await hyperboardService.getHyperboards(args);

      // Assert
      expect(result.count).toBe(1);
      expect(result.data).toHaveLength(1);
      expect(result.data[0]).not.toBeNull();
      expect(result.data[0].id).toBe(hyperboard.id);
      expect(result.data[0].name).toBe(mockHyperboard.name);
      expect(result.data[0].chain_ids.map(BigInt)).toEqual(
        mockHyperboard.chain_ids,
      );
      expect(result.data[0].background_image).toBe(
        mockHyperboard.background_image,
      );
      expect(result.data[0].grayscale_images).toBe(
        mockHyperboard.grayscale_images,
      );
      expect(result.data[0].tile_border_color).toBe(
        mockHyperboard.tile_border_color,
      );
    });

    it.skip("should handle empty result set", async () => {
      // TODO: Reenable this test when pg-mem supports views
      // Arrange
      const args: GetHyperboardsArgs = {};

      // Act
      const result = await hyperboardService.getHyperboards(args);

      // Assert
      expect(result.count).toBe(0);
      expect(result.data).toHaveLength(0);
    });

    it("should handle errors from entityService.getMany", async () => {
      // Arrange
      vi.spyOn(dataDb, "selectFrom").mockImplementation(() => {
        throw new Error("Database error");
      });

      // Act & Assert
      await expect(hyperboardService.getHyperboards({})).rejects.toThrow(
        "Database error",
      );
    });
  });

  describe("getHyperboardCollections", () => {
    it("should fetch collections for a hyperboard", async () => {
      // Arrange
      const mockHyperboard = generateMockHyperboard();
      const mockCollection = generateMockCollection();

      // Insert the hyperboard
      const [hyperboard] = await dataDb
        .insertInto("hyperboards")
        .values({
          id: mockHyperboard.id,
          name: mockHyperboard.name,
          chain_ids: mockHyperboard.chain_ids.map((id) => Number(id)),
        })
        .returningAll()
        .execute();

      // Insert the collection first
      await dataDb
        .insertInto("collections")
        .values({
          id: mockCollection.id,
          name: mockCollection.name,
          description: mockCollection.description,
          chain_ids: mockCollection.chain_ids.map((id) => Number(id)),
          hidden: mockCollection.hidden,
          created_at: mockCollection.created_at,
        })
        .execute();

      // Then create the relationship
      await dataDb
        .insertInto("hyperboard_collections")
        .values({
          hyperboard_id: hyperboard.id,
          collection_id: mockCollection.id,
        })
        .execute();

      // Act
      const result = await hyperboardService.getHyperboardCollections(
        hyperboard.id,
      );

      // Assert

      result.data.map((collection) =>
        checkSimilarity(collection, mockCollection),
      );
    });

    it("should handle errors when fetching collections", async () => {
      // Arrange
      const error = new Error("Fetching collections failed");
      vi.spyOn(collectionService, "getCollections").mockImplementation(() =>
        Promise.reject(error),
      );

      // Act & Assert
      await expect(
        hyperboardService.getHyperboardCollections(faker.string.uuid()),
      ).rejects.toThrow("Fetching collections failed");
    });
  });

  describe("getHyperboardAdmins", () => {
    it("should fetch admin users for a hyperboard", async () => {
      // Arrange
      const mockHyperboard = generateMockHyperboard();
      const mockUser = generateMockUser();

      // First create the hyperboard
      const [hyperboard] = await dataDb
        .insertInto("hyperboards")
        .values({
          id: mockHyperboard.id,
          name: mockHyperboard.name,
          chain_ids: mockHyperboard.chain_ids.map((id) => Number(id)),
        })
        .returningAll()
        .execute();

      // Create the user first
      const [user] = await dataDb
        .insertInto("users")
        .values({
          id: mockUser.id,
          address: mockUser.address,
          chain_id: mockUser.chain_id,
          display_name: mockUser.display_name,
          avatar: mockUser.avatar,
          created_at: new Date().toISOString(),
        })
        .returningAll()
        .execute();

      // Then create the admin relationship
      await dataDb
        .insertInto("hyperboard_admins")
        .values({
          hyperboard_id: hyperboard.id,
          user_id: user.id,
        })
        .execute();

      vi.spyOn(usersService, "getUsers").mockImplementation(() =>
        Promise.resolve({
          data: [user],
          count: 1,
        }),
      );

      // Act
      const result = await hyperboardService.getHyperboardAdmins(hyperboard.id);

      // Assert
      expect(usersService.getUsers).toHaveBeenCalledWith({
        where: {
          id: {
            in: [user.id],
          },
        },
      });
      expect(result).toEqual({ data: [user], count: 1 });
    });

    it("should handle errors when fetching admins", async () => {
      // Arrange
      const error = new Error("Failed to get hyperboard admins");
      vi.spyOn(usersService, "getUsers").mockImplementation(() =>
        Promise.reject(error),
      );

      // Act & Assert
      await expect(
        hyperboardService.getHyperboardAdmins(faker.string.uuid()),
      ).rejects.toThrow("Failed to get hyperboard admins");
    });
  });

  describe("addAdminToHyperboard", () => {
    it("should add an admin to a hyperboard", async () => {
      // Arrange
      const mockHyperboard = generateMockHyperboard();
      const mockUser = generateMockUser();

      // First create the hyperboard
      const [hyperboard] = await dataDb
        .insertInto("hyperboards")
        .values({
          id: mockHyperboard.id,
          name: mockHyperboard.name,
          chain_ids: mockHyperboard.chain_ids.map((id) => Number(id)),
        })
        .returningAll()
        .execute();

      // Create the user first
      const [user] = await dataDb
        .insertInto("users")
        .values({
          id: mockUser.id,
          address: mockUser.address,
          chain_id: mockUser.chain_id,
          display_name: mockUser.display_name,
          avatar: mockUser.avatar,
          created_at: new Date().toISOString(),
        })
        .returningAll()
        .execute();

      vi.spyOn(usersService, "getOrCreateUser").mockImplementation(() =>
        Promise.resolve(user),
      );

      // Act
      const result = await hyperboardService.addAdminToHyperboard(
        hyperboard.id,
        {
          address: mockUser.address,
          chain_id: mockUser.chain_id,
        },
      );

      // Assert
      expect(usersService.getOrCreateUser).toHaveBeenCalledWith({
        address: mockUser.address,
        chain_id: mockUser.chain_id,
      });
      expect(result).toMatchObject({
        hyperboard_id: hyperboard.id,
        user_id: user.id,
      });
    });

    it("should handle errors when adding an admin", async () => {
      // Arrange
      const error = new Error("Failed to add admin to hyperboard");
      vi.spyOn(usersService, "getOrCreateUser").mockImplementation(() =>
        Promise.reject(error),
      );

      // Act & Assert
      await expect(
        hyperboardService.addAdminToHyperboard("test-id", {
          address: generateMockAddress(),
          chain_id: faker.number.int({ min: 1, max: 100000 }),
        }),
      ).rejects.toThrow("Failed to add admin to hyperboard");
    });
  });
});
