import {ArgsType, Field, ID} from "type-graphql";
import {FractionFetchInput, FractionWhereInput} from "../inputs/fractionInput.js";
import {PaginationArgs} from "./paginationArgs.js";

@ArgsType()
export class GetFractionArgs extends PaginationArgs {
    @Field({nullable: true})
    where?: FractionWhereInput;
    @Field({nullable: true})
    sort?: FractionFetchInput;
}

@ArgsType()
export class GetFractionsByClaimId {
    @Field(_ => ID)
    claim_id: string = "";
}
