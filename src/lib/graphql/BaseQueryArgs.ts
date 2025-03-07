import { ArgsType, ClassType, Field, Int } from "type-graphql";
import { SortOrder } from "../../graphql/schemas/enums/sortEnums.js";
import { EntityTypeDefs } from "../../graphql/schemas/typeDefs/typeDefs.js";
import { EntityFields } from "./createEntityArgs.js";
import type { SortByArgsType } from "./createEntitySortArgs.js";
import type { WhereArgsType } from "./createEntityWhereArgs.js";

export type BaseQueryArgsType<
  TWhereInput extends object,
  TSortOptions extends Record<string, SortOrder | null | undefined>,
> = {
  first?: number;
  offset?: number;
  where?: TWhereInput;
  sortBy?: TSortOptions;
};

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
