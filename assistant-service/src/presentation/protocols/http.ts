import { LoggedUser } from "@domain/models/LoggedUser";

export interface HttpRequest<T = any, K = any, Y = any, J = any>{
    body: T
    params: K
    query: Y
    headers: J
    context?: {
        user?: LoggedUser
        [key: string]: any
    }
    cookies?: any
}

export interface HttpResponse<T = any> {
    statusCode: HttpResponse.StatusCode
    simpleResponse?: boolean,
    body?: HttpResponse.Body<T>
    message?: HttpResponse.Message
    errorCode?: HttpResponse.ErrorCode
    cookies?: HttpResponse.Cookies
    primitiveError?: HttpResponse.PrimitiveError
}

export namespace HttpResponse {
    export type StatusCode = number
    export type Body<T = any> = T
    export type Message = string
    export type ErrorCode = string
    export type Cookies = {
        name: string
        content: string,
        options?: Record<string, unknown>
    }[]
    export type PrimitiveError = any
}