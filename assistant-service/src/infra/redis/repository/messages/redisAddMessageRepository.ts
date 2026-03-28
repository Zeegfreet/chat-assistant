import { RedisConnection } from "@db/redis/config/redisConnect";
import { MemoryAddMessageRepository } from "@domain/index";

export class RedisAddMessageRepository implements MemoryAddMessageRepository{
    private readonly ttl = 3600;
    private readonly prefix = "messages:cache";
    private get redisClient(){
        return RedisConnection.getInstance().getClient();
    }
    async add(params: MemoryAddMessageRepository.Params, limit: number = 15): Promise<void> {
        const key = `${this.prefix}:${params.accountId}:${params.conversationId}`;

        await this.redisClient.rPush(key, JSON.stringify(params));
        await this.redisClient.lTrim(key, -limit, -1);
        await this.redisClient.expire(key, this.ttl);
    }

}