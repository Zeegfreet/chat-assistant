import { RedisConnection } from "@db/redis/config/redisConnect";
import { MemoryPopulateMessagesRepository } from "@domain/repositorys/memory/messages/memoryPopulateMessagesRepository";

export class RedisPopulateMessagesRepository implements MemoryPopulateMessagesRepository {
    private readonly ttl = 3600;
    private readonly prefix = "messages:cache";
    private get redisClient(){
        return RedisConnection.getInstance().getClient();
    }
    async populate(accountId: MemoryPopulateMessagesRepository.AccountID, conversationId: MemoryPopulateMessagesRepository.ConversationID, messages: MemoryPopulateMessagesRepository.Messages): Promise<void> {
        const key = `${this.prefix}:${accountId}:${conversationId}`;
        const multi = this.redisClient.multi();
        multi.del(key);

        messages.forEach((message) => {
            multi.rPush(key, JSON.stringify(message));
        });
        
        multi.expire(key, this.ttl);

        await multi.exec();
    }

}