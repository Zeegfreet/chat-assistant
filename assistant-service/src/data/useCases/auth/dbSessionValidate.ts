import { AccessDeniedError } from "@domain/errors/AccessDeniedError";
import { ForbiddenError } from "@domain/errors/ForbbidenError";
import { SignInError } from "@domain/errors/SignInError";
import { FindSessionByPkRepository, LoadAuthUserByPkRepository, SessionValidate } from "@domain/index";

export class DbSessionValidate implements SessionValidate{
    constructor(
        private readonly loadAuthUserByPk: LoadAuthUserByPkRepository,
        private readonly findSessionByPkRepository: FindSessionByPkRepository
    ){}

    async validate(userId: SessionValidate.UserId, sessionId: SessionValidate.SessionId): Promise<SessionValidate.Response> {
        const session = await this.findSessionByPkRepository.findByPk(sessionId);
        if(!session) throw new AccessDeniedError("Session not found with provided credentials.");
        
        if(!session.isActive) throw new AccessDeniedError(`Session is closed for reason: ${session.closeReason}`);
        
        const user = await this.loadAuthUserByPk.loadByPk(userId);
        if (!user) throw new SignInError();
        
        const { isActive, isBlocked } = user;
        
        if(isBlocked) throw new ForbiddenError("Current user is blocked");
        if(!isActive) throw new ForbiddenError("Current user is inactive");

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            roles: user.roles,
            permissions: user.permissions
        };
    }

}