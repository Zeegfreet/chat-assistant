import { DbFindAiAgentByPk } from "@data/useCases";
import { TypeOrmFindAiAgentByPkRepository } from "@db/db/repositories";

export const makeDbFindByPkAiAgentFactory = () => {
    const findAiAgentByPkRepository = new TypeOrmFindAiAgentByPkRepository();
    return new DbFindAiAgentByPk(
        findAiAgentByPkRepository
    );
};