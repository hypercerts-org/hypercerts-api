import { Fraction } from "../typeDefs/fractionTypeDefs.js";
import { Metadata } from "../typeDefs/metadataTypeDefs.js";
import { createEntityArgs } from "./argGenerator.js";
import { BaseQueryArgs } from "./baseArgs.js";
import { WhereFieldDefinitions } from "./whereFieldDefinitions.js";

// @InputType()
// export class FractionWhereInput extends BasicFractionWhereInput {
//   @Field(() => BasicHypercertWhereArgs, { nullable: true })
//   hypercerts?: BasicHypercertWhereArgs;
// }

// @InputType()
// export class FractionFetchInput implements OrderOptions<Fraction> {
//   @Field(() => FractionSortOptions, { nullable: true })
//   by?: FractionSortOptions;
// }

// @ArgsType()
// export class FractionArgs {
//   @Field(() => FractionWhereInput, { nullable: true })
//   where?: FractionWhereInput;
//   @Field(() => FractionFetchInput, { nullable: true })
//   sort?: FractionFetchInput;
// }

// @ArgsType()
// export class GetFractionsArgs extends withPagination(FractionArgs) {}

const {
  WhereArgs: FractionWhereArgs,
  EntitySortOptions: FractionSortOptions,
  SortArgs: FractionSortArgs,
} = createEntityArgs<Fraction>("Fraction", {
  id: "id",
  creation_block_timestamp: "bigint",
  creation_block_number: "bigint",
  last_update_block_number: "bigint",
  last_update_block_timestamp: "bigint",
  owner_address: "string",
  units: "bigint",
  hypercert_id: "string",
  fraction_id: "string",
  token_id: "bigint",
  metadata: {
    type: "id",
    references: {
      entity: Metadata,
      fields: WhereFieldDefinitions.Metadata.fields,
    },
  },
});

export const GetFractionsArgs = BaseQueryArgs(
  FractionWhereArgs,
  FractionSortArgs,
);
export type GetFractionsArgs = InstanceType<typeof GetFractionsArgs>;

export { FractionSortArgs, FractionSortOptions, FractionWhereArgs };
