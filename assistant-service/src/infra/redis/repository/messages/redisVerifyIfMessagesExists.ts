import { RedisConnection } from "@db/redis/config/redisConnect";
import { MemoryVerifyIfMessagesExists } from "@domain/index";

export class RedisVerifyIfMessagesExists implements MemoryVerifyIfMessagesExists {
    private readonly prefix = "messages:cache";
    private get redisClient(){
        return RedisConnection.getInstance().getClient();
    }
    async verify(accountId: string, conversationId: string): Promise<boolean> {
        const key = `${this.prefix}:${accountId}:${conversationId}`;
        const existNumber = await this.redisClient.exists(key);
        return existNumber > 0;
    }

}