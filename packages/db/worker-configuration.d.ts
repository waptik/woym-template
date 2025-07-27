
declare namespace Cloudflare {
    interface Env {
        NODE_ENV: "development";
        DB: D1Database;
    }
}
interface CloudflareBindings extends Cloudflare.Env {}
type StringifyValues<EnvType extends Record<string, unknown>> = {
    [Binding in keyof EnvType]: EnvType[Binding] extends string
        ? EnvType[Binding]
        : string;
};
declare namespace NodeJS {
    interface ProcessEnv
        extends StringifyValues<Pick<Cloudflare.Env, "NODE_ENV">> {}
}

declare namespace Cloudflare {
    interface Env {
    }
}
declare module "cloudflare:workers" {
    export const env: Cloudflare.Env;
}
