import { OpenAPIGenerator } from "@orpc/openapi";
import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { ZodSmartCoercionPlugin, ZodToJsonSchemaConverter } from "@orpc/zod";

import { appRouter } from "#/server";
import { CORSPlugin } from "@orpc/server/plugins";
import { onError } from "@orpc/server";

export const openapiHandler = new OpenAPIHandler(appRouter, {
  plugins: [new ZodSmartCoercionPlugin(),new CORSPlugin()],interceptors: [
    onError(error => console.error(error))
  ],
});

export const openAPIGenerator = new OpenAPIGenerator({
  schemaConverters: [new ZodToJsonSchemaConverter()],
});
