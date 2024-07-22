import {
  AttestationSchemaSortOptions,
  AttestationSortOptions,
  ContractSortOptions,
  FractionSortOptions,
  HypercertSortOptions,
  MetadataSortOptions,
  AllowlistRecordSortOptions,
} from "./sortOptions.js";

export type OrderOptions<T extends object> = {
  by?:
    | HypercertSortOptions
    | ContractSortOptions
    | MetadataSortOptions
    | AttestationSortOptions
    | AttestationSchemaSortOptions
    | FractionSortOptions
    | AllowlistRecordSortOptions
    | null;
};
