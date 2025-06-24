import { describe, it, expect } from "vitest";
import {
  GetHypercertsArgs,
  HypercertSortOptions,
  HypercertWhereInput,
} from "../../../../src/graphql/schemas/args/hypercertsArgs.js";

//TOOD can be removed later, used this more as a smoke test during development
describe("HypercertsArgs", () => {
  it("should have correct class names", () => {
    expect(GetHypercertsArgs.name).toBe("GetHypercertsArgs");
    expect(HypercertWhereInput.name).toBe("HypercertWhereInput");
    expect(HypercertSortOptions.name).toBe("HypercertSortOptions");
  });

  it("should have correct structure for GetHypercertsArgs", () => {
    const instance = new GetHypercertsArgs();
    expect(instance).toHaveProperty("where");
    expect(instance).toHaveProperty("sortBy");
    expect(instance).toHaveProperty("first");
    expect(instance).toHaveProperty("offset");
  });

  it("should include all required where fields", () => {
    const whereInstance = new HypercertWhereInput();
    const whereFields = Object.keys(whereInstance);

    expect(whereFields).toContain("id");
    expect(whereFields).toContain("creation_block_timestamp");
    expect(whereFields).toContain("creation_block_number");
    expect(whereFields).toContain("token_id");
    expect(whereFields).toContain("creator_address");
    expect(whereFields).toContain("uri");
    expect(whereFields).toContain("hypercert_id");
    expect(whereFields).toContain("units");
  });

  it("should include reference fields in where args", () => {
    const whereFields = Object.keys(HypercertWhereInput.prototype);

    expect(whereFields).toContain("contract");
    expect(whereFields).toContain("metadata");
    expect(whereFields).toContain("attestations");
    expect(whereFields).toContain("fractions");
  });

  it("should include all required sort fields", () => {
    const sortInstance = new HypercertSortOptions();
    const sortFields = Object.keys(sortInstance);

    // Basic fields that should be sortable
    expect(sortFields).toContain("id");
    expect(sortFields).toContain("creation_block_timestamp");
    expect(sortFields).toContain("creation_block_number");
    expect(sortFields).toContain("token_id");
    expect(sortFields).toContain("creator_address");
    expect(sortFields).toContain("uri");
    expect(sortFields).toContain("hypercert_id");
    expect(sortFields).toContain("units");

    // Reference fields should NOT be included
    expect(sortFields).not.toContain("contract");
    expect(sortFields).not.toContain("metadata");
    expect(sortFields).not.toContain("attestations");
    expect(sortFields).not.toContain("fractions");
  });
});
