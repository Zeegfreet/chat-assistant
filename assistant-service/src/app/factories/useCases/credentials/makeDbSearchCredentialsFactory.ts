import { DbSearchCredentials } from "@data/useCases";
import { TypeOrmSearchCredentialsRepository } from "@db/db/repositories";
import { TypeOrmSearchHelper } from "@db/db/repositories/helper/typeOrmSearchHelper";

export const makeDbFindCredentialsFactory = () => {
    const searchHelper = new TypeOrmSearchHelper(
        ["name"],
        ["id", "name", "createdAt", "updatedAt"],
        ["id", "name", "createdAt", "updatedAt"]
    );
    const searchCredentialsRepository = new TypeOrmSearchCredentialsRepository(searchHelper);

    return new DbSearchCredentials(
        searchCredentialsRepository
    );
};