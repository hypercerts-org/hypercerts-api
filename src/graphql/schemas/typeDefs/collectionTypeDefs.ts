import { Field, ObjectType } from "type-graphql";
import { BasicTypeDef } from "./basicTypeDef.js";
import {GraphQLBigInt} from "graphql-scalars";

@ObjectType()
class Collection extends BasicTypeDef {
  @Field()
  name?: string;
  @Field({name: "admin_address"})
  admin_id?: string;
  @Field(() => GraphQLBigInt, {nullable: true})
  chain_id?: number;
  @Field()
  background_image?: string;
  @Field()
  grayscale_image?: boolean;
  @Field()
  tile_border_color?: string;
}

export { Collection };
