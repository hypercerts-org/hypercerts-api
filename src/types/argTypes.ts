import {
  BigIntSearchOptions,
  BooleanSearchOptions,
  IdSearchOptions,
  NumberArraySearchOptions,
  NumberSearchOptions,
  StringArraySearchOptions,
  StringSearchOptions,
  SignatureRequestStatusSearchOptions,
} from "../graphql/schemas/inputs/searchOptions.js";

export const SearchOptionMap = {
  string: StringSearchOptions,
  number: NumberSearchOptions,
  bigint: BigIntSearchOptions,
  id: IdSearchOptions,
  boolean: BooleanSearchOptions,
  stringArray: StringArraySearchOptions,
  numberArray: NumberArraySearchOptions,
  enum: SignatureRequestStatusSearchOptions,
} as const;
