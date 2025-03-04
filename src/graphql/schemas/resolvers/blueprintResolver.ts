import { Args, FieldResolver, Query, Resolver, Root } from "type-graphql";
import {
  Blueprint,
  GetBlueprintsResponse,
} from "../typeDefs/blueprintTypeDefs.js";
import { GetBlueprintsArgs } from "../args/blueprintArgs.js";
import { inject, injectable } from "tsyringe";
import { BlueprintsService } from "../../../services/database/entities/BlueprintsEntityService.js";
import { HypercertsService } from "../../../services/database/entities/HypercertsEntityService.js";

@injectable()
@Resolver(() => Blueprint)
class BlueprintResolver {
  constructor(
    @inject(BlueprintsService)
    private blueprintsService: BlueprintsService,
    @inject(HypercertsService)
    private hypercertsService: HypercertsService,
  ) {}

  @Query(() => GetBlueprintsResponse)
  async blueprints(@Args() args: GetBlueprintsArgs) {
    return await this.blueprintsService.getBlueprints(args);
  }

  @FieldResolver()
  async admins(@Root() blueprint: Blueprint) {
    if (!blueprint.id) {
      console.error("[BlueprintResolver::admins] Blueprint ID is undefined");
      return [];
    }

    return await this.blueprintsService.getBlueprintAdmins(blueprint.id);
  }

  @FieldResolver()
  async hypercerts(@Root() blueprint: Blueprint) {
    return await this.hypercertsService.getHypercerts({
      where: { hypercert_id: { in: blueprint.hypercert_ids } },
    });
  }
}

export { BlueprintResolver };
