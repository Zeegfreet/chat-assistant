import { RedisConnection } from "@db/redis/config/redisConnect";
import { MemoryDeleteAiAgentRepository } from "@domain/index";

export class RedisDeleteAiAgentRepository implements MemoryDeleteAiAgentRepository {
    private readonly prefix = "agent:cache";
    private get redisClient(){
        return RedisConnection.getInstance().getClient();
    }
    async delete(slug: MemoryDeleteAiAgentRepository.Slug): Promise<void> {
        const key = `${this.prefix}:${slug}`;
        await this.redisClient.del(key);
    }

}