import {
    AttestationSchemaSortOptions,
    AttestationSortOptions,
    ContractSortOptions, FractionSortOptions,
    type HypercertSortOptions,
    MetadataSortOptions
} from "./sortOptions.js";
import type {SortOrder} from "../enums/sortEnums.js";


export type OrderOptions<T extends object> = {
    by?: HypercertSortOptions | ContractSortOptions | MetadataSortOptions | AttestationSortOptions | AttestationSchemaSortOptions | FractionSortOptions | null;
    order?: SortOrder | null;
}

