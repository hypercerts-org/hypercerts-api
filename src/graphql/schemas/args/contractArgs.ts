import {ArgsType, Field} from "type-graphql";
import {ContractFetchInput, ContractWhereInput} from "../inputs/contractInput.js";
import {PaginationArgs} from "./paginationArgs.js";

@ArgsType()
export class GetContractsArgs extends PaginationArgs {
    @Field({nullable: true})
    where?: ContractWhereInput;
    @Field({nullable: true})
    sort?: ContractFetchInput;
}

@ArgsType()
export class GetContractByIdArgs {
    @Field({nullable: true})
    id?: string;
}