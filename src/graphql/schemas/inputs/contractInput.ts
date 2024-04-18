import {Field, InputType, Int} from "type-graphql";
import {WhereOptions} from "./whereOptions.js";
import {Contract} from "../typeDefs/contractTypeDefs.js";
import {NumberSearchOptions, StringSearchOptions} from "./searchOptions.js";
import {FetchParams} from "./fetchOptions.js";

@InputType()
export class ContractWhereInput implements WhereOptions<Contract> {
    @Field(_ => StringSearchOptions, {nullable: true})
    id?: StringSearchOptions | null;
    @Field(_ => StringSearchOptions, {nullable: true})
    contract_address?: StringSearchOptions | null;
    @Field(_ => NumberSearchOptions, {nullable: true})
    chain_id?: NumberSearchOptions | null;
}

@InputType()
export class ContractFetchInput implements FetchParams {
    @Field(_ => Int, {nullable: true})
    offset = 0;
    @Field(_ => Int, {nullable: true})
    limit = 100;
}