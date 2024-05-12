import {ArgsType, Field, Int} from "type-graphql";
import {CountKeys} from "../enums/countEnums.js";

@ArgsType()
export class PaginationArgs {
    @Field(_ => CountKeys, {nullable: true})
    count?: CountKeys;

    @Field(_ => Int, {nullable: true})
    first?: number;

    @Field(_ => Int, {nullable: true})
    offset?: number;
}
