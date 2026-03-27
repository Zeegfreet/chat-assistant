import { DbConnection } from "@db/db/config/dbConnection";
import { FindSessionByPkRepository } from "@domain/index";
import { Session } from "@src/entitys/session.entity";

export class TypeOrmFindSessionByPkRepository implements FindSessionByPkRepository{
    private get sessionRepository() {
        return DbConnection.getInstance().getCollection(Session);
    }
    async findByPk(sessionId: FindSessionByPkRepository.SessionId): Promise<FindSessionByPkRepository.Result> {
        const session = await this.sessionRepository.findOneBy({ id: sessionId });
        if(!session) return null;
        return {
            id: session.id,
            isActive: session.isActive,
            origin: session.origin,
            closeReason: session.closeReason,
            secret: session.secret,
            refreshedAt: session.refreshedAt,
            closedAt: session.closedAt,
            updatedAt: session.updatedAt,
            createdAt: session.createdAt,
        };
    }

}