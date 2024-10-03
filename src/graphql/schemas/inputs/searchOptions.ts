import { Field, InputType, Int } from "type-graphql";
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
export class BigIntSearchOptions {
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
export class NumberSearchOptions {
  @Field(() => Int, { nullable: true })
  eq?: number;

  @Field(() => Int, { nullable: true })
  gt?: number;

  @Field(() => Int, { nullable: true })
  gte?: number;

  @Field(() => Int, { nullable: true })
  lt?: number;

  @Field(() => Int, { nullable: true })
  lte?: number;
}

@InputType()
export class StringArraySearchOptions {
  @Field(() => [String], { nullable: true })
  contains?: string[];

  @Field(() => [String], { nullable: true })
  overlaps?: string[];
}

@InputType()
export class NumberArraySearchOptions {
  @Field(() => [GraphQLBigInt], {
    nullable: true,
    description: "Array of numbers",
  })
  contains?: bigint[];

  @Field(() => [GraphQLBigInt], {
    nullable: true,
    description: "Array of numbers",
  })
  overlaps?: bigint[];
}
