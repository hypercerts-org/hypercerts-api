import { sql } from "kysely";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { applyWhere } from "../../../../src/lib/db/queryModifiers/applyWhere.js";
import { FilterValue } from "../../../../src/lib/graphql/buildWhereCondition.js";

// Mock the buildWhereCondition function
vi.mock("../../../../src/lib/graphql/buildWhereCondition.js", () => ({
  buildWhereCondition: vi.fn(),
  FilterValue: {},
}));

// Import the mocked module
import { buildWhereCondition } from "../../../../src/lib/graphql/buildWhereCondition.js";

describe("applyWhere", () => {
  const mockQuery = {
    where: vi.fn().mockReturnThis(),
  };

  // Reset mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();

    // Default implementation for buildWhereCondition
    vi.mocked(buildWhereCondition).mockImplementation((tableName, where) => {
      // Simple mock implementation that returns a SQL condition for testing
      const column = Object.keys(where)[0];
      return sql`${sql.raw(`"${tableName}"."${column}"`)} = 'test'`;
    });
  });

  it("should return the original query if where is not provided", () => {
    const args = { first: 10, offset: 0 };
    const result = applyWhere<any, any, any>(
      "test_table" as any,
      mockQuery as any,
      args,
    );

    expect(result).toBe(mockQuery);
    expect(mockQuery.where).not.toHaveBeenCalled();
  });

  it("should apply where conditions for each property in the where object", () => {
    const args = {
      first: 10,
      offset: 0,
      where: {
        name: { eq: "test" } as FilterValue,
        age: { gt: 18 } as FilterValue,
      },
    };

    const result = applyWhere<any, any, any>(
      "test_table" as any,
      mockQuery as any,
      args,
    );

    expect(result).toBe(mockQuery);
    expect(mockQuery.where).toHaveBeenCalledTimes(2);
  });

  it("should skip properties that don't generate a valid condition", () => {
    // Mock buildWhereCondition to return undefined for the first call
    vi.mocked(buildWhereCondition).mockImplementationOnce(() => undefined);

    const args = {
      first: 10,
      offset: 0,
      where: {
        invalid: { eq: "test" } as FilterValue,
        valid: { eq: "test" } as FilterValue,
      },
    };

    const result = applyWhere<any, any, any>(
      "test_table" as any,
      mockQuery as any,
      args,
    );

    expect(result).toBe(mockQuery);
    expect(mockQuery.where).toHaveBeenCalledTimes(1);
  });
});
