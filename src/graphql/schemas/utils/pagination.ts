import {PostgrestFilterBuilder} from "@supabase/postgrest-js";
import type {Database} from "../../../types/supabase.js";
import type {OrderOptions} from "../inputs/orderOptions.js";

interface ApplySorting<
    T extends object,
    QueryType extends PostgrestFilterBuilder<Database['public'], Record<string, unknown>, unknown, unknown, unknown>
> {
    query: QueryType;
    sort?: OrderOptions<T>;
}


export const applySorting = <T extends object, QueryType extends PostgrestFilterBuilder<Database['public'], Record<string, unknown>, unknown, unknown, unknown>>({
                                                                                                                                                                     query,
                                                                                                                                                                     sort
                                                                                                                                                                 }: ApplySorting<T, QueryType>) => {
    if (!sort) return query;

    const ascending = sort?.order !== 'descending';
    if (sort.by) {
        query = query.order(sort.by, {ascending})
    }
    if (!sort.by) {
        query = query.order('id', {ascending})
    }

    return query;

}