import { DbSearchPrompts } from "@data/useCases";
import { TypeOrmSearchPromptsRepository } from "@db/db/repositories";
import { TypeOrmSearchHelper } from "@db/db/repositories/helper/typeOrmSearchHelper";

export const makeDbSearchPromptFactory = () => {
    const searchHelper = new TypeOrmSearchHelper(
        ["name"],
        ["id", "name", "createdAt", "updatedAt"],
        ["id", "name", "createdAt", "updatedAt"]
    );
    const searchCredentialsRepository = new TypeOrmSearchPromptsRepository(searchHelper);

    return new DbSearchPrompts(
        searchCredentialsRepository
    );
};