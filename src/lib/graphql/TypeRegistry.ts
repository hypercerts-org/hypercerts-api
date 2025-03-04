import { ClassType } from "type-graphql";
import { SortByArgsType } from "./createEntitySortArgs.js";
import { EntityTypeDefs } from "../../graphql/schemas/typeDefs/typeDefs.js";
import { EntityFields } from "./createEntityArgs.js";
import { WhereArgsType } from "./createEntityWhereArgs.js";

/**
 * We use this registry to get the correct type for the whereInput, sortOptions, and sortArgs.
 * This prevents duplicate types which throws errors in graphql schema generation
 */
export class TypeRegistry {
  private whereInput = new Map<string, ClassType<object>>();
  private sortOptions = new Map<string, ClassType<object>>();

  getOrCreateWhereInput<
    TEntity extends EntityTypeDefs,
    TFields extends EntityFields,
  >(
    typeName: TEntity,
    creator: () => ClassType<WhereArgsType<TEntity, TFields>>,
  ): ClassType<WhereArgsType<TEntity, TFields>> {
    if (!this.whereInput.has(typeName)) {
      this.whereInput.set(typeName, creator());
    }

    const strategy = this.whereInput.get(typeName);
    if (!strategy) {
      throw new Error(`WhereInput not found for type ${typeName}`);
    }
    return strategy as ClassType<WhereArgsType<TEntity, TFields>>;
  }

  getOrCreateSortOptions<TFields extends EntityFields>(
    typeName: string,
    creator: () => ClassType<SortByArgsType<TFields>>,
  ): ClassType<SortByArgsType<TFields>> {
    if (!this.sortOptions.has(typeName)) {
      this.sortOptions.set(typeName, creator());
    }

    const strategy = this.sortOptions.get(typeName);
    if (!strategy) {
      throw new Error(`SortOptions not found for type ${typeName}`);
    }
    return strategy as ClassType<SortByArgsType<TFields>>;
  }
}

// Export a single instance
export const registry = new TypeRegistry();
