import { Field, ID, ObjectType } from "type-graphql";
import { EthBigInt } from "../../scalars/ethBigInt.js";
import { BasicTypeDef } from "./baseTypes/basicTypeDef.js";
import { Metadata } from "./metadataTypeDefs.js";
import { DataResponse } from "../../../lib/graphql/DataResponse.js";
import { GetOrdersResponse } from "./orderTypeDefs.js";
import { GetSalesResponse } from "./salesTypeDefs.js";

@ObjectType({
  description: "Fraction of an hypercert",
  simpleResolvers: true,
})
export class Fraction extends BasicTypeDef {
  @Field(() => EthBigInt, {
    nullable: true,
    description: "The token ID of the fraction",
  })
  token_id?: bigint;

  @Field({
    nullable: true,
    description: "The ID of the claims",
  })
  claims_id?: string;
  @Field({
    nullable: true,
    description: "Address of the owner of the fractions",
  })
  owner_address?: string;

  @Field(() => EthBigInt, {
    nullable: true,
    description: "Units held by the fraction",
  })
  units?: bigint;

  @Field(() => ID, {
    nullable: true,
    description:
      "The ID of the fraction concatenated from the chain ID, contract address, and ID of the hypercert claim",
  })
  hypercert_id?: string;

  @Field(() => ID, {
    nullable: true,
    description:
      "The ID of the fraction concatenated from the chain ID, contract address, and token ID of the fraction",
  })
  fraction_id?: string;

  @Field(() => EthBigInt, {
    nullable: true,
    description: "Block number of the creation of the fraction",
  })
  creation_block_number?: bigint | number | string;
  @Field(() => EthBigInt, {
    nullable: true,
    description: "Timestamp of the block of the creation of the fraction",
  })
  creation_block_timestamp?: bigint | number | string;
  @Field(() => EthBigInt, {
    nullable: true,
    description: "Block number of the last update of the fraction",
  })
  last_update_block_number?: bigint | number | string;
  @Field(() => EthBigInt, {
    nullable: true,
    description: "Timestamp of the block of the last update of the fraction",
  })
  last_update_block_timestamp?: bigint | number | string;

  // Resolved fields
  @Field(() => GetOrdersResponse, {
    nullable: true,
    description: "Marketplace orders related to this fraction",
  })
  orders?: GetOrdersResponse;

  @Field(() => Metadata, {
    nullable: true,
    description: "The metadata for the fraction",
  })
  metadata?: Metadata;

  @Field(() => GetSalesResponse, {
    nullable: true,
    description: "Sales related to this fraction",
  })
  sales?: GetSalesResponse;

  @Field({
    nullable: true,
    description: "Whether the fraction has been burned",
  })
  burned?: boolean;
}

@ObjectType()
export class GetFractionsResponse extends DataResponse(Fraction) {}
