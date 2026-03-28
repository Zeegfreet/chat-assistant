import { RedisConnection } from "@db/redis/config/redisConnect";
import { IGetAiCacheIdRepository } from "@domain/index";

export class RedisGetAiCacheIdRepository implements IGetAiCacheIdRepository{

    private get redisClient(){
        return RedisConnection.getInstance().getClient();
    }
        
    async get({ conversationId, accountId }: IGetAiCacheIdRepository.Params): Promise<IGetAiCacheIdRepository.Result> {
        const cacheId = await this.redisClient.get(`ai:cache:${accountId}:${conversationId}`);

        return cacheId as string | null;
    }

}