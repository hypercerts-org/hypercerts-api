import {ArgsType, Field, InputType} from "type-graphql";
import {AttestationFetchInput, BasicAttestationWhereInput} from "../inputs/attestationInput.js";
import {PaginationArgs} from "./paginationArgs.js";
import {BasicHypercertWhereInput} from "../inputs/hypercertsInput.js";
import {BasicMetadataWhereInput} from "../inputs/metadataInput.js";

@InputType()
export class AttestationWhereInput extends BasicAttestationWhereInput {
    @Field(_ => BasicAttestationWhereInput, {nullable: true})
    attestations?: BasicAttestationWhereInput;
    @Field(_ => BasicHypercertWhereInput, {nullable: true})
    hypercerts?: BasicHypercertWhereInput;
    @Field(_ => BasicMetadataWhereInput, {nullable: true})
    metadata?: BasicMetadataWhereInput;
}

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

export class GetAttestationByClaimIdArgs extends GetAttestationArgs {
    @Field()
    claim_id?: string;
}