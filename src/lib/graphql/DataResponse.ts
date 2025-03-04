import { type ClassType, Field, Int, ObjectType } from "type-graphql";

export function DataResponse<TItem extends object>(
  TItemClass: ClassType<TItem>,
) {
  @ObjectType()
  abstract class DataResponseClass {
    @Field(() => [TItemClass], { nullable: true })
    data?: TItem[];

    @Field(() => Int, { nullable: true })
    count?: number;
  }

  return DataResponseClass;
}
