import { DbFindPromptByPk } from "@data/useCases";
import { TypeOrmFindPromptByPkRepository } from "@db/db/repositories";

export const makeDbFindPromptByPkFactory = () => {
    const findPromptByPkRepository = new TypeOrmFindPromptByPkRepository();
    return new DbFindPromptByPk(
        findPromptByPkRepository
    );
};