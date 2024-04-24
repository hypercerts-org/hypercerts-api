import {ArgsType, Field} from "type-graphql";
import {HypercertFetchInput, HypercertsWhereInput} from "../inputs/hypercertsInput.js";
import {GraphQLBigInt} from "graphql-scalars";

@ArgsType()
export class GetHypercertArgs {
    @Field({nullable: true})
    where?: HypercertsWhereInput;
    @Field({nullable: true})
    page?: HypercertFetchInput;
}

@ArgsType()
export class GetHypercertByIdArgs {
    @Field({nullable: true})
    id?: string;
    @Field({nullable: true})
    hypercert_id?: string;
}

@ArgsType()
export class GetHypercertByChainContractTokenArgs {
    @Field(_ => GraphQLBigInt)
    chain_id?: bigint | number | string;
    @Field(_ => String)
    contract_address?: string;
    @Field(_ => GraphQLBigInt)
    token_id?: bigint | number | string;
}
