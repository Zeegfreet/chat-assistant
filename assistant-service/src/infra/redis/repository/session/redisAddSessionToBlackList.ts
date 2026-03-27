import { RedisConnection } from "@db/redis/config/redisConnect";
import { AddSessionToBlackListRepository } from "@domain/index";

export class RedisAddSessionToBlackList implements AddSessionToBlackListRepository {

    private get redisClient(){
        return RedisConnection.getInstance().getClient();
    }

    async add({
        sessionId,
        ttl
    }: AddSessionToBlackListRepository.Params): Promise<void> {
        await this.redisClient.set(
            `session:blacklist:${sessionId}`,
            "1",
            {
                EX: ttl
            }
        );
    }

}