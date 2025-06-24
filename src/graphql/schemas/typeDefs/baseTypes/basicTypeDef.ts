import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
class BasicTypeDef {
  @Field(() => ID, { nullable: true })
  id?: string;
}

export { BasicTypeDef };
