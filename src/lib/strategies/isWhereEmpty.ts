import { FilterValue } from "../db/queryModifiers/buildWhereCondition.js";
import { WhereArgsType } from "../../lib/graphql/createEntityWhereArgs.js";
import { EntityTypeDefs } from "../../graphql/schemas/typeDefs/typeDefs.js";
import { EntityFields } from "../graphql/createEntityArgs.js";

export function isWhereEmpty(
  where:
    | WhereArgsType<EntityTypeDefs, EntityFields>
    | FilterValue
    | Record<string, FilterValue>
    | undefined,
): boolean {
  if (!where) return true;
  if (Array.isArray(where)) return where.length === 0;
  return Object.values(where).filter((x) => x !== undefined).length === 0;
}
