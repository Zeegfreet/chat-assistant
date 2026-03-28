import { RedisConnection } from "@db/redis/config/redisConnect";
import { MemoryFindHistoryMessagesRepository } from "@domain/index";
import { MessageModel } from "@domain/models/MessageModel";

export class RedisFindHistoryMessagesRepository implements MemoryFindHistoryMessagesRepository {
    private readonly prefix = "messages:cache";
    private get redisClient(){
        return RedisConnection.getInstance().getClient();
    }
    async find(accountId: string, conversationId: string): Promise<MessageModel[]> {
        const key = `${this.prefix}:${accountId}:${conversationId}`;
        const history = await this.redisClient.lRange(key, 0, -1);

        return history.map((message) => JSON.parse(message));
    }

}