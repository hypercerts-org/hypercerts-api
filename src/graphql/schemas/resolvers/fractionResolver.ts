import {Args, Field, Int, ObjectType, Query, Resolver} from "type-graphql";
import {inject, injectable} from "tsyringe";
import {SupabaseCachingService} from "../../../services/SupabaseCachingService.js";
import {Fraction} from "../typeDefs/fractionTypeDefs.js";
import {GetFractionArgs} from "../args/fractionArgs.js";

@ObjectType()
export default class GetFractionsResponse {
    @Field(() => [Fraction], {nullable: true})
    data?: Fraction[];

    @Field(() => Int, {nullable: true})
    count?: number;
}

@injectable()
@Resolver(_ => Fraction)
class FractionResolver {

    constructor(
        @inject(SupabaseCachingService)
        private readonly supabaseService: SupabaseCachingService) {
    }

    @Query(_ => GetFractionsResponse)
    async fractions(@Args() args: GetFractionArgs) {
        try {
            const res = await this.supabaseService.getFractions(args);

            const {data, error, count} = res;

            if (error) {
                console.warn(`[FractionResolver::fractions] Error fetching fractions: `, error);
            }

            return {data, count};
        } catch (e) {
            throw new Error(`[FractionResolver::fractions] Error fetching fractions: ${(e as Error).message}`)
        }
    }
}

export {FractionResolver};