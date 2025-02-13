import "reflect-metadata";
import { beforeEach, describe, expect, it } from "vitest";

import { Field, ObjectType } from "type-graphql";
import {
  createEntityArgs,
  typeCache,
} from "../../../../src/graphql/schemas/args/argGenerator.js";
import { SortOrder } from "../../../../src/graphql/schemas/enums/sortEnums.js";

@ObjectType()
class ReferencedEntity {
  @Field(() => String)
  id!: string;

  @Field(() => Number)
  count!: number;
}
// Test entities
@ObjectType()
class TestEntity {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => TestEntity, { nullable: true })
  nested?: TestEntity;

  @Field(() => ReferencedEntity, { nullable: true })
  reference?: ReferencedEntity;
}

describe("argGenerator", () => {
  describe("WhereArgs", () => {
    beforeEach(() => {
      Object.keys(typeCache).forEach((key) => {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete, @typescript-eslint/no-explicit-any
        delete (typeCache as any)[key];
      });
    });

    it("should create basic where args with all fields", () => {
      const { WhereArgs } = createEntityArgs<TestEntity>("Test", {
        id: "id",
        name: "string",
        reference: {
          type: "id",
          references: {
            entity: ReferencedEntity,
            fields: {
              count: "number",
            },
          },
        },
      });

      const instance = new WhereArgs();
      expect(Object.keys(instance)).toContain("id");
      expect(Object.keys(instance)).toContain("name");
      expect(Object.keys(instance)).toContain("reference");

      // Test field assignments
      instance.id = { eq: "123" };
      instance.name = { contains: "test" };
      expect(instance.id).toEqual({ eq: "123" });
      expect(instance.name).toEqual({ contains: "test" });
    });

    it("should handle referenced entities", () => {
      const { WhereArgs } = createEntityArgs<TestEntity>("Test", {
        id: "id",
        name: "string",
        reference: {
          type: "id",
          references: {
            entity: ReferencedEntity,
            fields: {
              count: "number",
            },
          },
        },
      });

      const instance = new WhereArgs();
      expect(Object.keys(instance)).toContain("reference");

      instance.reference = { count: { gt: 5 } };
      expect(instance.reference).toEqual({ count: { gt: 5 } });
    });

    it("should handle partial field definitions", () => {
      const { WhereArgs } = createEntityArgs<TestEntity>("Test", {
        id: "id", // Only defining id, omitting other fields
      });

      const instance = new WhereArgs();

      expect(Object.keys(instance)).toEqual(["id"]);

      instance.id = { eq: "123" };
      expect(instance.id).toEqual({ eq: "123" });

      expect(instance.name).toBeUndefined();
      expect(instance.reference).toBeUndefined();
    });
  });

  describe("SortArgs", () => {
    it("should create sort args with correct fields", () => {
      const { SortArgs } = createEntityArgs<TestEntity>("Test", {
        id: "id",
        name: "string",
      });

      const instance = new SortArgs();

      // Test valid sort orders
      instance.by = {
        id: SortOrder.ascending,
        name: SortOrder.descending,
      };
      expect(instance.by).toEqual({
        id: SortOrder.ascending,
        name: SortOrder.descending,
      });
    });

    it("should default to ascending for invalid sort orders", () => {
      const { SortArgs } = createEntityArgs<TestEntity>("Test", {
        id: "id",
        name: "string",
      });

      const instance = new SortArgs();

      // Test invalid sort order
      instance.by = {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        id: "invalid" as any,
        name: SortOrder.descending,
      };
      expect(instance.by).toEqual({
        id: SortOrder.ascending,
        name: SortOrder.descending,
      });
    });

    it("should handle undefined sort values", () => {
      const { SortArgs } = createEntityArgs<TestEntity>("Test", {
        id: "id",
        name: "string",
      });

      const instance = new SortArgs();

      instance.by = {
        id: undefined,
        name: SortOrder.descending,
      };
      expect(instance.by).toEqual({
        id: undefined,
        name: SortOrder.descending,
      });
    });
  });

  describe("Type Generation", () => {
    it("should generate unique types for different entities", () => {
      const test1 = createEntityArgs<TestEntity>("Test1", { id: "id" });
      const test2 = createEntityArgs<TestEntity>("Test2", { id: "id" });

      expect(test1.WhereArgs).not.toBe(test2.WhereArgs);
      expect(test1.SortArgs).not.toBe(test2.SortArgs);

      const instance1 = new test1.WhereArgs();
      const instance2 = new test2.WhereArgs();
      expect(instance1.constructor).not.toBe(instance2.constructor);

      expect(Object.getPrototypeOf(instance1)).not.toBe(
        Object.getPrototypeOf(instance2),
      );
    });
  });
});
