import { Args, ObjectType, Query, Resolver } from "type-graphql";
import { createBaseResolver, DataResponse } from "./baseTypes.js";
import { Blueprint } from "../typeDefs/blueprintTypeDefs.js";
import { GetBlueprintArgs } from "../args/blueprintArgs.js";
import _ from "lodash";
import { DataDatabase } from "../../../types/kyselySupabaseData.js";

@ObjectType()
export class GetBlueprintResponse extends DataResponse(Blueprint) {}

const BlueprintBaseResolver = createBaseResolver("blueprint");

@Resolver(() => Blueprint)
class BlueprintResolver extends BlueprintBaseResolver {
  @Query(() => GetBlueprintResponse)
  async blueprints(@Args() args: GetBlueprintArgs) {
    const { data, count } = await this.getBlueprints(args);

    // Deduplicate by blueprint id
    const formattedData = _.chain(
      data as DataDatabase["blueprints_with_admins"][],
    )
      .groupBy("id")
      .map((blueprints) => {
        const admins = blueprints.map(
          ({ admin_address, admin_chain_id, avatar, display_name }) => ({
            address: admin_address,
            chain_id: admin_chain_id,
            avatar,
            display_name,
          }),
        );
        return {
          ...blueprints[0],
          admins,
        };
      });

    return {
      data: formattedData,
      count,
    };
  }
}

export { BlueprintResolver };
