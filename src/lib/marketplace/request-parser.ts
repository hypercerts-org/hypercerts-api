import { LegacyCreateOrderRequest } from "../../types/api.js";
import { ParseError } from "../errors/request-parsing.js";

import { CREATE_ORDER_REQUEST_SCHEMA } from "./schemas.js";

export function parseCreateOrderRequest(input: unknown) {
  if (isLegacyCreateOrderRequest(input)) {
    // For backwards compatibility, if `type` is not provided, default to "eoa"
    input = { ...input, type: "eoa" };
  }

  const parsedBody = CREATE_ORDER_REQUEST_SCHEMA.safeParse(input);
  if (!parsedBody.success) {
    throw new ParseError(parsedBody);
  }
  return parsedBody.data;
}

function isLegacyCreateOrderRequest(
  requestBody: unknown,
): requestBody is LegacyCreateOrderRequest {
  return (
    typeof requestBody === "object" &&
    requestBody !== null &&
    "signature" in requestBody &&
    !("type" in requestBody)
  );
}

// TODO: add functions for other requests updateOrderNonce, validateOrder, deleteOrder
