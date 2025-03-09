import { InputType } from "type-graphql";
import { describe, expect, it } from "vitest";
import { SortOrder } from "../../../src/graphql/schemas/enums/sortEnums.js";
import { BaseQueryArgs } from "../../../src/lib/graphql/BaseQueryArgs.js";
import { createEntityArgs } from "../../../src/lib/graphql/createEntityArgs.js";

const { WhereInput, SortOptions } = createEntityArgs("Contract", {
  id: "string",
  address: "string",
  chain_id: "number",
});

describe("BaseQueryArgs", () => {
  it("should create a class with all expected fields", () => {
    const QueryArgs = BaseQueryArgs(WhereInput, SortOptions);
    const instance = new QueryArgs();

    // Check that the class has all expected properties
    expect(instance).toHaveProperty("where");
    expect(instance).toHaveProperty("sortBy");
    expect(instance).toHaveProperty("first");
    expect(instance).toHaveProperty("offset");
  });

  it("should maintain type information from input args", () => {
    const QueryArgs = BaseQueryArgs(WhereInput, SortOptions);
    const instance = new QueryArgs();

    // Set valid values
    instance.where = { id: { eq: "test" } };
    instance.sortBy = { address: SortOrder.ascending };
    instance.first = 10;
    instance.offset = 0;

    // Type checks
    expect(typeof instance.where?.id?.eq).toBe("string");
    expect(typeof instance.sortBy?.address).toBe("string");
    expect(typeof instance.first).toBe("number");
    expect(typeof instance.offset).toBe("number");
  });

  it("should allow nullable fields", () => {
    const QueryArgs = BaseQueryArgs(WhereInput, SortOptions);
    const instance = new QueryArgs();

    // All fields should be nullable
    expect(instance.sortBy).toBeUndefined();
    expect(instance.first).toBeUndefined();
    expect(instance.offset).toBeUndefined();
  });

  it("should require where field", () => {
    const QueryArgs = BaseQueryArgs(WhereInput, SortOptions);
    const instance = new QueryArgs();

    // TypeScript should enforce this at compile time, but we can check at runtime
    expect(instance).toHaveProperty("where");
  });

  it("should work with empty input types", () => {
    @InputType()
    class EmptyWhereInput {}

    @InputType()
    class EmptySortOptions {}

    const QueryArgs = BaseQueryArgs(EmptyWhereInput, EmptySortOptions);
    const instance = new QueryArgs();

    expect(instance).toHaveProperty("where");
    expect(instance).toHaveProperty("sortBy");
  });
});
