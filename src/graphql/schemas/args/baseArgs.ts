import { Field, ArgsType, ClassType   } from "type-graphql";
import { WhereOptions } from "../inputs/whereOptions.js";
import { SortOptions } from "../inputs/sortOptions.js";

export type BaseArgs<T extends object> = {
  where?: WhereOptions<T>;
  sort?: SortOptions<T>;
}

export function withPagination<TItem extends ClassType>(TItemClass: TItem) {
  @ArgsType()
  class withPaginationClass extends TItemClass {
    @Field({ nullable: true })
    first?: number;

    @Field({ nullable: true })
    offset?: number;
  }

  return withPaginationClass;
}