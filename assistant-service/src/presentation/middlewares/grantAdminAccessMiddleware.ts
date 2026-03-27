import { AccessDeniedError } from "@presentation/errors/access-denied-error";
import { Middleware } from "@presentation/protocols/middleware";

export class GrantAdminAccessMiddleware implements Middleware{
    async handle(req: Middleware.Request): Promise<Middleware.Response> {

        if(req.context && req.context.user && req.context.user?.isAdmin){
            return {
                next: true,
                context: {}
            };
        }

        return {
            next: false,
            error: new AccessDeniedError()
        };
    }

}