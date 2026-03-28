import { RedisConnection } from "@db/redis/config/redisConnect";
import { ISetAiCacheIdRepository } from "@domain/index";

export class RedisSetAiCacheIdRepository implements ISetAiCacheIdRepository {
    private get redisClient(){
        return RedisConnection.getInstance().getClient();
    }
    
    async set(params: ISetAiCacheIdRepository.Params): Promise<void> {
        await this.redisClient.set(`ai:cache:${params.accountId}:${params.conversationId}`,
            params.cacheId,
            {
                expiration: {
                    type: "EX",
                    value: params.expiration
                }
            }
        );
    }

}