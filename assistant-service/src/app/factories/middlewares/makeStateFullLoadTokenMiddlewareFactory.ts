import { StateFullLoadTokenMiddleware } from "@presentation/middlewares/stateFullLoadTokenMiddleware";
import { jwtDecrypterAdapterFactory } from "../criptography/jwtDecrypterAdapterFactory";
import { DbSessionValidate } from "@data/useCases";
import { TypeOrmFindSessionByPkRepository, TypeOrmLoadAuthUserByPkRepository } from "@db/db/repositories";

export const makeStateFullLoadTokenMiddlewareFactory = () => {
    const loadAuthUserBypkRepository = new TypeOrmLoadAuthUserByPkRepository();
    const findSessionByPkRepository = new TypeOrmFindSessionByPkRepository;
    const loggedUserValidate = new DbSessionValidate(
        loadAuthUserBypkRepository,
        findSessionByPkRepository
    );
    const decrypter = jwtDecrypterAdapterFactory();
    return new StateFullLoadTokenMiddleware(
        decrypter,
        loggedUserValidate
    );
};