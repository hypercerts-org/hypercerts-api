import {PostgrestFilterBuilder} from "@supabase/postgrest-js";
import type {Database} from "../../../types/supabase.js";
import {PaginationArgs} from "../args/paginationArgs.js";

interface ApplyPagination<
    QueryType extends PostgrestFilterBuilder<Database['public'], Record<string, unknown>, unknown, unknown, unknown>
> {
    query: QueryType;
    pagination?: PaginationArgs;
}


export const applyPagination = <QueryType extends PostgrestFilterBuilder<Database['public'], Record<string, unknown>, unknown, unknown, unknown>>({
                                                                                                                                                      query,
                                                                                                                                                      pagination
                                                                                                                                                  }: ApplyPagination<QueryType>) => {
    if (!pagination) return query;

    const {first, offset} = pagination;

    if (first && offset) query = query.range(offset, offset + first - 1);

    if (first && !offset) query = query.limit(first);

    return query;

}