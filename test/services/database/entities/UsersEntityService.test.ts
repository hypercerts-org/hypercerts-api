import { Kysely } from "kysely";
import { container } from "tsyringe";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { DataKyselyService } from "../../../../src/client/kysely.js";
import { GetUsersArgs } from "../../../../src/graphql/schemas/args/userArgs.js";
import { UsersService } from "../../../../src/services/database/entities/UsersEntityService.js";
import type { DataDatabase } from "../../../../src/types/kyselySupabaseData.js";
import {
  createTestDataDatabase,
  generateMockAddress,
  generateMockUser,
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

describe("UsersService", () => {
  let usersService: UsersService;
  let db: Kysely<DataDatabase>;

  beforeEach(async () => {
    vi.clearAllMocks();

    ({ db } = await createTestDataDatabase());

    mockDb.mockReturnValue(db);

    usersService = new UsersService(container.resolve(DataKyselyService));
  });

  describe("getUsers", () => {
    it("should return users with correct data", async () => {
      // Arrange
      const mockUser = generateMockUser();
      await db.insertInto("users").values(mockUser).execute();

      const args: GetUsersArgs = {
        where: {
          address: { eq: mockUser.address },
        },
      };

      // Act
      const result = await usersService.getUsers(args);

      // Assert
      expect(result.count).toBe(1);
      expect(result.data).toHaveLength(1);
      expect(result.data[0].address).toBe(mockUser.address);
      expect(result.data[0].chain_id).toBe(mockUser.chain_id);
      expect(result.data[0].display_name).toBe(mockUser.display_name);
      expect(result.data[0].avatar).toBe(mockUser.avatar);
    });

    it("should handle empty result set", async () => {
      // Arrange
      const args: GetUsersArgs = {};

      // Act
      const result = await usersService.getUsers(args);

      // Assert
      expect(result.count).toBe(0);
      expect(result.data).toHaveLength(0);
    });
  });

  describe("getUser", () => {
    it("should return a single user", async () => {
      // Arrange
      const mockUser = generateMockUser();
      await db.insertInto("users").values(mockUser).execute();

      const args: GetUsersArgs = {
        where: {
          address: { eq: mockUser.address },
        },
      };

      // Act
      const result = await usersService.getUser(args);

      // Assert
      expect(result).toBeDefined();
      expect(result?.address).toBe(mockUser.address);
      expect(result?.chain_id).toBe(mockUser.chain_id);
      expect(result?.display_name).toBe(mockUser.display_name);
      expect(result?.avatar).toBe(mockUser.avatar);
    });

    it("should return undefined when user not found", async () => {
      // Arrange
      const args: GetUsersArgs = {
        where: { address: { eq: generateMockAddress() } },
      };

      // Act
      const result = await usersService.getUser(args);

      // Assert
      expect(result).toBeUndefined();
    });
  });

  describe("getOrCreateUser", () => {
    it("should return existing user if found", async () => {
      // Arrange
      const mockUser = generateMockUser();
      await db.insertInto("users").values(mockUser).execute();

      // Act
      const result = await usersService.getOrCreateUser(mockUser);

      // Assert
      expect(result).toBeDefined();
      expect(result.address).toBe(mockUser.address);
      expect(result.chain_id).toBe(mockUser.chain_id);
      expect(result.display_name).toBe(mockUser.display_name);
      expect(result.avatar).toBe(mockUser.avatar);
    });

    it("should create new user if not found", async () => {
      // Arrange
      const mockUser = generateMockUser();

      // Act
      const result = await usersService.getOrCreateUser(mockUser);

      // Assert
      expect(result).toBeDefined();
      expect(result.address).toBe(mockUser.address);
      expect(result.chain_id).toBe(mockUser.chain_id);
      expect(result.display_name).toBe(mockUser.display_name);
      expect(result.avatar).toBe(mockUser.avatar);
    });
  });

  describe("upsertUsers", () => {
    it("should create or update users", async () => {
      // Arrange
      const mockUser = generateMockUser();

      // Act - First create
      const created = await usersService.upsertUsers([mockUser]);

      // Assert - Created
      expect(created).toHaveLength(1);
      expect(created[0].address).toBe(mockUser.address);
      expect(created[0].display_name).toBe(mockUser.display_name);

      // Act - Then update
      const updated = await usersService.upsertUsers([
        {
          ...mockUser,
          display_name: "Updated Name",
          avatar: "updated-avatar",
        },
      ]);

      // Assert - Updated
      expect(updated).toHaveLength(1);
      expect(updated[0].address).toBe(mockUser.address);
      expect(updated[0].display_name).toBe("Updated Name");
      expect(updated[0].avatar).toBe("updated-avatar");
    });

    it("should handle multiple users", async () => {
      // Arrange
      const mockUsers = [generateMockUser(), generateMockUser()];

      // Act - Insert users one at a time
      const results = [];
      for (const user of mockUsers) {
        const [result] = await usersService.upsertUsers([user]);
        results.push(result);
      }

      // Assert
      expect(results).toHaveLength(2);
      expect(results[0].display_name).toBe(mockUsers[0].display_name);
      expect(results[1].display_name).toBe(mockUsers[1].display_name);
      expect(results[0].chain_id).toBe(mockUsers[0].chain_id);
      expect(results[1].chain_id).toBe(mockUsers[1].chain_id);
    });
  });
});
