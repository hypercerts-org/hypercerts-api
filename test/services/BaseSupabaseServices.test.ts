import { Kysely } from "kysely";
import { describe, expect, it, vi } from "vitest";
import type { BaseArgs } from "../../src/graphql/schemas/args/baseArgs";
import { SortOrder } from "../../src/graphql/schemas/enums/sortEnums";
import { BaseSupabaseService } from "../../src/services/BaseSupabaseService";
import { QueryStrategyFactory } from "../../src/services/database/QueryBuilder";
import { DataDatabase } from "../../src/types/kyselySupabaseData";

// Mock implementation of BaseSupabaseService for testing
class TestService extends BaseSupabaseService<DataDatabase> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(db: Kysely<DataDatabase>) {
    super(db);
  }

  // Expose protected methods for testing
  public testGetData<T extends keyof DataDatabase>(
    tableName: T,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    args: BaseArgs<any>,
  ) {
    return this.getDataQuery(tableName, args);
  }

  public testGetCount<T extends keyof DataDatabase>(
    tableName: T,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    args: BaseArgs<any>,
  ) {
    return this.getCountQuery(tableName, args);
  }
}

describe("BaseSupabaseService", () => {
  const mockDb = {
    selectFrom: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    orderBy: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    offset: vi.fn().mockReturnThis(),
  } as unknown as Kysely<DataDatabase>;

  const mockStrategy = {
    buildDataQuery: vi.fn().mockReturnThis(),
    buildCountQuery: vi.fn().mockReturnThis(),
  };

  vi.spyOn(QueryStrategyFactory, "getStrategy").mockReturnValue(mockStrategy);

  const service = new TestService(mockDb);

  it("should handle getData with basic args", () => {
    const args = {};
    service.testGetData("marketplace_orders", args);

    expect(QueryStrategyFactory.getStrategy).toHaveBeenCalledWith(
      "marketplace_orders",
    );
    expect(mockStrategy.buildDataQuery).toHaveBeenCalledWith(mockDb, args);
  });

  it("should handle getData with where conditions", () => {
    const args = {
      where: { id: { equals: 1 } },
    };
    service.testGetData("marketplace_orders", args);

    expect(mockStrategy.buildDataQuery).toHaveBeenCalledWith(mockDb, args);
  });

  it("should handle getData with sorting", () => {
    const args = {
      sort: { by: { createdAt: SortOrder.ascending } },
    };
    service.testGetData("marketplace_orders", args);

    expect(mockStrategy.buildDataQuery).toHaveBeenCalledWith(mockDb, args);
  });

  it("should handle getData with pagination", () => {
    const args = {
      first: 10,
      offset: 20,
    };
    service.testGetData("marketplace_orders", args);

    expect(mockStrategy.buildDataQuery).toHaveBeenCalledWith(mockDb, args);
  });

  it("should handle getCount with basic args", () => {
    const args = {};
    service.testGetCount("marketplace_orders", args);

    expect(QueryStrategyFactory.getStrategy).toHaveBeenCalledWith(
      "marketplace_orders",
    );
    expect(mockStrategy.buildCountQuery).toHaveBeenCalledWith(mockDb, args);
  });

  it("should handle getCount with where conditions", () => {
    const args = {
      where: { id: { equals: 1 } },
    };
    service.testGetCount("marketplace_orders", args);

    expect(mockStrategy.buildCountQuery).toHaveBeenCalledWith(mockDb, args);
  });

  it("should throw error for invalid table name", () => {
    vi.spyOn(QueryStrategyFactory, "getStrategy").mockImplementationOnce(() => {
      throw new Error("No strategy found for table invalid_table");
    });

    const args = {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(() => service.testGetData("invalid_table" as any, args)).toThrow(
      "No strategy found for table invalid_table",
    );
  });
});
