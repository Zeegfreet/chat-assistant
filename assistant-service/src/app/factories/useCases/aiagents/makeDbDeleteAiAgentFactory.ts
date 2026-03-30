import { DbDeleteAiAgent } from "@data/useCases";
import { TypeOrmDeleteAiAgentRepositroy } from "@db/db/repositories";

export const makeDeleteAiAgentFactory = () => {
    const deleteAiAgentRepository = new TypeOrmDeleteAiAgentRepositroy();
    return new DbDeleteAiAgent(
        deleteAiAgentRepository
    );
};