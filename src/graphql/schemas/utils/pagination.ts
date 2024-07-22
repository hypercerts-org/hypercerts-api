import { PostgrestTransformBuilder } from "@supabase/postgrest-js";
import type { Database as CachingDatabase } from "../../../types/supabaseCaching.js";
import { PaginationArgs } from "../args/paginationArgs.js";

interface ApplyPagination<
  QueryType extends PostgrestTransformBuilder<
    CachingDatabase["public"],
    Record<string, unknown>,
    unknown,
    unknown,
    unknown
  >,
> {
  query: QueryType;
  pagination?: PaginationArgs;
}

export const applyPagination = <
  QueryType extends PostgrestTransformBuilder<
    CachingDatabase["public"],
    Record<string, unknown>,
    unknown,
    unknown,
    unknown
  >,
>({
  query,
  pagination,
}: ApplyPagination<QueryType>) => {
  if (!pagination) return query;

  const { first, offset } = pagination;

  if (first && !offset) return query.limit(first);

  if (first && offset) return query.range(offset, offset + first - 1);

  return query;
};
