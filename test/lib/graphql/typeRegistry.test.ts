import { beforeEach, describe, expect, it } from "vitest";
import {
  TypeRegistry,
  registry,
} from "../../../src/lib/graphql/TypeRegistry.js";
import { createEntitySortArgs } from "../../../src/lib/graphql/createEntitySortArgs.js";
import { createEntityWhereArgs } from "../../../src/lib/graphql/createEntityWhereArgs.js";

// Test field definitions
const testFields = {
  id: "string",
  name: "string",
} as const;

describe("TypeRegistry", () => {
  let localRegistry: TypeRegistry;

  beforeEach(() => {
    localRegistry = new TypeRegistry();
  });

  describe("WhereArgs", () => {
    it("should create new WhereArgs type when not found", () => {
      const creatorCalled = { value: false };
      const whereArgs = localRegistry.getOrCreateWhereInput("Hypercert", () => {
        creatorCalled.value = true;
        return createEntityWhereArgs("Hypercert", testFields);
      });

      expect(creatorCalled.value).toBe(true);
      expect(whereArgs).toBeDefined();
      expect(whereArgs.name).toBe("HypercertWhereInput");
    });

    it("should not call creator function when type already exists", () => {
      // First call to create the type
      const firstCall = localRegistry.getOrCreateWhereInput("Hypercert", () =>
        createEntityWhereArgs("Hypercert", testFields),
      );

      // Second call should reuse existing type
      const creatorCalled = { value: false };
      const secondCall = localRegistry.getOrCreateWhereInput(
        "Hypercert",
        () => {
          creatorCalled.value = true;
          throw new Error("Creator should not be called");
        },
      );

      expect(creatorCalled.value).toBe(false);
      expect(secondCall).toBe(firstCall);
    });

    it("should create different WhereArgs types for different entities", () => {
      const firstEntity = localRegistry.getOrCreateWhereInput("Hypercert", () =>
        createEntityWhereArgs("Hypercert", testFields),
      );
      const secondEntity = localRegistry.getOrCreateWhereInput("Fraction", () =>
        createEntityWhereArgs("Fraction", testFields),
      );

      expect(firstEntity).not.toBe(secondEntity);
      expect(firstEntity.name).toBe("HypercertWhereInput");
      expect(secondEntity.name).toBe("FractionWhereInput");
    });
  });

  describe("SortArgs", () => {
    it("should create and store SortArgs type", () => {
      const sortArgs = localRegistry.getOrCreateSortOptions("Hypercert", () =>
        createEntitySortArgs("Hypercert", testFields),
      );

      expect(sortArgs).toBeDefined();
      expect(sortArgs.name).toBe("HypercertSortOptions");
    });

    it("should return the same SortArgs type for the same entity", () => {
      const firstCall = localRegistry.getOrCreateSortOptions("Hypercert", () =>
        createEntitySortArgs("Hypercert", testFields),
      );
      const secondCall = localRegistry.getOrCreateSortOptions("Hypercert", () =>
        createEntitySortArgs("Hypercert", testFields),
      );

      expect(firstCall).toBe(secondCall);
    });

    it("should create different SortArgs types for different entities", () => {
      const firstEntity = localRegistry.getOrCreateSortOptions(
        "Hypercert",
        () => createEntitySortArgs("Hypercert", testFields),
      );
      const secondEntity = localRegistry.getOrCreateSortOptions(
        "Fraction",
        () => createEntitySortArgs("Fraction", testFields),
      );

      expect(firstEntity).not.toBe(secondEntity);
      expect(firstEntity.name).toBe("HypercertSortOptions");
      expect(secondEntity.name).toBe("FractionSortOptions");
    });
  });

  describe("Singleton registry", () => {
    it("should export a singleton instance", () => {
      expect(registry).toBeInstanceOf(TypeRegistry);
    });

    it("should maintain state across multiple imports", () => {
      const whereArgs = registry.getOrCreateWhereInput("Hypercert", () =>
        createEntityWhereArgs("Hypercert", testFields),
      );

      // Simulate another import using the same registry
      const sameRegistry = registry;
      const sameWhereArgs = sameRegistry.getOrCreateWhereInput(
        "Hypercert",
        () => createEntityWhereArgs("Hypercert", testFields),
      );

      expect(whereArgs).toBe(sameWhereArgs);
    });
  });
});
