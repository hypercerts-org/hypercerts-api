import {GraphQLScalarType} from "graphql/type/index.js";
import {Kind} from "graphql/language/index.js";

export const EthBigInt = new GraphQLScalarType({
    name: "EthBigInt",
    description: "Handles uint256 bigint values stored in DB",
    serialize(value: unknown): string {
        // Check type of value
        if (typeof value !== "bigint" && typeof value !== "number" && typeof value !== "string") {
            throw new Error("EthBigInt can only serialize BigInt values");
        }
        return BigInt(value).toString(); // Value sent to client
    },
    parseValue(value: unknown): bigint {
        // Check type of value  bigint | boolean | number | string
        if (typeof value !== "string" && typeof value !== "bigint" && typeof value !== "number" && typeof value !== "boolean") {
            throw new Error("EthBigInt can only parse string values");
        }
        return BigInt(value); // Value from client input variables
    },
    parseLiteral(ast): bigint {
        // Check type of value
        if (ast.kind !== Kind.STRING) {
            throw new Error("ObjectIdScalar can only parse string values");
        }
        return BigInt(ast.value); // Value from client query
    },
});