import { Args, ObjectType, Query, Resolver } from "type-graphql";
import { Contract } from "../typeDefs/contractTypeDefs.js";
import { GetContractsArgs } from "../args/contractArgs.js";
import { createBaseResolver, DataResponse } from "./baseTypes.js";

@ObjectType()
export default class GetContractsResponse extends DataResponse(Contract) {}

const ContractBaseResolver = createBaseResolver("contract");

@Resolver(() => Contract)
class ContractResolver extends ContractBaseResolver {
  @Query(() => GetContractsResponse)
  async contracts(@Args() args: GetContractsArgs) {
    const res = await this.getContracts(args, false);

    const data = Array.isArray(res) ? res : [];

    return { data, count: data.length };
  }
}

export { ContractResolver };
