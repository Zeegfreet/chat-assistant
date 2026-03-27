import { HttpRequest } from "./http";

export interface Middleware {
    handle(req: Middleware.Request): Promise<Middleware.Response>
}

export namespace Middleware {
    export type Request = HttpRequest
    export type Response = ResponseSuccess | ResponseError

    interface ResponseSuccess<TContext = Record<string, unknown>> {
        next: true,
        context: TContext
    }

    interface ResponseError {
        next: false,
        error: Error
    }
}
