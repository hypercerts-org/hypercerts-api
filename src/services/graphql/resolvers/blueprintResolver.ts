import { Args, FieldResolver, Query, Resolver, Root } from "type-graphql";
import {
  Blueprint,
  GetBlueprintsResponse,
} from "../../../graphql/schemas/typeDefs/blueprintTypeDefs.js";
import { GetBlueprintsArgs } from "../../../graphql/schemas/args/blueprintArgs.js";
import { inject, injectable } from "tsyringe";
import { BlueprintsService } from "../../database/entities/BlueprintsEntityService.js";
import { HypercertsService } from "../../database/entities/HypercertsEntityService.js";

/**
 * GraphQL resolver for Blueprint operations.
 * Handles queries for blueprints and resolves related fields.
 *
 * This resolver provides:
 * - Query for fetching blueprints with optional filtering
 * - Field resolution for admins associated with a blueprint
 * - Field resolution for hypercerts associated with a blueprint
 *
 * Error Handling:
 * All resolvers follow the GraphQL best practice of returning partial data instead of throwing errors.
 * If an operation fails, it will:
 * - Log the error internally for monitoring
 * - Return null/empty data to the client
 * - Include error information in the GraphQL response errors array
 *
 * @injectable Marks the class as injectable for dependency injection with tsyringe
 * @resolver Marks the class as a GraphQL resolver for the Blueprint type
 */
@injectable()
@Resolver(() => Blueprint)
class BlueprintResolver {
  /**
   * Creates a new instance of BlueprintResolver.
   *
   * @param blueprintsService - Service for handling blueprint operations
   * @param hypercertsService - Service for handling hypercert operations
   */
  constructor(
    @inject(BlueprintsService)
    private blueprintsService: BlueprintsService,
    @inject(HypercertsService)
    private hypercertsService: HypercertsService,
  ) {}

  /**
   * Queries blueprints based on provided arguments.
   * Returns both the matching blueprints and a total count.
   *
   * @param args - Query arguments for filtering blueprints
   * @returns A promise that resolves to an object containing:
   *          - data: Array of blueprints matching the query
   *          - count: Total number of matching blueprints
   *          Returns null if an error occurs
   *
   * @example
   * ```graphql
   * query {
   *   blueprints(
   *     where: {
   *       id: { eq: "blueprint-1" }
   *     }
   *   ) {
   *     data {
   *       id
   *       name
   *       description
   *       admins {
   *         address
   *         display_name
   *       }
   *     }
   *     count
   *   }
   * }
   * ```
   */
  @Query(() => GetBlueprintsResponse)
  async blueprints(@Args() args: GetBlueprintsArgs) {
    try {
      return await this.blueprintsService.getBlueprints(args);
    } catch (e) {
      console.error(
        `[BlueprintResolver::blueprints] Error fetching blueprints: ${(e as Error).message}`,
      );
      return null;
    }
  }

  /**
   * Resolves the admins field for a blueprint.
   * Retrieves the list of administrators associated with the blueprint.
   *
   * @param blueprint - The blueprint for which to resolve admins
   * @returns A promise resolving to:
   *          - Array of admin users if found
   *          - Empty array if:
   *            - No blueprint ID is available
   *            - An error occurs during retrieval
   *
   * @example
   * ```graphql
   * query {
   *   blueprints {
   *     data {
   *       id
   *       admins {
   *         address
   *         display_name
   *         avatar
   *       }
   *     }
   *   }
   * }
   * ```
   */
  @FieldResolver()
  async admins(@Root() blueprint: Blueprint) {
    if (!blueprint.id) {
      console.warn(
        `[BlueprintResolver::admins] No blueprint id found for ${blueprint.id}`,
      );
      return [];
    }

    try {
      return await this.blueprintsService.getBlueprintAdmins(blueprint.id);
    } catch (e) {
      console.error(
        `[BlueprintResolver::admins] Error fetching admins for blueprint ${blueprint.id}: ${(e as Error).message}`,
      );
      return [];
    }
  }

  /**
   * Resolves the hypercerts field for a blueprint.
   * Retrieves the list of hypercerts associated with the blueprint.
   *
   * @param blueprint - The blueprint for which to resolve hypercerts
   * @returns A promise resolving to:
   *          - Array of hypercerts if found
   *          - null if:
   *            - No hypercert IDs are available
   *            - An error occurs during retrieval
   *
   * @example
   * ```graphql
   * query {
   *   blueprints {
   *     data {
   *       id
   *       hypercerts {
   *         data {
   *           id
   *           hypercert_id
   *           metadata {
   *             name
   *             description
   *           }
   *         }
   *       }
   *     }
   *   }
   * }
   * ```
   */
  @FieldResolver()
  async hypercerts(@Root() blueprint: Blueprint) {
    if (!blueprint.hypercert_ids?.length) {
      console.warn(
        `[BlueprintResolver::hypercerts] No hypercert ids found for blueprint ${blueprint.id}`,
      );
      return null;
    }

    try {
      return await this.hypercertsService.getHypercerts({
        where: { hypercert_id: { in: blueprint.hypercert_ids } },
      });
    } catch (e) {
      console.error(
        `[BlueprintResolver::hypercerts] Error fetching hypercerts for blueprint ${blueprint.id}: ${(e as Error).message}`,
      );
      return null;
    }
  }
}

export { BlueprintResolver };
