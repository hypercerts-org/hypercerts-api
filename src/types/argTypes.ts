import {
  BigIntSearchOptions,
  BooleanSearchOptions,
  IdSearchOptions,
  NumberArraySearchOptions,
  NumberSearchOptions,
  StringArraySearchOptions,
  StringSearchOptions,
} from "../graphql/schemas/inputs/searchOptions.js";

export type SearchOptionType = {
  string: typeof StringSearchOptions;
  number: typeof NumberSearchOptions;
  bigint: typeof BigIntSearchOptions;
  id: typeof IdSearchOptions;
  boolean: typeof BooleanSearchOptions;
  stringArray: typeof StringArraySearchOptions;
  numberArray: typeof NumberArraySearchOptions;
};

export const SearchOptionMap = {
  string: StringSearchOptions,
  number: NumberSearchOptions,
  bigint: BigIntSearchOptions,
  id: IdSearchOptions,
  boolean: BooleanSearchOptions,
  stringArray: StringArraySearchOptions,
  numberArray: NumberArraySearchOptions,
} as const;
