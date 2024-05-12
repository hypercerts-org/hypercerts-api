import {
    BooleanSearchOptions, IdSearchOptions,
    NumberArraySearchOptions,
    NumberSearchOptions,
    StringArraySearchOptions,
    StringSearchOptions
} from "./searchOptions.js";
import type {ContractWhereInput} from "./contractInput.js";
import type {FractionWhereInput} from "./fractionInput.js";
import type {MetadataWhereInput} from "./metadataInput.js";
import type {HypercertsWhereInput} from "./hypercertsInput.js";

export type WhereOptions<T extends object> = {
    [P in keyof T]: IdSearchOptions | BooleanSearchOptions | StringSearchOptions | NumberSearchOptions | StringArraySearchOptions | NumberArraySearchOptions | ContractWhereInput | FractionWhereInput | MetadataWhereInput | HypercertsWhereInput | null;
};
