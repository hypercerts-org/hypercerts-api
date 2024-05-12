import {registerEnumType} from "type-graphql";

export enum CountKeys {
    COUNT = "exact",
    HEAD = "head",
}

registerEnumType(CountKeys, {
    name: "CountKeys",
    description: "Count keys for the count query",
    valuesConfig: {
        COUNT: {
            description: "Count the number of items in the query and return it along with the data",
        },
        HEAD: {
            description: "Only get the count, not the data",
        },
    }
})

