import { Field, ArgsType, ClassType, Int } from "type-graphql";
import { WhereOptions } from "../inputs/whereOptions.js";
import { OrderOptions } from "../inputs/orderOptions.js";

// TODO BaseArgs is never used. Create a builder function that returns a class with pagination and takes specific where and sort instances
export type BaseArgs<T extends object> = {
  where?: WhereOptions<T>;
  sort?: OrderOptions<T>;
  first?: number;
  offset?: number;
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
