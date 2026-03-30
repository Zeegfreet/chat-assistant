import { DbUpdateAiAgent } from "@data/useCases";
import { TypeOrmUpdateAiAgentRepository } from "@db/db/repositories";

export const makeDbUpdateAiAgentFactory = () => {
    const updateAiAgentRepository = new TypeOrmUpdateAiAgentRepository();
    return new DbUpdateAiAgent(
        updateAiAgentRepository
    );
};