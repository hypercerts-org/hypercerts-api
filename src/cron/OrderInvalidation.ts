import { OrderValidatorCode } from "@hypercerts-org/marketplace-sdk";
import { sql } from "kysely";
import _ from "lodash";
import cron from "node-cron";
import { inject, singleton } from "tsyringe";
import { kyselyData } from "../client/kysely.js";
import { MarketplaceOrdersService } from "../services/database/entities/MarketplaceOrdersEntityService.js";

/**
 * These error codes are considered temporary and should be
 * rechecked periodically so that they can be marked as valid again.
 */
export const TEMPORARILY_INVALID_ERROR_CODES = [
  OrderValidatorCode.ORDER_EXPECTED_TO_BE_VALID,
  OrderValidatorCode.TOO_EARLY_TO_EXECUTE_ORDER,
];

@singleton()
export default class OrderInvalidationCronjob {
  private cronJob: cron.ScheduledTask | null = null;

  constructor(
    @inject(MarketplaceOrdersService)
    private marketplaceOrdersService: MarketplaceOrdersService,
  ) {}

  public start(): void {
    if (this.cronJob) {
      // Already started
      return;
    }

    // Schedule the cron job
    this.cronJob = cron.schedule("*/30 * * * * *", async () => {
      try {
        await this.invalidateOrders();
      } catch (error) {
        console.error("Error in order invalidation cron job:", error);
      }
    });
  }

  // Stop method is useful for testing or graceful shutdown
  public stop(): void {
    if (this.cronJob) {
      this.cronJob.stop();
      this.cronJob = null;
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
            sql`ARRAY[${sql.join(TEMPORARILY_INVALID_ERROR_CODES)}]::int4[]`,
          ),
        ]),
      )
      .execute();
    const ordersByChain = _.groupBy(result, "chainId");

    for (const chainId in ordersByChain) {
      const ordersForChain = ordersByChain[chainId];
      const tokenIds = _.uniq(ordersForChain.map((order) => order.itemIds[0]));
      await this.marketplaceOrdersService.validateOrdersByTokenIds(
        tokenIds,
        parseInt(chainId, 10),
      );
    }
  }
}
