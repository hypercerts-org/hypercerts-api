import "reflect-metadata";
import { beforeEach, describe, expect, it } from "vitest";
import { registry } from "../../../src/lib/graphql/TypeRegistry.js";
import { createEntityArgs } from "../../../src/lib/graphql/createEntityArgs.js";
import { EntityTypeDefs } from "../../../src/graphql/schemas/typeDefs/typeDefs.js";
import { WhereFieldDefinitions } from "../../../src/lib/graphql/whereFieldDefinitions.js";
import { SortOrder } from "../../../src/graphql/schemas/enums/sortEnums.js";

describe("createEntityArgs", () => {
  beforeEach(() => {
    // Reset the registry before each test
    (registry as any).whereArgs = new Map();
    (registry as any).sortOptions = new Map();
    (registry as any).sortArgs = new Map();
  });

  describe("basic functionality", () => {
    it("should create WhereInput and SortOptions classes", () => {
      const { WhereInput, SortOptions } = createEntityArgs(
        EntityTypeDefs.Contract,
        {
          address: "string",
          chain_id: "number",
        },
      );

      expect(WhereInput).toBeDefined();
      expect(WhereInput.name).toBe("ContractWhereInput");
      expect(SortOptions).toBeDefined();
      expect(SortOptions.name).toBe("ContractSortOptions");
    });

    it("should create instances with correct field types", () => {
      const { WhereInput, SortOptions } = createEntityArgs(
        EntityTypeDefs.Contract,
        {
          address: "string",
          chain_id: "number",
        },
      );

      const whereInstance = new WhereInput();
      const sortInstance = new SortOptions();

      // Check field existence
      expect(whereInstance).toHaveProperty("address");
      expect(whereInstance).toHaveProperty("chain_id");
      expect(sortInstance).toHaveProperty("address");
      expect(sortInstance).toHaveProperty("chain_id");

      // Check initial values
      expect(whereInstance.address).toBeUndefined();
      expect(whereInstance.chain_id).toBeUndefined();
      expect(sortInstance.address).toBeNull();
      expect(sortInstance.chain_id).toBeNull();
    });

    it("should allow setting valid filter and sort values", () => {
      const { WhereInput, SortOptions } = createEntityArgs(
        EntityTypeDefs.Contract,
        {
          address: "string",
          chain_id: "number",
        },
      );

      const whereInstance = new WhereInput();
      whereInstance.address = { contains: "0x123" };
      whereInstance.chain_id = { eq: 1 };

      const sortInstance = new SortOptions();
      sortInstance.address = SortOrder.ascending;
      sortInstance.chain_id = SortOrder.descending;

      // Check filter values
      expect(whereInstance.address).toEqual({ contains: "0x123" });
      expect(whereInstance.chain_id).toEqual({ eq: 1 });

      // Check sort values
      expect(sortInstance.address).toBe(SortOrder.ascending);
      expect(sortInstance.chain_id).toBe(SortOrder.descending);
    });
  });

  describe("nested reference fields", () => {
    it("should handle single-level nested references", () => {
      const { WhereInput, SortOptions } = createEntityArgs(
        EntityTypeDefs.Hypercert,
        {
          token_id: "bigint",
          metadata: {
            type: "id",
            references: {
              entity: EntityTypeDefs.Metadata,
              fields: WhereFieldDefinitions.Metadata.fields,
            },
          },
        },
      );

      const whereInstance = new WhereInput();
      const sortInstance = new SortOptions();

      // Check primitive fields
      expect(whereInstance.token_id).toBeUndefined();
      expect(sortInstance.token_id).toBeNull();

      // Check nested fields
      expect(whereInstance.metadata).toBeDefined();
      expect(whereInstance.metadata?.constructor.name).toBe(
        "HypercertMetadataWhereInput",
      );
      expect(Object.keys(whereInstance.metadata || {})).toEqual(
        Object.keys(WhereFieldDefinitions.Metadata.fields),
      );

      // Sort options should not include reference fields
      expect(sortInstance).not.toHaveProperty("metadata");
    });

    it("should handle deeply nested references", () => {
      const { WhereInput } = createEntityArgs(EntityTypeDefs.Attestation, {
        uid: "string",
        hypercert: {
          type: "id",
          references: {
            entity: EntityTypeDefs.Hypercert,
            fields: {
              metadata: {
                type: "id",
                references: {
                  entity: EntityTypeDefs.Metadata,
                  fields: WhereFieldDefinitions.Metadata.fields,
                },
              },
            },
          },
        },
      });

      const instance = new WhereInput();
      expect(instance.uid).toBeUndefined();
      expect(instance.hypercert).toBeDefined();
      expect(instance.hypercert?.constructor.name).toBe(
        "AttestationHypercertWhereInput",
      );
      expect(instance.hypercert?.metadata).toBeDefined();
      expect(instance.hypercert?.metadata?.constructor.name).toBe(
        "AttestationHypercertMetadataWhereInput",
      );
    });
  });

  describe("type registry", () => {
    it("should reuse cached classes for same entity", () => {
      const args1 = createEntityArgs(EntityTypeDefs.Contract, {
        id: "string",
      });
      const args2 = createEntityArgs(EntityTypeDefs.Contract, {
        id: "string",
      });

      expect(args1.WhereInput).toBe(args2.WhereInput);
      expect(args1.SortOptions).toBe(args2.SortOptions);
    });

    it("should create different classes for different entities", () => {
      const args1 = createEntityArgs(EntityTypeDefs.Contract, {
        id: "string",
      });
      const args2 = createEntityArgs(EntityTypeDefs.Metadata, {
        id: "string",
      });

      expect(args1.WhereInput).not.toBe(args2.WhereInput);
      expect(args1.SortOptions).not.toBe(args2.SortOptions);
      expect(args1.WhereInput.name).toBe("ContractWhereInput");
      expect(args2.WhereInput.name).toBe("MetadataWhereInput");
    });
  });
});
