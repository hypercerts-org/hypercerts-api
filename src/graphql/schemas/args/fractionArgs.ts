import {ArgsType, Field, ID, InputType} from "type-graphql";
import {BasicFractionWhereInput, FractionFetchInput,} from "../inputs/fractionInput.js";
import {PaginationArgs} from "./paginationArgs.js";
import {BasicHypercertWhereInput} from "../inputs/hypercertsInput.js";

@InputType()
export class FractionWhereInput extends BasicFractionWhereInput {
    @Field(_ => BasicHypercertWhereInput, {nullable: true})
    hypercerts?: BasicHypercertWhereInput;
}

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
