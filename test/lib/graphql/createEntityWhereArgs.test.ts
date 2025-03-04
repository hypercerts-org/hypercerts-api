import "reflect-metadata";
import { beforeEach, describe, expect, it } from "vitest";
import { createEntityWhereArgs } from "../../../src/lib/graphql/createEntityWhereArgs.js";
import { getMetadataStorage } from "type-graphql";
import { EntityTypeDefs } from "../../../src/graphql/schemas/typeDefs/typeDefs.js";
import { WhereFieldDefinitions } from "../../../src/lib/graphql/whereFieldDefinitions.js";
import { SearchOptionMap } from "../../../src/types/argTypes.js";

describe("createEntityWhereArgs", () => {
  beforeEach(() => {
    // Clear type-graphql metadata between tests
    getMetadataStorage().clear();
  });

  it("should create a class with the correct name", () => {
    const WhereArgs = createEntityWhereArgs("Contract", {
      address: "string",
      chain_id: "number",
    });

    expect(WhereArgs.name).toBe("ContractWhereInput");
  });

  it("creates basic where args for simple fields", () => {
    const fieldDefs = {
      id: "string",
      address: "string",
      chain_id: "number",
    } as const;

    const WhereArgs = createEntityWhereArgs("Contract", fieldDefs);

    const whereInstance = new WhereArgs();
    expect(whereInstance).toHaveProperty("id");
    expect(whereInstance).toHaveProperty("address");
    expect(whereInstance).toHaveProperty("chain_id");

    // Test field assignment we need to cast to any to avoid type errors
    (whereInstance as any).id = { eq: "123" };
    (whereInstance as any).address = { contains: "test" };
    expect(whereInstance.id).toEqual({ eq: "123" });
    expect(whereInstance.address).toEqual({ contains: "test" });
  });

  it("should create fields with correct types for primitive fields", () => {
    createEntityWhereArgs("Contract", {
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

  it("should handle nested reference fields", () => {
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

    const hypercertWhereArgs = new WhereArgs();

    expect(hypercertWhereArgs.token_id).toBeUndefined();
    expect(hypercertWhereArgs.metadata).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(hypercertWhereArgs.metadata!.constructor.name).toBe(
      "HypercertMetadataWhereInput",
    );
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(Object.keys(hypercertWhereArgs.metadata!)).toEqual(
      Object.keys(WhereFieldDefinitions.Metadata.fields),
    );
    expect(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      Object.values(hypercertWhereArgs.metadata!).every(
        (value) => value === undefined,
      ),
    ).toBe(true);
  });

  it("should create nullable fields", () => {
    createEntityWhereArgs(EntityTypeDefs.Hypercert, {
      token_id: "bigint",
    });

    const metadata = getMetadataStorage();
    const fields = metadata.fields.filter(
      (field) => field.target.name === "HypercertWhereInput",
    );

    expect(fields[0].typeOptions?.nullable).toBe(true);
  });

  it("should initialize all fields as undefined in constructor", () => {
    const WhereArgs = createEntityWhereArgs(EntityTypeDefs.Hypercert, {
      token_id: "bigint",
    });

    const instance = new WhereArgs();
    expect(instance.token_id).toBeUndefined();
  });

  it("should handle complex nested structures", () => {
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
    console.log(allFields);

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
      (field) => field.target.name === "AttestationHypercertMetadataWhereInput",
    );

    // The test expects fields based on WhereFieldDefinitions.Metadata.fields
    const expectedFieldCount = Object.keys(
      WhereFieldDefinitions.Metadata.fields,
    ).length;
    expect(metadataFields).toHaveLength(expectedFieldCount);
  });

  it("should throw error for invalid field type", () => {
    expect(() => {
      createEntityWhereArgs("Contract", {
        // @ts-expect-error - Testing invalid type
        name: "InvalidType",
      });
    }).toThrow();
  });
});
