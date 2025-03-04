import { Field, ObjectType } from "type-graphql";
import { BasicTypeDef } from "./baseTypes/basicTypeDef.js";
import { EthBigInt } from "../../scalars/ethBigInt.js";
import GetUsersResponse, { User } from "./userTypeDefs.js";
import { GraphQLBigInt } from "graphql-scalars";
import { Collection } from "./collectionTypeDefs.js";
import { DataResponse } from "../../../lib/graphql/DataResponse.js";

@ObjectType({
  description: "Hyperboard of hypercerts for reference and display purposes",
})
export class Hyperboard extends BasicTypeDef {
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

  @Field(() => GetUsersResponse)
  admins?: GetUsersResponse;

  @Field(() => [SectionResponseType])
  sections?: SectionResponseType[];

  @Field(() => [HyperboardOwner])
  owners?: HyperboardOwner[];
}

@ObjectType({})
export class SectionResponseType {
  @Field(() => [Section])
  data?: Section[];

  @Field()
  count?: number;
}

@ObjectType({
  description: "Section representing a collection within a hyperboard",
})
export class Section {
  @Field()
  label?: string;

  @Field(() => Collection)
  collection?: Collection;

  @Field(() => [SectionEntry])
  entries?: SectionEntry[];

  @Field(() => [HyperboardOwner])
  owners?: HyperboardOwner[];
}

@ObjectType()
export class HyperboardOwner extends User {
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

@ObjectType()
export class GetHyperboardsResponse extends DataResponse(Hyperboard) {}
