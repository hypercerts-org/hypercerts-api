import { Args, ObjectType, Query, Resolver } from "type-graphql";
import { createBaseResolver, DataResponse } from "./baseTypes.js";
import { Blueprint } from "../typeDefs/blueprintTypeDefs.js";
import { GetBlueprintArgs } from "../args/blueprintArgs.js";

@ObjectType()
export class GetBlueprintResponse extends DataResponse(Blueprint) {}

const BlueprintBaseResolver = createBaseResolver("blueprint");

@Resolver(() => Blueprint)
class BlueprintResolver extends BlueprintBaseResolver {
  @Query(() => GetBlueprintResponse)
  async blueprints(@Args() args: GetBlueprintArgs) {
    return await this.getBlueprints(args);
  }
}

export { BlueprintResolver };
