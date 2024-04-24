import {ArgsType, Field} from "type-graphql";
import {ContractFetchInput, ContractWhereInput} from "../inputs/contractInput.js";

@ArgsType()
export class GetContractsArgs {
    @Field({nullable: true})
    where?: ContractWhereInput;
    @Field({nullable: true})
    page?: ContractFetchInput;
}

@ArgsType()
export class GetContractByIdArgs {
    @Field({nullable: true})
    id?: string;
}