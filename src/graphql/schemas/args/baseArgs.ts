import { ArgsType, ClassType, Field, Int } from "type-graphql";
import { SortOptions } from "../inputs/sortOptions.js";

export interface PaginationArgs {
  first?: number;
  offset?: number;
}

export function BaseQueryArgs<
  TEntity extends object,
  TWhereInput extends object,
  TSortInput extends SortOptions<TEntity>,
>(
  WhereInputClass: ClassType<TWhereInput>,
  SortInputClass: ClassType<TSortInput>,
) {
  @ArgsType()
  abstract class BaseQueryArgsClass {
    @Field(() => Int, { nullable: true })
    first?: number;

    @Field(() => Int, { nullable: true })
    offset?: number;

    @Field(() => WhereInputClass, { nullable: true })
    where?: TWhereInput;

    @Field(() => SortInputClass, { nullable: true })
    sort?: TSortInput;
  }

  return BaseQueryArgsClass;
}
