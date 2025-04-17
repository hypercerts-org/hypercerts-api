import { ArgsType, ClassType, Field, Int } from "type-graphql";
import { SortOrder } from "../../graphql/schemas/enums/sortEnums.js";
import { EntityTypeDefs } from "../../graphql/schemas/typeDefs/typeDefs.js";
import { EntityFields } from "./createEntityArgs.js";
import type { SortByArgsType } from "./createEntitySortArgs.js";
import type { WhereArgsType } from "./createEntityWhereArgs.js";

/**
 * Base type for GraphQL query arguments that supports filtering, sorting, and pagination.
 *
 * @typeParam TWhereInput - The type of the where clause input for filtering
 * @typeParam TSortOptions - The type of the sort options for ordering results
 */
export type BaseQueryArgsType<
  TWhereInput extends object,
  TSortOptions extends Record<string, SortOrder | null | undefined>,
> = {
  /** Maximum number of items to return */
  first?: number;
  /** Number of items to skip */
  offset?: number;
  /** Filter conditions for the query */
  where?: TWhereInput;
  /** Sorting options for the query results */
  sortBy?: TSortOptions;
};

/**
 * Creates a GraphQL arguments class with support for filtering, sorting, and pagination.
 * This function generates a type-safe class that can be used as arguments in GraphQL queries.
 *
 * @param WhereArgs - The class type for filtering conditions
 * @param SortArgs - The class type for sorting options
 *
 * @typeParam TEntity - The entity type definition
 * @typeParam TFields - The entity fields configuration
 *
 * @returns A decorated class that can be used as GraphQL query arguments
 *
 * @example
 * ```typescript
 * // First create the entity args
 * const { WhereInput, SortOptions } = createEntityArgs("Attestation", {
 *   id: "string",
 *   claim: "string",
 *   timestamp: "number",
 * });
 *
 * // Create a named args class extending BaseQueryArgs
 * @ArgsType()
 * export class GetAttestationsArgs extends BaseQueryArgs(
 *   AttestationWhereInput,
 *   AttestationSortOptions,
 * ) {}
 *
 * // Use in a resolver
 * @Resolver()
 * class AttestationResolver {
 *   @Query(() => [Attestation])
 *   async attestations(@Args() args: GetAttestationsArgs) {
 *     // Implementation using args.where, args.sortBy, args.first, args.offset
 *   }
 * }
 * ```
 */
export function BaseQueryArgs<
  TEntity extends EntityTypeDefs,
  TFields extends EntityFields,
>(
  WhereArgs: ClassType<WhereArgsType<TEntity, TFields>>,
  SortArgs: ClassType<SortByArgsType<TFields>>,
) {
  @ArgsType()
  class QueryArgs {
    @Field(() => WhereArgs, { nullable: true })
    where?: WhereArgsType<TEntity, TFields>;

    @Field(() => SortArgs, { nullable: true })
    sortBy?: SortByArgsType<TFields>;

    @Field(() => Int, { nullable: true })
    first?: number;

    @Field(() => Int, { nullable: true })
    offset?: number;
  }

  return QueryArgs as ClassType<
    BaseQueryArgsType<WhereArgsType<TEntity, TFields>, SortByArgsType<TFields>>
  >;
}
