import cron from "node-cron";
import { ACCEPTED_ERROR_CODES } from "@hypercerts-org/marketplace-sdk";
import { SupabaseDataService } from "../services/SupabaseDataService.js";
import _ from "lodash";
import { kyselyData } from "../client/kysely.js";
import { sql } from "kysely";

export default class OrderInvalidationCronjob {
  private static instance: OrderInvalidationCronjob;
  private dataService: SupabaseDataService;

  private constructor() {
    this.dataService = new SupabaseDataService();
    this.setupCronJob();
  }

  private setupCronJob() {
    // Run every 30 seconds
    cron.schedule("*/30 * * * * *", async () => {
      try {
        await this.invalidateOrders();
      } catch (error) {
        console.error("Error in order invalidation cron job:", error);
      }
    });
  }

  public static start(): void {
    if (!OrderInvalidationCronjob.instance) {
      OrderInvalidationCronjob.instance = new OrderInvalidationCronjob();
    }
  }

  private async invalidateOrders() {
    const result = await kyselyData
      .selectFrom("marketplace_orders")
      .select(["itemIds", "invalidated", "validator_codes", "chainId"])
      .where((eb) =>
        eb.or([
          eb("invalidated", "=", false),
          // Include all orders that have been invalidated but only have validator codes that are in the accepted validator codes
          // Example: order has been validated because it hasn't openened yet. Will initially be invalidated, but should be rechecked
          // periodically so that it can be marked as valid again once it has opened.
          eb("invalidated", "=", true).and(
            "validator_codes",
            "<@",
            // @ts-expect-error Typing issue with sql arrays
            sql`ARRAY[${sql.join(ACCEPTED_ERROR_CODES)}]::int4[]`,
          ),
        ]),
      )
      .execute();
    const ordersByChain = _.groupBy(result, "chainId");

    for (const chainId in ordersByChain) {
      const ordersForChain = ordersByChain[chainId];
      const tokenIds = _.uniq(ordersForChain.map((order) => order.itemIds[0]));
      await this.dataService.validateOrdersByTokenIds({
        tokenIds,
        chainId: parseInt(chainId, 10),
      });
    }
  }
}
