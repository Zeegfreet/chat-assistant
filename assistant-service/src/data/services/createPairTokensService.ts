import { Encrypter } from "@data/protocols/encrypter";
import { UuidCreator } from "@data/protocols/uuidCreator";
import { AccessDeniedError } from "@domain/errors/AccessDeniedError";
import { ConflictError } from "@domain/errors/ConflictError";
import { ForbiddenError } from "@domain/errors/ForbbidenError";
import { SessionRevokedError } from "@domain/errors/SessionRevokedError";
import { CreatePairTokens, FindSessionByPkRepository, LoadAuthUserByPkRepository, UpdateSessionRepository } from "@domain/index";

export class CreatePairTokensService implements CreatePairTokens{
    constructor(
        private readonly loadAuthUserByPkRepository: LoadAuthUserByPkRepository,
        private readonly findSessionByPkRepository: FindSessionByPkRepository,
        private readonly updateSessionRepository: UpdateSessionRepository,
        private readonly uuidCreator: UuidCreator,
        private readonly assimetricEncrypter: Encrypter,
        private readonly simetricEncrypter: Encrypter,
    ){}
    async create(userId: CreatePairTokens.UserId, sessionId: CreatePairTokens.SessionId, secret?: CreatePairTokens.Secret): Promise<CreatePairTokens.Result> {
        const session = await this.findSessionByPkRepository.findByPk(sessionId);
        if(!session) throw new ConflictError("Session not found");
        if(!session.isActive) throw new SessionRevokedError();
        
        const user = await this.loadAuthUserByPkRepository.loadByPk(userId);
        if(!user) throw new ConflictError("Session not found");
        if(!user.isActive) throw new ForbiddenError("Currently user is inactive, please contact an admin.");
        if(user.isBlocked) throw new AccessDeniedError("Currently user is blocked, please contact an admin.");

        if(secret) {
            if(session.secret !== secret){
                console.log("receivedSecret", secret);
                console.log("sessionSecret", session.secret);
                throw new SessionRevokedError();
            }
        }
        
        const userData: CreatePairTokens.Result["user"] = {
            id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            roles: user.roles,
            permissions: user.permissions
        };

        const sessionSecret = this.uuidCreator.create();

        await this.updateSessionRepository.update(session.id, {
            secret: sessionSecret
        });

        const accessToken = await this.assimetricEncrypter.encrypt({ 
            ...userData, 
            sessionId: session.id 
        }, "1H");

        const refreshToken = await this.simetricEncrypter.encrypt({ 
            userId: user.id,
            sessionId: session.id,
            secret: sessionSecret
        }, "1D");

        return {
            user: userData,
            accessToken,
            refreshToken
        };
    }

}