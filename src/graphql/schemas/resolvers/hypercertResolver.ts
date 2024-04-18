import {Args, ArgsType, Field, FieldResolver, Query, Resolver, ResolverInterface, Root} from "type-graphql";
import {Hypercert} from "../typeDefs/hypercertTypeDefs.js";
import {inject, injectable} from "tsyringe";
import {SupabaseService} from "../services/supabaseService.js";
import {Metadata} from "../typeDefs/metadataTypeDefs.js";

@ArgsType()
export class GetHypercertsByIdArgs {
    @Field()
    hypercert_id!: string
}

@injectable()
@Resolver(of => Hypercert)
class HypercertResolver {

    constructor(
        @inject(SupabaseService)
        private readonly supabaseService: SupabaseService) {
    }

    @Query(returns => [Hypercert])
    async hypercerts() {
        return this.supabaseService.getHypercerts();
    }

    @Query(returns => Hypercert)
    async hypercertsById(
        @Args() {hypercert_id}: GetHypercertsByIdArgs
    ) {
        return this.supabaseService.getHypercertsById({hypercert_id});
    }

    @FieldResolver({nullable: true})
    async metadata(@Root() hypercert: Partial<Hypercert>): Promise<Metadata | null> {
        const res = await this.supabaseService.getMetadataByUri({uri: hypercert.uri})
        if (!res) {
            return null;
        }

        return res;
    }

    @FieldResolver({nullable: true})
    async contract(@Root() hypercert: Partial<Hypercert>) {
        return this.supabaseService.getContract({id: hypercert.contracts_id})
    }
}

export {HypercertResolver};