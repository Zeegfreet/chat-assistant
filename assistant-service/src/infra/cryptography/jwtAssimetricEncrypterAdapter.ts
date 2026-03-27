import { Encrypter } from "@data/protocols/encrypter";
import jwt from "jsonwebtoken";

export class JwtAssimetricEncrypterAdapter implements Encrypter {
    
    constructor(
        private readonly privateKey: string,
        private readonly passphrase: string,
        private readonly issuer: string,
        private readonly kid: string
    ){}
    
    async encrypt(payload: Encrypter.Params, expiresIn: Encrypter.ExpiresIn = "1H"): Promise<Encrypter.Result> {
        return jwt.sign(
            payload,
            {
                key: this.privateKey,
                passphrase: this.passphrase,
            },
            {
                algorithm: "RS256",
                expiresIn: expiresIn as any,
                issuer: this.issuer,
                header: {
                    alg: "RS256",
                    kid: this.kid,
                    typ: "JWT"
                }
            });
    }
    
}