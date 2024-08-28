import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
class BasicTypeDef {
  @Field(() => ID)
  id?: string;
}

export { BasicTypeDef };
