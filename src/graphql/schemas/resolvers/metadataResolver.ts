import {Args, Query, Resolver} from "type-graphql";
import {Metadata} from "../typeDefs/metadataTypeDefs.js";
import {inject, injectable} from "tsyringe";
import {GetMetadataArgs, SupabaseService} from "../services/supabaseService.js";

@injectable()
@Resolver(_ => Metadata)
class MetadataResolver {

    constructor(
        @inject(SupabaseService)
        private readonly supabaseService: SupabaseService) {
    }

    @Query(_ => [Metadata])
    async metadata(
        @Args() {where}: GetMetadataArgs
    ) {
        return await this.supabaseService.getMetadata({where});
    }

}

export {MetadataResolver};