import "reflect-metadata";
import { ClassType } from "type-graphql";
import { EntityTypeDefs } from "../../graphql/schemas/typeDefs/typeDefs.js";

/**
 * Registry for managing GraphQL input types across the application.
 *
 * @description
 * The TypeRegistry ensures that we only create one instance of each GraphQL input type
 * for a given type name. This is crucial because GraphQL schema generation will fail if
 * there are duplicate type definitions.
 *
 * The registry maintains separate caches for:
 * - WhereInput types (used for filtering)
 * - SortOptions types (used for sorting)
 *
 * @example
 * ```typescript
 * // Using dependency injection (recommended for application code)
 * import { container } from 'tsyringe';
 * const registry = container.resolve(TypeRegistry);
 *
 * // Creating a new instance (useful for testing)
 * const testRegistry = new TypeRegistry();
 * ```
 */
export class TypeRegistry {
  private whereInput: Map<string, ClassType<object>>;
  private sortOptions: Map<string, ClassType<object>>;

  /**
   * Creates a new instance of the registry with empty caches.
   * Note: For application code, use dependency injection to resolve the singleton instance.
   */
  constructor() {
    this.whereInput = new Map<string, ClassType<object>>();
    this.sortOptions = new Map<string, ClassType<object>>();
  }

  /**
   * Clears all cached types from the registry.
   */
  clear(): void {
    this.whereInput.clear();
    this.sortOptions.clear();
  }

  /**
   * Gets an existing WhereInput type from the registry or creates a new one.
   *
   * @description
   * This method ensures that we only create one WhereInput type for each type name.
   * If a type already exists for the given name, it is returned.
   * Otherwise, the creator function is called to create a new type.
   *
   * @template T - The type of the WhereInput class instance
   * @param typeName - The entity type (must be a valid EntityTypeDefs value)
   * @param creator - Function that creates the WhereInput type if it doesn't exist
   * @returns The WhereInput type for the given name
   * @throws {Error} If the type cannot be found after creation attempt
   *
   * @example
   * ```typescript
   * const WhereInput = registry.getOrCreateWhereInput<WhereArgsType<typeof EntityTypeDefs.Contract, ContractFields>>(
   *   EntityTypeDefs.Contract,
   *   () => createEntityWhereArgs(EntityTypeDefs.Contract, {
   *     address: "string",
   *     chain_id: "number"
   *   })
   * );
   * ```
   */
  getOrCreateWhereInput<T extends object>(
    typeName: EntityTypeDefs,
    creator: () => ClassType<T>,
  ): ClassType<T> {
    if (!this.whereInput.has(typeName)) {
      this.whereInput.set(typeName, creator());
    }

    const strategy = this.whereInput.get(typeName);
    if (!strategy) {
      throw new Error(`WhereInput not found for type ${typeName}`);
    }
    return strategy as ClassType<T>;
  }

  /**
   * Gets an existing SortOptions type from the registry or creates a new one.
   *
   * @description
   * This method ensures that we only create one SortOptions type for each type name.
   * If a type already exists for the given name, it is returned.
   * Otherwise, the creator function is called to create a new type.
   *
   * @template T - The type of the SortOptions class instance
   * @param typeName - The entity type (must be a valid EntityTypeDefs value)
   * @param creator - Function that creates the SortOptions type if it doesn't exist
   * @returns The SortOptions type for the given name
   * @throws {Error} If the type cannot be found after creation attempt
   *
   * @example
   * ```typescript
   * const SortOptions = registry.getOrCreateSortOptions<SortOptions<ContractFields>>(
   *   EntityTypeDefs.Contract,
   *   () => createEntitySortArgs(EntityTypeDefs.Contract, {
   *     address: "string",
   *     chain_id: "number"
   *   })
   * );
   * ```
   */
  getOrCreateSortOptions<T extends object>(
    typeName: EntityTypeDefs,
    creator: () => ClassType<T>,
  ): ClassType<T> {
    if (!this.sortOptions.has(typeName)) {
      this.sortOptions.set(typeName, creator());
    }

    const strategy = this.sortOptions.get(typeName);
    if (!strategy) {
      throw new Error(`SortOptions not found for type ${typeName}`);
    }
    return strategy as ClassType<T>;
  }
}

//TODO refactor into ts-syringe singleton for consistency
// Export a single instance
export const registry = new TypeRegistry();
