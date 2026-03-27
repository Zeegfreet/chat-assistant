import { createPublicKey } from "crypto";
import { JWKGenerator } from "@data/protocols/jwkGenerator";

export class CryptoJwkGenerator implements JWKGenerator {
    constructor(
        private readonly kid: string,
        private readonly publicKey: string
    ) {}

    async generate(): Promise<JWKGenerator.Result> {
        const keyObject = createPublicKey(this.publicKey);
        const jwk = keyObject.export({ format: "jwk" }) as JsonWebKey;

        if (!jwk.n || !jwk.e) {
            throw new Error("Invalid RSA public key");
        }

        return {
            kty: "RSA",
            n: jwk.n,
            e: jwk.e,
            use: "sig",
            alg: "RS256",
            kid: this.kid,
        };
    }
}