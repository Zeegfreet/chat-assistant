import { TypeOrmFindHistoryMessagesByIdentifierRepository } from "@db/db/repositories/messages/typeOrmFindHistoryMessagesByIdentifierRepository";
import { RedisFindHistoryMessagesRepository } from "@db/redis/repository/messages/redisFindHistoryMessagesRepository";
import { RedisPopulateMessagesRepository } from "@db/redis/repository/messages/redisPopulateMessagesRepository";
import { RedisVerifyIfMessagesExists } from "@db/redis/repository/messages/redisVerifyIfMessagesExists";
import { GetChatContextService } from "@db/services/getChatContextService";

export const makeGetChatContextServiceFactory = () => {
    const memoryVerify = new RedisVerifyIfMessagesExists();
    const memoryFindHisotry = new RedisFindHistoryMessagesRepository();
    const memoryPopulate = new RedisPopulateMessagesRepository();
    const dbFindHistory = new TypeOrmFindHistoryMessagesByIdentifierRepository();

    return new GetChatContextService(
        memoryVerify,
        memoryFindHisotry,
        memoryPopulate,
        dbFindHistory
    );
};