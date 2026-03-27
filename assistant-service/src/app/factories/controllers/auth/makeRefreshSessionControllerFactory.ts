import { makeCreatePairTokensServiceFactory } from "@app/factories/services/makeCreatePairTokensServiceFactory";
import { DbRefreshSession } from "@data/useCases/auth/dbRefreshSession";
import { JwtSimetricDecrypterAdapter } from "@db/cryptography/jwtSimetricDecrypterAdapter";
import { RefreshSessionController } from "@presentation/controllers";

export const makeRefreshSessoinControllerFactory = () => {

    const createPairTokenService = makeCreatePairTokensServiceFactory();
    const simetricDecrypter = new JwtSimetricDecrypterAdapter();
    const refreshSession = new DbRefreshSession(
        simetricDecrypter,
        createPairTokenService
    );
    
    return new RefreshSessionController(
        refreshSession
    );
};