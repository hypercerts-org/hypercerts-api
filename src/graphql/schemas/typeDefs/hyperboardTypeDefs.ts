import { Field, ObjectType } from "type-graphql";
import { BasicTypeDef } from "./baseTypes/basicTypeDef.js";
import { EthBigInt } from "../../scalars/ethBigInt.js";
import { User } from "./userTypeDefs.js";

@ObjectType({
  description: "Hyperboard of hypercerts for reference and display purposes",
})
class Hyperboard extends BasicTypeDef {
  @Field({ description: "Name of the collection" })
  name?: string;
  @Field(() => [EthBigInt], {
    nullable: true,
    description: "Chain ID of the hyperboard",
  })
  chain_ids?: (bigint | number)[];
  @Field({ nullable: true, description: "Background image of the hyperboard" })
  background_image?: string;
  @Field({
    nullable: true,
    description:
      "Whether the hyperboard should be rendered as a grayscale image",
  })
  grayscale_images?: boolean;
  @Field({
    nullable: true,
    description: "Color of the borders of the hyperboard",
  })
  tile_border_color?: string;

  @Field(() => [Collection])
  collections?: Collection[];

  @Field(() => [User])
  admins?: User[];

  @Field(() => [HypercertMetadata], {
    nullable: true,
    description:
      "Hypercert metadata entries within the context of the hyperboard",
  })
  hypercert_metadata?: HypercertMetadata[];
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
  @Field({ description: "Whether the collection should be hidden" })
  hidden?: boolean;
  @Field(() => [EthBigInt], {
    nullable: true,
    description: "Chain ID of the collection",
  })
  chain_ids?: number[];
  @Field(() => [HypercertEntry], {
    nullable: true,
    description: "Hypercert entries in the collection",
  })
  hypercerts?: HypercertEntry[];
}

@ObjectType({
  description: "Collection hypercert entry",
})
class HypercertEntry {
  @Field({ description: "ID of the hypercert" })
  hypercert_id?: string;
}

@ObjectType({
  description: "Hypercert metadata entries within the context of a hyperboard",
})
class HypercertMetadata {
  @Field({ description: "ID of the hypercert" })
  hypercert_id?: string;
  @Field({ description: "Factor of the hypercert" })
  display_size?: number;
}

export { Hyperboard };
