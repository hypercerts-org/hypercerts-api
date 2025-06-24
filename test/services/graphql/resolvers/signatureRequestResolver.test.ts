import { beforeEach, describe, expect, it, vi } from "vitest";
import { SignatureRequestResolver } from "../../../../src/services/graphql/resolvers/signatureRequestResolver.js";
import { SignatureRequestsService } from "../../../../src/services/database/entities/SignatureRequestsEntityService.js";
import { generateMockSignatureRequest } from "../../../utils/testUtils.js";
import { container } from "tsyringe";
import { SignatureRequest } from "../../../../src/graphql/schemas/typeDefs/signatureRequestTypeDefs.js";
import { GetSignatureRequestsArgs } from "../../../../src/graphql/schemas/args/signatureRequestArgs.js";

describe("SignatureRequestResolver", () => {
  let resolver: SignatureRequestResolver;
  let mockSignatureRequestsService: SignatureRequestsService;
  let mockSignatureRequest: ReturnType<typeof generateMockSignatureRequest>;

  beforeEach(() => {
    mockSignatureRequest = generateMockSignatureRequest();

    mockSignatureRequestsService = {
      getSignatureRequests: vi.fn().mockResolvedValue({
        data: [mockSignatureRequest],
        count: 1,
      }),
    } as unknown as SignatureRequestsService;

    container.clearInstances();
    container.registerInstance(
      SignatureRequestsService,
      mockSignatureRequestsService,
    );
    resolver = container.resolve(SignatureRequestResolver);
  });

  describe("signatureRequests", () => {
    it("should return signature requests with count", async () => {
      const args = {} as GetSignatureRequestsArgs;

      const result = await resolver.signatureRequests(args);

      expect(result).toEqual({
        data: [mockSignatureRequest],
        count: 1,
      });
      expect(
        mockSignatureRequestsService.getSignatureRequests,
      ).toHaveBeenCalledWith(args);
    });
  });

  describe("message field resolver", () => {
    it("should return stringified message when message is an object", () => {
      const messageObj = { test: "data" };
      const request = {
        ...mockSignatureRequest,
        message: messageObj,
      } as unknown as SignatureRequest;

      const result = resolver.message(request);

      expect(result).toBe(JSON.stringify(messageObj));
    });

    it("should return message as is when it's already a string", () => {
      const messageStr = '{"test":"data"}';
      const request = {
        ...mockSignatureRequest,
        message: messageStr,
      } as SignatureRequest;

      const result = resolver.message(request);

      expect(result).toBe(messageStr);
    });

    it("should return fallback message when message is undefined", () => {
      const request = {
        ...mockSignatureRequest,
        message: undefined,
      } as SignatureRequest;

      const result = resolver.message(request);

      expect(result).toBe("could not parse message");
    });
  });
});
