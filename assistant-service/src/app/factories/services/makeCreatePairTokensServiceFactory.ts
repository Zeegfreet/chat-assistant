import { CreatePairTokensService } from "@data/services";
import { TypeOrmFindSessionByPkRepository, TypeOrmLoadAuthUserByPkRepository, TypeOrmUpdateSessionRepository } from "@db/db/repositories";
import { jwtEncrypterAdapterFactory } from "../criptography/jwtEncrypterAdapterFactory";
import { JwtSimetricEncrypterAdapter } from "@db/cryptography/jwtSimetricEncrypterAdapter";
import { CryptoUuidCreator } from "@db/cryptography/cryptoUuidCreator";

export const makeCreatePairTokensServiceFactory = () => {
    const loadAuthUserByPkRepository = new TypeOrmLoadAuthUserByPkRepository();
    const findSessionByPkRepository = new TypeOrmFindSessionByPkRepository();
    const assimetricEncrypterAdapter = jwtEncrypterAdapterFactory();
    const simetricEncrypterAdapter = new JwtSimetricEncrypterAdapter();
    const uuidCreater = new CryptoUuidCreator();
    const updateSessionRepository = new TypeOrmUpdateSessionRepository();
    return new CreatePairTokensService(
        loadAuthUserByPkRepository,
        findSessionByPkRepository,
        updateSessionRepository,
        uuidCreater,
        assimetricEncrypterAdapter,
        simetricEncrypterAdapter
    );
};