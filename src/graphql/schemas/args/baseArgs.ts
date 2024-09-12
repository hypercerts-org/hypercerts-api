import { Field, ArgsType, ClassType, Int } from "type-graphql";
import { WhereOptions } from "../inputs/whereOptions.js";
import { OrderOptions } from "../inputs/orderOptions.js";

export type BaseArgs<T extends object> = {
  where?: WhereOptions<T>;
  sort?: OrderOptions<T>;
};

export function withPagination<TItem extends ClassType>(TItemClass: TItem) {
  @ArgsType()
  class withPaginationClass extends TItemClass {
    @Field(() => Int, { nullable: true })
    first?: number;

    @Field(() => Int, { nullable: true })
    offset?: number;
  }

  return withPaginationClass;
}
