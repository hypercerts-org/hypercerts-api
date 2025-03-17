import { Kysely } from "kysely";
import { container } from "tsyringe";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { DataKyselyService } from "../../../../src/client/kysely.js";
import type { GetOrdersArgs } from "../../../../src/graphql/schemas/args/orderArgs.js";
import { MarketplaceOrdersService } from "../../../../src/services/database/entities/MarketplaceOrdersEntityService.js";
import type { DataDatabase } from "../../../../src/types/kyselySupabaseData.js";
import {
  createTestDataDatabase,
  generateMockOrder,
} from "../../../utils/testUtils.js";
import { faker } from "@faker-js/faker";

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

// Check similarity of mock and returned object. The createdAt field is a timestamp and will be different. Its value in seconds should be the same.
// Bigints and numbers are compared as strings.
const checkSimilarity = (obj1: any, obj2: any) => {
  const { createdAt: createdAt1, ...rest1 } = obj1;
  const { createdAt: createdAt2, ...rest2 } = obj2;

  for (const key in rest1) {
    if (typeof rest1[key] === "bigint" || typeof rest1[key] === "number") {
      expect(rest1[key].toString()).toEqual(rest2[key].toString());
    } else if (Array.isArray(rest1[key])) {
      for (let i = 0; i < rest1[key].length; i++) {
        checkSimilarity(rest1[key][i], rest2[key][i]);
      }
    } else {
      expect(rest1[key]).toEqual(rest2[key]);
    }
  }

  expect(new Date(createdAt1).getTime()).toEqual(
    new Date(createdAt2).getTime(),
  );
};

describe("MarketplaceOrdersService", () => {
  let service: MarketplaceOrdersService;
  let db: Kysely<DataDatabase>;
  let mockOrder: ReturnType<typeof generateMockOrder>;

  beforeEach(async () => {
    vi.clearAllMocks();

    // Setup test database
    ({ db } = await createTestDataDatabase());

    mockDb.mockReturnValue(db);
    service = new MarketplaceOrdersService(
      container.resolve(DataKyselyService),
    );
    mockOrder = generateMockOrder();
  });

  describe("getOrders", () => {
    it("should return all orders", async () => {
      // Arrange
      await db.insertInto("marketplace_orders").values(mockOrder).execute();

      // Act
      const result = await service.getOrders({});

      // Assert
      expect(result.data).toHaveLength(1);
      checkSimilarity(result.data[0], mockOrder);
    });

    it("should return empty array when no orders match criteria", async () => {
      // Arrange
      const args: GetOrdersArgs = {
        where: { id: { eq: faker.string.uuid() } },
      };

      // Act
      const result = await service.getOrders(args);

      // Assert
      expect(result.count).toBe(0);
      expect(result.data).toHaveLength(0);
    });

    it("should handle errors from database", async () => {
      // Arrange
      vi.spyOn(db, "selectFrom").mockImplementation(() => {
        throw new Error("Database error");
      });

      // Act & Assert
      await expect(service.getOrders({})).rejects.toThrow("Database error");
    });
  });

  describe("getOrder", () => {
    it("should return a specific order by ID", async () => {
      // Arrange
      await db.insertInto("marketplace_orders").values(mockOrder).execute();

      // Act
      const result = await service.getOrder({
        where: { id: { eq: mockOrder.id } },
      });

      // Assert
      checkSimilarity(result, mockOrder);
    });

    it("should return undefined if order not found", async () => {
      // Act
      const result = await service.getOrder({
        where: { id: { eq: faker.string.uuid() } },
      });

      // Assert
      expect(result).toBeUndefined();
    });
  });

  describe("storeOrder", () => {
    it("should store a new order", async () => {
      // Arrange
      await service.storeOrder(mockOrder);

      // Assert
      const storedOrder = await db
        .selectFrom("marketplace_orders")
        .selectAll()
        .where("id", "=", mockOrder.id)
        .executeTakeFirst();
      checkSimilarity(storedOrder, mockOrder);
    });
  });

  describe("updateOrder", () => {
    it("should update an existing order", async () => {
      // Arrange
      await db.insertInto("marketplace_orders").values(mockOrder).execute();

      const updatedOrder = {
        ...mockOrder,
        invalidated: true,
        validator_codes: [42],
      };

      // Act
      await service.updateOrder(updatedOrder);

      // Assert
      const storedOrder = await db
        .selectFrom("marketplace_orders")
        .selectAll()
        .where("id", "=", mockOrder.id)
        .executeTakeFirst();
      checkSimilarity(storedOrder, updatedOrder);
    });

    it("should throw error when updating order without ID", async () => {
      // Act & Assert
      await expect(service.updateOrder({ chainId: 1 })).rejects.toThrow(
        "Order ID is required",
      );
    });
  });

  describe("deleteOrder", () => {
    it("should delete an existing order", async () => {
      // Arrange
      await db.insertInto("marketplace_orders").values(mockOrder).execute();

      // Act
      await service.deleteOrder(mockOrder.id);

      // Assert
      const storedOrder = await db
        .selectFrom("marketplace_orders")
        .selectAll()
        .where("id", "=", mockOrder.id)
        .executeTakeFirst();
      expect(storedOrder).toBeUndefined();
    });
  });

  describe("updateOrders", () => {
    it("should update multiple orders", async () => {
      // Arrange
      const mockOrders = [generateMockOrder(), generateMockOrder()];
      await db.insertInto("marketplace_orders").values(mockOrders).execute();

      const updatedOrders = mockOrders.map((order) => ({
        ...order,
        invalidated: true,
        validator_codes: [42],
      }));

      // Act
      const result = await service.updateOrders(updatedOrders);

      // Assert
      expect(result).toHaveLength(2);
      result.forEach((stored, i) => {
        checkSimilarity(stored, updatedOrders[i]);
      });
    });
  });

  describe("nonce operations", () => {
    it("should create and retrieve a nonce", async () => {
      // Arrange
      const mockNonce = {
        address: mockOrder.signer,
        chain_id: Number(mockOrder.chainId),
        nonce_counter: 1,
      };

      // Act
      await service.createNonce(mockNonce);
      const result = await service.getNonce({
        address: mockNonce.address,
        chain_id: mockNonce.chain_id,
      });

      // Assert
      expect(result).toEqual(mockNonce);
    });

    it("should update a nonce", async () => {
      // Arrange
      const mockNonce = {
        address: mockOrder.signer,
        chain_id: Number(mockOrder.chainId),
        nonce_counter: 1,
      };
      await service.createNonce(mockNonce);

      // Act
      const updatedNonce = { ...mockNonce, nonce_counter: 2 };
      const result = await service.updateNonce(updatedNonce);

      // Assert
      expect(result.nonce_counter).toBe(2);
      checkSimilarity(result, updatedNonce);
    });

    it("should throw error when getting nonce without required fields", async () => {
      // Act & Assert
      await expect(
        service.getNonce({ address: "", chain_id: 0 }),
      ).rejects.toThrow("Address and chain ID are required");
    });
  });

  describe("batch operations", () => {
    it("should upsert multiple orders", async () => {
      // Arrange
      const orderData1 = mockOrder;
      const orderData2 = generateMockOrder();

      // Act
      const result = await service.upsertOrders([orderData1, orderData2]);

      // Assert
      expect(result).toHaveLength(2);
      checkSimilarity(result[0], orderData1);
      checkSimilarity(result[1], orderData2);
    });
  });
});
