import { Field, ID, ObjectType } from "type-graphql";
import GetAttestationsResponse from "../resolvers/attestationResolver.js";
import { EthBigInt } from "../../scalars/ethBigInt.js";
import { BasicTypeDef } from "./basicTypeDef.js";
import GetFractionsResponse from "../resolvers/fractionResolver.js";
import { Metadata } from "./metadataTypeDefs.js";
import { Contract } from "./contractTypeDefs.js";
import GetOrdersResponse from "../resolvers/orderResolver.js";
import GetSalesResponse from "../resolvers/salesResolver.js";

@ObjectType()
class Hypercert extends BasicTypeDef {
  // Hypercert table fields
  @Field((_) => ID, {
    nullable: true,
    description: "The UUID of the contract as stored in the database",
  })
  contracts_id?: string;
  @Field((_) => ID, {
    nullable: true,
    description:
      "Concatenation of [chainID]-[contractAddress]-[tokenID] to discern hypercerts across chains",
  })
  hypercert_id?: string;
  @Field({
    nullable: true,
    description: "The address of the creator of the hypercert",
  })
  creator_address?: string;
  @Field((_) => EthBigInt, {
    nullable: true,
    description: "The token ID of the hypercert",
  })
  token_id?: bigint | number;
  @Field((_) => EthBigInt, {
    nullable: true,
    description: "The total units held by the hypercert",
  })
  units?: bigint | number;
  @Field({
    nullable: true,
    description: "References the metadata for this claim",
  })
  uri?: string;

  // Resolved fields
  @Field((_) => Contract, {
    nullable: true,
    description: "The contract that the hypercert is associated with",
  })
  contract?: Contract;
  @Field((_) => Metadata, {
    nullable: true,
    description: "The metadata for the hypercert as referenced by the uri",
  })
  metadata?: Metadata;
  @Field((_) => GetFractionsResponse, {
    nullable: true,
    description:
      "Transferable fractions representing partial ownership of the hypercert",
  })
  fractions?: GetFractionsResponse;
  @Field((_) => GetAttestationsResponse, {
    nullable: true,
    description: "Attestations for the hypercert or parts of its data",
  })
  attestations?: GetAttestationsResponse;
  @Field((_) => GetOrdersResponse, {
    nullable: true,
    description: "Marketplace orders related to this hypercert",
  })
  orders?: GetOrdersResponse;

  @Field(() => GetSalesResponse, {
    nullable: true,
    description: "Sales related to this hypercert",
  })
  sales?: GetSalesResponse;

  @Field((_) => EthBigInt, {nullable: true})
  creation_block_number?: bigint | number | string;
  @Field((_) => EthBigInt, {nullable: true})
  creation_block_timestamp?: bigint | number | string;
  @Field((_) => EthBigInt, {nullable: true})
  last_update_block_number?: bigint | number | string;
  @Field((_) => EthBigInt, {nullable: true})
  last_update_block_timestamp?: bigint | number | string;
}

export { Hypercert };
