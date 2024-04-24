import {ArgsType, Field, ID} from "type-graphql";
import {FractionFetchInput, FractionWhereInput} from "../inputs/fractionInput.js";

@ArgsType()
export class GetFractionArgs {
    @Field({nullable: true})
    where?: FractionWhereInput;
    @Field({nullable: true})
    page?: FractionFetchInput;
}

@ArgsType()
export class GetFractionsByClaimId extends GetFractionArgs{
    @Field(_ => ID)
    claim_id: string = "";
}
