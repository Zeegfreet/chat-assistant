import { TypeOrmUpdateAiAgentRepository } from "@db/db/repositories";
import { UpdateAiAgentRepositoryDecorator } from "@db/decorators";
import { RedisDeleteAiAgentRepository } from "@db/redis";

export const makeUpdateAiAgentRepositoryFactory = () => {
    const memoryDeleteAiAgentRepository = new RedisDeleteAiAgentRepository();
    const updateAiAgentRepository = new TypeOrmUpdateAiAgentRepository();
    return new UpdateAiAgentRepositoryDecorator(
        memoryDeleteAiAgentRepository,
        updateAiAgentRepository
    );
};