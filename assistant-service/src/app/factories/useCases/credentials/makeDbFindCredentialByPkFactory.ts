import { DbFindCredentialByPk } from "@data/useCases";
import { TypeOrmFindCredentialByPkRepository } from "@db/db/repositories";

export const makeDbFindCredentialByPkFactory = () => {
    const findCredentialByPkRepository = new TypeOrmFindCredentialByPkRepository();
    return new DbFindCredentialByPk(
        findCredentialByPkRepository
    );
};