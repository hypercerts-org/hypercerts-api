import { Field, ObjectType } from "type-graphql";
import { BasicTypeDef } from "./baseTypes/basicTypeDef.js";
import { EthBigInt } from "../../scalars/ethBigInt.js";

@ObjectType({
  description: "Collection of hypercerts for reference and display purposes",
})
class Collection extends BasicTypeDef {
  @Field({ description: "Name of the collection" })
  name?: string;
  @Field({ description: "Address of the collection owner" })
  admin_id?: string;
  @Field(() => EthBigInt, {
    nullable: true,
    description: "Chain ID of the collection",
  })
  chain_id?: bigint | number;
  @Field({ nullable: true, description: "Background image of the collection" })
  background_image?: string;
  @Field({
    nullable: true,
    description:
      "Whether the collection should be rendered as a grayscale image",
  })
  grayscale_image?: boolean;
  @Field({
    nullable: true,
    description: "Color of the borders of the hypercert collection",
  })
  tile_border_color?: string;
}

export { Collection };
