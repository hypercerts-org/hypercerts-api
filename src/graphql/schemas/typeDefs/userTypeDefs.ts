import { Field, ObjectType } from "type-graphql";

@ObjectType()
class User {
  @Field({ description: "The address of the user" })
  address?: string;

  @Field({ description: "The display name of the user", nullable: true })
  display_name?: string;

  @Field({ description: "The avatar of the user", nullable: true })
  avatar?: string;

  @Field()
  chain_id?: number;
}

export { User };
