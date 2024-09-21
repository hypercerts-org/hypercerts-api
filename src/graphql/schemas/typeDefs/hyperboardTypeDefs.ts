import { Field, ObjectType } from "type-graphql";
import { BasicTypeDef } from "./baseTypes/basicTypeDef.js";
import { EthBigInt } from "../../scalars/ethBigInt.js";

@ObjectType({
  description: "Hyperboard of hypercerts for reference and display purposes",
})
class Hyperboard extends BasicTypeDef {
  @Field({ description: "Name of the collection" })
  name?: string;
  @Field({ description: "Address of the hyperboard owner" })
  admin_id?: string;
  @Field(() => EthBigInt, {
    nullable: true,
    description: "Chain ID of the hyperboard",
  })
  chain_id?: bigint | number;
  @Field({ nullable: true, description: "Background image of the hyperboard" })
  background_image?: string;
  @Field({
    nullable: true,
    description:
      "Whether the hyperboard should be rendered as a grayscale image",
  })
  grayscale_image?: boolean;
  @Field({
    nullable: true,
    description: "Color of the borders of the hyperboard",
  })
  tile_border_color?: string;

  @Field(() => [Collection])
  collections?: {
    id: string;
    created_at: string;
    name: string;
    description: string;
    admin_id: string;
    hidden: boolean;
    chain_id: number;
    hypercerts: [];
  }[];
}

@ObjectType({
  description: "Collection of hypercerts for reference and display purposes",
})
class Collection extends BasicTypeDef {
  @Field({ description: "ID of the collection" })
  created_at?: string;
  @Field({ description: "Name of the collection" })
  name?: string;
  @Field({ description: "Description of the collection" })
  description?: string;
  @Field({ description: "Address of the collection owner" })
  admin_id?: string;
  @Field({ description: "Whether the collection should be hidden" })
  hidden?: boolean;
  @Field(() => EthBigInt, {
    nullable: true,
    description: "Chain ID of the collection",
  })
  chain_id?: number;
  @Field(() => [HypercertEntry], {
    nullable: true,
    description: "Hypercert entries in the collection",
  })
  hypercerts?: [];
}

@ObjectType({
  description: "Collection hypercert entry",
})
class HypercertEntry extends BasicTypeDef {
  @Field({ description: "ID of the hypercert" })
  hypercert_id?: string;
  @Field({ description: "Display size of the hypercert" })
  display_size?: number;
  @Field({ description: "Address of the hypercert owner" })
  admin_id?: string;
  @Field(() => EthBigInt, {
    nullable: true,
    description: "Chain ID of the hypercert",
  })
  chain_id?: bigint | number;
}

export { Hyperboard };
