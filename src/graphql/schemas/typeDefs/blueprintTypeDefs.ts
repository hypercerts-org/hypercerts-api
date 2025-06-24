import { GraphQLJSON } from "graphql-scalars";
import { Field, ObjectType } from "type-graphql";
import { DataResponse } from "../../../lib/graphql/DataResponse.js";
import { HypercertsResponse } from "./hypercertTypeDefs.js";
import { User } from "./userTypeDefs.js";

@ObjectType({
  description: "Blueprint for hypercert creation",
})
export class Blueprint {
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

  @Field(() => HypercertsResponse)
  hypercerts?: HypercertsResponse;

  // Internal field, not queryable
  hypercert_ids?: string[];
}

@ObjectType({
  description: "Blueprints for hypercert creation",
})
export class GetBlueprintsResponse extends DataResponse(Blueprint) {}
