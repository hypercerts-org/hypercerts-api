import { Field, ObjectType } from "type-graphql";
import { BasicTypeDef } from "./basicTypeDef.js";
import { EthBigInt } from "../../scalars/ethBigInt.js";

@ObjectType()
class Collection extends BasicTypeDef {
    @Field()
    name?: string;
    @Field()
    admin_id?: string;
    @Field(() => EthBigInt, { nullable: true })
    chain_id?: bigint | number;
    @Field({ nullable: true })
    background_image?: string;
    @Field({ nullable: true })
    grayscale_image?: boolean;
    @Field({ nullable: true })
    tile_border_color?: string;
}

export {Collection};
