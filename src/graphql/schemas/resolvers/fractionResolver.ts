import {Args, Query, Resolver} from "type-graphql";
import {inject, injectable} from "tsyringe";
import {SupabaseService} from "../../../services/SupabaseService.js";
import {Fraction} from "../typeDefs/fractionTypeDefs.js";
import {GetFractionArgs} from "../args/fractionArgs.js";


@injectable()
@Resolver(_ => Fraction)
class FractionResolver {

    constructor(
        @inject(SupabaseService)
        private readonly supabaseService: SupabaseService) {
    }

    @Query(_ => [Fraction])
    async fractions(@Args() args: GetFractionArgs) {
        try {
            const res = await this.supabaseService.getFractions(args);

            if (!res) {
                return [];
            }

            const {data, error} = res;

            if (error) {
                console.warn(`[FractionResolver::fractions] Error fetching hypercerts: `, error);
                return [];
            }

            return data;
        } catch (e) {
            throw new Error(`[FractionResolver::fractions] Error fetching hypercerts: ${(e as Error).message}`)
        }
    }
}

export {FractionResolver};