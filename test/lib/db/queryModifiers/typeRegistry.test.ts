import { beforeEach, describe, expect, it } from "vitest";
import { container } from "tsyringe";
import { TypeRegistry } from "../../../../src/lib/graphql/TypeRegistry.js";
import { createEntitySortArgs } from "../../../../src/lib/graphql/createEntitySortArgs.js";
import { createEntityWhereArgs } from "../../../../src/lib/graphql/createEntityWhereArgs.js";
import { EntityTypeDefs } from "../../../../src/graphql/schemas/typeDefs/typeDefs.js";

// Test field definitions
const testFields = {
  id: "string",
  name: "string",
} as const;

describe("TypeRegistry", () => {
  let registry: TypeRegistry;

  beforeEach(() => {
    // Reset the container before each test
    container.clearInstances();
    registry = container.resolve(TypeRegistry);
  });

  describe("WhereArgs", () => {
    it("should create new WhereArgs type when not found", () => {
      const creatorCalled = { value: false };
      const whereArgs = registry.getOrCreateWhereInput(
        EntityTypeDefs.Hypercert,
        () => {
          creatorCalled.value = true;
          return createEntityWhereArgs(EntityTypeDefs.Hypercert, testFields);
        },
      );

      expect(creatorCalled.value).toBe(true);
      expect(whereArgs).toBeDefined();
      expect(whereArgs.name).toBe("HypercertWhereInput");
    });

    it("should not call creator function when type already exists", () => {
      // First call to create the type
      const firstCall = registry.getOrCreateWhereInput(
        EntityTypeDefs.Hypercert,
        () => createEntityWhereArgs(EntityTypeDefs.Hypercert, testFields),
      );

      // Second call should reuse existing type
      const creatorCalled = { value: false };
      const secondCall = registry.getOrCreateWhereInput(
        EntityTypeDefs.Hypercert,
        () => {
          creatorCalled.value = true;
          throw new Error("Creator should not be called");
        },
      );

      expect(creatorCalled.value).toBe(false);
      expect(secondCall).toBe(firstCall);
    });

    it("should create different WhereArgs types for different entities", () => {
      const firstEntity = registry.getOrCreateWhereInput(
        EntityTypeDefs.Hypercert,
        () => createEntityWhereArgs(EntityTypeDefs.Hypercert, testFields),
      );
      const secondEntity = registry.getOrCreateWhereInput(
        EntityTypeDefs.Fraction,
        () => createEntityWhereArgs(EntityTypeDefs.Fraction, testFields),
      );

      expect(firstEntity).not.toBe(secondEntity);
      expect(firstEntity.name).toBe("HypercertWhereInput");
      expect(secondEntity.name).toBe("FractionWhereInput");
    });

    it("should throw error if type not found after creation attempt", () => {
      // Mock Map.get to simulate type not being set
      const originalGet = Map.prototype.get;
      Map.prototype.get = () => undefined;

      expect(() =>
        registry.getOrCreateWhereInput(EntityTypeDefs.Hypercert, () =>
          createEntityWhereArgs(EntityTypeDefs.Hypercert, testFields),
        ),
      ).toThrow("WhereInput not found for type Hypercert");

      // Restore original Map.get
      Map.prototype.get = originalGet;
    });
  });

  describe("SortArgs", () => {
    it("should create and store SortArgs type", () => {
      const sortArgs = registry.getOrCreateSortOptions(
        EntityTypeDefs.Hypercert,
        () => createEntitySortArgs(EntityTypeDefs.Hypercert, testFields),
      );

      expect(sortArgs).toBeDefined();
      expect(sortArgs.name).toBe("HypercertSortOptions");
    });

    it("should return the same SortArgs type for the same entity", () => {
      const firstCall = registry.getOrCreateSortOptions(
        EntityTypeDefs.Hypercert,
        () => createEntitySortArgs(EntityTypeDefs.Hypercert, testFields),
      );
      const secondCall = registry.getOrCreateSortOptions(
        EntityTypeDefs.Hypercert,
        () => createEntitySortArgs(EntityTypeDefs.Hypercert, testFields),
      );

      expect(firstCall).toBe(secondCall);
    });

    it("should create different SortArgs types for different entities", () => {
      const firstEntity = registry.getOrCreateSortOptions(
        EntityTypeDefs.Hypercert,
        () => createEntitySortArgs(EntityTypeDefs.Hypercert, testFields),
      );
      const secondEntity = registry.getOrCreateSortOptions(
        EntityTypeDefs.Fraction,
        () => createEntitySortArgs(EntityTypeDefs.Fraction, testFields),
      );

      expect(firstEntity).not.toBe(secondEntity);
      expect(firstEntity.name).toBe("HypercertSortOptions");
      expect(secondEntity.name).toBe("FractionSortOptions");
    });

    it("should throw error if type not found after creation attempt", () => {
      // Mock Map.get to simulate type not being set
      const originalGet = Map.prototype.get;
      Map.prototype.get = () => undefined;

      expect(() =>
        registry.getOrCreateSortOptions(EntityTypeDefs.Hypercert, () =>
          createEntitySortArgs(EntityTypeDefs.Hypercert, testFields),
        ),
      ).toThrow("SortOptions not found for type Hypercert");

      // Restore original Map.get
      Map.prototype.get = originalGet;
    });
  });

  describe("Registry operations", () => {
    it("should clear all cached types", () => {
      // Create some types
      registry.getOrCreateWhereInput(EntityTypeDefs.Hypercert, () =>
        createEntityWhereArgs(EntityTypeDefs.Hypercert, testFields),
      );
      registry.getOrCreateSortOptions(EntityTypeDefs.Hypercert, () =>
        createEntitySortArgs(EntityTypeDefs.Hypercert, testFields),
      );

      // Clear the registry
      registry.clear();

      // Verify types are recreated (creator is called again)
      const whereCreatorCalled = { value: false };
      const sortCreatorCalled = { value: false };

      registry.getOrCreateWhereInput(EntityTypeDefs.Hypercert, () => {
        whereCreatorCalled.value = true;
        return createEntityWhereArgs(EntityTypeDefs.Hypercert, testFields);
      });

      registry.getOrCreateSortOptions(EntityTypeDefs.Hypercert, () => {
        sortCreatorCalled.value = true;
        return createEntitySortArgs(EntityTypeDefs.Hypercert, testFields);
      });

      expect(whereCreatorCalled.value).toBe(true);
      expect(sortCreatorCalled.value).toBe(true);
    });

    it("should maintain type safety through generic parameters", () => {
      // Create a type that matches the WhereArgsType structure
      interface TestWhereType {
        id?: { eq?: string };
        name?: { contains?: string };
      }

      // This should compile without type errors
      const whereArgs = registry.getOrCreateWhereInput<TestWhereType>(
        EntityTypeDefs.Hypercert,
        () => createEntityWhereArgs(EntityTypeDefs.Hypercert, testFields),
      );

      // The returned type should be ClassType<TestWhereType>
      const instance = new whereArgs();
      expect(instance).toHaveProperty("id");
      expect(instance).toHaveProperty("name");
      // Verify the structure matches our expectations
      instance.id = { eq: "test" };
      instance.name = { contains: "test" };
      expect(instance.id?.eq).toBe("test");
      expect(instance.name?.contains).toBe("test");
    });
  });

  describe("Singleton behavior", () => {
    it("should maintain singleton instance across multiple resolves", () => {
      const firstInstance = container.resolve(TypeRegistry);
      const secondInstance = container.resolve(TypeRegistry);
      expect(firstInstance).toBe(secondInstance);
    });

    it("should maintain state across multiple resolves", () => {
      const firstInstance = container.resolve(TypeRegistry);
      const whereArgs = firstInstance.getOrCreateWhereInput(
        EntityTypeDefs.Hypercert,
        () => createEntityWhereArgs(EntityTypeDefs.Hypercert, testFields),
      );

      const secondInstance = container.resolve(TypeRegistry);
      const sameWhereArgs = secondInstance.getOrCreateWhereInput(
        EntityTypeDefs.Hypercert,
        () => createEntityWhereArgs(EntityTypeDefs.Hypercert, testFields),
      );

      expect(whereArgs).toBe(sameWhereArgs);
    });
  });
});
