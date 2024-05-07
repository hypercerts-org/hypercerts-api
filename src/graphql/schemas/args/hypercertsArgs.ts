import {ArgsType, Field} from "type-graphql";
import {HypercertFetchInput, HypercertsWhereInput} from "../inputs/hypercertsInput.js";
import {GraphQLBigInt} from "graphql-scalars";
import {PaginationArgs} from "./paginationArgs.js";

@ArgsType()
export class GetHypercertArgs extends PaginationArgs {
    @Field({nullable: true})
    where?: HypercertsWhereInput;
    @Field({nullable: true})
    sort?: HypercertFetchInput;
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
    @Field()
    contract_address?: string;
    @Field(_ => GraphQLBigInt)
    token_id?: bigint | number | string;
}
