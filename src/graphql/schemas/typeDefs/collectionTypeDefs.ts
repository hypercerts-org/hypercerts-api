import { Field, ObjectType } from "type-graphql";

import { EthBigInt } from "../../scalars/ethBigInt.js";

import { BasicTypeDef } from "./baseTypes/basicTypeDef.js";
import { User } from "./userTypeDefs.js";
import { HypercertsResponse } from "./hypercertTypeDefs.js";
import { Blueprint } from "./blueprintTypeDefs.js";
import { DataResponse } from "../../../lib/graphql/DataResponse.js";

@ObjectType({
  description: "Collection of hypercerts for reference and display purposes",
})
export class Collection extends BasicTypeDef {
  //TODO convert to timestamp in seconds
  @Field({ description: "Creation timestamp of the collection" })
  created_at?: string;
  @Field({ description: "Name of the collection" })
  name?: string;
  @Field({ description: "Description of the collection" })
  description?: string;
  @Field(() => [EthBigInt], {
    nullable: true,
    description: "Chain ID of the collection",
  })
  chain_ids?: (bigint | number | string)[];

  @Field(() => [User])
  admins?: User[];

  @Field(() => HypercertsResponse, { nullable: true })
  hypercerts?: HypercertsResponse;

  @Field(() => [Blueprint], { nullable: true })
  blueprints?: Blueprint[];
}

@ObjectType({
  description: "Collection of hypercerts for reference and display purposes",
})
export class GetCollectionsResponse extends DataResponse(Collection) {}
