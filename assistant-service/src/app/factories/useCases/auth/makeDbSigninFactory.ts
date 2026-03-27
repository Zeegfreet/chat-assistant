import { makeCreatePairTokensServiceFactory } from "@app/factories/services/makeCreatePairTokensServiceFactory";
import { DbSignIn } from "@data/useCases";
import { BcryptjsHasher, PasswordHasher } from "@db/cryptography";
import { TypeOrmAddSessionRepository, TypeOrmFindUserByEmailRepository } from "@db/db/repositories";

export const makeDbSigninFactory = () => {
    const findUserByEmailrepository = new TypeOrmFindUserByEmailRepository();
    const addSessionRepository = new TypeOrmAddSessionRepository();
    const createPairTokens = makeCreatePairTokensServiceFactory();
    const hasher = new BcryptjsHasher();
    const passwordHasher = new PasswordHasher(hasher);

    return new DbSignIn(
        findUserByEmailrepository,
        addSessionRepository,
        createPairTokens,
        passwordHasher
    );
};