import { PostgrestTransformBuilder } from "@supabase/postgrest-js";

import { Database as DataDatabase } from "../../../types/supabaseData.js";
import type { Database as CachingDatabase } from "../../../types/supabaseCaching.js";
import { SortOrder } from "../enums/sortEnums.js";
import { HypercertSortOptions } from "../args/hypercertsArgs.js";
import { OrderOptions } from "../inputs/orderOptions.js";
import { FractionSortOptions } from "../args/fractionArgs.js";
import { ContractSortOptions } from "../args/contractArgs.js";
import { AttestationSortOptions } from "../args/attestationArgs.js";
import { AttestationSchemaSortOptions } from "../args/attestationSchemaArgs.js";
import { MetadataSortOptions } from "../args/metadataArgs.js";

interface ApplySorting<
  T extends object,
  QueryType extends PostgrestTransformBuilder<
    CachingDatabase["public"] | DataDatabase["public"],
    Record<string, unknown>,
    unknown,
    unknown,
    unknown
  >,
> {
  query: QueryType;
  sort?: OrderOptions<T>;
}

type ColumnOpts = {
  ascending?: boolean;
  nullsFirst?: boolean;
  referencedTable?: string;
};

export const applySorting = <
  T extends object,
  QueryType extends PostgrestTransformBuilder<
    CachingDatabase["public"] | DataDatabase["public"],
    Record<string, unknown>,
    unknown,
    unknown,
    unknown
  >,
>({
  query,
  sort,
}: ApplySorting<T, QueryType>) => {
  if (!sort) return query;

  const sorting: [string, ColumnOpts][] = [];
  for (const [key, value] of Object.entries(sort.by || {})) {
    if (!value) continue;

    // Handle direct sorting parameters
    if (typeof value === "string") {
      sorting.push([key, { ascending: value !== SortOrder.descending }]);
      continue;
    }

    // Handle nested sorting options
    // FIXME: This is brittle. We should find a way to generalize this
    if (
      value instanceof HypercertSortOptions ||
      value instanceof FractionSortOptions ||
      value instanceof ContractSortOptions ||
      value instanceof AttestationSortOptions ||
      value instanceof MetadataSortOptions ||
      value instanceof AttestationSchemaSortOptions
    ) {
      for (const [column, direction] of Object.entries(value)) {
        if (!column || !direction) continue;
        sorting.push([
          `${key}.${column}`,
          { ascending: direction !== SortOrder.descending },
        ]);
      }
    }
  }

  query = sorting.reduce((acc, [column, options]) => {
    return acc.order(column, options);
  }, query);

  return query as unknown as QueryType;
};
