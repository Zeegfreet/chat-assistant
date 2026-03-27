import { Decrypter } from "@data/protocols/decrypter";
import { SessionRevokedError } from "@domain/errors/SessionRevokedError";
import { VerifySessionIsInBlackList } from "@domain/index";
import { AccessDeniedError } from "@presentation/errors/access-denied-error";
import { SessionExpiredError } from "@presentation/errors/session-expired-error";
import { Middleware } from "@presentation/protocols/middleware";

export class StateLessLoadTokenMiddleware implements Middleware{
    constructor(
        private readonly decrypter: Decrypter,
        private readonly verifySessionIsInBlackList: VerifySessionIsInBlackList
    ){}
    async handle(req: Middleware.Request): Promise<Middleware.Response> {
        const authorization = req.headers?.authorization;

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

        const isInBlackList = await this.verifySessionIsInBlackList.verify(decrypted.resources.sessionId);

        if(isInBlackList){
            return {
                next: false,
                error: new SessionRevokedError()
            };
        }

        return {
            next: true,
            context: { user: decrypted.resources }
        };
    }
    
}