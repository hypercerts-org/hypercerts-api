import { inject, injectable } from "tsyringe";
import { Args, Query, Resolver } from "type-graphql";
import { ContractService } from "../../../services/database/entities/ContractEntityService.js";
import { GetContractsArgs } from "../args/contractArgs.js";
import {
  Contract,
  GetContractsResponse,
} from "../typeDefs/contractTypeDefs.js";

@injectable()
@Resolver(() => Contract)
class ContractResolver {
  constructor(
    @inject(ContractService)
    private contractService: ContractService,
  ) {}

  @Query(() => GetContractsResponse)
  async contracts(@Args() args: GetContractsArgs) {
    return this.contractService.getContracts(args);
  }
}

export { ContractResolver };
