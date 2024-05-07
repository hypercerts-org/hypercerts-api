import {
    BooleanSearchOptions,
    NumberArraySearchOptions,
    NumberSearchOptions,
    StringArraySearchOptions,
    StringSearchOptions
} from "./searchOptions.js";
import type {ContractWhereInput} from "./contractInput.js";
import type {FractionWhereInput} from "./fractionInput.js";
import type {MetadataWhereInput} from "./metadataInput.js";

export type WhereOptions<T extends object> = {
    [P in keyof T]: BooleanSearchOptions | StringSearchOptions | NumberSearchOptions | StringArraySearchOptions | NumberArraySearchOptions | ContractWhereInput | FractionWhereInput | MetadataWhereInput |null;
};
