import { createClient } from "@supabase/supabase-js";
import { getHypercertTokenId } from "../src/utils/tokenIds.js";
async function main() {
  const client = createClient("INSERT URL", "INSERT SERVICE KEY");

  const orders = await client.from("marketplace_orders").select("*");
  if (!orders.data) {
    console.log("No orders found");
    return;
  }

  console.log("Fetched", orders.data.length, "orders");

  const ordersWithHypercertId = orders.data.map((order: any) => {
    const { chainId, collection, itemIds } = order;
    const tokenId = itemIds[0];

    const hypercertId = getHypercertTokenId(BigInt(tokenId));

    const formattedHypercertId = `${chainId}-${collection}-${hypercertId.toString()}`;
    console.log("Hypercert ID:", formattedHypercertId, tokenId);
    return { id: order.id, hypercert_id: formattedHypercertId };
  });

  for (const order of ordersWithHypercertId) {
    try {
      console.log("Updating order", order);
      await client
        .from("marketplace_orders")
        .update({ hypercert_id: order.hypercert_id })
        .eq("id", order.id);
    } catch (e) {
      console.error("Error updating order", e);
    }
  }
}

main();
