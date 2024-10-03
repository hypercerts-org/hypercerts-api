import { ArgsType, InputType, Field } from "type-graphql";
import { withPagination } from "./baseArgs.js";
import { BasicUserWhereInput } from "../inputs/userInput.js";

@InputType()
export class UserWhereInput extends BasicUserWhereInput {}

@ArgsType()
class UserArgs {
  @Field(() => UserWhereInput, { nullable: true })
  where?: UserWhereInput;
}

@ArgsType()
export class GetUserArgs extends withPagination(UserArgs) {}
