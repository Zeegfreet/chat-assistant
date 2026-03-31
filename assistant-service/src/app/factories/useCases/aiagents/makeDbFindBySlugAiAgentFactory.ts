import { makeFindAiAgentBySlugRepositoryFactory } from "@app/factories/repositories/aiagents/makeFindAiAgentBySlugRepositoryFactory";
import { DbFindAiAgentBySlug } from "@data/useCases";

export const makeDbFindBySlugAiAgentFactory = () => {
    const findAiAgentBySlugRepository = makeFindAiAgentBySlugRepositoryFactory();
    return new DbFindAiAgentBySlug(
        findAiAgentBySlugRepository
    );
};