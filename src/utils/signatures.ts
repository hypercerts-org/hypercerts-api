import type { EIP712TypedData } from "@safe-global/api-kit";

export function isTypedMessage(message: unknown): message is EIP712TypedData {
  return message !== null && typeof message === "object" && "domain" in message;
}
