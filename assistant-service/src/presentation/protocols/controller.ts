import { HttpRequest, HttpResponse } from "./http";

export interface Controller<T = any> {
    handle(req: Controller.Request): Promise<Controller.Response<T>>
}

export namespace Controller {
    export type Request = HttpRequest
    export type Response<T = any> = HttpResponse<T>
}