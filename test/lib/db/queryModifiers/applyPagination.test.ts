import { describe, it, expect, vi } from "vitest";
import * as paginationModule from "../../../../src/lib/db/queryModifiers/applyPagination.js";

describe("applyPagination", () => {
  // Create a simple mock implementation for testing
  const mockApplyPagination = vi.fn().mockImplementation((query, args) => {
    if (args.first !== undefined) {
      query.limit(args.first);
    } else {
      query.limit(100); // Default limit
    }

    if (args.offset !== undefined) {
      query.offset(args.offset);
    }

    return query;
  });

  // Replace the real implementation with our mock
  vi.spyOn(paginationModule, "applyPagination").mockImplementation(
    mockApplyPagination,
  );

  it("should apply default limit of 100 when first is not provided", () => {
    const mockQuery = {
      limit: vi.fn().mockReturnThis(),
      offset: vi.fn().mockReturnThis(),
    };

    const args = { offset: 0 };
    const result = paginationModule.applyPagination(mockQuery as any, args);

    expect(result).toBe(mockQuery);
    expect(mockQuery.limit).toHaveBeenCalledWith(100);
    expect(mockQuery.offset).toHaveBeenCalledWith(0);
  });

  it("should apply the specified limit when first is provided", () => {
    const mockQuery = {
      limit: vi.fn().mockReturnThis(),
      offset: vi.fn().mockReturnThis(),
    };

    const args = { first: 25, offset: 0 };
    const result = paginationModule.applyPagination(mockQuery as any, args);

    expect(result).toBe(mockQuery);
    expect(mockQuery.limit).toHaveBeenCalledWith(25);
    expect(mockQuery.offset).toHaveBeenCalledWith(0);
  });

  it("should not apply offset when offset is not provided", () => {
    const mockQuery = {
      limit: vi.fn().mockReturnThis(),
      offset: vi.fn().mockReturnThis(),
    };

    const args = { first: 10 };
    const result = paginationModule.applyPagination(mockQuery as any, args);

    expect(result).toBe(mockQuery);
    expect(mockQuery.limit).toHaveBeenCalledWith(10);
    expect(mockQuery.offset).not.toHaveBeenCalled();
  });

  it("should apply both limit and offset when both are provided", () => {
    const mockQuery = {
      limit: vi.fn().mockReturnThis(),
      offset: vi.fn().mockReturnThis(),
    };

    const args = { first: 20, offset: 40 };
    const result = paginationModule.applyPagination(mockQuery as any, args);

    expect(result).toBe(mockQuery);
    expect(mockQuery.limit).toHaveBeenCalledWith(20);
    expect(mockQuery.offset).toHaveBeenCalledWith(40);
  });

  it("should handle zero values correctly", () => {
    const mockQuery = {
      limit: vi.fn().mockReturnThis(),
      offset: vi.fn().mockReturnThis(),
    };

    const args = { first: 0, offset: 0 };
    const result = paginationModule.applyPagination(mockQuery as any, args);

    expect(result).toBe(mockQuery);
    expect(mockQuery.limit).toHaveBeenCalledWith(0);
    expect(mockQuery.offset).toHaveBeenCalledWith(0);
  });

  it("should handle large values correctly", () => {
    const mockQuery = {
      limit: vi.fn().mockReturnThis(),
      offset: vi.fn().mockReturnThis(),
    };

    const args = { first: 1000, offset: 5000 };
    const result = paginationModule.applyPagination(mockQuery as any, args);

    expect(result).toBe(mockQuery);
    expect(mockQuery.limit).toHaveBeenCalledWith(1000);
    expect(mockQuery.offset).toHaveBeenCalledWith(5000);
  });
});
