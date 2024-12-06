import {
  BooleanSearchOptions,
  IdSearchOptions,
  NumberArraySearchOptions,
  BigIntSearchOptions,
  StringArraySearchOptions,
  StringSearchOptions,
} from "./searchOptions.js";
import type { BasicContractWhereInput } from "./contractInput.js";
import type { BasicFractionWhereInput } from "./fractionInput.js";
import type { BasicMetadataWhereInput } from "./metadataInput.js";
import type { BasicHypercertWhereArgs } from "./hypercertsInput.js";
import type { BasicSignatureRequestWhereInput } from "./signatureRequestInput.js";

export type WhereOptions<T extends object> = {
  [P in keyof T]:
    | IdSearchOptions
    | BooleanSearchOptions
    | StringSearchOptions
    | BigIntSearchOptions
    | StringArraySearchOptions
    | NumberArraySearchOptions
    | BasicMetadataWhereInput
    | BasicHypercertWhereArgs
    | BasicContractWhereInput
    | BasicFractionWhereInput
    | BasicSignatureRequestWhereInput
    | null;
};
