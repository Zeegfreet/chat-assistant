import { RedisConnection } from "@db/redis/config/redisConnect";
import { MemoryGetAiAgentBySlugRepository } from "@domain/index";

export class RedisGetAiAgentBySlugRepository implements MemoryGetAiAgentBySlugRepository {
    private readonly prefix = "agent:cache";
    private get redisClient(){
        return RedisConnection.getInstance().getClient();
    }
    async findBySlug(slug: MemoryGetAiAgentBySlugRepository.Slug): Promise<MemoryGetAiAgentBySlugRepository.Result | null> {
        const key = `${this.prefix}:${slug}`;
        const agent = await this.redisClient.get(key);

        if(!agent) return null;

        return JSON.parse(agent as string);
    }
}