import {Args, ArgsType, Field, Query, Resolver, ResolverInterface} from "type-graphql";
import {Metadata} from "../typeDefs/metadataTypeDefs.js";
import {inject, injectable} from "tsyringe";
import {SupabaseService} from "../services/supabaseService.js";

@ArgsType()
export class GetMetadataArgs {
    @Field()
    uri!: string;
}

@injectable()
@Resolver(of => Metadata)
class MetadataResolver {

    constructor(
        @inject(SupabaseService)
        private readonly supabaseService: SupabaseService) {
    }

    @Query(returns => Metadata)
    async metadataByUri(
        @Args() {uri}: GetMetadataArgs
    ) {
        return await this.supabaseService.getMetadataByUri({uri});
    }
}

export {MetadataResolver};