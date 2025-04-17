import { ClassType, Field, InputType } from "type-graphql";
import { SortOrder } from "../../graphql/schemas/enums/sortEnums.js";
import { EntityTypeDefs } from "../../graphql/schemas/typeDefs/typeDefs.js";
import { BaseFieldType, EntityFields } from "./createEntityArgs.js";

/**
 * Type representing sort options for entity fields.
 * Maps field names to their sort order, but only for primitive fields.
 * @template T - The entity fields type
 */
export type SortOptions<T extends EntityFields> = {
  [K in keyof T as T[K] extends BaseFieldType ? K : never]?: SortOrder | null;
};

/**
 * Type alias for sort arguments, used for type consistency.
 * @template T - The entity fields type
 */
export type SortByArgsType<T extends EntityFields> = SortOptions<T>;

/**
 * Creates a GraphQL input type class for sorting entity fields.
 *
 * @description
 * This function generates a class that can be used to specify sort options for entity queries.
 * The generated class will have fields corresponding to the primitive fields in the field definitions,
 * where each field can be set to either ascending, descending, or null.
 *
 * @example
 * ```typescript
 * const SortArgs = createEntitySortArgs(EntityTypeDefs.Contract, {
 *   address: "string",
 *   chain_id: "number"
 * });
 *
 * const instance = new SortArgs();
 * instance.address = SortOrder.ascending;
 * instance.chain_id = SortOrder.descending;
 * ```
 *
 * @param entityName - The name of the entity (must be a valid EntityTypeDefs value)
 * @param fieldDefinitions - Object defining the fields and their types for the entity
 * @returns A class that can be used as a GraphQL input type for sorting
 *
 * @remarks
 * - Only primitive fields (string, number, bigint) will be included in the sort options
 * - Complex fields (objects, references) will be excluded
 * - All sort fields are nullable and default to null
 * - The generated class name will be `${entityName}SortOptions`
 */
export function createEntitySortArgs<
  TEntity extends EntityTypeDefs,
  TFields extends EntityFields,
>(entityName: TEntity, fieldDefinitions: TFields) {
  @InputType(`${entityName}SortOptions`)
  class EntitySortOptions {
    constructor() {
      // Initialize all fields with default sort order (null)
      Object.entries(fieldDefinitions).forEach(([key, definition]) => {
        if (typeof definition === "string") {
          Object.defineProperty(this, key, {
            value: null,
            writable: true,
            enumerable: true,
          });
        }
      });
    }
  }

  // Add field decorators for each sortable field
  Object.entries(fieldDefinitions).forEach(([key, definition]) => {
    if (typeof definition === "string") {
      Field(() => SortOrder, { nullable: true })(
        EntitySortOptions.prototype,
        key,
      );
    }
  });

  Object.defineProperty(EntitySortOptions, "name", {
    value: `${entityName}SortOptions`,
  });

  return EntitySortOptions as ClassType<SortByArgsType<TFields>>;
}
