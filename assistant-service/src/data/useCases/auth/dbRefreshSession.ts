import { Decrypter } from "@data/protocols/decrypter";
import { AccessDeniedError } from "@domain/errors/AccessDeniedError";
import { SessionExpiredError } from "@domain/errors/SessionExpiredError";
import { CreatePairTokens } from "@domain/index";
import { RefreshSession } from "@domain/useCases/auth/refreshSession";

export class DbRefreshSession implements RefreshSession{
    constructor(
        private readonly simetricDecrypter: Decrypter,
        private readonly createPairTokensService: CreatePairTokens
    ){}
    async refresh(refreshToken: RefreshSession.RefreshToken): Promise<RefreshSession.Result> {
        const decrypted = await this.simetricDecrypter.decrypt(refreshToken);
        if(decrypted.success === false) {
            if(decrypted.kind === "EXPIRED") throw new SessionExpiredError();
            throw new AccessDeniedError();
        }
        const sessionData = await this.createPairTokensService.create(
            decrypted.resources.userId,
            decrypted.resources.sessionId,
            decrypted.resources.secret
        );

        return sessionData;
        
    }

}