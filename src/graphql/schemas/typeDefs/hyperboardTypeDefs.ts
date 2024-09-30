import { Field, ObjectType } from "type-graphql";
import { BasicTypeDef } from "./baseTypes/basicTypeDef.js";
import { EthBigInt } from "../../scalars/ethBigInt.js";
import { User } from "./userTypeDefs.js";
import { GraphQLBigInt } from "graphql-scalars";

@ObjectType({
  description: "Hyperboard of hypercerts for reference and display purposes",
})
class Hyperboard extends BasicTypeDef {
  @Field({ description: "Name of the hyperboard" })
  name?: string;
  @Field(() => [EthBigInt], {
    nullable: true,
    description: "Chain ID of the hyperboard",
  })
  chain_ids?: (bigint | number | string)[];
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

  @Field(() => [User])
  admins?: User[];

  @Field(() => SectionResponseType)
  sections?: SectionResponseType[];
}

@ObjectType({})
class SectionResponseType {
  @Field(() => [Section])
  data?: Section[];

  @Field()
  count?: number;
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
  chain_ids?: (bigint | number | string)[];

  @Field(() => [User])
  admins?: User[];
}

@ObjectType({
  description: "Section representing a collection within a hyperboard",
})
class Section {
  @Field()
  label?: string;

  @Field(() => Collection)
  collection?: Collection;

  @Field(() => [SectionEntry])
  entries?: SectionEntry[];

  @Field(() => [SectionOwner])
  owners?: SectionOwner[];
}

@ObjectType()
class SectionOwner extends User {
  @Field()
  percentage_owned?: number;
}

@ObjectType({
  description: "Entry representing a hypercert or blueprint within a section",
})
class SectionEntry {
  @Field({ description: "ID of the hypercert or blueprint" })
  id?: string;
  @Field()
  is_blueprint?: boolean;
  @Field()
  percentage_of_section?: number;
  @Field()
  display_size?: number;
  @Field({ description: "Name of the hypercert or blueprint", nullable: true })
  name?: string;
  @Field(() => GraphQLBigInt, { nullable: true })
  total_units?: bigint | number | string;

  @Field(() => [SectionEntryOwner])
  owners?: SectionEntryOwner[];
}

@ObjectType()
class SectionEntryOwner extends User {
  @Field()
  percentage?: number;
  @Field(() => GraphQLBigInt, { nullable: true })
  units?: bigint | number | string;
}

export { Hyperboard };
