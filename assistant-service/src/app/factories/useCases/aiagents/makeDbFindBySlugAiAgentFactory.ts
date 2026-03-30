import { DbFindAiAgentBySlug } from "@data/useCases";
import { TypeOrmFindAiAgentBySlugRepository } from "@db/db/repositories";

export const makeDbFindBySlugAiAgentFactory = () => {
    const findAiAgentBySlugRepository = new TypeOrmFindAiAgentBySlugRepository();
    return new DbFindAiAgentBySlug(
        findAiAgentBySlugRepository
    );
};