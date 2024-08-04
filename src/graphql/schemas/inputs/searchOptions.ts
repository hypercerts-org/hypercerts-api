import { Field, InputType } from "type-graphql";
import { GraphQLBigInt, GraphQLUUID } from "graphql-scalars";

@InputType()
export class BooleanSearchOptions {
  @Field({ nullable: true })
  eq?: boolean;
}

@InputType()
export class IdSearchOptions {
  @Field(() => GraphQLUUID, { nullable: true })
  eq?: string;
}

@InputType()
export class StringSearchOptions {
  @Field({ nullable: true })
  eq?: string;

  @Field({ nullable: true })
  contains?: string;

  @Field({ nullable: true })
  startsWith?: string;

  @Field({ nullable: true })
  endsWith?: string;
}

@InputType()
export class NumberSearchOptions {
  @Field(() => GraphQLBigInt, { nullable: true })
  eq?: bigint | number;

  @Field(() => GraphQLBigInt, { nullable: true })
  gt?: bigint | number;

  @Field(() => GraphQLBigInt, { nullable: true })
  gte?: bigint | number;

  @Field(() => GraphQLBigInt, { nullable: true })
  lt?: bigint | number;

  @Field(() => GraphQLBigInt, { nullable: true })
  lte?: bigint | number;
}

@InputType()
export class StringArraySearchOptions {
  @Field(() => [String], { nullable: true })
  contains?: string[];
}

@InputType()
export class NumberArraySearchOptions {
  @Field(() => [GraphQLBigInt], { nullable: true })
  contains?: bigint[] | number[];
}
