import {registerEnumType} from "type-graphql";

export enum SortOrder {
    ascending = "ascending",
    descending = "descending",
}

registerEnumType(SortOrder, {
    name: "SortOrder",
    description: "The direction to sort the query results",
    valuesConfig: {
        ascending: {
            description: "Ascending order"
        },
        descending: {
            description: "Descending order"
        },
    },
});