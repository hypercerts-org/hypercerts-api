import {
  Args,
  Field,
  FieldResolver,
  Int,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Hypercert } from "../typeDefs/hypercertTypeDefs.js";
import { inject, injectable } from "tsyringe";
import { SupabaseCachingService } from "../../../services/SupabaseCachingService.js";
import { GetHypercertArgs } from "../args/hypercertsArgs.js";
import { SupabaseDataService } from "../../../services/SupabaseDataService.js";
import { parseClaimOrFractionId } from "@hypercerts-org/sdk";
import {decodeAbiParameters, parseAbiParameters} from "viem";

@ObjectType()
export default class GetHypercertsResponse {
  @Field(() => [Hypercert], { nullable: true })
  data?: Hypercert[];

  @Field(() => Int, { nullable: true })
  count?: number;
}

@injectable()
@Resolver((_) => Hypercert)
class HypercertResolver {
  constructor(
    @inject(SupabaseCachingService)
    private readonly supabaseCachingService: SupabaseCachingService,
    @inject(SupabaseDataService)
    private readonly supabaseDataService: SupabaseDataService,
  ) {}

  @Query((_) => GetHypercertsResponse)
  async hypercerts(@Args() args: GetHypercertArgs) {
    try {
      const res = await this.supabaseCachingService.getHypercerts(args);

      if (!res) {
        console.warn(
          `[HypercertResolver::hypercerts] No response from DB`,
          res,
        );
        return { data: [] };
      }

      const { data, error, count } = res;

      if (error) {
        console.warn(
          `[HypercertResolver::hypercerts] Error fetching hypercerts: `,
          error,
        );
      }

      return { data, count: count ? count : data?.length };
    } catch (e) {
      const error = e as Error;
      throw new Error(
        `[HypercertResolver::hypercerts] Error fetching hypercerts: ${error.message}`,
      );
    }
  }

  @FieldResolver({ nullable: true })
  async metadata(@Root() hypercert: Partial<Hypercert>) {
    if (!hypercert.uri) {
      return null;
    }

    try {
      const res = await this.supabaseCachingService
        .getMetadata({ where: { uri: { eq: hypercert.uri } } })
        .maybeSingle();

      if (!res) {
        console.warn(
          `[HypercertResolver::metadata] Error fetching metadata for uri ${hypercert.uri}: `,
          res,
        );
        return;
      }

      const { data, error } = res;

      if (error) {
        console.warn(
          `[HypercertResolver::metadata] Error fetching metadata for uri ${hypercert.uri}: `,
          error,
        );
        return;
      }

      return data;
    } catch (e) {
      const error = e as Error;
      throw new Error(
        `[HypercertResolver::metadata] Error fetching metadata for uri ${hypercert.uri}: ${error.message}`,
      );
    }
  }

  @FieldResolver()
  async contract(@Root() hypercert: Partial<Hypercert>) {
    if (!hypercert.contracts_id) {
      return null;
    }

    try {
      const res = await this.supabaseCachingService
        .getContracts({ where: { id: { eq: hypercert.contracts_id } } })
        .maybeSingle();

      if (!res) {
        console.warn(
          `[HypercertResolver::contract] Error fetching contract with id ${hypercert.contracts_id}: `,
          res,
        );
        return;
      }

      const { data, error } = res;

      if (error) {
        console.warn(
          `[HypercertResolver::contract] Error fetching contract with id ${hypercert.contracts_id}: `,
          error,
        );
        return;
      }

      return data;
    } catch (e) {
      const error = e as Error;
      throw new Error(
        `[HypercertResolver::contract] Error fetching contract with id ${hypercert.contracts_id}: ${error.message}`,
      );
    }
  }

  @FieldResolver()
  async attestations(@Root() hypercert: Hypercert) {
    if (!hypercert.id) {
      return null;
    }

    try {
      console.log(
        `[HypercertResolver::attestations] Fetching attestations for ${hypercert.id}`,
      );

      const res = await this.supabaseCachingService.getAttestations({
        where: { hypercerts: { id: { eq: hypercert.id } } },
      });

      if (!res) {
        console.warn(
          `[HypercertResolver::attestations] Error fetching attestations for ${hypercert.hypercert_id}}: `,
          res,
        );
        return { data: [] };
      }

      const { data, error, count } = res;

      if (error) {
        console.error(
          `[HypercertResolver::attestations] Error fetching attestations for ${hypercert.hypercert_id}}: `,
          error,
        );
        return { data };
      }

      const parsed = data.map((att) => {
        return {
          ...att,
          attestation: att.decoded_attestation
            ? (JSON.parse(att.decoded_attestation as string) as object)
            : undefined,
        };
      });

      return { data: parsed, count: count ? count : parsed?.length };
    } catch (e) {
      const error = e as Error;
      throw new Error(
        `[HypercertResolver::attestations] Error fetching attestations for ${hypercert.hypercert_id}}}: ${error.message}`,
      );
    }
  }

  @FieldResolver()
  async fractions(@Root() hypercert: Hypercert) {
    if (!hypercert.id) {
      return null;
    }

    try {
      console.log(
        `[HypercertResolver::fractions] Fetching fractions for ${hypercert.id}`,
      );
      const res = await this.supabaseCachingService.getFractions({
        where: { hypercerts: { id: { eq: hypercert.id } } },
      });

      if (!res) {
        console.warn(
          `[HypercertResolver::fractions] Error fetching fractions for ${hypercert.hypercert_id}: `,
          res,
        );
        return { data: [] };
      }

      const { data, error, count } = res;

      if (error) {
        console.error(
          `[HypercertResolver::fractions] Error fetching fractions for ${hypercert.hypercert_id}: `,
          error,
        );
        return { data };
      }

      return { data, count: count ? count : data?.length };
    } catch (e) {
      throw new Error(
        `[HypercertResolver::attestations] Error fetching attestations for ${hypercert.hypercert_id}: ${(e as Error).toString()}`,
      );
    }
  }

  @FieldResolver()
  async orders(@Root() hypercert: Hypercert) {
    if (!hypercert.id) {
      return null;
    }

    try {
      console.log(
        `[HypercertResolver::orders] Fetching orders for ${hypercert.id}`,
      );
      const fractionsRes = await this.supabaseCachingService.getFractions({
        where: { hypercerts: { id: { eq: hypercert.id } } },
      });

      if (!fractionsRes) {
        console.warn(
          `[HypercertResolver::orders] Error fetching fractions for ${hypercert.hypercert_id}: `,
          fractionsRes,
        );
        return { data: [] };
      }

      const { data: fractionsData, error: fractionsError } = fractionsRes;

      if (fractionsError) {
        console.error(
          `[HypercertResolver::orders] Error fetching fractions for ${hypercert.hypercert_id}: `,
          fractionsError,
        );
        return { data: [] };
      }

      const tokenIds = fractionsData
        .filter((fraction) => !!fraction?.hypercert_id)
        .map((fraction) =>
          parseClaimOrFractionId(fraction?.hypercert_id || "").id.toString(),
        );
      const ordersRes =
        await this.supabaseDataService.getOrdersForFraction(tokenIds);

      if (!ordersRes) {
        console.warn(
          `[HypercertResolver::orders] Error fetching orders for ${hypercert.hypercert_id}: `,
          ordersRes,
        );
        return { data: [] };
      }

      const {
        data: ordersData,
        error: ordersError,
        count: ordersCount,
      } = ordersRes;

      if (ordersError) {
        console.error(
          `[HypercertResolver::orders] Error fetching orders for ${hypercert.hypercert_id}: `,
          ordersError,
        );
        return { data: [], count: 0 };
      }

      // For each fraction, find all orders and find the max units for sale for that fraction
      const totalUnitsForSale = fractionsData.map((fraction) => {
        const ordersForFraction = ordersData.filter(
          (order) =>
            parseClaimOrFractionId(fraction.hypercert_id).id.toString() ===
            order.itemIds[0],
        );

        const unitsPerOrder = ordersForFraction.map((order) => {
          const decodedParams = decodeAbiParameters(
            parseAbiParameters("uint256 minUnitAmount, uint256 maxUnitAmount, uint256 minUnitsToKeep, bool sellLeftOverFraction"),
            order.additionalParameters as `0x{string}`,
          );
          const unitsToKeep = decodedParams[2];
          const units = BigInt(fraction.units);
          return units - unitsToKeep;
        });

        // Find max units per order
        return unitsPerOrder.reduce((acc, val) => {
            return val > acc ? val : acc;
          }, BigInt(0));
      }).reduce((acc, val) => acc + val, BigInt(0));

      const lowestAvailablePrice = ordersData.reduce((acc, val) => {
        return BigInt(val.price) < acc ? BigInt(val.price) : acc;
      }, BigInt(ordersData[0].price));

      return {
        totalUnitsForSale,
        lowestAvailablePrice,
        data: ordersData || [],
        count: ordersCount || 0,
      };
    } catch (e) {
      throw new Error(
        `[HypercertResolver::orders] Error fetching orders for ${hypercert.hypercert_id}: ${(e as Error).toString()}`,
      );
    }
  }
}

export { HypercertResolver };
