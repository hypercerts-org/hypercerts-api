import { Field, ObjectType } from "type-graphql";

import { EthBigInt } from "../../scalars/ethBigInt.js";

import { BasicTypeDef } from "./baseTypes/basicTypeDef.js";
import { User } from "./userTypeDefs.js";
import { Hypercert } from "./hypercertTypeDefs.js";
import { Blueprint } from "./blueprintTypeDefs.js";

@ObjectType({
  description: "Collection of hypercerts for reference and display purposes",
})
export class Collection extends BasicTypeDef {
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

  @Field(() => [Hypercert], { nullable: true })
  hypercerts?: Hypercert[];

  @Field(() => [Blueprint], { nullable: true })
  blueprints?: Blueprint[];
}
