import {
    BooleanSearchOptions,
    NumberArraySearchOptions,
    NumberSearchOptions,
    StringArraySearchOptions,
    StringSearchOptions
} from "./searchOptions";
import type {ContractWhereInput} from "./contractInput";
import type {FractionWhereInput} from "./fractionInput";

export type WhereOptions<T extends object> = {
    [P in keyof T]: BooleanSearchOptions | StringSearchOptions | NumberSearchOptions | StringArraySearchOptions | NumberArraySearchOptions | ContractWhereInput | FractionWhereInput | null;
};
