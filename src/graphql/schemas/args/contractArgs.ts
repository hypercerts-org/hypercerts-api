import { Contract } from "../typeDefs/contractTypeDefs.js";
import { createEntityArgs } from "./argGenerator.js";
import { BaseQueryArgs } from "./baseArgs.js";

// @InputType()
// export class ContractWhereInput extends BasicContractWhereInput {}

// @InputType()
// export class ContractFetchInput implements OrderOptions<Contract> {
//   @Field(() => ContractSortOptions, { nullable: true })
//   by?: ContractSortOptions;
// }

// @ArgsType()
// export class ContractArgs {
//   @Field(() => ContractWhereInput, { nullable: true })
//   where?: ContractWhereInput;
//   @Field(() => ContractFetchInput, { nullable: true })
//   sort?: ContractFetchInput;
// }

// @ArgsType()
// export class GetContractsArgs extends withPagination(ContractArgs) {}

const {
  WhereArgs: ContractWhereArgs,
  EntitySortOptions: ContractSortOptions,
  SortArgs: ContractSortArgs,
} = createEntityArgs<Contract>("Contract", {
  contract_address: "string",
  chain_id: "number",
});

export const GetContractsArgs = BaseQueryArgs(
  ContractWhereArgs,
  ContractSortArgs,
);

export type GetContractsArgs = InstanceType<typeof GetContractsArgs>;

export { ContractSortArgs, ContractSortOptions, ContractWhereArgs };
