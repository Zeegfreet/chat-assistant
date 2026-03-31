import { TypeOrmFindAiAgentBySlugRepository } from "@db/db/repositories";
import { FindAiAgentBySlugRepositoryDecorator } from "@db/decorators";
import { RedisAddAiAgentRepository, RedisGetAiAgentBySlugRepository } from "@db/redis";

export const makeFindAiAgentBySlugRepositoryFactory = () => {
    const memoryGetAiAgentBySlugRepository = new RedisGetAiAgentBySlugRepository();
    const memoryAddAiAgentRepository = new RedisAddAiAgentRepository();
    const findAiAgentBySlugRepository = new TypeOrmFindAiAgentBySlugRepository();
    return new FindAiAgentBySlugRepositoryDecorator(
        memoryGetAiAgentBySlugRepository,
        memoryAddAiAgentRepository,
        findAiAgentBySlugRepository
    );
};