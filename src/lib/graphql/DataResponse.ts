import { type ClassType, Field, Int, ObjectType } from "type-graphql";

/**
 * Creates a GraphQL object type that wraps a list of items with pagination metadata.
 * This is a generic response type for queries that return paginated lists of items.
 *
 * @template T - The type of items in the response
 * @param TItemClass - The class type of items to be wrapped
 * @returns An abstract class decorated as a GraphQL object type with data and count fields
 *
 * @example
 * ```typescript
 * // Define your base type
 * @ObjectType()
 * class UserBaseType {
 *   @Field()
 *   id: string;
 *
 *   @Field()
 *   name: string;
 * }
 *
 * // Define your main type with additional fields/relations
 * @ObjectType({
 *   description: "User entity with related data"
 * })
 * class User extends UserBaseType {
 *   @Field(() => [String], {
 *     description: "List of roles assigned to the user"
 *   })
 *   roles?: string[];
 * }
 *
 * // Create the response type for paginated results
 * @ObjectType()
 * export default class GetUsersResponse extends DataResponse(User) {}
 *
 * // Use in a resolver
 * @Resolver(() => User)
 * class UserResolver {
 *   constructor(
 *     @inject(UserService)
 *     private userService: UserService,
 *   ) {}
 *
 *   @Query(() => GetUsersResponse)
 *   async users(@Args() args: GetUsersArgs): Promise<GetUsersResponse> {
 *     return await this.userService.getUsers(args);
 *   }
 * }
 * ```
 */
export function DataResponse<T extends object>(TItemClass: ClassType<T>) {
  /**
   * Abstract class representing a paginated response containing a list of items.
   * This class is automatically decorated as a GraphQL object type.
   */
  @ObjectType()
  abstract class DataResponseClass {
    /**
     * The list of items in the response.
     * Can be null/undefined if no items are found.
     */
    @Field(() => [TItemClass], { nullable: true })
    data?: T[];

    /**
     * The total count of items.
     * Can be null/undefined if count is not available or relevant.
     */
    @Field(() => Int, { nullable: true })
    count?: number;
  }

  return DataResponseClass;
}
