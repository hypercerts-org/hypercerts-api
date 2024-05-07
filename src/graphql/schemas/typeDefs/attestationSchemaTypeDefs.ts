import {Field, ID, ObjectType} from "type-graphql";
import {GraphQLBigInt} from 'graphql-scalars';
import {Attestation} from "./attestationTypeDefs.js";

@ObjectType()
class AttestationSchema {
    @Field(_ => ID, {nullable: true})
    id?: string;
    @Field(_ => GraphQLBigInt, {nullable: true})
    chain_id?: bigint | number | string;
    @Field(_ => ID, {nullable: true})
    eas_schema_id?: string;
    @Field({nullable: true})
    resolver?: string;
    @Field({nullable: true})
    revocable?: boolean;
    @Field({nullable: true})
    schema?: string;

    @Field(_ => [Attestation], {nullable: true})
    records?: Attestation[] | null;
}


export {AttestationSchema}
