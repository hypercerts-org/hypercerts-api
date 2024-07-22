import { Field, ID, ObjectType } from "type-graphql";
import type { CountKeys } from "../enums/countEnums.js";

@ObjectType()
class BasicTypeDef {
  @Field((_) => ID)
  id?: string;
  count?: CountKeys;
}

export { BasicTypeDef };
