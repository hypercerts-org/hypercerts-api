import {Field, InputType, Int} from "type-graphql";

@InputType()
export class FetchOptions {
    @Field(_ => Int, {nullable: true})
    from? = 0;

    @Field(_ => Int, {nullable: true})
    to? = 1000;

    @Field(_ => Int, {nullable: true})
    limit? = 100;
}

export class OrderOptions {
    @Field(_ => String, {nullable: true})
    by = 'id';

    @Field(_ => String, {nullable: true})
    order = "ascending";
}

