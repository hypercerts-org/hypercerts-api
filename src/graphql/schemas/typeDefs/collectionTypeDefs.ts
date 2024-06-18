import { Field, ObjectType } from "type-graphql";
import { BasicTypeDef } from "./basicTypeDef.js";

@ObjectType()
class Collection extends BasicTypeDef {
  @Field()
  name?: string;
  @Field()
  admin_id?: string;
  @Field()
  chain_id?: number;
  @Field()
  background_image?: string;
  @Field()
  grayscale_image?: boolean;
  @Field()
  tile_border_color?: string;
}

export { Collection };
