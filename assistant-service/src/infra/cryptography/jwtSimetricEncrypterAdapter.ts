import { Encrypter } from "@data/protocols/encrypter";
import jwt from "jsonwebtoken";

export class JwtSimetricEncrypterAdapter implements Encrypter {
    
    async encrypt(payload: Encrypter.Params, expiresIn: Encrypter.ExpiresIn = "1D"): Promise<Encrypter.Result> {
        return jwt.sign(
            payload,
            process.env.JWT_REFRESH_KEY_PASSPHRASE,
            {
                algorithm: "HS256",
                expiresIn: expiresIn as any,
            });
    }
    
}