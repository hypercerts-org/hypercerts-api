import {ArgsType, Field, InputType} from "type-graphql";
import {BasicHypercertWhereInput, HypercertFetchInput,} from "../inputs/hypercertsInput.js";
import {GraphQLBigInt} from "graphql-scalars";
import {PaginationArgs} from "./paginationArgs.js";
import {BasicContractWhereInput} from "../inputs/contractInput.js";
import {BasicMetadataWhereInput} from "../inputs/metadataInput.js";
import {BasicAttestationWhereInput} from "../inputs/attestationInput.js";
import {BasicFractionWhereInput} from "../inputs/fractionInput.js";
import {IdSearchOptions} from "../inputs/searchOptions.js";

@InputType()
export class HypercertsWhereInput extends BasicHypercertWhereInput {
    @Field(_ => BasicContractWhereInput, {nullable: true})
    contract?: BasicContractWhereInput;
    @Field(_ => BasicMetadataWhereInput, {nullable: true})
    metadata?: BasicMetadataWhereInput;
    @Field(_ => BasicAttestationWhereInput, {nullable: true})
    attestations?: BasicAttestationWhereInput;
    @Field(_ => BasicFractionWhereInput, {nullable: true})
    fractions?: BasicFractionWhereInput
}

@ArgsType()
export class GetHypercertArgs extends PaginationArgs {
    @Field({nullable: true})
    where?: HypercertsWhereInput;
    @Field({nullable: true})
    sort?: HypercertFetchInput;
}

@ArgsType()
export class GetHypercertByIdArgs {
    @Field(_ => IdSearchOptions, {nullable: true})
    id?: string;
    @Field({nullable: true})
    hypercert_id?: string;
}

@ArgsType()
export class GetHypercertByChainContractTokenArgs {
    @Field(_ => GraphQLBigInt)
    chain_id?: bigint | number | string;
    @Field()
    contract_address?: string;
    @Field(_ => GraphQLBigInt)
    token_id?: bigint | number | string;
}
