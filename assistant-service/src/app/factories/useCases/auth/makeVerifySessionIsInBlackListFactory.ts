import { DbmVerifySessionIsInBlackList } from "@data/useCases";
import { RedisVerifySessionIsInBlackListRepository } from "@db/redis";

export const makeVerifySessionIsInBlackListFactory = () => {
    const verifySessionIsInBlackListRepository = new RedisVerifySessionIsInBlackListRepository();
    return new DbmVerifySessionIsInBlackList(
        verifySessionIsInBlackListRepository
    );
};