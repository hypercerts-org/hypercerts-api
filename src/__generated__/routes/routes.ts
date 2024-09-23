/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TsoaRoute, fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './../../controllers/UserController.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MetadataController } from './../../controllers/MetadataController.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MarketplaceController } from './../../controllers/MarketplaceController.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AllowListController } from './../../controllers/AllowListController.js';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "Record_string.string-or-string-Array_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"array","array":{"dataType":"string"}}]},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Error": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "message": {"dataType":"string","required":true},
            "stack": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse__address-string_-or-null_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"errors":{"dataType":"union","subSchemas":[{"ref":"Record_string.string-or-string-Array_"},{"dataType":"array","array":{"dataType":"refObject","ref":"Error"}}]},"message":{"dataType":"string"},"data":{"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{"address":{"dataType":"string","required":true}}},{"dataType":"enum","enums":[null]}]},"success":{"dataType":"boolean","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AddOrUpdateUserResponse": {
        "dataType": "refAlias",
        "type": {"ref":"ApiResponse__address-string_-or-null_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"errors":{"dataType":"union","subSchemas":[{"ref":"Record_string.string-or-string-Array_"},{"dataType":"array","array":{"dataType":"refObject","ref":"Error"}}]},"message":{"dataType":"string"},"data":{"dataType":"void"},"success":{"dataType":"boolean","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AddOrUpdateUserRequest": {
        "dataType": "refObject",
        "properties": {
            "address": {"dataType":"string","required":true},
            "display_name": {"dataType":"string","required":true},
            "avatar": {"dataType":"string","required":true},
            "signature": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse__cid-string__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"errors":{"dataType":"union","subSchemas":[{"ref":"Record_string.string-or-string-Array_"},{"dataType":"array","array":{"dataType":"refObject","ref":"Error"}}]},"message":{"dataType":"string"},"data":{"dataType":"nestedObjectLiteral","nestedProperties":{"cid":{"dataType":"string","required":true}}},"success":{"dataType":"boolean","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StorageResponse": {
        "dataType": "refAlias",
        "type": {"ref":"ApiResponse__cid-string__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "HypercertClaimdata_36_1": {
        "dataType": "refObject",
        "properties": {
            "impact_scope": {"dataType":"nestedObjectLiteral","nestedProperties":{"display_value":{"dataType":"string"},"excludes":{"dataType":"array","array":{"dataType":"string"}},"value":{"dataType":"array","array":{"dataType":"string"}},"name":{"dataType":"string"}},"additionalProperties":{"dataType":"any"},"required":true},
            "work_scope": {"dataType":"nestedObjectLiteral","nestedProperties":{"display_value":{"dataType":"string"},"excludes":{"dataType":"array","array":{"dataType":"string"}},"value":{"dataType":"array","array":{"dataType":"string"}},"name":{"dataType":"string"}},"additionalProperties":{"dataType":"any"},"required":true},
            "work_timeframe": {"dataType":"nestedObjectLiteral","nestedProperties":{"display_value":{"dataType":"string"},"value":{"dataType":"array","array":{"dataType":"double"}},"name":{"dataType":"string"}},"additionalProperties":{"dataType":"any"},"required":true},
            "impact_timeframe": {"dataType":"nestedObjectLiteral","nestedProperties":{"display_value":{"dataType":"string"},"value":{"dataType":"array","array":{"dataType":"double"}},"name":{"dataType":"string"}},"additionalProperties":{"dataType":"any"},"required":true},
            "contributors": {"dataType":"nestedObjectLiteral","nestedProperties":{"display_value":{"dataType":"string"},"value":{"dataType":"array","array":{"dataType":"string"}},"name":{"dataType":"string"}},"additionalProperties":{"dataType":"any"},"required":true},
            "rights": {"dataType":"nestedObjectLiteral","nestedProperties":{"display_value":{"dataType":"string"},"excludes":{"dataType":"array","array":{"dataType":"string"}},"value":{"dataType":"array","array":{"dataType":"string"}},"name":{"dataType":"string"}},"additionalProperties":{"dataType":"any"}},
        },
        "additionalProperties": {"dataType":"any"},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "HypercertMetadata": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "external_url": {"dataType":"string"},
            "image": {"dataType":"string","required":true},
            "version": {"dataType":"string"},
            "ref": {"dataType":"string"},
            "allowList": {"dataType":"string"},
            "properties": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"value":{"dataType":"string"},"trait_type":{"dataType":"string"}},"additionalProperties":{"dataType":"any"}}},
            "hypercert": {"ref":"HypercertClaimdata_36_1"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StoreMetadataRequest": {
        "dataType": "refObject",
        "properties": {
            "metadata": {"ref":"HypercertMetadata","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StoreMetadataWithAllowlistRequest": {
        "dataType": "refObject",
        "properties": {
            "metadata": {"ref":"HypercertMetadata","required":true},
            "allowList": {"dataType":"string","required":true},
            "totalUnits": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ValidationResult": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"errors":{"ref":"Record_string.string-or-string-Array_"},"data":{"dataType":"void"},"valid":{"dataType":"boolean","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_ValidationResult_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"errors":{"dataType":"union","subSchemas":[{"ref":"Record_string.string-or-string-Array_"},{"dataType":"array","array":{"dataType":"refObject","ref":"Error"}}]},"message":{"dataType":"string"},"data":{"ref":"ValidationResult"},"success":{"dataType":"boolean","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ValidationResponse": {
        "dataType": "refAlias",
        "type": {"ref":"ApiResponse_ValidationResult_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ValidateMetadataRequest": {
        "dataType": "refObject",
        "properties": {
            "metadata": {"ref":"HypercertMetadata","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderValidatorCode": {
        "dataType": "refEnum",
        "enums": [0,101,111,112,113,201,211,212,213,301,311,312,321,322,401,402,411,412,413,414,415,421,422,501,502,503,601,611,612,621,622,623,631,632,633,634,701,702,801,802,901,902],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick__additionalParameters-string--amounts-number-Array--chainId-number--collection-string--collectionType-number--createdAt-string--currency-string--endTime-number--globalNonce-string--id-string--invalidated-boolean--itemIds-string-Array--orderNonce-string--price-string--quoteType-number--signature-string--signer-string--startTime-number--strategyId-number--subsetNonce-number--validator_codes-number-Array_.Exclude_keyof_additionalParameters-string--amounts-number-Array--chainId-number--collection-string--collectionType-number--createdAt-string--currency-string--endTime-number--globalNonce-string--id-string--invalidated-boolean--itemIds-string-Array--orderNonce-string--price-string--quoteType-number--signature-string--signer-string--startTime-number--strategyId-number--subsetNonce-number--validator_codes-number-Array_.id-or-createdAt-or-invalidated-or-validator_codes__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit__additionalParameters-string--amounts-number-Array--chainId-number--collection-string--collectionType-number--createdAt-string--currency-string--endTime-number--globalNonce-string--id-string--invalidated-boolean--itemIds-string-Array--orderNonce-string--price-string--quoteType-number--signature-string--signer-string--startTime-number--strategyId-number--subsetNonce-number--validator_codes-number-Array_.id-or-createdAt-or-invalidated-or-validator_codes_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick__additionalParameters-string--amounts-number-Array--chainId-number--collection-string--collectionType-number--createdAt-string--currency-string--endTime-number--globalNonce-string--id-string--invalidated-boolean--itemIds-string-Array--orderNonce-string--price-string--quoteType-number--signature-string--signer-string--startTime-number--strategyId-number--subsetNonce-number--validator_codes-number-Array_.Exclude_keyof_additionalParameters-string--amounts-number-Array--chainId-number--collection-string--collectionType-number--createdAt-string--currency-string--endTime-number--globalNonce-string--id-string--invalidated-boolean--itemIds-string-Array--orderNonce-string--price-string--quoteType-number--signature-string--signer-string--startTime-number--strategyId-number--subsetNonce-number--validator_codes-number-Array_.id-or-createdAt-or-invalidated-or-validator_codes__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateOrderRequest": {
        "dataType": "refObject",
        "properties": {
            "signature": {"dataType":"string","required":true},
            "chainId": {"dataType":"double","required":true},
            "quoteType": {"dataType":"double","required":true},
            "globalNonce": {"dataType":"string","required":true},
            "subsetNonce": {"dataType":"double","required":true},
            "orderNonce": {"dataType":"string","required":true},
            "strategyId": {"dataType":"double","required":true},
            "collectionType": {"dataType":"double","required":true},
            "collection": {"dataType":"string","required":true},
            "currency": {"dataType":"string","required":true},
            "signer": {"dataType":"string","required":true},
            "startTime": {"dataType":"double","required":true},
            "endTime": {"dataType":"double","required":true},
            "price": {"dataType":"string","required":true},
            "itemIds": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "amounts": {"dataType":"array","array":{"dataType":"double"},"required":true},
            "additionalParameters": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateOrderNonceRequest": {
        "dataType": "refObject",
        "properties": {
            "address": {"dataType":"string","required":true},
            "chainId": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ValidateOrderRequest": {
        "dataType": "refObject",
        "properties": {
            "tokenIds": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "chainId": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StoreAllowListRequest": {
        "dataType": "refObject",
        "properties": {
            "allowList": {"dataType":"string","required":true},
            "totalUnits": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ValidateAllowListRequest": {
        "dataType": "refObject",
        "properties": {
            "allowList": {"dataType":"string","required":true},
            "totalUnits": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.post('/v1/users/:userId',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.addOrUpdateUser)),

            async function UserController_addOrUpdateUser(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"AddOrUpdateUserRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'addOrUpdateUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/v1/metadata',
            ...(fetchMiddlewares<RequestHandler>(MetadataController)),
            ...(fetchMiddlewares<RequestHandler>(MetadataController.prototype.storeMetadata)),

            async function MetadataController_storeMetadata(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"StoreMetadataRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new MetadataController();

              await templateService.apiHandler({
                methodName: 'storeMetadata',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/v1/metadata/with-allowlist',
            ...(fetchMiddlewares<RequestHandler>(MetadataController)),
            ...(fetchMiddlewares<RequestHandler>(MetadataController.prototype.storeMetadataWithAllowlist)),

            async function MetadataController_storeMetadataWithAllowlist(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"StoreMetadataWithAllowlistRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new MetadataController();

              await templateService.apiHandler({
                methodName: 'storeMetadataWithAllowlist',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/v1/metadata/validate',
            ...(fetchMiddlewares<RequestHandler>(MetadataController)),
            ...(fetchMiddlewares<RequestHandler>(MetadataController.prototype.validateMetadata)),

            async function MetadataController_validateMetadata(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"ValidateMetadataRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new MetadataController();

              await templateService.apiHandler({
                methodName: 'validateMetadata',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/v1/metadata/with-allowlist/validate',
            ...(fetchMiddlewares<RequestHandler>(MetadataController)),
            ...(fetchMiddlewares<RequestHandler>(MetadataController.prototype.validateMetadataWithAllowlist)),

            async function MetadataController_validateMetadataWithAllowlist(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"StoreMetadataWithAllowlistRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new MetadataController();

              await templateService.apiHandler({
                methodName: 'validateMetadataWithAllowlist',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/v1/marketplace/orders',
            ...(fetchMiddlewares<RequestHandler>(MarketplaceController)),
            ...(fetchMiddlewares<RequestHandler>(MarketplaceController.prototype.storeOrder)),

            async function MarketplaceController_storeOrder(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"CreateOrderRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new MarketplaceController();

              await templateService.apiHandler({
                methodName: 'storeOrder',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/v1/marketplace/order-nonce',
            ...(fetchMiddlewares<RequestHandler>(MarketplaceController)),
            ...(fetchMiddlewares<RequestHandler>(MarketplaceController.prototype.updateOrderNonce)),

            async function MarketplaceController_updateOrderNonce(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"UpdateOrderNonceRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new MarketplaceController();

              await templateService.apiHandler({
                methodName: 'updateOrderNonce',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/v1/marketplace/orders/validate',
            ...(fetchMiddlewares<RequestHandler>(MarketplaceController)),
            ...(fetchMiddlewares<RequestHandler>(MarketplaceController.prototype.validateOrder)),

            async function MarketplaceController_validateOrder(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"ValidateOrderRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new MarketplaceController();

              await templateService.apiHandler({
                methodName: 'validateOrder',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/v1/marketplace/orders',
            ...(fetchMiddlewares<RequestHandler>(MarketplaceController)),
            ...(fetchMiddlewares<RequestHandler>(MarketplaceController.prototype.deleteOrder)),

            async function MarketplaceController_deleteOrder(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    requestBody: {"in":"body","name":"requestBody","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"signature":{"dataType":"string","required":true},"orderId":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new MarketplaceController();

              await templateService.apiHandler({
                methodName: 'deleteOrder',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/v1/allowlists',
            ...(fetchMiddlewares<RequestHandler>(AllowListController)),
            ...(fetchMiddlewares<RequestHandler>(AllowListController.prototype.storeAllowList)),

            async function AllowListController_storeAllowList(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"StoreAllowListRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new AllowListController();

              await templateService.apiHandler({
                methodName: 'storeAllowList',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/v1/allowlists/validate',
            ...(fetchMiddlewares<RequestHandler>(AllowListController)),
            ...(fetchMiddlewares<RequestHandler>(AllowListController.prototype.validateAllowList)),

            async function AllowListController_validateAllowList(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"ValidateAllowListRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new AllowListController();

              await templateService.apiHandler({
                methodName: 'validateAllowList',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
