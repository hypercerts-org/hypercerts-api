import { beforeEach, describe, expect, it, vi } from "vitest";
import { applyPagination } from "../../../../src/lib/db/queryModifiers/applyPagination.js";
import { applySort } from "../../../../src/lib/db/queryModifiers/applySort.js";
import { applyWhere } from "../../../../src/lib/db/queryModifiers/applyWhere.js";
import {
  composeQueryModifiers,
  createStandardQueryModifier,
  QueryModifier,
} from "../../../../src/lib/db/queryModifiers/queryModifiers.js";

// Mock the individual query modifiers
vi.mock("../../../../src/lib/db/queryModifiers/applyWhere.js", () => ({
  applyWhere: vi.fn((_tableName, query, _args) => {
    return { ...query, whereApplied: true };
  }),
}));

vi.mock("../../../../src/lib/db/queryModifiers/applySort.js", () => ({
  applySort: vi.fn((query, _args) => {
    return { ...query, sortApplied: true };
  }),
}));

vi.mock("../../../../src/lib/db/queryModifiers/applyPagination.js", () => ({
  applyPagination: vi.fn((query, _args) => {
    return { ...query, paginationApplied: true };
  }),
}));

describe("queryModifiers", () => {
  // Reset mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("composeQueryModifiers", () => {
    it("should compose multiple query modifiers into a single function", () => {
      // Create mock modifiers
      const modifier1: QueryModifier<any, any, any> = (query, _args) => {
        return { ...query, modifier1Applied: true };
      };

      const modifier2: QueryModifier<any, any, any> = (query, _args) => {
        return { ...query, modifier2Applied: true };
      };

      const composedModifier = composeQueryModifiers(modifier1, modifier2);

      // Test the composed modifier
      const mockQuery = { original: true };
      const mockArgs = { test: true };

      const result = composedModifier(mockQuery as any, mockArgs);

      // Verify that both modifiers were applied in sequence
      expect(result).toEqual({
        original: true,
        modifier1Applied: true,
        modifier2Applied: true,
      });
    });

    it("should apply modifiers in the correct order", () => {
      // Create mock modifiers that track the order of application
      const appliedOrder: string[] = [];

      const modifier1: QueryModifier<any, any, any> = (query, _args) => {
        appliedOrder.push("modifier1");
        return query;
      };

      const modifier2: QueryModifier<any, any, any> = (query, _args) => {
        appliedOrder.push("modifier2");
        return query;
      };

      const modifier3: QueryModifier<any, any, any> = (query, _args) => {
        appliedOrder.push("modifier3");
        return query;
      };

      const composedModifier = composeQueryModifiers(
        modifier1,
        modifier2,
        modifier3,
      );

      // Test the composed modifier
      composedModifier({} as any, {});

      // Verify the order of application
      expect(appliedOrder).toEqual(["modifier1", "modifier2", "modifier3"]);
    });
  });

  describe("createStandardQueryModifier", () => {
    it("should create a composed modifier that applies where, sort, and pagination", () => {
      const tableName = "test_table";
      const standardModifier = createStandardQueryModifier(tableName as never);

      const mockQuery = { original: true };
      const mockArgs = { test: true };

      const result = standardModifier(mockQuery as any, mockArgs as any);

      // Verify that all three modifiers were applied
      expect(applyWhere).toHaveBeenCalledWith(tableName, mockQuery, mockArgs);
      expect(applySort).toHaveBeenCalled();
      expect(applyPagination).toHaveBeenCalled();

      // The result should have all three modifications
      expect(result).toHaveProperty("whereApplied", true);
      expect(result).toHaveProperty("sortApplied", true);
      expect(result).toHaveProperty("paginationApplied", true);
    });
  });
});
