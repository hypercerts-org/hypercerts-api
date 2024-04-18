import {
    NumberArraySearchOptions,
    NumberSearchOptions,
    StringArraySearchOptions,
    StringSearchOptions
} from "./searchOptions";

export type WhereOptions<T extends object> = {
    [P in keyof T]: StringSearchOptions | NumberSearchOptions | StringArraySearchOptions | NumberArraySearchOptions | null;
};
