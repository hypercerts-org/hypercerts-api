import {Args, Query, Resolver} from "type-graphql";
import {Metadata} from "../typeDefs/metadataTypeDefs.js";
import {inject, injectable} from "tsyringe";
import {SupabaseService} from "../../../services/SupabaseService.js";
import {GetMetadataArgs} from "../args/metadataArgs.js";

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