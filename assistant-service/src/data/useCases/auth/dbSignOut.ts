import { ForbiddenError } from "@domain/errors/ForbbidenError";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { AddSessionToBlackListRepository, FindSessionByPkRepository, SignOut, UpdateSessionRepository } from "@domain/index";

export class DbSignOut implements SignOut{
    constructor(
        private readonly updateSessionRepository: UpdateSessionRepository,
        private readonly findSessionByPkRepository: FindSessionByPkRepository,
        private readonly addSessionToBlackListRepository: AddSessionToBlackListRepository
    ){}
    async logout(sessionId: SignOut.SessionId): Promise<void> {
        const session = await this.findSessionByPkRepository.findByPk(sessionId);
        if(!session) throw new NotFoundError("Session not found with provided credentials");
        if(!session.isActive) throw new ForbiddenError("The provided session is previous finished");

        await this.updateSessionRepository.update(sessionId, {
            isActive: false,
            closedAt: new Date(),
            closeReason: "LOGOUT"
        });

        await this.addSessionToBlackListRepository.add({
            sessionId,
            ttl: 60 * 60
        });
    }

}