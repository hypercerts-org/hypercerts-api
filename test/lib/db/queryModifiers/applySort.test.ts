import { beforeEach, describe, expect, it, vi } from "vitest";
import { SortOrder } from "../../../../src/graphql/schemas/enums/sortEnums.js";
import { applySort } from "../../../../src/lib/db/queryModifiers/applySort.js";

describe("applySort", () => {
  // Create a mock query with orderBy method
  const mockQuery = {
    orderBy: vi.fn().mockReturnThis(),
  };

  // Reset mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset console.debug to avoid polluting test output
    vi.spyOn(console, "debug").mockImplementation(() => {});
  });

  it("should return the original query if sortBy is not provided", () => {
    const args = { first: 10, offset: 0 };
    const result = applySort(mockQuery as any, args);

    expect(result).toBe(mockQuery);
    expect(mockQuery.orderBy).not.toHaveBeenCalled();
    expect(console.debug).toHaveBeenCalledWith("No sort arguments provided");
  });

  it("should return the original query if sortBy has no non-null values", () => {
    const args = {
      first: 10,
      offset: 0,
      sortBy: {
        name: null,
        age: undefined,
      },
    };

    const result = applySort(mockQuery as any, args);

    expect(result).toBe(mockQuery);
    expect(mockQuery.orderBy).not.toHaveBeenCalled();
    expect(console.debug).toHaveBeenCalledWith("No non-null sort fields found");
  });

  it("should apply orderBy for each non-null sort field with ascending order", () => {
    const args = {
      first: 10,
      offset: 0,
      sortBy: {
        name: SortOrder.ascending,
        age: SortOrder.ascending,
      },
    };

    const result = applySort(mockQuery as any, args);

    expect(result).toBe(mockQuery);
    expect(mockQuery.orderBy).toHaveBeenCalledTimes(2);
    expect(mockQuery.orderBy).toHaveBeenCalledWith("name", "asc");
    expect(mockQuery.orderBy).toHaveBeenCalledWith("age", "asc");
  });

  it("should apply orderBy for each non-null sort field with descending order", () => {
    const args = {
      first: 10,
      offset: 0,
      sortBy: {
        name: SortOrder.descending,
        age: SortOrder.descending,
      },
    };

    const result = applySort(mockQuery as any, args);

    expect(result).toBe(mockQuery);
    expect(mockQuery.orderBy).toHaveBeenCalledTimes(2);
    expect(mockQuery.orderBy).toHaveBeenCalledWith("name", "desc");
    expect(mockQuery.orderBy).toHaveBeenCalledWith("age", "desc");
  });

  it("should handle mixed sort directions", () => {
    const args = {
      first: 10,
      offset: 0,
      sortBy: {
        name: SortOrder.ascending,
        age: SortOrder.descending,
        created_at: null, // Should be ignored
      },
    };

    const result = applySort(mockQuery as any, args);

    expect(result).toBe(mockQuery);
    expect(mockQuery.orderBy).toHaveBeenCalledTimes(2);
    expect(mockQuery.orderBy).toHaveBeenCalledWith("name", "asc");
    expect(mockQuery.orderBy).toHaveBeenCalledWith("age", "desc");
  });

  it("should silently ignore errors when applying orderBy", () => {
    // Mock orderBy to throw an error on the second call
    mockQuery.orderBy
      .mockImplementationOnce(() => mockQuery)
      .mockImplementationOnce(() => {
        throw new Error("Invalid field");
      });

    const args = {
      first: 10,
      offset: 0,
      sortBy: {
        name: SortOrder.ascending,
        invalid_field: SortOrder.descending,
      },
    };

    // This should not throw an error
    const result = applySort(mockQuery as any, args);

    expect(result).toBe(mockQuery);
    expect(mockQuery.orderBy).toHaveBeenCalledTimes(2);
  });
});
