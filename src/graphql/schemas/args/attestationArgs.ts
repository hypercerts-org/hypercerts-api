import {ArgsType, Field} from "type-graphql";
import {AttestationFetchInput, AttestationWhereInput} from "../inputs/attestationInput.js";
import {GraphQLBigInt} from "graphql-scalars";

@ArgsType()
export class GetAttestationArgs {
    @Field({nullable: true})
    where?: AttestationWhereInput;
    @Field({nullable: true})
    page?: AttestationFetchInput;
}


@ArgsType()
export class GetAttestationByUidArgs {
    @Field()
    attestation_uid?: string;
}

@ArgsType()
export class GetAttestationBySchemaIdArgs {
    @Field()
    supported_schema_id?: string;
}

export class GetAttestationByChainContractTokenArgs {
    @Field(_ => GraphQLBigInt)
    chain_id?: bigint | number | string;
    @Field(_ => String)
    contract_address?: string;
    @Field(_ => GraphQLBigInt)
    token_id?: bigint | number | string;
}

export class GetAttestationByClaimIdArgs {
    @Field(_ => String)
    claim_id?: string;
}