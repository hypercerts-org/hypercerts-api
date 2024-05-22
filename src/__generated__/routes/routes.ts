/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TsoaRoute, fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MetadataController } from './../../controllers/MetadataController.js';
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
    "StoreResponse": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"errors":{"dataType":"union","subSchemas":[{"ref":"Record_string.string-or-string-Array_"},{"dataType":"array","array":{"dataType":"refObject","ref":"Error"}}]},"message":{"dataType":"string","required":true},"data":{"dataType":"void"},"success":{"dataType":"boolean","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "HypercertClaimdata": {
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
            "hypercert": {"ref":"HypercertClaimdata"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ValidationResponse": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"errors":{"ref":"Record_string.string-or-string-Array_"},"message":{"dataType":"string","required":true},"valid":{"dataType":"boolean","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateAllowListRequest": {
        "dataType": "refObject",
        "properties": {
            "allowList": {"dataType":"string","required":true,"validators":{"isString":{"errorMsg":"Should be string"}}},
            "totalUnits": {"dataType":"string","required":true,"validators":{"isString":{"errorMsg":"The total units should be provided as a string to be compatible with BigInt."}}},
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
        app.post('/v1/metadata',
            ...(fetchMiddlewares<RequestHandler>(MetadataController)),
            ...(fetchMiddlewares<RequestHandler>(MetadataController.prototype.storeMetadata)),

            async function MetadataController_storeMetadata(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"HypercertMetadata"},
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
        app.post('/v1/metadata/validate',
            ...(fetchMiddlewares<RequestHandler>(MetadataController)),
            ...(fetchMiddlewares<RequestHandler>(MetadataController.prototype.validateMetadata)),

            async function MetadataController_validateMetadata(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"HypercertMetadata"},
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
        app.post('/v1/allowlists',
            ...(fetchMiddlewares<RequestHandler>(AllowListController)),
            ...(fetchMiddlewares<RequestHandler>(AllowListController.prototype.storeAllowList)),

            async function AllowListController_storeAllowList(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"CreateAllowListRequest"},
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
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"CreateAllowListRequest"},
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
