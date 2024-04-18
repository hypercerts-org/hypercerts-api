import {Field, InputType, Int} from "type-graphql";

@InputType()
export class FetchParams {
    @Field(_ => Int, {nullable: true})
    offset = 0;

    @Field(_ => Int, {nullable: true})
    limit = 100;
}
