import "reflect-metadata";
import { getMetadataStorage } from "type-graphql";
import { beforeEach, describe, expect, it } from "vitest";
import { EntityTypeDefs } from "../../../src/graphql/schemas/typeDefs/typeDefs.js";
import { createEntityWhereArgs } from "../../../src/lib/graphql/createEntityWhereArgs.js";
import { WhereFieldDefinitions } from "../../../src/lib/graphql/whereFieldDefinitions.js";
import { SearchOptionMap } from "../../../src/types/argTypes.js";

describe("createEntityWhereArgs", () => {
  beforeEach(() => {
    // Clear type-graphql metadata between tests
    getMetadataStorage().clear();
  });

  describe("basic functionality", () => {
    it("should create a class with the correct name", () => {
      const WhereArgs = createEntityWhereArgs(EntityTypeDefs.Contract, {
        address: "string",
        chain_id: "number",
      });

      expect(WhereArgs.name).toBe("ContractWhereInput");
    });

    it("should create fields with correct types for primitive fields", () => {
      createEntityWhereArgs(EntityTypeDefs.Contract, {
        address: "string",
        chain_id: "number",
      });

      const metadata = getMetadataStorage();
      const fields = metadata.fields.filter(
        (field) => field.target.name === "ContractWhereInput",
      );

      expect(fields).toHaveLength(2);
      expect(fields.map((f) => f.name)).toEqual(["address", "chain_id"]);
      expect(fields[0].typeOptions?.nullable).toBe(true);
      expect(fields[1].typeOptions?.nullable).toBe(true);
      expect(fields[0].getType()).toBe(SearchOptionMap.string);
      expect(fields[1].getType()).toBe(SearchOptionMap.number);
    });

    it("should initialize all fields as undefined in constructor", () => {
      const WhereArgs = createEntityWhereArgs(EntityTypeDefs.Contract, {
        address: "string",
        chain_id: "number",
      });

      const instance = new WhereArgs();
      expect(instance.address).toBeUndefined();
      expect(instance.chain_id).toBeUndefined();
    });

    it("should allow setting filter values for primitive fields", () => {
      const WhereArgs = createEntityWhereArgs(EntityTypeDefs.Contract, {
        address: "string",
        chain_id: "number",
      });

      const instance = new WhereArgs();
      instance.address = { contains: "0x123" };
      instance.chain_id = { eq: 1 };

      expect(instance.address).toEqual({ contains: "0x123" });
      expect(instance.chain_id).toEqual({ eq: 1 });
    });
  });

  describe("nested reference fields", () => {
    it("should handle single-level nested reference fields", () => {
      const WhereArgs = createEntityWhereArgs(EntityTypeDefs.Hypercert, {
        token_id: "bigint",
        metadata: {
          type: "id",
          references: {
            entity: EntityTypeDefs.Metadata,
            fields: WhereFieldDefinitions.Metadata.fields,
          },
        },
      });

      const metadata = getMetadataStorage();
      const fields = metadata.fields.filter(
        (field) => field.target.name === "HypercertWhereInput",
      );

      expect(fields).toHaveLength(2);
      expect(fields.map((f) => f.name)).toEqual(["token_id", "metadata"]);

      const instance = new WhereArgs();
      expect(instance.token_id).toBeUndefined();
      expect(instance.metadata).toBeDefined();
      expect(instance.metadata?.constructor.name).toBe(
        "HypercertMetadataWhereInput",
      );
      expect(Object.keys(instance.metadata || {})).toEqual(
        Object.keys(WhereFieldDefinitions.Metadata.fields),
      );
    });

    it("should handle deeply nested reference fields", () => {
      createEntityWhereArgs(EntityTypeDefs.Attestation, {
        uid: "string",
        token_id: "bigint",
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

      const metadata = getMetadataStorage();
      const allFields = metadata.fields;

      // Check attestation level
      const attestationFields = allFields.filter(
        (field) => field.target.name === "AttestationWhereInput",
      );
      expect(attestationFields).toHaveLength(3);

      // Check hypercert level
      const hypercertFields = allFields.filter(
        (field) => field.target.name === "AttestationHypercertWhereInput",
      );
      expect(hypercertFields).toHaveLength(1);

      // Check metadata level
      const metadataFields = allFields.filter(
        (field) =>
          field.target.name === "AttestationHypercertMetadataWhereInput",
      );
      expect(metadataFields).toHaveLength(
        Object.keys(WhereFieldDefinitions.Metadata.fields).length,
      );
    });
  });

  describe("error handling", () => {
    it("should throw error for invalid primitive field type", () => {
      expect(() => {
        createEntityWhereArgs(EntityTypeDefs.Contract, {
          // @ts-expect-error - Testing invalid type
          name: "InvalidType",
        });
      }).toThrow('Invalid field type "InvalidType" for field "name"');
    });
  });

  describe("field initialization", () => {
    it("should initialize nested reference fields with their own instances", () => {
      const WhereArgs = createEntityWhereArgs(EntityTypeDefs.Hypercert, {
        token_id: "bigint",
        metadata: {
          type: "id",
          references: {
            entity: EntityTypeDefs.Metadata,
            fields: { name: "string" },
          },
        },
      });

      const instance = new WhereArgs();
      expect(instance.metadata).toBeDefined();
      expect(instance.metadata?.constructor.name).toBe(
        "HypercertMetadataWhereInput",
      );
      expect(instance.metadata?.name).toBeUndefined();
    });
  });
});
