import { Decrypter } from "@data/protocols/decrypter";
import { SessionValidate } from "@domain/index";
import { AccessDeniedError } from "@presentation/errors/access-denied-error";
import { SessionExpiredError } from "@presentation/errors/session-expired-error";
import { Middleware } from "@presentation/protocols/middleware";

export class StateFullLoadTokenMiddleware implements Middleware{
    constructor(
        private readonly decrypter: Decrypter,
        private readonly dbCheckSession: SessionValidate
    ){}
    async handle(req: Middleware.Request): Promise<Middleware.Response> {
        const authorization = req.headers?.Authorization;

        if(!authorization){
            return {
                next: false,
                error: new AccessDeniedError()
            };
        }
        const [,token] = authorization.split(" ");

        const decrypted = await this.decrypter.decrypt(token);

        if(decrypted.success === false) {
            if(decrypted.kind === "EXPIRED"){
                return {
                    next: false,
                    error: new SessionExpiredError()
                };
            }
            return {
                next: false,
                error: new AccessDeniedError()
            };
        }

        try {
            const loggedUser = await this.dbCheckSession.validate(decrypted.resources.id, decrypted.resources.sessionId);

            return {
                next: true,
                context: { user: loggedUser }
            };
            
        } catch (error) {
            return {
                next: false,
                error
            };
        }

    }
    
}