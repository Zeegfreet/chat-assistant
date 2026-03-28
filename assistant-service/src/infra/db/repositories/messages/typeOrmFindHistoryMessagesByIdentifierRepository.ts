import { DbConnection } from "@db/db/config/dbConnection";
import { FindHistoryMessageByIdentifiersRepository } from "@domain/index";
import { Messages } from "@src/entitys/messages.entity";

export class TypeOrmFindHistoryMessagesByIdentifierRepository implements FindHistoryMessageByIdentifiersRepository {
    private get permissionRepository() {
        return DbConnection.getInstance().getCollection(Messages);
    }
    async findByIdentifiers(params: FindHistoryMessageByIdentifiersRepository.Params, limit: number = 15): Promise<FindHistoryMessageByIdentifiersRepository.Result[]> {
        const history = await this.permissionRepository.find({ 
            where: { 
                conversationId: params.conversationId,
                accountId: params.accountId
            }, 
            take: limit,
            order: {
                createdAt: "DESC"
            }
        });

        return history as any[];
    }

}