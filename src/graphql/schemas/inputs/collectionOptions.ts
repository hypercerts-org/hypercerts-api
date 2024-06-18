import {
    AttestationSchemaSortOptions,
    AttestationSortOptions,
    ContractSortOptions, FractionSortOptions,
    HypercertSortOptions,
    MetadataSortOptions
} from "./sortOptions.js";


export type CollectionOptions<T extends object> = {
    by?: HypercertSortOptions | ContractSortOptions | MetadataSortOptions | AttestationSortOptions | AttestationSchemaSortOptions | FractionSortOptions | null;
}

