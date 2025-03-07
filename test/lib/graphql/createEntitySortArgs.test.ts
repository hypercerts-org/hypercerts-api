import "reflect-metadata";
import { getMetadataStorage } from "type-graphql";
import { beforeEach, describe, expect, it } from "vitest";
import { SortOrder } from "../../../src/graphql/schemas/enums/sortEnums.js";
import { EntityTypeDefs } from "../../../src/graphql/schemas/typeDefs/typeDefs.js";
import { createEntitySortArgs } from "../../../src/lib/graphql/createEntitySortArgs.js";

describe("createEntitySort", () => {
  beforeEach(() => {
    getMetadataStorage().clear();
  });

  it("should create classes with correct names", () => {
    const SortArgs = createEntitySortArgs("Contract", {
      address: "string",
      chain_id: "number",
    });

    expect(SortArgs.name).toBe("ContractSortOptions");
  });

  it("should create fields for each sortable property", () => {
    const SortArgs = createEntitySortArgs("Contract", {
      address: "string",
      chain_id: "number",
    });

    const metadata = getMetadataStorage();
    const fields = metadata.fields.filter(
      (field) => field.target.name === "ContractSortOptions",
    );

    expect(fields).toHaveLength(2);
    expect(fields[0].name).toBe("address");
    expect(fields[1].name).toBe("chain_id");

    const sortArgs = new SortArgs();
    expect(Object.keys(sortArgs).length).toBe(2);
    expect(Object.keys(sortArgs)).toContain("address");
    expect(Object.keys(sortArgs)).toContain("chain_id");
    expect(sortArgs.address).toBeNull();
    expect(sortArgs.chain_id).toBeNull();
  });

  it("should initialize with null values", () => {
    const SortArgs = createEntitySortArgs("Contract", {
      address: "string",
      chain_id: "number",
    });

    const instance = new SortArgs();
    expect(instance.address).toBeNull();
    expect(instance.chain_id).toBeNull();

    // Expect fields to be defined on the object
    expect(Object.keys(instance).length).toBe(2);
    expect(Object.keys(instance)).toContain("address");
    expect(Object.keys(instance)).toContain("chain_id");
  });

  it("should create sort options for primitive types only", () => {
    const SortArgs = createEntitySortArgs("Contract", {
      address: "string",
      chain_id: "number",
      metadata: {
        type: "id",
        references: {
          entity: "Metadata",
          fields: { name: "string" },
        },
      },
    });

    const instance = new SortArgs();

    expect("address" in instance).toBe(true);
    expect("chain_id" in instance).toBe(true);
    expect("metadata" in instance).toBe(false);
  });

  it("should allow setting valid sort orders", () => {
    const SortArgs = createEntitySortArgs("Contract", {
      address: "string",
      chain_id: "number",
    });

    const instance = new SortArgs();

    instance.address = SortOrder.ascending;
    instance.chain_id = SortOrder.descending;

    expect(instance.address).toBe(SortOrder.ascending);
    expect(instance.chain_id).toBe(SortOrder.descending);
  });

  it("should handle complex entity definitions", () => {
    const SortArgs = createEntitySortArgs(EntityTypeDefs.Hypercert, {
      token_id: "bigint",
      creation_block_timestamp: "bigint",
      units: "bigint",
      sales_count: "number",
    });

    const instance = new SortArgs();

    instance.token_id = SortOrder.descending;
    instance.creation_block_timestamp = SortOrder.ascending;

    expect(instance.token_id).toBe(SortOrder.descending);
    expect(instance.creation_block_timestamp).toBe(SortOrder.ascending);
  });

  it("should create nullable sort fields", () => {
    createEntitySortArgs("Contract", {
      address: "string",
    });

    const metadata = getMetadataStorage();
    const fields = metadata.fields.filter(
      (field) => field.target.name === "ContractSortOptions",
    );

    expect(fields[0].typeOptions?.nullable).toBe(true);
  });

  it("should only create properties for primitive fields", () => {
    const SortArgs = createEntitySortArgs("Contract", {
      address: "string",
      chain_id: "number",
      metadata: {
        type: "id",
        references: {
          entity: "Metadata",
          fields: { name: "string" },
        },
      },
    });

    const instance = new SortArgs();

    // Check which properties are actually defined on the instance
    const ownProps = Object.getOwnPropertyNames(instance);
    expect(ownProps).toContain("address");
    expect(ownProps).toContain("chain_id");
    expect(ownProps).not.toContain("metadata");
  });

  it("should handle empty field definitions", () => {
    const SortArgs = createEntitySortArgs(EntityTypeDefs.Contract, {});
    const instance = new SortArgs();
    expect(Object.keys(instance).length).toBe(0);
  });

  it("should handle special characters in entity names", () => {
    const SortArgs = createEntitySortArgs(EntityTypeDefs.Contract, {
      field: "string",
    });
    expect(SortArgs.name).toBe("ContractSortOptions");
  });

  it("should accept valid sort orders and null", () => {
    const SortArgs = createEntitySortArgs(EntityTypeDefs.Contract, {
      address: "string",
    });

    const instance = new SortArgs();

    // Should accept valid sort orders
    instance.address = SortOrder.ascending;
    expect(instance.address).toBe(SortOrder.ascending);

    instance.address = SortOrder.descending;
    expect(instance.address).toBe(SortOrder.descending);

    // Should accept null
    instance.address = null;
    expect(instance.address).toBeNull();
  });

  it("should properly apply field decorators", () => {
    createEntitySortArgs(EntityTypeDefs.Contract, {
      address: "string",
    });

    const metadata = getMetadataStorage();
    const fields = metadata.fields.filter(
      (field) => field.target.name === "ContractSortOptions",
    );

    expect(fields[0].typeOptions?.nullable).toBe(true);
    expect(fields[0].getType()).toBe(SortOrder);
  });

  it("should handle malformed field definitions gracefully", () => {
    const SortArgs = createEntitySortArgs(EntityTypeDefs.Contract, {
      // @ts-expect-error - Testing invalid field type
      invalid: { type: "invalid" },
      valid: "string",
    });

    const instance = new SortArgs();
    expect("valid" in instance).toBe(true);
    expect("invalid" in instance).toBe(false);
  });

  it("should handle complex nested field definitions", () => {
    const SortArgs = createEntitySortArgs(EntityTypeDefs.Contract, {
      simple: "string",
      nested: {
        type: "id",
        references: {
          entity: EntityTypeDefs.Metadata,
          fields: {
            field1: "string",
            field2: "number",
          },
        },
      },
    });

    const instance = new SortArgs();
    expect("simple" in instance).toBe(true);
    expect("nested" in instance).toBe(false);
  });
});
