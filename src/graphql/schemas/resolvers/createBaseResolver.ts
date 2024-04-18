import {ClassType, Resolver} from "type-graphql";

function createBaseResolver<T extends ClassType>(suffix: string, objectTypeCls: T) {
    @Resolver()
    abstract class BaseResolver {
    }

    return BaseResolver;
}