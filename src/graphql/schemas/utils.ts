import {
    NumberArraySearchOptions,
    NumberSearchOptions,
    StringArraySearchOptions,
    StringSearchOptions
} from "./inputs/searchOptions.js";
import {FetchOptions} from "./inputs/fetchOptions.js";
import type {WhereOptions} from "./inputs/whereOptions.js";
import type {Database} from "../../types/supabase.js";
import {PostgrestFilterBuilder, PostgrestTransformBuilder} from "@supabase/postgrest-js";

interface ApplyPagination<
    QueryType extends PostgrestTransformBuilder<Database['public'], Record<string, unknown>, unknown, unknown, unknown>
> {
    query: QueryType;
    fetch?: FetchOptions;
}

export const applyPagination = <T extends PostgrestTransformBuilder<Database['public'], Record<string, unknown>, unknown, unknown, unknown>>(
    {query, fetch}: ApplyPagination<T>
) => {
    if (!fetch) return query;

    if (fetch.from && fetch.to) {
        query = query.range(fetch.from, fetch.to);
    }

    if (fetch.limit) query = query.limit(fetch.limit);

    return query;
};


interface ApplyFilters<
    T extends object,
    QueryType extends PostgrestFilterBuilder<Database['public'], Record<string, unknown>, unknown, unknown, unknown>
> {
    query: QueryType;
    where?: WhereOptions<T>;
}

export const applyFilters =
    <T extends object, QueryType extends PostgrestFilterBuilder<Database['public'], Record<string, unknown>, unknown, unknown, unknown>>({
                                                                                                                                             query,
                                                                                                                                             where
                                                                                                                                         }: ApplyFilters<T, QueryType>) => {
        if (!where) return query;

        for (const [column, value] of Object.entries(where)) {
            if (!value) continue;

            if (value instanceof NumberSearchOptions) {
                for (const [operator, operand] of Object.entries(value)) {
                    if (!operand) continue;

                    switch (operator) {
                        case 'eq':
                            query = query.eq(column, operand);
                            break;
                        case 'gt':
                            query = query.gt(column, operand);
                            break;
                        case 'gte':
                            query = query.gte(column, operand);
                            break;
                        case 'lt':
                            query = query.lt(column, operand);
                            break;
                        case 'lte':
                            query = query.lte(column, operand);
                            break;
                    }
                }
            }

            if (value instanceof StringSearchOptions) {
                for (const [operator, operand] of Object.entries(value)) {
                    if (!operand) continue;

                    // Assert operand is a string
                    if (typeof operand !== 'string') {
                        throw new Error(`Expected operand to be a string, but got ${typeof operand}`);
                    }

                    switch (operator) {
                        case 'eq':
                            query = query.eq(column, operand);
                            break;
                        case 'contains':
                            query = query.textSearch(column, operand);
                            break;
                        case 'startsWith':
                            query = query.textSearch(column, operand);
                            break;
                        case 'endsWith':
                            query = query.textSearch(column, operand);
                            break;
                    }
                }
            }

            if (value instanceof StringArraySearchOptions) {
                for (const [operator, operand] of Object.entries(value)) {
                    if (!operand) continue;

                    switch (operator) {
                        case 'contains':
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                            query = query.contains(column, operand);
                            break;
                    }
                }
            }

            if (value instanceof NumberArraySearchOptions) {
                for (const [operator, operand] of Object.entries(value)) {
                    if (!operand) continue;

                    switch (operator) {
                        case 'contains':
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                            query = query.contains(column, operand);
                            break;
                    }
                }
            }
        }

        return query as unknown as QueryType;
    }