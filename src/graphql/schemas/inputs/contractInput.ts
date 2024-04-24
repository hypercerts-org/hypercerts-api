import {Field, InputType, Int} from "type-graphql";
import type {WhereOptions} from "./whereOptions.js";
import {Contract} from "../typeDefs/contractTypeDefs.js";
import {NumberSearchOptions, StringSearchOptions} from "./searchOptions.js";
import {FetchOptions} from "./fetchOptions.js";

@InputType()
export class ContractWhereInput implements WhereOptions<Contract> {
    @Field(_ => StringSearchOptions, {nullable: true})
    id?: StringSearchOptions | null;
    @Field(_ => StringSearchOptions, {nullable: true})
    contract_address?: StringSearchOptions | null;
    @Field(_ => NumberSearchOptions, {nullable: true})
    chain_id?: NumberSearchOptions | null;
}


// @InputType()
// export class HypercertFetchInput implements FetchParams {
//     @Field(_ => Int, {nullable: true})
//     offset = 0;
//     @Field(_ => Int, {nullable: true})
//     limit = 100;
// }

@InputType()
export class ContractFetchInput implements FetchOptions {
    @Field(_ => Int, {nullable: true})
    from = 0;
    @Field(_ => Int, {nullable: true})
    to = 1000;
    @Field(_ => Int, {nullable: true})
    limit = 1000;
}