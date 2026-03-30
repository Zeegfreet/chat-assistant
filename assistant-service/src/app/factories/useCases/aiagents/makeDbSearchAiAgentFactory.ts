import { DbSearchAiAgent } from "@data/useCases";
import { TypeOrmSearchAiAgentRepository } from "@db/db/repositories";
import { TypeOrmSearchHelper } from "@db/db/repositories/helper/typeOrmSearchHelper";

export const makeDbSearchAiAgentFactory = () => {
    const searchHelper = new TypeOrmSearchHelper(
        ["name", "slug", "model", "provider"],
        ["id", "name", "slug", "model", "provider", "createdAt", "updatedAt"],
        ["id", "name", "slug", "model", "provider", "createdAt", "updatedAt"]
    );
    const searchCredentialsRepository = new TypeOrmSearchAiAgentRepository(searchHelper);

    return new DbSearchAiAgent(
        searchCredentialsRepository
    );
};
