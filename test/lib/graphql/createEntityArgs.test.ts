import "reflect-metadata";
import { beforeEach, describe, expect, it } from "vitest";
import { registry } from "../../../src/lib/graphql/TypeRegistry.js";
import { createEntityArgs } from "../../../src/lib/graphql/createEntityArgs.js";

describe("createEntityArgs", () => {
  beforeEach(() => {
    // Reset the registry before each test
    (registry as any).whereArgs = new Map();
    (registry as any).sortOptions = new Map();
    (registry as any).sortArgs = new Map();
  });

  describe("generated args", () => {
    it("creates basic where args for simple fields", () => {
      const fieldDefs = {
        id: "string",
        address: "string",
        chain_id: "number",
      } as const;

      const { WhereInput, SortOptions } = createEntityArgs(
        "Contract",
        fieldDefs,
      );

      expect(WhereInput).toBeDefined();
      expect(SortOptions).toBeDefined();

      const whereInstance = new WhereInput();
      expect(whereInstance).toHaveProperty("id");
      expect(whereInstance).toHaveProperty("address");
      expect(whereInstance).toHaveProperty("chain_id");

      const sortInstance = new SortOptions();
      expect(sortInstance).toHaveProperty("address");
      expect(sortInstance).toHaveProperty("chain_id");
    });
  });

  describe("Type Registry", () => {
    it("reuses types for same entity name", () => {
      const args1 = createEntityArgs("Contract", {
        id: "string",
      });
      const args2 = createEntityArgs("Contract", {
        id: "string",
      });

      expect(args1.WhereInput).toBe(args2.WhereInput);
      expect(args1.SortOptions).toBe(args2.SortOptions);
    });

    it("creates different types for different entity names", () => {
      const args1 = createEntityArgs("Contract", {
        id: "string",
      });
      const args2 = createEntityArgs("Metadata", {
        id: "string",
      });

      expect(args1.WhereInput).not.toBe(args2.WhereInput);
      expect(args1.SortOptions).not.toBe(args2.SortOptions);
    });
  });
});
