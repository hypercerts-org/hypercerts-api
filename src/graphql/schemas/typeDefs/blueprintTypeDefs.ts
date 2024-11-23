import { Field, ObjectType } from "type-graphql";
import { GraphQLJSON } from "graphql-scalars";
import { User } from "./userTypeDefs.js";

@ObjectType()
class Blueprint {
  @Field()
  id?: number;

  @Field()
  created_at?: string;

  @Field(() => GraphQLJSON)
  form_values?: typeof GraphQLJSON;

  @Field()
  minter_address?: string;

  @Field()
  minted?: boolean;

  @Field(() => [User])
  admins?: User[];
}

export { Blueprint };
