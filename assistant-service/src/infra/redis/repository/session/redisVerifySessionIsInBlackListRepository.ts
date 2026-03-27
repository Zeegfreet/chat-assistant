import { RedisConnection } from "@db/redis/config/redisConnect";
import { VerifySessionIsInBlackListRepository } from "@domain/index";

export class RedisVerifySessionIsInBlackListRepository implements VerifySessionIsInBlackListRepository {
    private get redisClient(){
        return RedisConnection.getInstance().getClient();
    }
    async verify(sessionId: VerifySessionIsInBlackListRepository.SessionId): Promise<VerifySessionIsInBlackListRepository.Response> {
        const exists = await this.redisClient.exists(`session:blacklist:${sessionId}`);
        return exists === 1;
    }

}