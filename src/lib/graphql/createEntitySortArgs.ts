import { ClassType, Field, InputType } from "type-graphql";
import { SortOrder } from "../../graphql/schemas/enums/sortEnums.js";
import { EntityTypeDefs } from "../../graphql/schemas/typeDefs/typeDefs.js";
import { BaseFieldType, EntityFields } from "./createEntityArgs.js";

// Define the sort options type - a simple map of field names to sort orders
export type SortOptions<T extends EntityFields> = {
  [K in keyof T as T[K] extends BaseFieldType ? K : never]?: SortOrder | null;
};

// The SortByArgs type is the same as SortOptions
export type SortByArgsType<T extends EntityFields> = SortOptions<T>;

function createEntitySortArgs<
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

export { createEntitySortArgs };
