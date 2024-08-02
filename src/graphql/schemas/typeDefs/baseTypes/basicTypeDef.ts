import { Field, ID, ObjectType } from "type-graphql";
import { CountKeys } from "../../enums/countEnums.js";

@ObjectType()
class BasicTypeDef {
  @Field(() => ID)
  id?: string;
  count?: CountKeys;
}

export { BasicTypeDef };
