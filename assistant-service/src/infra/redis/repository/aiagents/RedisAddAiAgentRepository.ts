import { RedisConnection } from "@db/redis/config/redisConnect";
import { MemoryAddAiAgentRepository } from "@domain/index";

export class RedisAddAiAgentRepository implements MemoryAddAiAgentRepository {
    private readonly ttl = 30000;
    private readonly prefix = "agent:cache";
    private get redisClient(){
        return RedisConnection.getInstance().getClient();
    }
    async add(payload: MemoryAddAiAgentRepository.Params): Promise<void> {
        const key = `${this.prefix}:${payload.slug}`;

        await this.redisClient.set(key, JSON.stringify(payload),{ 
            expiration: {
                type: "EX",
                value: this.ttl
            }
        });

    }

}