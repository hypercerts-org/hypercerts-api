import {ArgsType, Field} from "type-graphql";
import {AttestationFetchInput, AttestationWhereInput} from "../inputs/attestationInput.js";
import {GraphQLBigInt} from "graphql-scalars";
import {PaginationArgs} from "./paginationArgs.js";

@ArgsType()
export class GetAttestationArgs extends PaginationArgs {
    @Field({nullable: true})
    where?: AttestationWhereInput;
    @Field({nullable: true})
    sort?: AttestationFetchInput;
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
    @Field()
    contract_address?: string;
    @Field(_ => GraphQLBigInt)
    token_id?: bigint | number | string;
}

export class GetAttestationByClaimIdArgs {
    @Field()
    claim_id?: string;
}