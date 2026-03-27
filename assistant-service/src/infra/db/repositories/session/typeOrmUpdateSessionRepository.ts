import { DbConnection } from "@db/db/config/dbConnection";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { UpdateSessionRepository } from "@domain/index";
import { Session } from "@src/entitys/session.entity";

export class TypeOrmUpdateSessionRepository implements UpdateSessionRepository {
    private get sessionRepository(){
        return DbConnection.getInstance().getCollection(Session);
    }
    async update(id: UpdateSessionRepository.SessionId, payload: UpdateSessionRepository.Payload): Promise<UpdateSessionRepository.Result> {
        const sessionToUpdate = await this.sessionRepository.findOneBy({ id });
        if(!sessionToUpdate) throw new NotFoundError("Session not found to update");
        const sessionPayload = {
            ...sessionToUpdate,
            ...payload
        };
        const updatedSession = await this.sessionRepository.save(sessionPayload);
        return {
            id: updatedSession.id,
            isActive: updatedSession.isActive,
            origin: updatedSession.origin,
            closeReason: updatedSession.closeReason,
            secret: updatedSession.secret,
            refreshedAt: updatedSession.refreshedAt,
            closedAt: updatedSession.closedAt,
            updatedAt: updatedSession.updatedAt,
            createdAt: updatedSession.createdAt,
        };
    }

}