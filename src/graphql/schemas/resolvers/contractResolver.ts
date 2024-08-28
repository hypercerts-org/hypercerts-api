import { Args, ObjectType, Query, Resolver } from "type-graphql";
import { Contract } from "../typeDefs/contractTypeDefs.js";
import { GetContractsArgs } from "../args/contractArgs.js";
import { createBaseResolver, DataResponse } from "./baseTypes.js";

@ObjectType()
export default class GetContractsResponse extends DataResponse(Contract) {
}

const ContractBaseResolver = createBaseResolver("contract", Contract, "caching");

@Resolver(() => Contract)
class ContractResolver extends ContractBaseResolver {

  @Query(() => GetContractsResponse)
  async contracts(@Args() args: GetContractsArgs) {
    const res = await this.getContracts(args, false);

    return { data: res, count: res?.length };
  }
}

export { ContractResolver };