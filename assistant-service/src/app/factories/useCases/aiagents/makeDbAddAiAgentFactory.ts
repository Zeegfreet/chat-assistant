import { DbAddAiAgent } from "@data/useCases";
import { TypeOrmAddAiAgentRepository } from "@db/db/repositories";

export const makeDbAddAiAgentFactory = () => {
    const addAiAgentRepository = new TypeOrmAddAiAgentRepository();
    return new DbAddAiAgent(
        addAiAgentRepository
    );
};