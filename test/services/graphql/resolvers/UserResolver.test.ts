import { container } from "tsyringe";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { GetUsersArgs } from "../../../../src/graphql/schemas/args/userArgs.js";
import type {
  SignatureRequestPurpose,
  SignatureRequestStatus,
} from "../../../../src/graphql/schemas/typeDefs/signatureRequestTypeDefs.js";
import type { User } from "../../../../src/graphql/schemas/typeDefs/userTypeDefs.js";
import { SignatureRequestsService } from "../../../../src/services/database/entities/SignatureRequestsEntityService.js";
import { UsersService } from "../../../../src/services/database/entities/UsersEntityService.js";
import { UserResolver } from "../../../../src/services/graphql/resolvers/userResolver.js";
import type { Json } from "../../../../src/types/supabaseData.js";
import { generateMockUser } from "../../../utils/testUtils.js";

describe("UserResolver", () => {
  let userResolver: UserResolver;
  let usersService: UsersService;
  let signatureRequestsService: SignatureRequestsService;

  beforeEach(() => {
    usersService = {
      getUsers: vi.fn(),
    } as unknown as UsersService;

    signatureRequestsService = {
      getSignatureRequests: vi.fn(),
    } as unknown as SignatureRequestsService;

    container.register(UsersService, { useValue: usersService });
    container.register(SignatureRequestsService, {
      useValue: signatureRequestsService,
    });

    userResolver = new UserResolver(usersService, signatureRequestsService);
  });

  describe("users", () => {
    it("should return users from service", async () => {
      // Arrange
      const mockUser = generateMockUser();
      const mockUsers = [mockUser];
      const args: GetUsersArgs = {
        where: {
          address: { eq: mockUser.address },
        },
      };
      vi.mocked(usersService.getUsers).mockResolvedValue({
        data: mockUsers,
        count: mockUsers.length,
      });

      // Act
      const result = await userResolver.users(args);

      // Assert
      expect(result?.data).toEqual(mockUsers);
      expect(result?.count).toBe(mockUsers.length);
      expect(usersService.getUsers).toHaveBeenCalledWith(args);
    });
  });

  describe("signature_requests", () => {
    it("should return null if user has no address", async () => {
      // Arrange
      const user = { ...generateMockUser(), address: undefined } as User;

      // Act
      const result = await userResolver.signature_requests(user);

      // Assert
      expect(result).toBeNull();
      expect(
        signatureRequestsService.getSignatureRequests,
      ).not.toHaveBeenCalled();
    });

    it("should return signature requests for user address", async () => {
      // Arrange
      const user = generateMockUser();
      const mockSignatureRequests = {
        data: [
          {
            chain_id: 1,
            message: {
              metadata: {
                name: "Test User",
                description: "Test Description",
              },
            } as Json,
            message_hash: "0x1234",
            purpose: "update_user_data" as SignatureRequestPurpose,
            safe_address: user.address,
            status: "pending" as SignatureRequestStatus,
            timestamp: Math.floor(Date.now() / 1000),
          },
        ],
        count: 1,
      };

      vi.mocked(
        signatureRequestsService.getSignatureRequests,
      ).mockResolvedValue(mockSignatureRequests);

      // Act
      const result = await userResolver.signature_requests(user);

      // Assert
      expect(result).toEqual(mockSignatureRequests);
      expect(
        signatureRequestsService.getSignatureRequests,
      ).toHaveBeenCalledWith({
        where: {
          safe_address: {
            eq: user.address,
          },
        },
      });
    });
  });
});
