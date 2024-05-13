import {
    AttestationSchemaSortOptions,
    AttestationSortOptions,
    ContractSortOptions, FractionSortOptions,
    HypercertSortOptions,
    MetadataSortOptions
} from "./sortOptions.js";


export type OrderOptions<T extends object> = {
    by?: HypercertSortOptions | ContractSortOptions | MetadataSortOptions | AttestationSortOptions | AttestationSchemaSortOptions | FractionSortOptions | null;
}

