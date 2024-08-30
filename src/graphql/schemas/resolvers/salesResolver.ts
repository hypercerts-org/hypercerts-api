import {
  Args,
  FieldResolver,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Sale } from "../typeDefs/salesTypeDefs.js";
import { GetSalesArgs } from "../args/salesArgs.js";
import { HypercertBaseType } from "../typeDefs/baseTypes/hypercertBaseType.js";
import { createBaseResolver, DataResponse } from "./baseTypes.js";

@ObjectType()
export default class GetSalesResponse extends DataResponse(Sale) {}

const SalesBaseResolver = createBaseResolver("sales");

@Resolver(() => Sale)
class SalesResolver extends SalesBaseResolver {
  @Query(() => GetSalesResponse)
  async sales(@Args() args: GetSalesArgs) {
    const res = await this.getSales(args);

    const data = Array.isArray(res) ? res : [];

    return { data, count: data.length };
  }

  @FieldResolver({ nullable: true })
  async hypercert(@Root() sale: Sale) {
    if (!sale.hypercert_id) {
      console.warn(`[SalesResolver::hypercert_id] Missing hypercert_id`);
      return null;
    }

    const hypercertId = sale.hypercert_id;
    const hypercert = await this.getHypercerts(
      {
        where: {
          hypercert_id: {
            eq: hypercertId,
          },
        },
      },
      true,
    );

    if (!hypercert) {
      console.warn(
        `[SalesResolver::hypercert] No hypercert found for hypercertId: ${hypercertId}`,
      );
      return null;
    }

    const resultSale = hypercert as HypercertBaseType;

    const uri = resultSale?.uri;

    const metadata = await this.supabaseCachingService
      .getMetadata({
        where: {
          uri: {
            eq: uri,
          },
        },
      })
      .executeTakeFirst();

    if (!metadata) {
      console.warn(
        `[SalesResolver::hypercert] No metadata found for uri: ${uri}`,
      );
      return null;
    }

    return {
      ...resultSale,
      metadata: metadata || null,
    };
  }
}

export { SalesResolver };
