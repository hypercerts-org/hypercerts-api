import {PostgrestTransformBuilder} from "@supabase/postgrest-js";
import type {Database as CachingDatabase} from "../../../types/supabaseCaching.js";
import type {OrderOptions} from "../inputs/orderOptions.js";
import {
    AttestationSchemaSortOptions,
    AttestationSortOptions,
    ContractSortOptions,
    FractionSortOptions,
    HypercertSortOptions,
    MetadataSortOptions
} from "../inputs/sortOptions.js";
import {SortOrder} from "../enums/sortEnums.js";

interface ApplySorting<
    T extends object,
    QueryType extends PostgrestTransformBuilder<CachingDatabase['public'], Record<string, unknown>, unknown, unknown, unknown>
> {
    query: QueryType;
    sort?: OrderOptions<T>;
}

export const applySorting = <T extends object, QueryType extends PostgrestTransformBuilder<CachingDatabase['public'], Record<string, unknown>, unknown, unknown, unknown>>({
                                                                                                                                                                        query,
                                                                                                                                                                        sort,
                                                                                                                                                                    }: ApplySorting<T, QueryType>) => {
    if (!sort) return query;

    const sorting: [string, { ascending?: boolean, nullsFirst?: boolean, referencedTable?: string } | undefined][] = [];
    for (const [_, value] of Object.entries(sort)) {
        if (!value) continue;

        // If the value is an object, recursively apply sorting
        if (value instanceof HypercertSortOptions || value instanceof FractionSortOptions || value instanceof ContractSortOptions || value instanceof AttestationSortOptions || value instanceof MetadataSortOptions || value instanceof AttestationSchemaSortOptions) {
            const nestedSorting: [string, {
                ascending?: boolean,
                nullsFirst?: boolean,
                referencedTable?: string
            }][] = [];
            for (const [_column, _direction] of Object.entries(value)) {
                if (!_column || !_direction) continue;
                // TODO resolve hacky workaround for hypercerts <> claims alias
                nestedSorting.push([_column, {ascending: _direction !== SortOrder.descending}]);
            }
            sorting.push(...nestedSorting);
        }
    }

    query = sorting
        .reduce(
            (acc, [column, options]) => {
                return acc.order(column, options);
            },
            query
        )

    return query as unknown as QueryType;
}