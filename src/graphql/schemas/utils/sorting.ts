import {PostgrestFilterBuilder} from "@supabase/postgrest-js";
import type {Database} from "../../../types/supabase.js";
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
    QueryType extends PostgrestFilterBuilder<Database['public'], Record<string, unknown>, unknown, unknown, unknown>
> {
    query: QueryType;
    sort?: OrderOptions<T>;
    table: string;
}

export const applySorting = <T extends object, QueryType extends PostgrestFilterBuilder<Database['public'], Record<string, unknown>, unknown, unknown, unknown>>({
                                                                                                                                                                     query,
                                                                                                                                                                     sort,
                                                                                                                                                                     table
                                                                                                                                                                 }: ApplySorting<T, QueryType>) => {
    if (!sort) return query;

    const sorting = [];
    for (const [column, value] of Object.entries(sort)) {
        if (!value) continue;

        // If the value is an object, recursively apply sorting
        if (value instanceof HypercertSortOptions || value instanceof FractionSortOptions || value instanceof ContractSortOptions || value instanceof AttestationSortOptions || value instanceof MetadataSortOptions || value instanceof AttestationSchemaSortOptions) {
            const nestedSorting = [];
            for (const [_column, _value] of Object.entries(value)) {
                if (!_value) continue;
                let options = {};
                if (table !== _column) options = Object.assign({referencedTable: _column}, options);
                if (sort.order === SortOrder.descending) options = Object.assign({ascending: false}, options);
                nestedSorting.push([_value, options]);
            }
            sorting.push(...nestedSorting);
        }
    }

    console.log(sorting);

    query = sorting
        .reduce(
            (acc, [column, options]) => {
                return acc.order(column, options);
            },
            query
        )

    console.log(query);

    return query as unknown as QueryType;
}