import {
  Body,
  Controller,
  Delete,
  Path,
  Post,
  Response,
  Route,
  Query,
  SuccessResponse,
  Tags,
  Patch,
} from "tsoa";
import type {
  ApiResponse,
  HyperboardCreateRequest,
  HyperboardCreateResponse,
  HyperboardUpdateRequest,
} from "../types/api.js";
import { z } from "zod";
import { isValidHypercertId } from "../utils/hypercertIds.js";
import { parseClaimOrFractionId } from "@hypercerts-org/sdk";
import { SupabaseDataService } from "../services/SupabaseDataService.js";
import { CONSTANTS } from "@hypercerts-org/sdk";
import _ from "lodash";
import { verifyAuthSignedData } from "../utils/verifyAuthSignedData.js";

const allChains = Object.keys(CONSTANTS.DEPLOYMENTS).map((chain) =>
  parseInt(chain),
);

@Route("v1/hyperboards")
@Tags("Hyperboards")
export class HyperboardController extends Controller {
  /**
   * Create a new hyperboard. Creates the collections passed to it automatically.
   */
  @Post()
  @SuccessResponse(201, "Data uploaded successfully", "application/json")
  @Response<ApiResponse>(422, "Unprocessable content", {
    success: false,
    message: "Errors while validating hyperboard",
  })
  public async createHyperboard(
    @Body() requestBody: HyperboardCreateRequest,
  ): Promise<HyperboardCreateResponse> {
    const inputSchema = z
      .object({
        chainIds: z
          .array(
            z
              .number()
              .int()
              .refine((value) => allChains.includes(value), {
                message: "Chain is not supported",
              }),
          )
          .min(1, "Exactly 1 chain allowed")
          .max(1, "Exactly 1 chain allowed"),
        title: z
          .string()
          .trim()
          .min(1, "Title is required")
          .max(100, "Use at most 100 characters"),
        collections: z.array(
          z.object({
            id: z.string().uuid().optional(),
            title: z
              .string()
              .trim()
              .min(1, "Title is required")
              .max(100, "Use at most 100 characters"),
            description: z
              .string()
              .trim()
              .min(10, "Use at least 10 characters")
              .max(500, "Use at most 500 characters"),
            hypercerts: z
              .array(
                z.object({
                  hypercertId: z
                    .string()
                    .trim()
                    .refine((value) => {
                      if (!value || value === "") {
                        return true;
                      }

                      try {
                        return isValidHypercertId(value);
                      } catch (e) {
                        console.error(e);
                        return false;
                      }
                    }, "Invalid hypercert ID"),
                  factor: z
                    .number()
                    .int()
                    .min(1, "Factor must be greater than 0"),
                }),
              )
              .min(1, "At least one hypercert is required")
              .refine(
                (hypercerts) => {
                  const hypercertIds = hypercerts.map((hc) => hc.hypercertId);
                  return hypercertIds.length === new Set(hypercertIds).size;
                },
                {
                  message: "Hypercerts must be unique",
                  path: ["hypercerts"],
                },
              ),
          }),
        ),
        backgroundImg: z
          .union([
            z.string().url("Background image URL is not valid"),
            z.literal(""),
          ])
          .optional(),
        borderColor: z
          .string()
          .regex(/^#(?:[0-9a-f]{3}){1,2}$/i, "Must be a color hex code")
          .min(1, "Border color is required"),
        adminAddress: z.string(),
        signature: z.string(),
      })
      .refine(
        (values) => {
          // Check if all chainsIds are the same
          try {
            const chainId = values.chainIds[0];
            const allHypercertIds = values.collections
              .flatMap((collection) =>
                collection.hypercerts.map((hc) => hc.hypercertId),
              )
              .filter((x) => !!x && x !== "")
              .map((id) => parseClaimOrFractionId(id))
              .map((hc) => hc.chainId);

            if (allHypercertIds.length === 0) {
              return true;
            }

            return allHypercertIds.every((id) => id === chainId);
          } catch (err) {
            console.error(err);
            return false;
          }
        },
        {
          message: "All hypercerts must be from the same chain",
          path: ["hypercerts"],
        },
      );
    const parsedBody = inputSchema.safeParse(requestBody);

    if (!parsedBody.success) {
      this.setStatus(400);
      return {
        success: false,
        message: "Invalid input",
        data: null,
        errors: JSON.parse(parsedBody.error.toString()),
      };
    }

    const { signature, adminAddress, chainIds } = parsedBody.data;
    const chainId = chainIds[0];

    const success = await verifyAuthSignedData({
      address: adminAddress as `0x${string}`,
      signature: signature as `0x${string}`,
      types: {
        Hyperboard: [
          { name: "title", type: "string" },
          { name: "description", type: "string" },
          { name: "borderColor", type: "string" },
          { name: "hypercertIds", type: "string[]" },
          { name: "factors", type: "uint256[]" },
        ],
        HyperboardCreateRequest: [{ name: "hyperboard", type: "Hyperboard" }],
      },
      primaryType: "HyperboardCreateRequest",
      message: {
        hyperboard: {
          title: parsedBody.data.title,
          description: parsedBody.data.collections[0].description,
          borderColor: parsedBody.data.borderColor,
          hypercertIds: parsedBody.data.collections.flatMap((collection) =>
            collection.hypercerts.map((hc) => hc.hypercertId),
          ),
          factors: parsedBody.data.collections.flatMap((collection) => {
            return collection.hypercerts.map((hc) => hc.factor);
          }),
        },
      },
      requiredChainId: chainId,
    });

    if (!success) {
      this.setStatus(400);
      return {
        success: false,
        message: "Invalid signature",
        data: null,
      };
    }

    const dataService = new SupabaseDataService();
    let hyperboardId: string;
    try {
      const hyperboards = await dataService.upsertHyperboards([
        {
          background_image: parsedBody.data.backgroundImg,
          tile_border_color: parsedBody.data.borderColor,
          chain_ids: parsedBody.data.chainIds,
          name: parsedBody.data.title,
          grayscale_images: false,
        },
      ]);
      if (!hyperboards[0]?.id) {
        throw new Error("Hyperboard must have an id to add collections.");
      }
      hyperboardId = hyperboards[0]?.id;
      const admin = await dataService.addAdminToHyperboard(
        hyperboardId,
        adminAddress,
        chainId,
      );
      if (!admin) {
        throw new Error("Admin must be added to hyperboard.");
      }
    } catch (err) {
      console.error(err);
      this.setStatus(400);
      return {
        success: false,
        message: "Error creating hyperboard",
        data: null,
      };
    }

    const collectionsToUpdate = parsedBody.data.collections.filter(
      (collection) => !!collection.id,
    );
    for (const collection of collectionsToUpdate) {
      try {
        if (!collection.id) {
          continue;
        }
        const currentCollection = await dataService.getCollectionById(
          collection.id,
        );
        if (!currentCollection) {
          throw new Error(`Collection with id ${collection.id} not found`);
        }

        // Add the collection to the hyperboard
        await dataService.addCollectionToHyperboard(
          hyperboardId,
          collection.id,
        );
        // Update metadata anyway because they are not collection specific
        await dataService.upsertHyperboardHypercertMetadata(
          collection.hypercerts.map((hc) => ({
            hypercert_id: hc.hypercertId,
            hyperboard_id: hyperboardId,
            collection_id: currentCollection.id,
            display_size: hc.factor,
          })),
        );

        const currentUserIsAdminForCollection =
          currentCollection.collection_admins
            .flatMap((x) => x.admins)
            .find(
              (admin) =>
                admin.chain_id === chainId && admin.address === adminAddress,
            );

        if (currentUserIsAdminForCollection) {
          // Update collection if you are an admin of the collection
          await dataService.upsertCollections([
            {
              id: collection.id,
              name: collection.title,
              chain_ids: _.uniq([...currentCollection.chain_ids, chainId]),
              description: collection.description,
            },
          ]);
          // Update hypercerts in the collection if you are an admin of the collection
          await dataService.upsertHypercerts(
            collection.hypercerts.map((hc) => ({
              hypercert_id: hc.hypercertId,
              collection_id: currentCollection.id,
            })),
          );
        }
      } catch (e) {
        console.error(e);
        this.setStatus(400);
        return {
          success: false,
          message: "Error updating collection",
          data: null,
        };
      }
    }

    const collectionsToCreate = parsedBody.data.collections.filter(
      (collection) => !collection.id,
    );
    for (const collection of collectionsToCreate) {
      try {
        const collectionCreateResponse = await dataService.upsertCollections([
          {
            name: collection.title,
            description: collection.description,
            chain_ids: [chainId],
          },
        ]);

        const collectionId = collectionCreateResponse[0]?.id;
        if (!collectionId) {
          throw new Error("Collection must have an id to add claims.");
        }

        // Add current user as admin to the collection because they are creating it
        const admin = await dataService.addAdminToCollection(
          collectionId,
          adminAddress,
          chainId,
        );

        if (!admin) {
          throw new Error("Admin must be added to collection.");
        }

        const hypercerts = collection.hypercerts.map((hc) => ({
          hypercert_id: hc.hypercertId,
          collection_id: collectionId,
        }));
        await dataService.upsertHypercerts(hypercerts);
        await dataService.upsertHyperboardHypercertMetadata(
          collection.hypercerts.map((hc) => ({
            hypercert_id: hc.hypercertId,
            hyperboard_id: hyperboardId,
            collection_id: collectionId,
            display_size: hc.factor,
          })),
        );

        await dataService.addCollectionToHyperboard(hyperboardId, collectionId);
      } catch (e) {
        console.error(e);
        this.setStatus(400);
        return {
          success: false,
          message: "Error creating collection",
          data: null,
        };
      }
    }

    this.setStatus(201);
    return {
      success: true,
      data: {
        id: hyperboardId,
      },
    };
  }

  @Patch("{hyperboardId}")
  @SuccessResponse(204, "Hyperboard updated successfully")
  @Response<ApiResponse>(422, "Unprocessable content", {
    success: false,
    message: "Errors while updating hyperboard",
  })
  public async updateHyperboard(
    @Path() hyperboardId: string,
    @Body() requestBody: HyperboardUpdateRequest,
  ): Promise<ApiResponse<{ id: string } | null>> {
    const inputSchema = z
      .object({
        id: z.string().uuid(),
        chainIds: z
          .array(
            z
              .number()
              .int()
              .refine((value) => allChains.includes(value), {
                message: "Chain is not supported",
              }),
          )
          .min(1, "Exactly 1 chain allowed")
          .max(1, "Exactly 1 chain allowed"),
        title: z
          .string()
          .trim()
          .min(1, "Title is required")
          .max(100, "Use at most 100 characters"),
        collections: z.array(
          z.object({
            id: z.string().uuid().optional(),
            title: z
              .string()
              .trim()
              .min(1, "Title is required")
              .max(100, "Use at most 100 characters"),
            description: z
              .string()
              .trim()
              .min(10, "Use at least 10 characters")
              .max(500, "Use at most 500 characters"),
            hypercerts: z
              .array(
                z.object({
                  id: z.string().uuid().optional(),
                  hypercertId: z
                    .string()
                    .trim()
                    .refine((value) => {
                      if (!value || value === "") {
                        return true;
                      }

                      try {
                        return isValidHypercertId(value);
                      } catch (e) {
                        console.error(e);
                        return false;
                      }
                    }, "Invalid hypercert ID"),
                  factor: z
                    .number()
                    .int()
                    .min(1, "Factor must be greater than 0"),
                }),
              )
              .min(1, "At least one hypercert is required")
              .refine(
                (hypercerts) => {
                  const hypercertIds = hypercerts.map((hc) => hc.hypercertId);
                  return hypercertIds.length === new Set(hypercertIds).size;
                },
                {
                  message: "Hypercerts must be unique",
                  path: ["hypercerts"],
                },
              ),
          }),
        ),
        backgroundImg: z
          .union([
            z.string().url("Background image URL is not valid"),
            z.literal(""),
          ])
          .optional(),
        borderColor: z
          .string()
          .regex(/^#(?:[0-9a-f]{3}){1,2}$/i, "Must be a color hex code")
          .min(1, "Border color is required"),
        adminAddress: z.string(),
        signature: z.string(),
      })
      .refine(
        (values) => {
          // Check if all chainsIds are the same
          try {
            const chainId = values.chainIds[0];
            const allHypercertIds = values.collections
              .flatMap((collection) =>
                collection.hypercerts.map((hc) => hc.hypercertId),
              )
              .filter((x) => !!x && x !== "")
              .map((id) => parseClaimOrFractionId(id))
              .map((hc) => hc.chainId);

            if (allHypercertIds.length === 0) {
              return true;
            }

            return allHypercertIds.every((id) => id === chainId);
          } catch (err) {
            console.error(err);
            return false;
          }
        },
        {
          message: "All hypercerts must be from the same chain",
          path: ["hypercerts"],
        },
      );
    const parsedBody = inputSchema.safeParse(requestBody);

    if (!parsedBody.success) {
      this.setStatus(400);
      return {
        success: false,
        message: "Invalid input",
        data: null,
        errors: JSON.parse(parsedBody.error.toString()),
      };
    }

    const dataService = new SupabaseDataService();
    const hyperboard = await dataService.getHyperboardById(hyperboardId);

    if (!hyperboard) {
      this.setStatus(404);
      return {
        success: false,
        message: "Hyperboard not found",
        data: null,
      };
    }

    const { signature, adminAddress } = parsedBody.data;
    const chainId = hyperboard.chain_ids[0];
    const success = await verifyAuthSignedData({
      address: adminAddress as `0x${string}`,
      signature: signature as `0x${string}`,

      types: {
        Hyperboard: [
          { name: "id", type: "string" },
          { name: "title", type: "string" },
          { name: "description", type: "string" },
          { name: "borderColor", type: "string" },
          { name: "hypercertIds", type: "string[]" },
          { name: "factors", type: "uint256[]" },
        ],
        HyperboardUpdateRequest: [{ name: "hyperboard", type: "Hyperboard" }],
      },
      primaryType: "HyperboardUpdateRequest",
      message: {
        hyperboard: {
          id: parsedBody.data.id,
          title: parsedBody.data.title,
          description: parsedBody.data.collections[0].description,
          borderColor: parsedBody.data.borderColor,
          hypercertIds: parsedBody.data.collections.flatMap((collection) =>
            collection.hypercerts.map((hc) => hc.hypercertId),
          ),
          factors: parsedBody.data.collections.flatMap((collection) => {
            return collection.hypercerts.map((hc) => hc.factor);
          }),
        },
      },
      requiredChainId: chainId,
    });

    if (!success) {
      this.setStatus(400);
      return {
        success: false,
        message: "Invalid signature",
        data: null,
      };
    }

    // Check if the admin is authorized to update the hyperboard
    const adminUser = hyperboard.admins.find(
      (admin) => admin.address === adminAddress && admin.chain_id === chainId,
    );

    if (!adminUser) {
      this.setStatus(401);
      return {
        success: false,
        message: "Not authorized to update hyperboard",
        data: null,
      };
    }

    try {
      await dataService.upsertHyperboards([
        {
          id: hyperboardId,
          background_image: parsedBody.data.backgroundImg || null,
          tile_border_color: parsedBody.data.borderColor,
          chain_ids: hyperboard.chain_ids,
          name: parsedBody.data.title,
          grayscale_images: false,
        },
      ]);
    } catch (err) {
      console.error(err);
      this.setStatus(400);
      return {
        success: false,
        message: "Error updating hyperboard",
        data: null,
      };
    }

    const collectionsToUpdate = parsedBody.data.collections.filter(
      (collection) => !!collection.id,
    );
    for (const collection of collectionsToUpdate) {
      try {
        if (!collection.id) {
          continue;
        }
        const currentCollection = await dataService.getCollectionById(
          collection.id,
        );
        if (!currentCollection) {
          throw new Error(`Collection with id ${collection.id} not found`);
        }

        // Add the collection to the hyperboard if it hasn't been added already
        const isCollectionInHyperboard = !!hyperboard.collections.find(
          (c) => c.id === collection.id,
        );
        if (!isCollectionInHyperboard) {
          await dataService.addCollectionToHyperboard(
            hyperboardId,
            collection.id,
          );
        }

        // Update metadata anyway because they are not collection specific
        const currentUserIsAdminForCollection =
          currentCollection.collection_admins
            .flatMap((x) => x.admins)
            .find(
              (admin) =>
                admin.chain_id === chainId && admin.address === adminAddress,
            );

        if (currentUserIsAdminForCollection) {
          // Update collection if you are an admin of the collection
          await dataService.upsertCollections([
            {
              id: collection.id,
              name: collection.title,
              chain_ids: _.uniq([...currentCollection.chain_ids, chainId]),
              description: collection.description,
            },
          ]);
          // Update hypercerts in the collection if you are an admin of the collection
          await dataService.upsertHypercerts(
            collection.hypercerts.map((hc) => ({
              hypercert_id: hc.hypercertId,
              collection_id: currentCollection.id,
            })),
          );

          await dataService.upsertHyperboardHypercertMetadata(
            collection.hypercerts.map((hc) => ({
              hypercert_id: hc.hypercertId,
              hyperboard_id: hyperboardId,
              collection_id: currentCollection.id,
              display_size: hc.factor,
            })),
          );
        }
      } catch (e) {
        console.error(e);
        this.setStatus(400);
        return {
          success: false,
          message: "Error updating collection",
          data: null,
        };
      }
    }

    const collectionsToCreate = parsedBody.data.collections.filter(
      (collection) => !collection.id,
    );
    for (const collection of collectionsToCreate) {
      try {
        const collectionCreateResponse = await dataService.upsertCollections([
          {
            name: collection.title,
            description: collection.description,
            chain_ids: [chainId],
          },
        ]);

        const collectionId = collectionCreateResponse[0]?.id;
        if (!collectionId) {
          throw new Error("Collection must have an id to add claims.");
        }

        // Add current user as admin to the collection because they are creating it
        const admin = await dataService.addAdminToCollection(
          collectionId,
          adminAddress,
          chainId,
        );

        if (!admin) {
          throw new Error("Admin must be added to collection.");
        }

        const hypercerts = collection.hypercerts.map((hc) => ({
          hypercert_id: hc.hypercertId,
          collection_id: collectionId,
        }));
        await dataService.upsertHypercerts(hypercerts);
        await dataService.upsertHyperboardHypercertMetadata(
          collection.hypercerts.map((hc) => ({
            hypercert_id: hc.hypercertId,
            hyperboard_id: hyperboardId,
            collection_id: collectionId,
            display_size: hc.factor,
          })),
        );

        await dataService.addCollectionToHyperboard(hyperboardId, collectionId);
      } catch (e) {
        console.error(e);
        this.setStatus(400);
        return {
          success: false,
          message: "Error creating collection",
          data: null,
        };
      }
    }

    this.setStatus(202);
    return {
      success: true,
      data: {
        id: hyperboardId,
      },
    };
  }

  @Delete("{hyperboardId}")
  @SuccessResponse(204, "Hyperboard deleted successfully")
  @Response<ApiResponse>(422, "Unprocessable content", {
    success: false,
    message: "Errors while deleting hyperboard",
  })
  public async deleteHyperboard(
    @Path() hyperboardId: string,
    @Query() adminAddress: string,
    @Query() signature: string,
  ): Promise<ApiResponse> {
    const inputSchema = z.object({
      adminAddress: z.string(),
      signature: z.string(),
    });

    const parsedBody = inputSchema.safeParse({
      adminAddress,
      signature,
    });

    if (!parsedBody.success) {
      this.setStatus(422);
      return {
        success: false,
        errors: JSON.parse(parsedBody.error.toString()),
      };
    }

    const dataService = new SupabaseDataService();
    const hyperboard = await dataService.getHyperboardById(hyperboardId);

    if (!hyperboard) {
      this.setStatus(404);
      return {
        success: false,
        message: "Hyperboard not found",
      };
    }

    const { admins, chain_ids } = hyperboard;
    const chain_id = chain_ids[0];
    if (
      !admins.find(
        (admin) =>
          admin.address === adminAddress && admin.chain_id === chain_id,
      )
    ) {
      this.setStatus(401);
      return {
        success: false,
        message: "Not authorized to delete hyperboard",
      };
    }

    const success = await verifyAuthSignedData({
      address: adminAddress as `0x${string}`,
      signature: signature as `0x${string}`,
      types: {
        Hyperboard: [{ name: "id", type: "string" }],
        HyperboardDeleteRequest: [{ name: "hyperboard", type: "Hyperboard" }],
      },
      primaryType: "HyperboardDeleteRequest",
      message: {
        hyperboard: {
          id: hyperboardId,
        },
      },
      requiredChainId: chain_id,
    });

    if (!success) {
      this.setStatus(401);
      return {
        success: false,
        message: "Invalid signature",
      };
    }

    try {
      await dataService.deleteHyperboard(hyperboardId);
      this.setStatus(202);
      return {
        success: true,
      };
    } catch (err) {
      console.error(err);
      this.setStatus(400);
      return {
        success: false,
        message: "Error deleting hyperboard",
      };
    }
  }
}
