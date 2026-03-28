import { TypeOrmAddMessageRepository } from "@db/db/repositories/messages/typeOrmAddMessageRepository";
import { RedisAddMessageRepository } from "@db/redis/repository/messages/redisAddMessageRepository";
import { RedisVerifyIfMessagesExists } from "@db/redis/repository/messages/redisVerifyIfMessagesExists";
import { AddChatMessageContextService } from "@db/services/addChatMessageContextService";

export const makeAddChatMessageContextServiceFactory = () => {
    const cacheVerify = new RedisVerifyIfMessagesExists();
    const cacheAdd = new RedisAddMessageRepository();
    const dbAddMessage = new TypeOrmAddMessageRepository();
    
    return new AddChatMessageContextService(
        cacheVerify,
        cacheAdd,
        dbAddMessage
    );
};