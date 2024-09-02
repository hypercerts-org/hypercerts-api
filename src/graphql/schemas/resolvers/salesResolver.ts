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
import { createBaseResolver, DataResponse } from "./baseTypes.js";

@ObjectType()
export default class GetSalesResponse extends DataResponse(Sale) {}

const SalesBaseResolver = createBaseResolver("sales");

@Resolver(() => Sale)
class SalesResolver extends SalesBaseResolver {
  @Query(() => GetSalesResponse)
  async sales(@Args() args: GetSalesArgs) {
    return await this.getSales(args);
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

    const metadata = await this.getMetadata(
      {
        where: {
          hypercerts: {
            hypercert_id: {
              eq: hypercertId,
            },
          },
        },
      },
      true,
    );

    if (!metadata) {
      console.warn(
        `[SalesResolver::hypercert] No metadata found for hypercert: ${hypercertId}`,
      );
      return null;
    }

    return {
      ...hypercert,
      metadata: metadata || null,
    };
  }
}

export { SalesResolver };
