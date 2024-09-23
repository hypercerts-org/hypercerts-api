import { Field, ObjectType } from "type-graphql";

@ObjectType()
class User {
  @Field({ description: "The address of the user" })
  address?: string;

  @Field({ description: "The display name of the user" })
  display_name?: string;

  @Field({ description: "The avatar of the user" })
  avatar?: string;
}

export { User };
