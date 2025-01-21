import {
  Args,
  FieldResolver,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";
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
          ({
            admin_address,
            admin_chain_id,
            avatar,
            display_name,
            hypercert_ids,
          }) => ({
            address: admin_address,
            chain_id: admin_chain_id,
            avatar,
            display_name,
            hypercert_ids,
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

  @FieldResolver()
  async hypercerts(@Root() blueprint: Blueprint) {
    const hypercertIds = blueprint.hypercert_ids;
    const { data: hypercerts, count } = await this.getHypercerts({
      where: { hypercert_id: { in: hypercertIds } },
    });

    return { data: hypercerts, count };
  }
}

export { BlueprintResolver };
